import PropTypes from "prop-types";

function UserHome({ userData }) {
  const logOut = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    window.location.href = "./signIn";
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border w-[60%]  border-[#001C30] rounded-xl space-y-4 lg:space-y-8 mt-8 mx-5  lg:m-14  p-4 lg:p-10 text-base bg-[#EAFDFC]">
        <div className=" bg-[#fff]">
          <div className="flex border border-[#001C30] rounded-lg">
            <div className="rounded-l-lg pl-5 pr-5 py-2 bg-[#64CCC5]">
              <span className="font-bold ">Name</span>
            </div>
            <div className="pl-5 py-2 border-l border-l-gray-900">
              <span>{userData.fName}</span>
            </div>
          </div>
        </div>
        <div className=" bg-[#fff]">
          <div className="flex border border-[#001C30] rounded-lg">
            <div className="rounded-l-lg pl-5 pr-5 py-2 bg-[#64CCC5]">
              <span className="font-bold">Surname</span>
            </div>
            <div className="pl-5 py-2 border-l border-l-gray-900">
              <span>{userData.lName}</span>
            </div>
          </div>
        </div>
        <div className=" bg-[#fff]">
          <div className="flex border border-[#001C30] rounded-lg">
            <div className="rounded-l-lg pl-5 pr-5 py-2 bg-[#64CCC5]">
              <span className="font-bold">Email</span>
            </div>
            <div className="pl-5 py-2 border-l border-l-gray-900">
              <span>{userData.email}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10 lg:mt-0">
        <button
          className=" border border-sky-500 rounded-lg bg-[#176B87] hover:bg-gray-800 text-white p-2 lg:px-5"
          onClick={logOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

UserHome.propTypes = {
  userData: PropTypes.shape({
    fName: PropTypes.string,
    lName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

UserHome.defaultProps = {
  userData: {
    fName: "Default Name",
    lName: "Default Surname",
    email: "Default Email",
  },
};

export default UserHome;
