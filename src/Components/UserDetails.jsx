import { useEffect, useState } from "react";
import UserHome from "./UserHome";

function UserDetails() {
  const [userData, setUserData] = useState({});

  const urluserData = new URL("/userData", import.meta.env.VITE_BACKEND_SERVER);

  useEffect(() => {
    fetch(urluserData, {
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
  return <UserHome userData={userData} />;
}

export default UserDetails;
