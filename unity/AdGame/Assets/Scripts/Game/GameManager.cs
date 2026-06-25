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

    private void Update()
    {
        if(player == null)
        {
            player = GameObject.FindGameObjectWithTag("Player").transform;
            player.transform.rotation = Quaternion.Euler(0, -90, 0);
            return;
        }

        if (boss == null)
        {
            boss = FindObjectOfType<BossController>();
            boss.gameObject.transform.rotation = Quaternion.Euler(0, 90, 0);
            return;
        }
        
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
        if (boss.IsDefeated())
        {
            EndGameWin();
        }
        else
        {
            EndGameDefeat();
        }
        
    }

    public void EndGameDefeat()
    {
        gameFinished = true;
        EndGameUI.Instance.ShowDefeat();
        player
            .GetComponent<PlayerMovement>()
            .CanMove = false;
        player.GetComponent<PlayerMovement>().animator.SetBool("CanMove", false);
        
    }

    public void EndGameWin()
    {
        gameFinished = true;

        CouponManager.Instance.GenerateCoupon(
            AdvertisementManager.Instance.CurrentAdvertisementId
        );

        player.GetComponent<PlayerMovement>().CanMove = false;
        player.GetComponent<PlayerMovement>().animator.SetBool("CanMove", false);
    }
}