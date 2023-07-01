import { useEffect, useState } from "react";
import UserHome from "./UserHome";
import { getServerUrl } from "../utility/getServerUrl";

function UserDetails() {
  const [userData, setUserData] = useState({});

  const urluserData = new URL("/userData", getServerUrl());

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
