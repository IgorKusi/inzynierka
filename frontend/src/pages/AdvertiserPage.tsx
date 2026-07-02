import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Advertisement } from "../types/Advertisement.ts";

import { API_URL }
    from "../config";

type AdvertisementStats = {

    advertisementId: number;

    launchCount: number;

    totalCoupons: number;

    usedCoupons: number;

    unusedCoupons: number;

    conversionRate: number;
};

export default function AdvertiserPage() {

    const navigate =
        useNavigate();

    const [advertisements,
        setAdvertisements] =
        useState<Advertisement[]>([]);

    const [stats,
        setStats] =
        useState<
            Record<number,
                AdvertisementStats>
        >({});

    const [brandName, setBrandName] =
        useState("");

    const [logoFile, setLogoFile] =
        useState<File | null>(null);

    const [bannerFile, setBannerFile] =
        useState<File | null>(null);

    const loadStats =
        async (
            advertisementId: number
        ) => {

            try {

                const response =
                    await fetch(
                        `${API_URL}/advertisements/${advertisementId}/stats`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                const data =
                    await response.json();

                setStats(
                    previous => ({
                        ...previous,

                        [advertisementId]:
                        data
                    })
                );

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    const token =
        localStorage.getItem(
            "token"
        );

    const uploadImage = async (
        file: File
    ) => {

        const formData =
            new FormData();

        formData.append(
            "image",
            file
        );

        const response =
            await fetch(
                `${API_URL}/upload`,
                {
                    method: "POST",
                    body: formData
                }
            );

        return response.json();
    };

    const createAdvertisement =
        async () => {

            if (
                !brandName ||
                !logoFile ||
                !bannerFile
            ) {

                alert(
                    "Uzupełnij wszystkie pola"
                );

                return;
            }

            try {

                const logo =
                    await uploadImage(
                        logoFile
                    );

                const banner =
                    await uploadImage(
                        bannerFile
                    );

                const response =
                    await fetch(
                        `${API_URL}/advertisements`,
                        {
                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${token}`
                            },

                            body: JSON.stringify({

                                brandName,

                                logoPath:
                                logo.filePath,

                                bannerPath:
                                banner.filePath
                            })
                        }
                    );

                if (!response.ok) {

                    throw new Error(
                        "Create failed"
                    );
                }

                setBrandName("");

                setLogoFile(null);

                setBannerFile(null);

                loadAdvertisements();

            } catch (error) {

                console.error(
                    error
                );
            }
        };


    const downloadQr =
        (
            qrCode: string,
            brandName: string
        ) => {

            const link =
                document.createElement(
                    "a"
                );

            link.href =
                qrCode;

            link.download =
                `${brandName}-qr.png`;

            link.click();
        };

    const loadAdvertisements =
        async () => {

            try {

                const response =
                    await fetch(
                        `${API_URL}/advertisements/my`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                const data =
                    await response.json();

                const advertisementsWithQr =
                    await Promise.all(

                        data.map(
                            async (
                                advertisement: Advertisement
                            ) => {

                                try {

                                    const qrResponse =
                                        await fetch(
                                            `${API_URL}/advertisements/${advertisement.id}/qr`
                                        );

                                    const qrData =
                                        await qrResponse.json();

                                    return {

                                        ...advertisement,

                                        qrCode:
                                        qrData.qrCode
                                    };

                                } catch {

                                    return advertisement;
                                }
                            }
                        )
                    );

                setAdvertisements(
                    advertisementsWithQr
                );

                for (
                    const advertisement
                    of advertisementsWithQr
                    ) {

                    loadStats(
                        advertisement.id
                    );
                }

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    useEffect(() => {

        loadAdvertisements();

    }, []);

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate(
            "/"
        );
    };

    const deleteAdvertisement =
        async (
            id: number
        ) => {

            try {

                await fetch(
                    `${API_URL}/advertisements/${id}`,
                    {
                        method:
                            "DELETE",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                loadAdvertisements();

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    return (

        <div className="page">

            <div
                className="card"
                style={{
                    maxWidth: "1100px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                        marginBottom: "40px"
                    }}
                >

                    <div>

                        <h1
                            className="title"
                            style={{
                                marginBottom: "8px",
                                textAlign: "left"
                            }}
                        >
                            Advertiser Dashboard
                        </h1>

                        <p
                            style={{
                                color: "#6b7280"
                            }}
                        >
                            Manage your advertising campaigns.
                        </p>

                    </div>

                    <button
                        className="button"
                        style={{
                            width: "180px"
                        }}
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>
                <h2
                    style={{
                        marginBottom: "30px"
                    }}
                >
                    Create Advertisement
                </h2>

                <div className="section">

                    <label className="label">
                        Brand name
                    </label>

                    <input
                        className="input"
                        type="text"
                        placeholder="Brand name"
                        value={brandName}
                        onChange={(e) =>
                            setBrandName(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="section">

                    <label className="label">
                        Logo
                    </label>

                    <input
                        className="input"
                        type="file"
                        onChange={(e) =>
                            setLogoFile(
                                e.target.files?.[0] ?? null
                            )
                        }
                    />

                </div>

                <div className="section">

                    <label className="label">
                        Banner
                    </label>

                    <input
                        className="input"
                        type="file"
                        onChange={(e) =>
                            setBannerFile(
                                e.target.files?.[0] ?? null
                            )
                        }
                    />

                </div>

                <button
                    className="button"
                    onClick={createAdvertisement}
                >
                    Create Advertisement
                </button>

                <div
                    style={{
                        margin: "40px 0",
                        borderTop: "1px solid #e5e7eb"
                    }}
                />

                <h2
                    style={{
                        marginBottom: "24px"
                    }}
                >
                    Your Campaigns
                </h2>

            {
                advertisements.length === 0 &&
                (
                    <p>
                        Brak reklam.
                    </p>
                )
            }

                {
                    advertisements.map(advertisement => (

                        <div
                            key={advertisement.id}
                            style={{
                                background: "#1f2937",
                                borderRadius: "18px",
                                padding: "24px",
                                marginBottom: "30px",
                                boxShadow: "0 10px 25px rgba(0,0,0,0.25)"
                            }}
                        >

                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "30px",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between"
                                }}
                            >

                                <div
                                    style={{
                                        flex: "1",
                                        minWidth: "260px"
                                    }}
                                >

                                    <h2
                                        style={{
                                            color: "white",
                                            fontWeight: 600,
                                            marginTop: 0,
                                            marginBottom: "10px"
                                        }}
                                    >
                                        {advertisement.brandName}
                                    </h2>

                                    <p
                                        style={{
                                            color: "#cbd5e1"
                                        }}
                                    >
                                        <b>ID:</b> {advertisement.id}
                                    </p>

                                    <div
                                        style={{
                                            marginTop: "20px"
                                        }}
                                    >

                                        <p style={{
                                            color: "white",
                                            fontWeight: 600
                                        }}>
                                            <b>Logo</b>
                                        </p>

                                        <img
                                            src={
                                                API_URL +
                                                advertisement.logoPath
                                            }
                                            alt="Logo"
                                            style={{
                                                width: "130px",
                                                height: "90px",
                                                objectFit: "contain",
                                                borderRadius: "10px",
                                                background: "white",
                                                padding: "10px"
                                            }}
                                        />

                                    </div>

                                    <div
                                        style={{
                                            marginTop: "25px"
                                        }}
                                    >

                                        <p style={{
                                            color: "white",
                                            fontWeight: 600
                                        }}>
                                            <b>Banner</b>
                                        </p>

                                        <img
                                            src={
                                                API_URL +
                                                advertisement.bannerPath
                                            }
                                            alt="Banner"
                                            style={{
                                                width: "100%",
                                                maxWidth: "420px",
                                                borderRadius: "10px",
                                                boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
                                            }}
                                        />

                                    </div>

                                </div>

                                <div
                                    style={{
                                        width: "240px",
                                        textAlign: "center"
                                    }}
                                >

                                    <h3 style={{
                                        color: "white",
                                        fontWeight: 600
                                    }}>
                                        QR Code
                                    </h3>

                                    {
                                        advertisement.qrCode && (

                                            <img
                                                src={advertisement.qrCode}
                                                alt="QR Code"
                                                style={{
                                                    width: "200px",
                                                    borderRadius: "12px",
                                                    background: "white",
                                                    padding: "10px"
                                                }}
                                            />
                                        )
                                    }

                                    <p
                                        style={{
                                            wordBreak: "break-word",
                                            fontSize: "12px",
                                            color: "#94a3b8",
                                            marginTop: "12px"
                                        }}
                                    >
                                        {advertisement.qrCodeUrl}
                                    </p>

                                </div>

                            </div>

                            <hr
                                style={{
                                    margin: "30px 0"
                                }}
                            />

                            <h3>
                                Statistics
                            </h3>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(auto-fit, minmax(180px,1fr))",
                                    gap: "15px",
                                    marginBottom: "25px"
                                }}
                            >

                                <div
                                    style={{
                                        background: "#374151",
                                        borderRadius: "12px",
                                        padding: "18px",
                                        textAlign: "center",
                                        color: "white"
                                    }}
                                >

                                    <div
                                        style={{
                                            fontSize: "14px",
                                            color: "#cbd5e1"
                                        }}
                                    >
                                        Launches
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "28px",
                                            fontWeight: "bold",
                                            marginTop: "8px"
                                        }}
                                    >
                                        {stats[advertisement.id]?.launchCount ?? 0}
                                    </div>

                                </div>

                                <div
                                    style={{
                                        background: "#374151",
                                        borderRadius: "12px",
                                        padding: "18px",
                                        textAlign: "center",
                                        color: "white"
                                    }}
                                >

                                    <div
                                        style={{
                                            fontSize: "14px",
                                            color: "#cbd5e1"
                                        }}
                                    >
                                        Generated Coupons
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "28px",
                                            fontWeight: "bold",
                                            marginTop: "8px"
                                        }}
                                    >
                                        {stats[advertisement.id]?.totalCoupons ?? 0}
                                    </div>

                                </div>

                                <div
                                    style={{
                                        background: "#374151",
                                        borderRadius: "12px",
                                        padding: "18px",
                                        textAlign: "center",
                                        color: "white"
                                    }}
                                >

                                    <div
                                        style={{
                                            fontSize: "14px",
                                            color: "#cbd5e1"
                                        }}
                                    >
                                        Used Coupons
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "28px",
                                            fontWeight: "bold",
                                            marginTop: "8px"
                                        }}
                                    >
                                        {stats[advertisement.id]?.usedCoupons ?? 0}
                                    </div>

                                </div>

                                <div
                                    style={{
                                        background: "#374151",
                                        borderRadius: "12px",
                                        padding: "18px",
                                        textAlign: "center",
                                        color: "white"
                                    }}
                                >

                                    <div
                                        style={{
                                            fontSize: "14px",
                                            color: "#cbd5e1"
                                        }}
                                    >
                                        Unused Coupons
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "28px",
                                            fontWeight: "bold",
                                            marginTop: "8px"
                                        }}
                                    >
                                        {stats[advertisement.id]?.unusedCoupons ?? 0}
                                    </div>

                                </div>

                                <div
                                    style={{
                                        background: "#374151",
                                        borderRadius: "12px",
                                        padding: "18px",
                                        textAlign: "center",
                                        color: "white"
                                    }}
                                >

                                    <div
                                        style={{
                                            fontSize: "14px",
                                            color: "#cbd5e1"
                                        }}
                                    >
                                        Conversion Rate
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "28px",
                                            fontWeight: "bold",
                                            marginTop: "8px"
                                        }}
                                    >
                                        {stats[advertisement.id]?.conversionRate ?? 0}
                                    </div>

                                </div>

                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "15px",
                                    marginTop: "15px"
                                }}
                            >

                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            advertisement.qrCodeUrl ?? ""
                                        )
                                    }
                                >
                                    Copy QR Link
                                </button>

                                <button
                                    onClick={() =>
                                        downloadQr(
                                            advertisement.qrCode!,
                                            advertisement.brandName
                                        )
                                    }
                                >
                                    Download QR
                                </button>

                                <button
                                    onClick={() =>
                                        deleteAdvertisement(
                                            advertisement.id
                                        )
                                    }
                                    style={{
                                        background: "#dc2626",
                                        color: "white",
                                        marginLeft: "10px"
                                    }}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    );
}