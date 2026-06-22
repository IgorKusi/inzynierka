import { useEffect, useRef } from "react";

declare global {
    interface Window {
        createUnityInstance: any;
    }
}

function UnityContainer() {

    const canvasRef =
        useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        const script =
            document.createElement(
                "script"
            );

        script.src =
            "/unity/Build/unity.loader.js";

        script.onload = () => {

            if (
                !canvasRef.current
            ) {
                return;
            }

            window.createUnityInstance(
                canvasRef.current,
                {
                    dataUrl:
                        "/unity/Build/unity.data",

                    frameworkUrl:
                        "/unity/Build/unity.framework.js",

                    codeUrl:
                        "/unity/Build/unity.wasm",

                    streamingAssetsUrl:
                        "StreamingAssets",

                    companyName:
                        "AdGame",

                    productName:
                        "AdGame",

                    productVersion:
                        "1.0"
                }
            )
                .then(() => {

                    console.log(
                        "Unity loaded"
                    );

                })
                .catch(
                    (error: any) => {

                        console.error(
                            error
                        );

                    }
                );
        };

        document.body.appendChild(
            script
        );

    }, []);

    return (

        <div
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden"
            }}
        >

            <canvas
                ref={canvasRef}
                id="unity-canvas"
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block"
                }}
            />

        </div>
    );
}

export default UnityContainer;