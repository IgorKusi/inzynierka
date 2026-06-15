import { useNavigate } from "react-router-dom";

export default function AdminPage() {

    const navigate =
        useNavigate();

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate("/login");
    };

    return (

        <div
            style={{
                padding: "30px"
            }}
        >

            <h1>
                AdGame Admin
            </h1>

            <p>
                Zalogowano jako administrator.
            </p>

            <hr />

            <h2>
                Panel administratora
            </h2>

            <ul>
                <li>
                    Zarządzanie użytkownikami
                    (w przyszłości)
                </li>

                <li>
                    Przegląd wszystkich reklam
                    (w przyszłości)
                </li>

                <li>
                    Statystyki globalne
                    (w przyszłości)
                </li>
            </ul>

            <button
                onClick={logout}
            >
                Logout
            </button>

        </div>
    );
}