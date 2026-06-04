using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

public class ImageLoader : MonoBehaviour
{
    public Renderer targetRenderer;

    public void LoadImage(string imageUrl)
    {
        Debug.Log($"Loading image: {imageUrl}");
        StartCoroutine(DownloadImage(imageUrl));
    }

    private IEnumerator DownloadImage(string imageUrl)
    {
        Debug.Log($"Downloading: {imageUrl}");

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

        Debug.Log("Image loaded");
    }
}