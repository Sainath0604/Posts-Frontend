import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Popup from "reactjs-popup";
import EditPost from "./EditPost";
import "reactjs-popup/dist/index.css";
import { DeleteIcon, EditIcon } from "./Icons";
import { getServerUrl } from "../utility/getServerUrl";

function ManagePosts() {
  const serverUrl = getServerUrl();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const urlGetPost = new URL("/getPost", serverUrl);
  const urleditPost = new URL("/editPost", serverUrl);
  const urldeletePost = new URL("/deletePost", serverUrl);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(urlGetPost);
      const data = await response.json();
      setPost(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deletePost = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch(urldeletePost, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          postId: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          fetchPost();
        });

      console.log(name, id);
    } else {
      alert("failed to delete post");
    }
  };

  const editPost = (formData) => {
    fetch(urleditPost, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.data);
        fetchPost();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center">
      {loading ? (
        <div className="flex sm:w-full md:w-4/5 justify-center ViewProduct lg:mt-40">
          <Oval
            height={100}
            width={100}
            color="#1f2937"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#3e3f40"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        </div>
      ) : (
        <div className="flex sm:w-full md:w-4/5 justify-center ViewProduct">
          <div className="mb-10">
            <table className="border border-separate w-[68vw]">
              <caption className="caption-top my-6 text-3xl font-bold text-gray-900">
                All Product information
              </caption>
              <thead className="h-14">
                <tr>
                  <th className="border p-2 w-[10vw]">Post Title</th>
                  <th className="border p-2 w-[15vw]">Post image</th>
                  <th className="border p-2 w-[25vw]">Post Description</th>
                  <th className="border p-2 w-[10vw]">actions</th>
                </tr>
              </thead>
              <tbody>
                {/* mapping the fetched data */}
                {post.map((post, index) => {
                  return (
                    <tr
                      key={post._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } h-56`}
                    >
                      <td className="border p-2 ">
                        <div className="flex justify-center">{post.pName}</div>
                      </td>
                      <td className="border p-2">
                        <div className="flex justify-center items-center">
                          <img
                            className="w-44 h-44 object-contain rounded-md"
                            src={post.image.data}
                            alt={post.pName}
                          />
                        </div>
                      </td>
                      <td className="border p-2 ">{post.pDescription}</td>
                      <td className="border p-2">
                        <div className="flex flex-row justify-center">
                          <div className="flex justify-center mr-5">
                            <button
                              onClick={() => deletePost(post._id, post.pName)}
                            >
                              <span className="cursor-pointer text-gray-800 text-2xl hover:text-gray-500">
                                <DeleteIcon />
                              </span>
                            </button>
                          </div>
                          <div className="flex justify-center ">
                            <div className="flex justify-center ">
                              <Popup
                                trigger={
                                  <button className="button">
                                    <span className="cursor-pointer text-gray-800 text-2xl hover:text-gray-500">
                                      <EditIcon />
                                    </span>
                                  </button>
                                }
                                modal
                                nested
                              >
                                {(close) => (
                                  <div>
                                    <EditPost
                                      id={post._id}
                                      pName={post.pName}
                                      description={post.pDescription}
                                      image={post.image.data}
                                      onEdit={(formData) => editPost(formData)}
                                      onCancel={close}
                                    />
                                  </div>
                                )}
                              </Popup>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagePosts;
