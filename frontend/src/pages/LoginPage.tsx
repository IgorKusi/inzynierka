import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

export default function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

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
                result.user.role === "ADMIN"
            ) {
                navigate("/admin");
            }
            else {
                navigate("/advertiser");
            }

        }
        catch (err: any) {

            setError(err.message);
        }
    }

    return (

        <div className="page">

            <div
                className="card"
                style={{
                    maxWidth: "450px"
                }}
            >
                <div
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    ← Back to Home
                </div>

                <h1 className="title">
                    Welcome back
                </h1>

                <p className="subtitle">
                    Sign in to manage your advertising campaigns.
                </p>

                <div className="section">

                    <label className="label">
                        Email
                    </label>

                    <input
                        className="input"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                </div>

                <div className="section">

                    <label className="label">
                        Password
                    </label>

                    <input
                        className="input"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                </div>

                <button
                    className="button"
                    onClick={handleLogin}
                >
                    Login
                </button>

                {error && (

                    <p
                        style={{
                            marginTop: 20,
                            color: "#dc2626",
                            textAlign: "center"
                        }}
                    >
                        {error}
                    </p>

                )}

                <p
                    style={{
                        marginTop: 30,
                        textAlign: "center",
                        color: "#6b7280"
                    }}
                >
                    Don't have an account?
                    {" "}

                    <span
                        style={{
                            color: "#2563eb",
                            cursor: "pointer",
                            fontWeight: 600
                        }}
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Create one
                    </span>

                </p>

            </div>

        </div>

    );
}