using System.Collections;
using System.IO;
using TMPro;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

public class VoucherGenerator : MonoBehaviour
{
    public static VoucherGenerator Instance;

    [Header("Rendering")]
    [SerializeField] private Camera voucherCamera;
    [SerializeField] private RenderTexture renderTexture;
    [SerializeField] private Canvas voucherCanvas;

    [Header("UI")]
    [SerializeField] private RawImage logo;
    [SerializeField] private RawImage banner;
    [SerializeField] private RawImage qr;

    [SerializeField] private TMP_Text brand;
    [SerializeField] private TMP_Text coupon;

    [Header("Backend")]
    [SerializeField]
    private string uploadUrl =
        "https://inzynierka-backend-5h4t.onrender.com/voucher/upload";

    private void Awake()
    {
        Instance = this;
        voucherCanvas.gameObject.SetActive(false);
    }

    public void GenerateVoucher()
    {
        StartCoroutine(
            GenerateVoucherCoroutine()
        );
    }

    private IEnumerator GenerateVoucherCoroutine()
    {
        //---------------------------------
        // Uzupełnij dane na voucherze
        //---------------------------------

        PrepareVoucher();

        //---------------------------------

        voucherCanvas.gameObject.SetActive(true);

        yield return null;
        yield return new WaitForEndOfFrame();

        //---------------------------------

        byte[] png = RenderVoucher();

        //---------------------------------

        voucherCanvas.gameObject.SetActive(false);

        //---------------------------------

        yield return UploadVoucher(png);

#if !UNITY_WEBGL || UNITY_EDITOR

        SaveLocalVoucher(png);

#endif
    }

    private void PrepareVoucher()
    {
        logo.texture =
            AdvertisementManager.Instance.LogoTexture;

        banner.texture =
            AdvertisementManager.Instance.BannerTexture;

        qr.texture =
            CouponManager.Instance.CurrentQrTexture;

        brand.text =
            AdvertisementManager.Instance
                .CurrentAdvertisement
                .brandName;

        coupon.text =
            CouponManager.Instance
                .CurrentCoupon;
    }

    private byte[] RenderVoucher()
    {
        voucherCamera.Render();

        RenderTexture.active = renderTexture;

        Texture2D texture =
            new Texture2D(
                renderTexture.width,
                renderTexture.height,
                TextureFormat.RGBA32,
                false
            );

        texture.ReadPixels(
            new Rect(
                0,
                0,
                renderTexture.width,
                renderTexture.height
            ),
            0,
            0
        );

        texture.Apply();

        RenderTexture.active = null;

        byte[] png =
            texture.EncodeToPNG();

        Destroy(texture);

        return png;
    }

    private IEnumerator UploadVoucher(byte[] png)
    {
        WWWForm form = new WWWForm();

        form.AddBinaryData(
            "voucher",
            png,
            $"{coupon.text}.png",
            "image/png"
        );

        using UnityWebRequest request =
            UnityWebRequest.Post(
                uploadUrl,
                form
            );

        yield return request.SendWebRequest();

        if (
            request.result ==
            UnityWebRequest.Result.Success
        )
        {
            Debug.Log(
                request.downloadHandler.text
            );

#if UNITY_WEBGL && !UNITY_EDITOR

            VoucherUploadResponse response =
                JsonUtility.FromJson<VoucherUploadResponse>(
                    request.downloadHandler.text
                );

            string url =
                "https://inzynierka-backend-5h4t.onrender.com/vouchers/" +
                response.fileName;

            Application.OpenURL(url);

#endif
        }
        else
        {
            Debug.LogError(
                request.error
            );
        }
    }

    private void SaveLocalVoucher(byte[] png)
    {
        string path =
            Path.Combine(
                Application.persistentDataPath,
                $"Voucher_{coupon.text}.png"
            );

        File.WriteAllBytes(
            path,
            png
        );

        Debug.Log(
            $"Voucher zapisany:\n{path}"
        );
    }

    [System.Serializable]
    private class VoucherUploadResponse
    {
        public string fileName;
    }
}