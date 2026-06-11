using UnityEngine;
using System.Collections;
using UnityEngine.Networking;

public class CouponManager : MonoBehaviour
{
    public static CouponManager Instance;

    public string CurrentCoupon
    {
        get;
        private set;
    }
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

        Debug.Log(
            $"COUPON GENERATED: {CurrentCoupon}"
        );
    }
}