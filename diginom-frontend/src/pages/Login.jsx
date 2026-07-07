import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const formData = new URLSearchParams();

            formData.append(
                "username",
                email
            );

            formData.append(
                "password",
                password
            );

            const response = await api.post(
                "/login",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    }
                }
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            localStorage.setItem(
                "email",
                response.data.email
            );

            localStorage.setItem(
                "employee_id",
                response.data.employee_id
            );

            localStorage.setItem(
                "diginom_id",
                response.data.diginom_id
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "email",
                response.data.email
            );

            localStorage.setItem(
                "username",
                response.data.username
            );

            const role =
                response.data.role
                    ?.toUpperCase();

            if (role === "ADMIN") {

                navigate(
                    "/dashboard"
                );

            } else if (
                role === "HR"
            ) {

                navigate(
                    "/hr-dashboard"
                );

            } else if (
                role === "RECRUITER"
            ) {

                navigate(
                    "/recruiter-dashboard"
                );

            } else {

                navigate(
                    "/employee-dashboard"
                );
            }
        } catch (error) {

            console.log(error);

            alert("Login Failed");
        }
    };

    return (
        <div>

            <h1>DIGINOM Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <br />
                <br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;