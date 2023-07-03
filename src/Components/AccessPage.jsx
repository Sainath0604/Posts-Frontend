import { Link } from "react-router-dom";

const AccessPage = () => {
  return (
    <div className="w-full p-10 md:p-20 ">
      <div className=" border border-gray-500 rounded-lg bg-[#EAFDFC] p-10 md:p-20">
        <div className="flex flex-col">
          <h1 className="font-bold text-base mb-5 md:mb-10 md:text-3xl">
            You don&apos;t have access to this particular page !!
          </h1>
          <p className="text-sm mb-5 md:mb-10 md:text-xl">
            Please log-in to access this page.
          </p>
          <Link className="flex items-center justify-center" to="/signIn">
            <button className="flex items-center justify-center border border-gray-600 p-2 rounded-xl bg-[#176B87] text-white md:h-14 md:p-5 md:text-xl md:font-semibold">
              Log-in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessPage;
