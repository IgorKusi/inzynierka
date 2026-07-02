import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const register = async () => {

        setError("");

        const response =
            await fetch(
                `${API_URL}/users/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password,
                        role: "ADVERTISER"
                    })
                }
            );

        if (response.ok) {

            navigate("/login");

        } else {

            const error =
                await response.json();

            setError(error.error);
        }
    };

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
                    ← Home
                </div>

                <h1 className="title">
                    Create account
                </h1>

                <p className="subtitle">
                    Create an advertiser account and start building interactive campaigns.
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
                    onClick={register}
                >
                    Create account
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
                    Already have an account?
                    {" "}

                    <span
                        style={{
                            color: "#2563eb",
                            cursor: "pointer",
                            fontWeight: 600
                        }}
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login
                    </span>

                </p>

            </div>

        </div>

    );
}