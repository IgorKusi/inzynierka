using System;
using UnityEngine;
using UnityEngine.Serialization;

public class GameManager : MonoBehaviour
{
    public Transform player;
    
    private BossController boss;
    
    [FormerlySerializedAs("bossFightX")] [SerializeField]
    private float bossFightDistance = 10f;

    private bool gameFinished;

    public void Start()
    {
        boss = FindObjectOfType<BossController>();
        player = GameObject.FindGameObjectWithTag("Player").transform;
    }

    private void Update()
    {
        if (gameFinished)
        {
            return;
        }

        if (Mathf.Abs(player.position.x - boss.transform.position.x) <= bossFightDistance)
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