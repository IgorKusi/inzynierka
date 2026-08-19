import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Advertisement }
    from "../types/Advertisement";

import { API_URL }
    from "../config";


type AdminStats = {

    users: number;

    advertisers: number;

    advertisements: number;

    launches: number;

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


    const [
        advertisements,
        setAdvertisements
    ] =
        useState<Advertisement[]>([]);


    const [loading, setLoading] =
        useState(true);


    const token =
        localStorage.getItem(
            "token"
        );


    const loadStats =
        async () => {

            const response =
                await fetch(
                    `${API_URL}/admin/stats`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            if (!response.ok) {
                throw new Error(
                    "Failed to load statistics"
                );
            }

            const data =
                await response.json();

            setStats(data);
        };


    const loadUsers =
        async () => {

            const response =
                await fetch(
                    `${API_URL}/admin/users`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            if (!response.ok) {
                throw new Error(
                    "Failed to load users"
                );
            }

            const data =
                await response.json();

            setUsers(data);
        };


    const loadAdvertisements =
        async () => {

            const response =
                await fetch(
                    `${API_URL}/admin/advertisements`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            if (!response.ok) {
                throw new Error(
                    "Failed to load advertisements"
                );
            }

            const data =
                await response.json();

            setAdvertisements(data);
        };


    const loadData =
        async () => {

            try {

                setLoading(true);

                await Promise.all([
                    loadStats(),
                    loadUsers(),
                    loadAdvertisements()
                ]);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);
            }
        };


    useEffect(() => {

        loadData();

    }, []);


    const deleteAdvertisement =
        async (
            id: number,
            brandName: string
        ) => {

            const confirmed =
                window.confirm(
                    `Are you sure you want to delete the advertisement "${brandName}"?`
                );

            if (!confirmed) {
                return;
            }


            try {

                const response =
                    await fetch(
                        `${API_URL}/admin/advertisements/${id}`,
                        {
                            method: "DELETE",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );


                if (!response.ok) {

                    const data =
                        await response.json();

                    throw new Error(
                        data.error ||
                        "Delete failed"
                    );
                }


                await loadData();

            } catch (error) {

                console.error(error);

                alert(
                    "Failed to delete advertisement."
                );
            }
        };


    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate("/");
    };


    if (loading) {

        return (

            <div
                style={{
                    minHeight: "100vh",
                    background:
                        "#111111",
                    color: "white",
                    padding: "40px",
                    fontFamily:
                        "Arial, sans-serif"
                }}
            >

                <h1>
                    Admin Panel
                </h1>

                <p>
                    Loading...
                </p>

            </div>
        );
    }


    return (

        <div
            style={{
                minHeight: "100vh",
                background:
                    "#111111",
                color: "white",
                padding:
                    "40px",
                fontFamily:
                    "Arial, sans-serif"
            }}
        >

            <div
                style={{
                    maxWidth:
                        "1200px",
                    margin:
                        "0 auto"
                }}
            >

                {/* HEADER */}

                <div
                    style={{
                        display:
                            "flex",
                        justifyContent:
                            "space-between",
                        alignItems:
                            "center",
                        marginBottom:
                            "30px"
                    }}
                >

                    <div>

                        <h1
                            style={{
                                margin:
                                    0,
                                fontSize:
                                    "32px"
                            }}
                        >
                            Admin Panel
                        </h1>

                        <p
                            style={{
                                color:
                                    "#999",
                                marginTop:
                                    "8px"
                            }}
                        >
                            System management
                            and monitoring
                        </p>

                    </div>


                    <button
                        onClick={
                            logout
                        }
                        style={{
                            background:
                                "#222",
                            color:
                                "white",
                            border:
                                "1px solid #444",
                            borderRadius:
                                "8px",
                            padding:
                                "10px 18px",
                            cursor:
                                "pointer"
                        }}
                    >
                        Logout
                    </button>

                </div>


                {/* STATISTICS */}

                <section>

                    <h2>
                        System Statistics
                    </h2>


                    <div
                        style={{
                            display:
                                "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(170px, 1fr))",
                            gap:
                                "15px",
                            marginTop:
                                "20px"
                        }}
                    >

                        <StatCard
                            title="Users"
                            value={
                                stats?.users
                                ?? 0
                            }
                        />

                        <StatCard
                            title="Advertisers"
                            value={
                                stats?.advertisers
                                ?? 0
                            }
                        />

                        <StatCard
                            title="Advertisements"
                            value={
                                stats?.advertisements
                                ?? 0
                            }
                        />

                        <StatCard
                            title="Game Launches"
                            value={
                                stats?.launches
                                ?? 0
                            }
                        />

                        <StatCard
                            title="Coupons Generated"
                            value={
                                stats?.couponsGenerated
                                ?? 0
                            }
                        />

                        <StatCard
                            title="Coupons Used"
                            value={
                                stats?.couponsUsed
                                ?? 0
                            }
                        />

                    </div>

                </section>


                <hr
                    style={{
                        border:
                            "none",
                        borderTop:
                            "1px solid #333",
                        margin:
                            "40px 0"
                    }}
                />


                {/* USERS */}

                <section>

                    <h2>
                        Users
                    </h2>


                    <div
                        style={{
                            overflowX:
                                "auto",
                            marginTop:
                                "20px"
                        }}
                    >

                        <table
                            style={{
                                width:
                                    "100%",
                                borderCollapse:
                                    "collapse",
                                background:
                                    "#181818",
                                borderRadius:
                                    "10px",
                                overflow:
                                    "hidden"
                            }}
                        >

                            <thead>

                            <tr
                                style={{
                                    background:
                                        "#222"
                                }}
                            >

                                <th
                                    style={tableHeader}
                                >
                                    ID
                                </th>

                                <th
                                    style={tableHeader}
                                >
                                    E-mail
                                </th>

                                <th
                                    style={tableHeader}
                                >
                                    Role
                                </th>

                                <th
                                    style={tableHeader}
                                >
                                    Created
                                </th>

                            </tr>

                            </thead>


                            <tbody>

                            {
                                users.map(
                                    user => (

                                        <tr
                                            key={
                                                user.id
                                            }
                                            style={{
                                                borderTop:
                                                    "1px solid #333"
                                            }}
                                        >

                                            <td
                                                style={tableCell}
                                            >
                                                {
                                                    user.id
                                                }
                                            </td>

                                            <td
                                                style={tableCell}
                                            >
                                                {
                                                    user.email
                                                }
                                            </td>

                                            <td
                                                style={tableCell}
                                            >

                                                    <span
                                                        style={{
                                                            display:
                                                                "inline-block",
                                                            padding:
                                                                "5px 10px",
                                                            borderRadius:
                                                                "20px",
                                                            background:
                                                                user.role ===
                                                                "ADMIN"
                                                                    ? "#3b2f63"
                                                                    : "#263d32",
                                                            fontSize:
                                                                "12px"
                                                        }}
                                                    >
                                                        {
                                                            user.role
                                                        }
                                                    </span>

                                            </td>

                                            <td
                                                style={tableCell}
                                            >
                                                {
                                                    new Date(
                                                        user.createdAt
                                                    )
                                                        .toLocaleString()
                                                }
                                            </td>

                                        </tr>

                                    )
                                )
                            }

                            </tbody>

                        </table>

                    </div>

                </section>


                <hr
                    style={{
                        border:
                            "none",
                        borderTop:
                            "1px solid #333",
                        margin:
                            "40px 0"
                    }}
                />


                {/* ADVERTISEMENTS */}

                <section>

                    <div
                        style={{
                            display:
                                "flex",
                            justifyContent:
                                "space-between",
                            alignItems:
                                "center",
                            marginBottom:
                                "20px"
                        }}
                    >

                        <h2>
                            Advertisements
                        </h2>

                        <span
                            style={{
                                color:
                                    "#999"
                            }}
                        >
                            {
                                advertisements.length
                            } campaigns
                        </span>

                    </div>


                    <div
                        style={{
                            display:
                                "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(350px, 1fr))",
                            gap:
                                "20px"
                        }}
                    >

                        {
                            advertisements.map(
                                advertisement => {

                                    const coupons =
                                        advertisement.coupons
                                        ?? [];

                                    const usedCoupons =
                                        coupons.filter(
                                            coupon =>
                                                coupon.isUsed
                                        ).length;


                                    return (

                                        <div
                                            key={
                                                advertisement.id
                                            }
                                            style={{
                                                background:
                                                    "#181818",
                                                border:
                                                    "1px solid #333",
                                                borderRadius:
                                                    "12px",
                                                padding:
                                                    "20px"
                                            }}
                                        >

                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems:
                                                        "flex-start"
                                                }}
                                            >

                                                <div>

                                                    <h3
                                                        style={{
                                                            marginTop:
                                                                0,
                                                            marginBottom:
                                                                "6px"
                                                        }}
                                                    >
                                                        {
                                                            advertisement.brandName
                                                        }
                                                    </h3>

                                                    <p
                                                        style={{
                                                            color:
                                                                "#999",
                                                            fontSize:
                                                                "13px",
                                                            margin:
                                                                0
                                                        }}
                                                    >
                                                        ID:
                                                        {" "}
                                                        {
                                                            advertisement.id
                                                        }
                                                    </p>

                                                </div>

                                            </div>


                                            <div
                                                style={{
                                                    marginTop:
                                                        "18px"
                                                }}
                                            >

                                                <p>
                                                    <strong>
                                                        Owner:
                                                    </strong>
                                                    {" "}
                                                    {
                                                        advertisement
                                                            .user
                                                            ?.email
                                                        ??
                                                        "No owner"
                                                    }
                                                </p>


                                                <div
                                                    style={{
                                                        display:
                                                            "grid",
                                                        gridTemplateColumns:
                                                            "repeat(3, 1fr)",
                                                        gap:
                                                            "8px",
                                                        marginTop:
                                                            "15px"
                                                    }}
                                                >

                                                    <Metric
                                                        label="Launches"
                                                        value={
                                                            advertisement
                                                                .launchCount
                                                            ??
                                                            0
                                                        }
                                                    />

                                                    <Metric
                                                        label="Generated"
                                                        value={
                                                            coupons.length
                                                        }
                                                    />

                                                    <Metric
                                                        label="Used"
                                                        value={
                                                            usedCoupons
                                                        }
                                                    />

                                                </div>

                                            </div>


                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    gap:
                                                        "15px",
                                                    alignItems:
                                                        "center",
                                                    marginTop:
                                                        "20px"
                                                }}
                                            >

                                                <img
                                                    src={
                                                        API_URL +
                                                        advertisement.logoPath
                                                    }
                                                    alt="logo"
                                                    style={{
                                                        width:
                                                            "80px",
                                                        height:
                                                            "80px",
                                                        objectFit:
                                                            "contain",
                                                        background:
                                                            "#222",
                                                        borderRadius:
                                                            "8px",
                                                        padding:
                                                            "5px"
                                                    }}
                                                />


                                                <img
                                                    src={
                                                        API_URL +
                                                        advertisement.bannerPath
                                                    }
                                                    alt="banner"
                                                    style={{
                                                        width:
                                                            "200px",
                                                        height:
                                                            "80px",
                                                        objectFit:
                                                            "cover",
                                                        borderRadius:
                                                            "8px"
                                                    }}
                                                />

                                            </div>


                                            <button
                                                onClick={() =>
                                                    deleteAdvertisement(
                                                        advertisement.id,
                                                        advertisement.brandName
                                                    )
                                                }
                                                style={{
                                                    width:
                                                        "100%",
                                                    marginTop:
                                                        "20px",
                                                    padding:
                                                        "11px",
                                                    background:
                                                        "#8b2e2e",
                                                    color:
                                                        "white",
                                                    border:
                                                        "none",
                                                    borderRadius:
                                                        "8px",
                                                    cursor:
                                                        "pointer"
                                                }}
                                            >
                                                Delete Advertisement
                                            </button>

                                        </div>

                                    );
                                }
                            )
                        }

                    </div>

                </section>

            </div>

        </div>
    );
}


