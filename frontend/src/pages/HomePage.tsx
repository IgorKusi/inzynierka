import { useNavigate } from "react-router-dom";

export default function HomePage() {

    const navigate = useNavigate();

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px"
            }}
        >

            <h1>
                AdGame System
            </h1>

            <button
                onClick={() =>
                    navigate("/login")
                }
            >
                Login
            </button>

            <button
                onClick={() =>
                    navigate("/register")
                }
            >
                Register
            </button>

        </div>
    );
}