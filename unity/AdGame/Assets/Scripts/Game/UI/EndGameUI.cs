using UnityEngine;

public class EndGameUI : MonoBehaviour
{
    public static EndGameUI Instance;

    private void Awake()
    {
        Instance = this;
    }

    public void ShowVictory()
    {
        Debug.Log(
            $"SHOW VICTORY UI | Coupon: {CouponManager.Instance.CurrentCoupon}"
        );
    }

    public void ShowDefeat()
    {
        Debug.Log(
            "SHOW DEFEAT UI"
        );
    }
}