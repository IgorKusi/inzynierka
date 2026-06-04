using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

public class AdvertisementApi : MonoBehaviour
{
    private const string ApiUrl =
        "http://localhost:3000/advertisements/game/4";

    public ImageLoader imageLoader;

    private void Start()
    {
        StartCoroutine(GetAdvertisement());
    }

    private IEnumerator GetAdvertisement()
    {
        using UnityWebRequest request =
            UnityWebRequest.Get(ApiUrl);

        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError(request.error);
            yield break;
        }

        string json = request.downloadHandler.text;

        Advertisement advertisement =
            JsonUtility.FromJson<Advertisement>(json);

        Debug.Log($"Brand: {advertisement.brandName}");
        string logoUrl = "http://localhost:3000" + advertisement.logoPath;
        imageLoader.LoadImage(logoUrl);
        Debug.Log($"Logo URL: {logoUrl}");
        Debug.Log($"Banner: {advertisement.bannerPath}");
    }
}