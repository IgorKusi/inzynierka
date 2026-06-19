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
        Debug.Log(player);
    }

    private void Update()
    {
        if(player == null)
        {
            player = GameObject.FindGameObjectWithTag("Player").transform;
            Debug.Log("Update" + player);
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
        
    }

    public void EndGameWin()
    { 
        gameFinished = true;
        EndGameUI.Instance.ShowVictory();
        CouponManager.Instance.GenerateCoupon(AdvertisementManager
                    .Instance
                    .CurrentAdvertisementId);
        
    }
}