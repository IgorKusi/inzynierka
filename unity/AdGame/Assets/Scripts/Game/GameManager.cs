using UnityEngine;

public class GameManager : MonoBehaviour
{
    [SerializeField]
    private Transform player;

    [SerializeField]
    private BossController boss;

    [SerializeField]
    private float bossFightX = -550f;

    private bool gameFinished;

    private void Update()
    {
        if (gameFinished)
        {
            return;
        }

        if (player.position.x <= bossFightX)
        {
            ResolveBossFight();
        }
    }

    private void ResolveBossFight()
    {
        gameFinished = true;

        if (boss.IsDefeated())
        {
            CouponManager.Instance.GenerateCoupon(
                AdvertisementManager
                    .Instance
                    .CurrentAdvertisementId
            );
        }
        else
        {
            EndGameUI.Instance.ShowDefeat();
        }
        player
            .GetComponent<PlayerMovement>()
            .CanMove = false;
    }
}