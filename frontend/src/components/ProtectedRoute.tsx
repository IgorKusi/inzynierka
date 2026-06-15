import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
    role?: string;
};

export default function ProtectedRoute({
                                           children,
                                           role
                                       }: Props) {

    const token =
        localStorage.getItem("token");

    const userJson =
        localStorage.getItem("user");

    if (!token || !userJson) {
        return <Navigate to="/login" />;
    }

    const user =
        JSON.parse(userJson);

    if (
        role &&
        user.role !== role
    ) {

        if (
            user.role === "ADMIN"
        ) {
            return (
                <Navigate
                    to="/admin"
                />
            );
        }

        return (
            <Navigate
                to="/advertiser"
            />
        );
    }

    return children;
}