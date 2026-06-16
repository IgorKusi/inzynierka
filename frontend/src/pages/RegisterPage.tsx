import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

export default function RegisterPage() {

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const register =
        async () => {

            const response =
                await fetch(
                    "http://localhost:3000/users/register",
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

                alert(
                    error.error
                );
            }
        };

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px"
            }}
        >

            <h1>
                Register
            </h1>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(
                        e.target.value
                    )
                }
            />

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

            <button
                onClick={register}
            >
                Register
            </button>

        </div>
    );
}