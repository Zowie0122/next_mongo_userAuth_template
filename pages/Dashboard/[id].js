import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";

export default function UserDashboard({ UserId }) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      fetch(`/api/${router.query.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }).then((res) => {
        res.json().then((res) => {
          if (res.message) {
            setErrorMessage(res.message);
          } else {
            setUserInfo(res.data);
          }
        });
      });
    } else {
      Router.push("/Login");
    }
  }, []);

  return (
    <div>
      <p>User: {UserId} Dashboard</p>
    </div>
  );
}

UserDashboard.getInitialProps = async ({ query: { id } }) => {
  try {
    return { UserId: id };
  } catch (error) {
    console.log(error);
  }
};
