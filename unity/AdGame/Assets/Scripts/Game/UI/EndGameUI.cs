using UnityEngine;
using TMPro;
using UnityEngine.UI;

public class EndGameUI : MonoBehaviour
{
    public static EndGameUI Instance;

    [SerializeField]
    private GameObject endGamePanel;

    [SerializeField]
    private TMP_Text resultText;

    [SerializeField]
    private TMP_Text couponText;
    
    [SerializeField]
    private TMP_Text brandText;
    
    [SerializeField]
    private RawImage brandLogo;
    
    [SerializeField]
    private RawImage qrImage;
    private void Awake()
    {
        Instance = this;
    }

    private void Start()
    {
        if (CouponManager.Instance != null)
        {
            CouponManager.Instance.CouponGenerated +=
                OnCouponGenerated;
        }
    }
    private void OnDestroy()
    {
        if (CouponManager.Instance != null)
        {
            CouponManager.Instance.CouponGenerated -=
                OnCouponGenerated;
        }
    }

    private void OnCouponGenerated()
    {

        ShowVictory();
    }

    public void ShowVictory()
    {

        endGamePanel.SetActive(true);

        resultText.text =
            "VICTORY";

        brandText.text =
            AdvertisementManager
                .Instance
                .CurrentAdvertisement
                .brandName;

        couponText.text =
            CouponManager
                .Instance
                .CurrentCoupon;
        
        brandLogo.texture =
            AdvertisementManager
                .Instance
                .LogoTexture;
        
        qrImage.texture =
            CouponManager
                .Instance
                .CurrentQrTexture;
    }

    public void ShowDefeat()
    {
        endGamePanel.SetActive(true);

        resultText.text =
            "DEFEAT";

        brandText.text =
            AdvertisementManager
                .Instance
                .CurrentAdvertisement
                .brandName;

        couponText.text =
            "";
        
        brandLogo.texture =
            AdvertisementManager
                .Instance
                .LogoTexture;
    }
}