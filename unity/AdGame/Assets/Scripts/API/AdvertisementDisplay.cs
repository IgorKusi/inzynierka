using UnityEngine;

public enum AdvertisementImageType
{
    Logo,
    Banner
}

public class AdvertisementDisplay : MonoBehaviour
{
    [SerializeField]
    private Renderer targetRenderer;

    [SerializeField]
    private AdvertisementImageType imageType =
        AdvertisementImageType.Logo;
    

    private void Start()
    {
        AdvertisementManager.Instance
            .AdvertisementLoaded +=
                ApplyAdvertisement;

        if (
            AdvertisementManager.Instance
                .CurrentAdvertisement != null
        )
        {
            ApplyAdvertisement();
        }
        
    }

    private void Awake()
    {
        if (targetRenderer == null)
        {
           targetRenderer =
                GetComponent<Renderer>();
        }
    }

    private void OnDestroy()
    {
        if (AdvertisementManager.Instance != null)
        {
            AdvertisementManager.Instance
                .AdvertisementLoaded -=
                    ApplyAdvertisement;
        }
    }

    private void ApplyAdvertisement()
    {
        if (targetRenderer == null)
        {
            Debug.LogError($"No Renderer found on {gameObject.name}");
            return; 
        }
        Texture2D texture =
            imageType == AdvertisementImageType.Logo
                ? AdvertisementManager.Instance.LogoTexture
                : AdvertisementManager.Instance.BannerTexture;

        if (texture == null)
        {
            return;
        }

        targetRenderer.material.mainTexture =
            texture;
        
        
        
        
    }
}