/* ----------------------------- */
/* Reusable components */
/* ----------------------------- */

type StatCardProps = {

    title: string;

    value: number;
};


function StatCard({
                      title,
                      value
                  }: StatCardProps) {

    return (

        <div
            style={{
                background:
                    "#181818",
                border:
                    "1px solid #333",
                borderRadius:
                    "12px",
                padding:
                    "20px"
            }}
        >

            <p
                style={{
                    margin:
                        0,
                    color:
                        "#999",
                    fontSize:
                        "14px"
                }}
            >
                {
                    title
                }
            </p>

            <p
                style={{
                    margin:
                        "10px 0 0",
                    fontSize:
                        "28px",
                    fontWeight:
                        "bold"
                }}
            >
                {
                    value
                }
            </p>

        </div>
    );
}


type MetricProps = {

    label: string;

    value: number;
};


function Metric({
                    label,
                    value
                }: MetricProps) {

    return (

        <div
            style={{
                background:
                    "#222",
                borderRadius:
                    "8px",
                padding:
                    "10px"
            }}
        >

            <div
                style={{
                    color:
                        "#888",
                    fontSize:
                        "11px"
                }}
            >
                {
                    label
                }
            </div>

            <div
                style={{
                    marginTop:
                        "4px",
                    fontSize:
                        "18px",
                    fontWeight:
                        "bold"
                }}
            >
                {
                    value
                }
            </div>

        </div>
    );
}


const tableHeader = {

    textAlign:
        "left" as const,

    padding:
        "14px",

    fontSize:
        "13px",

    color:
        "#aaa"
};


const tableCell = {

    padding:
        "14px",

    fontSize:
        "14px"
};