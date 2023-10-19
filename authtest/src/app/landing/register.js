"use client"
import './register.css'
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';


export default function Register() {
  const nav = useRouter();

  const [values, setValues] = useState({
    Username: "",
    Email: "",
    Password: "",
    confirmPassword: "",
    Name: "",
  });

  const toastmsg = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const Login = async () => {
    const { Password, Username } = values;
    // const { data } = await axios.post(loginRoute, {
    //   Username: Username,
    //   Password: Password,
    // });
    // nav.refresh();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      // const { Password, Name, Username, Email } = values;
      // const { data } = await axios.post(registerRoute, {
      //   Username,
      //   Email,
      //   Password,
      //   Name,
      // });
      // if (data.status === "false") {
      //   toast.error(data.message, toastmsg);
      // } else if (data.status === "true") {
      //   toast.success(data.message, toastmsg);
      //   setTimeout(() => {
      //     Login();
      //   }, 2000);
      // }
    }
  };


  const handleValidation = () => {
    const { Password, confirmPassword, Username, Email, Name } = values;
    if (Password !== confirmPassword) {
      toast.error("Password Not the Same as Confirm Password", toastmsg);
      return false;
    } else if (Username.length < 4) {
      toast.error(
        "Username too short (Should be more than 4 Letters)",
        toastmsg
      );
      return false;
    } else if (Password.length < 8) {
      toast.error(
        "Password too short (Should be more than 8 Letters)",
        toastmsg
      );
      return false;
    } else if (Email === "") {
      toast.error("Email cannot be Empty", toastmsg);
      return false;
    } else if (Name === "") {
      toast.error("Please Enter a Name", toastmsg);
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className='m-auto'>
      <div className="FormContainer">
        <form >
          <input
            type="text"
            className="p-3"
            placeholder="Username"
            name="Username"
            autoComplete="new-password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            className="p-3"
            placeholder="Email"
            name="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="p-3"
            placeholder="Full Name"
            name="Name"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="Password"
            className="p-3"
            autoComplete="new-password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Passowrd"
            className="p-3"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button className='px-3 py-2 bg-cyan-950' onClick={handleSubmit}> Create User </button>
          <button type="button" className="google-sign-in-button" >
          Sign up with Google
        </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );

}
