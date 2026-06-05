import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PlayPage() {

    const [searchParams] =
        useSearchParams();

    const advertisementId =
        searchParams.get("ad");

    useEffect(() => {

        if (advertisementId) {

            localStorage.setItem(
                "advertisementId",
                advertisementId
            );

            console.log(
                "Advertisement ID saved:",
                advertisementId
            );
        }

    }, [advertisementId]);

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0f172a",
                color: "white"
            }}
        >

            <h1>AdGame</h1>

            <h2>
                Advertisement ID:
                {" "}
                {advertisementId}
            </h2>

            <p>
                Unity game will be here
            </p>

        </div>
    );
}