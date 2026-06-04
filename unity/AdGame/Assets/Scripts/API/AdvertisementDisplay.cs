using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

public class AdvertisementDisplay : MonoBehaviour
{
    [SerializeField]
    private int advertisementId = 4;

    [SerializeField]
    private Renderer targetRenderer;

    private const string BaseUrl =
        "http://localhost:3000/advertisements/game/";

    private void Start()
    {
        StartCoroutine(LoadAdvertisement());
    }

    private IEnumerator LoadAdvertisement()
    {
        string url =
            BaseUrl + advertisementId;

        using UnityWebRequest request =
            UnityWebRequest.Get(url);

        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError(request.error);
            yield break;
        }

        string json =
            request.downloadHandler.text;

        Advertisement advertisement =
            JsonUtility.FromJson<Advertisement>(json);

        Debug.Log($"Brand: {advertisement.brandName}");

        string logoUrl =
            "http://localhost:3000" +
            advertisement.logoPath;

        StartCoroutine(
            DownloadTexture(logoUrl)
        );
    }

    private IEnumerator DownloadTexture(string imageUrl)
    {
        using UnityWebRequest request =
            UnityWebRequestTexture.GetTexture(imageUrl);

        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError(request.error);
            yield break;
        }

        Texture2D texture =
            DownloadHandlerTexture.GetContent(request);

        targetRenderer.material.mainTexture =
            texture;

        Debug.Log("Advertisement applied");
    }
}