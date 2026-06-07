import { useEffect, useRef } from "react";

function UnityContainer() {

    const canvasRef =
        useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        console.log(
            "Unity container ready"
        );

    }, []);

    return (

        <div
            style={{
                width: "100%",
                maxWidth: "1200px",
                margin: "0 auto"
            }}
        >

            <canvas
                ref={canvasRef}
                id="unity-canvas"
                width={1200}
                height={700}
                style={{
                    width: "100%",
                    border: "2px solid white"
                }}
            />

        </div>
    );
}

export default UnityContainer;