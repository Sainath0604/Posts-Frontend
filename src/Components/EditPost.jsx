import { useState } from "react";
import PropTypes from "prop-types";

const EditPost = ({ id, pName, description, onEdit, onCancel }) => {
  const [newPname, setnewPname] = useState(pName);
  const [newDescription, setNewDescription] = useState(description);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEdit = () => {
    const formData = new FormData();
    formData.append("postId", id);
    formData.append("pName", newPname);
    formData.append("pDescription", newDescription);
    if (selectedFile) {
      formData.append("post", selectedFile);
    }

    onEdit(formData);
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="bg-[#EAFDFC] border-2 border-[#001C30] rounded-3xl p-4 h-[65vh]">
      <h1 className="flex items-center justify-center border border-[#001C30] bg-[#001C30] rounded-xl h-10 p-2 font-bold text-gray-50 text-xl">
        Edit Product
      </h1>

      <div>
        <div className="md:mt-10 md:ml-10 md:mb-10 flex flex-col">
          <div>
            <label className="font-bold">
              Replace post image:
              <input
                className="ml-5 mb-4 bg-white border border-[#001C30] rounded-lg p-1 font-normal"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </label>
          </div>
          <div>
            <label className="font-bold">
              Replace title:
              <input
                className="ml-5 mb-4 border border-[#001C30] rounded-lg p-1 font-normal"
                type="text"
                placeholder="Product Name"
                value={newPname}
                onChange={(e) => setnewPname(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-row">
            <div>
              <label className="font-bold">Replace caption:</label>
            </div>
            <div>
              <textarea
                className="ml-5 mb-4 border border-[#001C30] rounded-lg p-1 font-normal"
                type="text"
                rows={4}
                cols={40}
                placeholder="Product Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 lg:flex-row items-center justify-center ">
          <button
            className="border border-[#001C30] bg-[#176B87] text-gray-50 rounded-lg px-2 py-1 mr-14 lg:h-[6vh] w-20 lg:w-[5vw] font-medium text-lg  "
            onClick={handleEdit}
          >
            Save
          </button>
          <button
            className="border border-[#001C30] bg-[#176B87] text-gray-50  rounded-lg px-2 py-1  h-[6vh] w-20 lg:w-[5vw] font-medium text-lg "
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

EditPost.propTypes = {
  id: PropTypes.string,
  pName: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default EditPost;
