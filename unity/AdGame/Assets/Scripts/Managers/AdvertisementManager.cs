using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using System;
public class AdvertisementManager : MonoBehaviour
{
    
    public static AdvertisementManager Instance;

    [Header("Editor Testing")]
    [SerializeField]
    private string editorLaunchUrl = "https://adgame.local/play?ad=4";

    public int CurrentAdvertisementId
    {
        get;
        private set;
    }

    public Advertisement CurrentAdvertisement
    {
        get;
        private set;
    }

    public Texture2D LogoTexture
    {
        get;
        private set;
    }

    public Texture2D BannerTexture
    {
        get;
        private set;
    }
    public event Action AdvertisementLoaded;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);

            InitializeAdvertisementId();
        }
        else
        {
            Destroy(gameObject);
        }
    }

    private void Start()
    {
        StartCoroutine(LoadAdvertisement());
    }

    private void InitializeAdvertisementId()
    {
        Debug.Log(
            "Launch URL: " +
            Application.absoluteURL
        );
        CurrentAdvertisementId =
            GetAdvertisementIdFromUrl();

        Debug.Log(
            $"Advertisement ID: {CurrentAdvertisementId}"
        );
    }

    private int GetAdvertisementIdFromUrl()
    {
        string url;

        if (string.IsNullOrEmpty(Application.absoluteURL))
        {
            url = editorLaunchUrl;
        }
        else
        {
            url = Application.absoluteURL;
        }

        Debug.Log($"Launch URL: {url}");

        string parameter =
            "ad=";

        int index =
            url.IndexOf(parameter);

        if (index == -1)
        {
            return 1;
        }

        string value = url.Substring(index + parameter.Length);

        int ampersandIndex = value.IndexOf('&');

        if (ampersandIndex >= 0)
        {
            value =
                value.Substring(
                    0,
                    ampersandIndex
                );
        }

        if (
            int.TryParse(
                value,
                out int advertisementId
            )
        )
        {
            return advertisementId;
        }

        return 1;
    }
    private IEnumerator LoadAdvertisement()
    {
        string url =
            $"{ServerConfig.BaseUrl}/advertisements/game/{CurrentAdvertisementId}";

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

        CurrentAdvertisement =
            JsonUtility.FromJson<Advertisement>(json);

        Debug.Log(
            $"Advertisement loaded: {CurrentAdvertisement.brandName}"
        );

        yield return StartCoroutine(
            DownloadTexture(
                CurrentAdvertisement.logoPath,
                true
            )
        );

        yield return StartCoroutine(
            DownloadTexture(
                CurrentAdvertisement.bannerPath,
                false
            )
        );
        AdvertisementLoaded?.Invoke();
    }

    private IEnumerator DownloadTexture(
        string imagePath,
        bool isLogo
    )
    {
        string imageUrl =
            ServerConfig.BaseUrl + imagePath;

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

        if (isLogo)
        {
            LogoTexture = texture;
            Debug.Log("Logo loaded");
        }
        else
        {
            BannerTexture = texture;
            Debug.Log("Banner loaded");
        }
    }
    
}