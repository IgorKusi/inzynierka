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
                        "/unity/Build/unity.data.br",

                    frameworkUrl:
                        "/unity/Build/unity.framework.js.br",

                    codeUrl:
                        "/unity/Build/unity.wasm.br",

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
                    border:
                        "2px solid white"
                }}
            />

        </div>
    );
}

export default UnityContainer;