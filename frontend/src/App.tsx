import { useState } from "react";

import { uploadImage } from "./api/uploadApi";
import { createAdvertisement } from "./api/createAdvertisement";

function App() {

  const [brandName, setBrandName] =
      useState("");

  const [logoFile, setLogoFile] =
      useState<File | null>(null);

  const [bannerFile, setBannerFile] =
      useState<File | null>(null);

  const [qrCode, setQrCode] =
      useState("");

  const [gameUrl, setGameUrl] =
      useState("");

  const [loading, setLoading] =
      useState(false);

  async function handleCreateAdvertisement()
  {
    if (!logoFile || !bannerFile)
    {
      alert(
          "Select logo and banner"
      );

      return;
    }

    try
    {
      setLoading(true);

      const logoPath =
          await uploadImage(
              logoFile
          );

      const bannerPath =
          await uploadImage(
              bannerFile
          );

      const result =
          await createAdvertisement(
              brandName,
              logoPath,
              bannerPath
          );

      setQrCode(
          result.qrCode
      );

      setGameUrl(
          result.advertisement.qrCodeUrl
      );

      alert(
          "Advertisement created"
      );
    }
    catch (error)
    {
      console.error(error);

      alert(
          "Operation failed"
      );
    }
    finally
    {
      setLoading(false);
    }
  }

  return (
      <div
          style={{
            padding: "40px",
            fontFamily: "Arial"
          }}
      >
        <h1>
          AdGame Admin
        </h1>

        <div>
          <p>
            Brand name
          </p>

          <input
              value={brandName}
              onChange={(e) =>
                  setBrandName(
                      e.target.value
                  )
              }
          />
        </div>

        <br />

        <div>
          <p>
            Logo
          </p>

          <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                  setLogoFile(
                      e.target.files?.[0]
                      ?? null
                  )
              }
          />
        </div>

        <br />

        <div>
          <p>
            Banner
          </p>

          <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                  setBannerFile(
                      e.target.files?.[0]
                      ?? null
                  )
              }
          />
        </div>

        <br />

        <button
            onClick={
              handleCreateAdvertisement
            }
            disabled={loading}
        >
          {
            loading
                ? "Creating..."
                : "Create Advertisement"
          }
        </button>

        {
            qrCode &&
            (
                <>
                  <hr />

                  <h2>
                    QR Code
                  </h2>

                  <img
                      src={qrCode}
                      alt="QR Code"
                      width={250}
                  />

                  <p>
                    {gameUrl}
                  </p>
                </>
            )
        }
      </div>
  );
}

export default App;