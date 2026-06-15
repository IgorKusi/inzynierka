import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    login
} from "../api/authApi";

export default function LoginPage() {

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    async function handleLogin() {

        try {

            const result =
                await login(
                    email,
                    password
                );

            localStorage.setItem(
                "token",
                result.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(
                    result.user
                )
            );

            if (
                result.user.role ===
                "ADMIN"
            ) {
                navigate("/admin");
            }
            else {
                navigate(
                    "/advertiser"
                );
            }
        }
        catch (err: any) {

            setError(
                err.message
            );
        }
    }

    return (
        <div>

            <h1>Login</h1>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(
                        e.target.value
                    )
                }
            />

            <br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
            />

            <br />

            <button
                onClick={
                    handleLogin
                }
            >
                Login
            </button>

            {error && (
                <p>
                    {error}
                </p>
            )}

        </div>
    );
}