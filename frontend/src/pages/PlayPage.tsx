import { useSearchParams } from "react-router-dom";
import UnityContainer from "../components/UnityContainer";

export default function PlayPage() {

    const [searchParams] =
        useSearchParams();

    const advertisementId =
        searchParams.get("ad");

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

            <UnityContainer />

        </div>
    );
}