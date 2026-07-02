import { useNavigate } from "react-router-dom";

export default function HomePage() {

    const navigate = useNavigate();

    return (

        <div className="page">

            <div className="card">

                <h1 className="title">
                    AdGame
                </h1>

                <p className="subtitle">
                    Interactive advertising platform powered by Unity.
                    <br />
                    Create playable advertisements and reward players
                    with personalized discount coupons.
                </p>

                <div className="section">

                    <button
                        className="button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                </div>

                <div className="section">

                    <button
                        className="button"
                        onClick={() => navigate("/register")}
                    >
                        Create account
                    </button>

                </div>

                <p
                    style={{
                        textAlign: "center",
                        marginTop: 20,
                        color: "#888",
                        fontSize: 14
                    }}
                >
                    React • Unity • Node.js • PostgreSQL
                </p>

            </div>

        </div>

    );
}