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

import AdvertiserPortal
    from "./pages/AdvertiserPortal";

import AdminPage
    from "./pages/AdminPage";

import ProtectedRoute
    from "./components/ProtectedRoute";

function App() {

    return (
        <BrowserRouter>

            <Routes>

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
                            <AdvertiserPortal />
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