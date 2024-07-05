import React, { useEffect, useState } from "react";
import FormField from "../components/forms_fields/FormField";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userEmailConfirmUrl } from "../constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authActions";

const Register = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [toggleEye1, setToggleEye1] = useState(false);
  const [toggleEye2, setToggleEye2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, watch, trigger, formState } = useForm({
    mode: "all",
  });

  const { errors, isSubmitSuccessful } = formState;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const eye_icon1 = document.querySelector(".eye1");
    eye_icon1.addEventListener("click", () => {
      if (!toggleEye1) {
        setToggleEye1(true);
      } else {
        setToggleEye1(false);
      }
    });
  }, [toggleEye1]);

  useEffect(() => {
    const eye_icon2 = document.querySelector(".eye2");
    eye_icon2.addEventListener("click", () => {
      if (!toggleEye2) {
        setToggleEye2(true);
      } else {
        setToggleEye2(false);
      }
    });
  }, [toggleEye2]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  let password = watch("password");
  useEffect(() => {
    trigger("cpassword");
  }, [password, trigger]);

  const onSubmit = (data) => {
    console.log(data)
    dispatch(signupUser(data)).then((result) => {
      console.log(result)
      if (result.meta.requestStatus ==="fulfilled") {
        toast.success(result.payload.message, {
          duration: 5000,
        });

        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    });
  };

  let eye_class1 = !toggleEye1 ? "fa-eye" : "fa-eye-slash";
  let eye_class2 = !toggleEye2 ? "fa-eye" : "fa-eye-slash";
  return (
    <section className="form__wrapper">
      <div className="form__content">
        <div className="form__header">
          <h3>Register Account!!!</h3>
          <p>Get your free account to make new friends.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="fields">
            <FormField
              title="Full name"
              name="name"
              type="text"
              holder="Full name"
              isPwd={false}
              register={register}
            />
            <p className="error_msg">{errors.name && errors.name?.message}</p>
          </div>
          <div className="fields">
            <FormField
              title="Username"
              name="username"
              type="text"
              holder="Username"
              isPwd={false}
              register={register}
            />
            <p className="error_msg">
              {errors.username && errors.username?.message}
            </p>
          </div>
          <div className="fields">
            <div className="form__field">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Please enter your email address.",
                  validate: {
                    emailConfirm: async (fieldValue) => {
                      const response = await fetch(
                        userEmailConfirmUrl(fieldValue)
                      );
                      let data = await response.json();
                      console.log(data);
                      return data.length === 0 || "Please account with this email already exists.";
                    },
                  },
                })}
              />
            </div>
            <p className="error_msg">{errors.email && errors.email?.message}</p>
          </div>

          <div className="fields">
            <div className="form__field">
              <label htmlFor="">Password</label>
              <input
                type={!toggleEye1 ? "password" : "text"}
                placeholder="Password"
                {...register("password", {
                  required: "Please enter your account password.",
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
              <i className={`fas ${eye_class1} eye1`}></i>
            </div>
            <p className="error_msg">
              {errors.password && errors.password?.message}
            </p>
          </div>
          <div className="fields">
            <div className="form__field">
              <label htmlFor="">Confirm Password</label>
              <input
                type={!toggleEye2 ? "password" : "text"}
                placeholder="Confirm Password"
                {...register("cpassword", {
                  validate: (fieldValue) => {
                    return (
                      fieldValue === password ||
                      "Please confirm your password match."
                    );
                  },
                })}
              />
              <i className={`fas ${eye_class2} eye2`}></i>
            </div>
            <p className="error_msg">
              {errors.cpassword && errors.cpassword?.message}
            </p>
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="diff__logins__txt">Sign Up with</div>
        <div className="session__logins">
          <a href="#">
            <i className="fa-brands fa-facebook-f"></i>facebook
          </a>
          <a href="#">
            <i className="fa-brands fa-google-plus-g"></i>google
          </a>
        </div>
        <p className="already">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
