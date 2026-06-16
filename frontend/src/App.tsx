import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import PlayPage
    from "./pages/PlayPage";

import LoginPage
    from "./pages/LoginPage";

import RegisterPage
    from "./pages/RegisterPage";

import AdvertiserPage
    from "./pages/AdvertiserPage.tsx";

import AdminPage
    from "./pages/AdminPage";

import ProtectedRoute
    from "./components/ProtectedRoute";

import HomePage
    from "./pages/HomePage";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="/play"
                    element={<PlayPage />}
                />

                <Route
                    path="/advertiser"
                    element={
                        <ProtectedRoute
                            role="ADVERTISER"
                        >
                            <AdvertiserPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute
                            role="ADMIN"
                        >
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;