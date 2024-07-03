import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { loginUser } from "../features/auth/authActions";

const Login = () => {
  const [toggleEye, setToggleEye] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const { register, handleSubmit, reset, formState } = useForm({mode: "all"});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errors, isSubmitSuccessful } = formState;

  useEffect(() => {
    const eye_icon = document.querySelector(".login_eye");
    eye_icon.addEventListener("click", () => {
      if (!toggleEye) {
        setToggleEye(true);
      } else {
        setToggleEye(false);
      }
    });
  }, [toggleEye]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isSubmitSuccessful && error === null) {
      reset();
    }
  }, [isSubmitSuccessful, error]);

  let eye_class = !toggleEye ? "fa-eye" : "fa-eye-slash";

  const onSubmit = (data) => {
    dispatch(loginUser(data)).then((result) => {
      console.log(result);
      if (result.meta.requestStatus === "fulfilled" && result.payload) {
        toast.success("Authentication Successfull...", {
          duration: 5000,
        });

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 5000);
      }

      if (result.meta.requestStatus === "rejected" && result.error) {
        toast.error(result.payload.message, {
          duration: 5000,
        });
      }
    });
  };

  return (
    <section className="form__wrapper">
      <div className="form__content">
        <div className="form__header">
          <h3>Welcome Back!!!</h3>
          <p>Login to make new friends.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="form__field">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email", {
                required: "Please enter your email address.!!!",
              })}
            />
            <p className="error_msg">{errors.email && errors.email?.message}</p>
          </div>
          <div className="fields">
            <div className="form__field">
              <label htmlFor="">Password</label>
              <input
                type={!toggleEye ? "password" : "text"}
                placeholder="Password"
                {...register("password", {
                  required: "Please enter your password.!!!",
                  validate: {
                    lessthan8char: (fieldValue) => {
                      return (
                        !(fieldValue.length < 8) ||
                        "Password must be greater than 8 characters."
                      );
                    },
                    lowercase: (fieldValue) => {
                      return (
                        fieldValue.search(/[a-z]/) !== -1 ||
                        "Password must contain at least one lower case letter."
                      );
                    },
                    uppercase: (fieldValue) => {
                      return (
                        fieldValue.search(/[A-Z]/) !== -1 ||
                        "Password must contain at least one upper case letter."
                      );
                    },
                    symbolsPwd: (fieldValue) => {
                      return (
                        fieldValue.search(/[!@#$%]/gi) !== -1 ||
                        "Password must contain at least one symbol[!@#$%]."
                      );
                    },
                    numbersPwd: (fieldValue) => {
                      return (
                        fieldValue.search(/[0-9]/) !== -1 ||
                        "Password must contain at least one number."
                      );
                    },
                  },
                })}
              />
              <i className={`fas ${eye_class} login_eye`}></i>
            </div>
            <p className="error_msg">
              {errors.password && errors.password?.message}
            </p>
          </div>
          <button type="submit">LogIn</button>
        </form>
        <div className="diff__logins__txt">Sign In with</div>
        <div className="session__logins">
          <a href="#">
            <i className="fa-brands fa-facebook-f"></i>facebook
          </a>
          <a href="#">
            <i className="fa-brands fa-google-plus-g"></i>google
          </a>
        </div>
        <p className="already">
          Don't have an account? <Link to="/register">SignUp</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
