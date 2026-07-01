using System;
using UnityEngine;
using Random = UnityEngine.Random;

public class Follower : MonoBehaviour
{
    private Transform leader;
    private BossController bossController;
    private bool hasAttacked;
    private int damage;
    [SerializeField]
    private float followSpeed = 8f;

    private Vector3 targetOffset;
    
    [SerializeField]
    private Animator animator;

    private bool attackingBoss;

    private Transform bossTarget;
    
    private Vector3 attackPosition;
    private bool chargingBoss;
    private Vector3 chargePosition;
    private void Awake()
    {
        if (animator == null)
        {
            animator = GetComponent<Animator>();
        }
        animator.SetBool("CanMove", false);
        Debug.Log("Animator can move bool:" + animator.GetBool("CanMove") );
    }

    public void SetLeader(Transform newLeader)
    {
        leader = newLeader;
    }

    public void SetTargetOffset(Vector3 offset)
    {
        targetOffset = offset;
    }

    private void Update()
    {
        Vector3 targetPosition;
        if (attackingBoss)
        {
            if (bossTarget == null)
            {
                return;
            }

            targetPosition =
                attackPosition;

            transform.position =
                Vector3.MoveTowards(
                    transform.position,
                    targetPosition,
                    followSpeed * Time.deltaTime
                ); 
            if(
                !chargingBoss &&
                Vector3.Distance(
                    transform.position,
                    attackPosition
                ) < 0.15f
            )
            {
                chargingBoss = true;
            }
            if(chargingBoss)
            {
                transform.position =
                    Vector3.MoveTowards(
                        transform.position,
                        chargePosition,
                        followSpeed * 3f * Time.deltaTime
                    );

                if(
                    !hasAttacked &&
                    Vector3.Distance(
                        transform.position,
                        chargePosition
                    ) < 0.1f
                )
                {
                    Attack();
                }
            }

            transform.LookAt(bossTarget);

            UpdateAnimations();

            return;
        }

        if (leader == null)
        {
            Debug.Log("Leader is null");
            return;
        }

        targetPosition =
            leader.position +
            targetOffset;

        targetPosition.z =
            Mathf.Clamp(
                targetPosition.z,
                -5f,
                5f
            );

        transform.position =
            Vector3.Lerp(
                transform.position,
                targetPosition,
                followSpeed * Time.deltaTime
            );

        transform.rotation =
            leader.rotation;
        UpdateAnimations();
    }



    private void UpdateAnimations()
    {
        if (attackingBoss)
        {
            animator.SetBool("CanMove", true);
            return;
        }

        bool canMove =
            leader.GetComponent<Animator>().GetBool("CanMove");
        Debug.Log("Follower can move bool:" + canMove);
        Debug.Log("Leader: " + leader);

        animator.SetBool("CanMove", canMove);
    }
    
    public void AttackBoss(
        Transform boss,
        BossController controller,
        int damagePerFollower
    )
    {
        attackingBoss = true;

        bossTarget = boss;

        bossController = controller;

        damage = damagePerFollower;
        
        chargePosition =
            boss.position +
            Vector3.right * 0.4f;

        attackPosition =
            boss.position +
            Vector3.right *
            Random.Range(2.5f, 3f) +
            Vector3.forward *
            Random.Range(-2f, 2f);
    }
    
    private void Attack()
    {
        hasAttacked = true;

        bossController.TakeDamage(
            damage
        );

        FollowerManager.Instance
            .FollowerFinishedAttack(this);
    }
}