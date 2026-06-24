using UnityEngine;
using TMPro;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

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
    
    [SerializeField]
    private Button playAgainButton;

    [SerializeField]
    private Button downloadCouponButton;
    
    [SerializeField]
    private TMP_Text subtitleText;
    private void Awake()
    {
        Instance = this;

        endGamePanel.SetActive(false);
    }

    private void Start()
    {
        if (CouponManager.Instance != null)
        {
            CouponManager.Instance.CouponGenerated +=
                OnCouponGenerated;
        }

        playAgainButton.onClick.AddListener(
            RestartGame
        );

        downloadCouponButton.onClick.AddListener(
            DownloadCoupon
        );
    }
    private void OnDestroy()
    {
        if (CouponManager.Instance != null)
        {
            CouponManager.Instance.CouponGenerated -=
                OnCouponGenerated;
        }

        playAgainButton.onClick.RemoveListener(
            RestartGame
        );

        downloadCouponButton.onClick.RemoveListener(
            DownloadCoupon
        );
    }

    private void OnCouponGenerated()
    {

        ShowVictory();
    }

    public void ShowVictory()
    {
        endGamePanel.SetActive(true);

        resultText.text = "VICTORY";
        resultText.color = new Color32(34, 197, 94, 255); // zielony

        subtitleText.text = "Reward Unlocked!";
        subtitleText.color = Color.white;

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

        couponText.gameObject.SetActive(true);
        qrImage.gameObject.SetActive(true);

        downloadCouponButton.gameObject.SetActive(true);
        playAgainButton.gameObject.SetActive(false);
    }

    public void ShowDefeat()
    {
        endGamePanel.SetActive(true);

        resultText.text = "DEFEAT";
        resultText.color = new Color32(239, 68, 68, 255); // czerwony

        subtitleText.text = "Better luck next time";
        subtitleText.color = Color.white;

        brandText.text =
            AdvertisementManager
                .Instance
                .CurrentAdvertisement
                .brandName;

        brandLogo.texture =
            AdvertisementManager
                .Instance
                .LogoTexture;

        couponText.gameObject.SetActive(false);
        qrImage.gameObject.SetActive(false);

        downloadCouponButton.gameObject.SetActive(false);
        playAgainButton.gameObject.SetActive(true);
    }
    private void RestartGame()
    {
        SceneManager.LoadScene(
            SceneManager.GetActiveScene().buildIndex
        );
    }
    private void DownloadCoupon()
    {
        Debug.Log(
            $"Coupon: {CouponManager.Instance.CurrentCoupon}"
        );
    }
    
}