import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER_URL =
    "http://localhost:3000";

type Advertisement = {

    id: number;

    brandName: string;

    logoPath: string;

    bannerPath: string;

    qrCodeUrl: string | null;

    launchCount?: number;
};

type AdvertisementStats = {

    advertisementId: number;

    launchCount: number;

    totalCoupons: number;

    usedCoupons: number;

    unusedCoupons: number;

    conversionRate: number;
};

export default function AdvertiserPortal() {

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


    const loadStats =
        async (
            advertisementId: number
        ) => {

            try {

                const response =
                    await fetch(
                        `${SERVER_URL}/advertisements/${advertisementId}/stats`
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

    const loadAdvertisements =
        async () => {

            try {

                const response =
                    await fetch(
                        `${SERVER_URL}/advertisements/my`,
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

                for (
                    const advertisement
                    of data
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
            "/login"
        );
    };

    const deleteAdvertisement =
        async (
            id: number
        ) => {

            try {

                await fetch(
                    `${SERVER_URL}/advertisements/${id}`,
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

        <div
            style={{
                padding: "30px"
            }}
        >

            <h1>
                Advertiser Dashboard
            </h1>

            <button
                onClick={logout}
            >
                Logout
            </button>

            <hr />

            <h2>
                Moje reklamy
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
                                ID:
                                {" "}
                                {
                                    advertisement.id
                                }
                            </p>

                            <img
                                src={
                                    SERVER_URL +
                                    advertisement.logoPath
                                }
                                alt="Logo"
                                width="120"
                            />

                            <br />
                            <br />

                            <img
                                src={
                                    SERVER_URL +
                                    advertisement.bannerPath
                                }
                                alt="Banner"
                                width="300"
                            />

                            <p>

                                QR:

                                {" "}

                                {
                                    advertisement.qrCodeUrl
                                }

                            </p>

                            <hr />

                            <h4>
                                Statistics
                            </h4>

                            <p>
                                Launches:
                                {" "}
                                {
                                    stats[
                                        advertisement.id
                                        ]?.launchCount ?? 0
                                }
                            </p>

                            <p>
                                Generated coupons:
                                {" "}
                                {
                                    stats[
                                        advertisement.id
                                        ]?.totalCoupons ?? 0
                                }
                            </p>

                            <p>
                                Used coupons:
                                {" "}
                                {
                                    stats[
                                        advertisement.id
                                        ]?.usedCoupons ?? 0
                                }
                            </p>

                            <p>
                                Unused coupons:
                                {" "}
                                {
                                    stats[
                                        advertisement.id
                                        ]?.unusedCoupons ?? 0
                                }
                            </p>

                            <p>
                                Conversion:
                                {" "}
                                {
                                    stats[
                                        advertisement.id
                                        ]?.conversionRate ?? 0
                                }
                                %
                            </p>

                            <button
                                onClick={() =>
                                    navigator
                                        .clipboard
                                        .writeText(
                                            advertisement.qrCodeUrl ??
                                            ""
                                        )
                                }
                            >
                                Copy QR Link
                            </button>

                            {" "}

                            <button
                                onClick={() =>
                                    deleteAdvertisement(
                                        advertisement.id
                                    )
                                }
                            >
                                Delete
                            </button>

                        </div>
                    )
                )
            }

        </div>
    );
}