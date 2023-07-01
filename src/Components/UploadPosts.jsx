import { useState } from "react";
import { UploadCloudIcon } from "./Icons";

function UploadPosts() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [postName, setPostName] = useState("");

  const urluploadPost = new URL(
    "/uploadPost",
    import.meta.env.VITE_BACKEND_SERVER
  );

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleName = (event) => {
    setPostName(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("post", selectedFile);
      formData.append("pName", postName);
      formData.append("pDescription", description);

      const response = await fetch(urluploadPost, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Post uploaded successfully.");
        setSelectedFile(null);
        setDescription("");
        setPostName("");
      } else {
        alert("Failed to upload Post.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload Post.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex sm:w-full md:w-4/5 justify-center">
        <div className="flex flex-col items-center w-4/5">
          <h1 className="flex items-center justify-center bg-gray-800 rounded-xl font-bold text-gray-100 text-base lg:text-xl lg:w-60 mx-auto h-10 lg:h-12 p-2 lg:p-5 my-10 shadow-lg hover:shadow-2xl">
            Upload Posts
            <span className="text-2xl font-bold ml-2 lg:ml-5">
              <UploadCloudIcon />
            </span>
          </h1>
          <div className=" w-11/12 p-2 mr-10 lg:mr-0 lg:p-5 flex flex-col lg:flex-row justify-center lg:gap-x-20">
            <div className=" lg:p-5">
              <div className="mb-2">
                <label className="font-bold text-sky-900">Post Title:</label>
              </div>
              <div className="mb-5">
                <input
                  className="border border-sky-400 rounded-lg p-1 w-80 h-12"
                  type="text"
                  placeholder="Post Title"
                  value={postName}
                  onChange={handleName}
                />
              </div>
              <div className="mb-2">
                <label className="font-bold text-sky-900">
                  Post Description:
                </label>
              </div>
              <div className="mb-2 lg:mb-5">
                <textarea
                  rows={4}
                  cols={40}
                  name="postContent"
                  className="  border border-sky-400 rounded-lg p-1 resize max-w-[50vw] max-h-[20vh]"
                  type="text"
                  placeholder="Post caption"
                  value={description}
                  onChange={handleDescription}
                />
              </div>
            </div>
            <div className=" lg:p-5">
              <div className="mb-2">
                <label className="font-bold text-sky-900">
                  Upload Post image:
                </label>
              </div>
              <div className="mb-5">
                <input
                  className="border border-sky-400 rounded-lg p-1 w-80 h-12"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="border bg-gray-800 rounded-xl font-bold text-gray-100 p-2 mr-14 h-[100%] w-[100%] text-md lg:text-lg  "
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPosts;
