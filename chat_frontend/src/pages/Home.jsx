import React, { useEffect, useState } from "react";
import UserHeaderDeskTop from "../components/Home/core/UserHeaderDeskTop";
import UserContentWrapper from "../components/Home/core/UserContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authActions";
import toast from "react-hot-toast";
import { fetchUser } from "../features/users/userActions";

const Home = () => {
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const auth_user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser(auth_user.user_id)).then((result) => {
      if (result.meta.requestStatus === "fulfilled" && result.payload) {
        setFriends(result.payload.friends);
        setUser(result.payload)
      }
    });
    
    let interval = setInterval(() => {
      dispatch(fetchUser(auth_user.user_id)).then((result) => {
        if (result.meta.requestStatus === "fulfilled" && result.payload) {
          setFriends(result.payload.friends);
          setUser(result.payload)
        }
      });
    }, 4800);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    return dispatch(logoutUser(auth_user.user_id)).then((result) => {
      if (result.meta.requestStatus === "fulfilled" && result.payload) {
        toast.success(result.payload.message, {
          duration: 5000,
        });

        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    });
  };

  return (
    <main>
      <UserHeaderDeskTop  user={user} handleLogout={handleLogout} />
      <UserContentWrapper user={auth_user} friends={friends} />
    </main>
  );
};



export default Home;
