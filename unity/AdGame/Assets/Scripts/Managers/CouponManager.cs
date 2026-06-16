using UnityEngine;
using System.Collections;
using UnityEngine.Networking;
using System;

public class CouponManager : MonoBehaviour
{
    public static CouponManager Instance;

    public string CurrentCoupon
    {
        get;
        private set;
    }
    
    public Texture2D CurrentQrTexture
    {
        get;
        private set;
    }
    public event Action CouponGenerated;
    [System.Serializable]
    private class CouponResponse
    {
        public int id;

        public string code;

        public bool isUsed;

        public int advertisementId;
    }

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
    }

    public void GenerateCoupon(
        int advertisementId
    )
    {
        StartCoroutine(
            GenerateCouponCoroutine(
                advertisementId
            )
        );
    }
    
    private IEnumerator GenerateCouponCoroutine(
        int advertisementId
    )
    {
        string url =
            $"{ServerConfig.BaseUrl}/coupons/generate";

        string json =
            $"{{\"advertisementId\":{advertisementId}}}";

        byte[] body =
            System.Text.Encoding.UTF8.GetBytes(
                json
            );

        UnityWebRequest request =
            new UnityWebRequest(
                url,
                "POST"
            );

        request.uploadHandler =
            new UploadHandlerRaw(body);

        request.downloadHandler =
            new DownloadHandlerBuffer();

        request.SetRequestHeader(
            "Content-Type",
            "application/json"
        );

        yield return request.SendWebRequest();

        if (
            request.result !=
            UnityWebRequest.Result.Success
        )
        {
            Debug.LogError(
                request.error
            );

            yield break;
        }

        CouponResponse response =
            JsonUtility.FromJson<CouponResponse>(
                request.downloadHandler.text
            );

        CurrentCoupon =
            response.code;

        yield return StartCoroutine(
            DownloadQrCode(
                CurrentCoupon
            )
        );

        Debug.Log(
            $"COUPON GENERATED: {CurrentCoupon}"
        );
        
        CouponGenerated?.Invoke();
    }
    
    private IEnumerator DownloadQrCode(
        string couponCode
    )
    {
        string url =
            $"{ServerConfig.BaseUrl}/coupons/qr/{couponCode}";

        using UnityWebRequest request =
            UnityWebRequestTexture.GetTexture(
                url
            );

        yield return request.SendWebRequest();

        if (
            request.result !=
            UnityWebRequest.Result.Success
        )
        {
            Debug.LogError(
                request.error
            );

            yield break;
        }

        CurrentQrTexture =
            DownloadHandlerTexture
                .GetContent(request);
    }
    
    
}