using System;
using UnityEngine;
using UnityEngine.Serialization;
using System.Collections;

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
            gameFinished = true;
            StartCoroutine(BossFightCoroutine());
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
    private IEnumerator BossFightCoroutine()
    {
        PlayerMovement movement =
            player.GetComponent<PlayerMovement>();

        movement.CanMove = false;
        movement.animator.SetBool("CanMove", false);
        boss.InvokeAttackAnimation();
        yield return new WaitForSeconds(1.5f);
        boss.StopAttackAnimation();
        

        FollowerManager.Instance.PrepareAttack(
            boss
        );
        
    }
    
}