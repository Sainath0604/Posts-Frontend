import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { getServerUrl } from "../utility/getServerUrl";

function Home() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const urlGetPost = new URL("/getPost", getServerUrl());
  const urlUserData = new URL("/userData", getServerUrl());

  useEffect(() => {
    fetch(urlUserData, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "User data");
        setUserData(data.data);
      });
  }, []);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(urlGetPost);
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <div className="p-2">
        <div className="p-2 h-10">
          <div className="flex flex-row text-red-900">
            <div className="font-semibold text-2xl mr-2 text-black">
              Welcome,
            </div>
            {isLoggedIn === "true" ? (
              <div>
                <span className="font-bold text-2xl">{userData.fName}.</span>
              </div>
            ) : (
              <h1 className="font-bold text-2xl">Guest</h1>
            )}
          </div>
          <div className="font-medium text-2xl mr-2 flex justify-center">
            <span className="text-indigo-900">Enjoy latest posts here</span>
          </div>
        </div>

        {loading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Oval
              height={100}
              width={100}
              color="#1f2937"
              secondaryColor="#3e3f40"
              strokeWidth={3}
              strokeWidthSecondary={3}
            />
          </div>
        ) : (
          <div className="mt-8 p-5 flex gap-y-10 flex-col items-center">
            {posts.map((post) => (
              <div
                key={post._id}
                className="flex flex-col lg:flex-row border border-gray-700 rounded-lg shadow-md hover:shadow-xl w-full lg:w-[75vw]"
              >
                <div className="w-72 lg:w-56 lg:h-44 lg:border-r border-gray-700 p-2 flex lg:justify-center lg:items-center">
                  <img
                    className="w-4/5 h-4/5 object-contain drop-shadow-2xl rounded-md ml-10 lg:ml-0"
                    src={post.image.data}
                    alt="Image"
                  />
                </div>
                <div className="w-full lg:w-[70vw] lg:h-44 p-2 flex flex-col justify-center gap-y-2">
                  <div className="p-2">
                    <span className="mr-2 font-bold">Title:</span>
                    <span>{post.pName}</span>
                  </div>
                  <div className="p-2 flex">
                    <div className="mr-2 font-bold">Description:</div>
                    <div>{post.pDescription}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
