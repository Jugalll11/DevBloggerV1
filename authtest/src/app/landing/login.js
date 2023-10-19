"use client";
import { useState } from "react";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
    const nav = useRouter();
    const [values, setValues] = useState({
        Username: "",
        Password: "",
    });

    const toastmsg = {
        position: "bottom-center",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { Password, Username } = values;
            try {
                // const { data } = await axios.post(loginRoute, {
                //   Username: Username,
                //   Password: Password,
                // });
                // if (data.status === 401) {
                //   toast.error("Error Logging in", toastmsg);
                // } else {
                //   toast.success("Logged in", toastmsg);
                //   nav.refresh();
                // }
            } catch (error) {
                if (error.response.status === 401) {
                    toast.error("Credentials are wrong, Please recheck", toastmsg);
                }
                if (error.response.status === 500) {
                    toast.error("Some Error Occured", toastmsg);
                }
                console.log(error)
            }
        }
    };

    const handleValidation = () => {
        const { Password, Username } = values;
        if (Password.length === "") {
            toast.error("Please Enter Password", toastmsg);
            return false;
        } else if (Username === "") {
            toast.error("Please Enter Username", toastmsg);
            return false;
        } else {
            return true;
        }
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex m-auto">
            <div className="FormContainer">
                <form>
                    <input
                        type="text"
                        placeholder="Username"
                        autoComplete="new-password"
                        name="Username"
                        className="p-3"
                        onChange={(e) => handleChange(e)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        name="Password"
                        className="p-3"
                        onChange={(e) => handleChange(e)}
                    />
                    <button className="px-3 py-2 bg-cyan-950" onClick={handleSubmit}>Login</button>
                    <button type="button" className="google-sign-in-button" >
                        Sign in with Google
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
