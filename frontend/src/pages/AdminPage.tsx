import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Advertisement } from "../types/Advertisement";
const SERVER_URL =
    "http://localhost:3000";

type AdminStats = {

    users: number;

    advertisers: number;

    advertisements: number;

    couponsGenerated: number;

    couponsUsed: number;
};

type User = {

    id: number;

    email: string;

    role: string;

    createdAt: string;
};

export default function AdminPage() {

    const navigate =
        useNavigate();

    const [stats, setStats] =
        useState<AdminStats | null>(
            null
        );

    const [users, setUsers] =
        useState<User[]>([]);

    const [advertisements,
        setAdvertisements] =
        useState<Advertisement[]>([]);

    const token =
        localStorage.getItem(
            "token"
        );

    const loadStats =
        async () => {

            const response =
                await fetch(
                    `${SERVER_URL}/admin/stats`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const data =
                await response.json();

            setStats(data);
        };

    const loadUsers =
        async () => {

            const response =
                await fetch(
                    `${SERVER_URL}/admin/users`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const data =
                await response.json();

            setUsers(data);
        };

    const loadAdvertisements =
        async () => {

            const response =
                await fetch(
                    `${SERVER_URL}/admin/advertisements`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const data =
                await response.json();

            setAdvertisements(
                data
            );
        };

    useEffect(() => {

        loadStats();
        loadUsers();
        loadAdvertisements();

    }, []);

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate("/");
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (

        <div
            style={{
                padding: "30px"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems:
                        "center"
                }}
            >

                <h1>
                    Admin Panel
                </h1>

                <button
                    onClick={
                        logout
                    }
                >
                    Logout
                </button>

            </div>

            <hr />

            <h2>
                System Statistics
            </h2>

            {
                stats &&
                (
                    <div>

                        <p>
                            Users:
                            {" "}
                            {stats.users}
                        </p>

                        <p>
                            Advertisers:
                            {" "}
                            {stats.advertisers}
                        </p>

                        <p>
                            Advertisements:
                            {" "}
                            {stats.advertisements}
                        </p>

                        <p>
                            Coupons generated:
                            {" "}
                            {stats.couponsGenerated}
                        </p>

                        <p>
                            Coupons used:
                            {" "}
                            {stats.couponsUsed}
                        </p>

                    </div>
                )
            }

            <hr />

            <h2>
                Users
            </h2>

            {
                users.map(
                    user => (

                        <div
                            key={user.id}
                            style={{
                                border:
                                    "1px solid white",
                                padding:
                                    "15px",
                                marginBottom:
                                    "10px"
                            }}
                        >

                            <p>
                                <strong>
                                    {user.email}
                                </strong>
                            </p>

                            <p>
                                Role:
                                {" "}
                                {user.role}
                            </p>

                            <p>
                                Created:
                                {" "}
                                {
                                    new Date(
                                        user.createdAt
                                    )
                                        .toLocaleString()
                                }
                            </p>

                        </div>
                    )
                )
            }

            <hr />

            <h2>
                Advertisements
            </h2>

            {
                advertisements.map(
                    advertisement => (

                        <div
                            key={
                                advertisement.id
                            }
                            style={{
                                border:
                                    "1px solid white",
                                padding:
                                    "20px",
                                marginBottom:
                                    "20px"
                            }}
                        >

                            <h3>
                                {
                                    advertisement.brandName
                                }
                            </h3>

                            <p>
                                Advertisement ID:
                                {" "}
                                {
                                    advertisement.id
                                }
                            </p>

                            <p>
                                Owner:
                                {" "}
                                {
                                    advertisement.user
                                        ?.email
                                    ??
                                    "No owner"
                                }
                            </p>

                            <p>
                                Launches:
                                {" "}
                                {
                                    advertisement.launchCount ?? 0
                                }
                            </p>

                            <p>
                                Coupons:
                                {" "}
                                {
                                    advertisement.coupons.length ?? 0
                                }
                            </p>

                            <p>
                                Used coupons:
                                {" "}
                                {
                                    advertisement.coupons.filter(
                                        coupon =>
                                            coupon.isUsed
                                    ).length ?? 0
                                }
                            </p>

                            <img
                                src={
                                    SERVER_URL +
                                    advertisement.logoPath
                                }
                                alt="logo"
                                style={{
                                    width:
                                        "120px"
                                }}
                            />

                            <br />

                            <img
                                src={
                                    SERVER_URL +
                                    advertisement.bannerPath
                                }
                                alt="banner"
                                style={{
                                    width:
                                        "300px"
                                }}
                            />

                        </div>
                    )
                )
            }

        </div>
    );
}