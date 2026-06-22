using System;
using UnityEngine;

public class Follower : MonoBehaviour
{
    private Transform leader;

    [SerializeField]
    private float followSpeed = 8f;

    private Vector3 targetOffset;
    
    [SerializeField]
    private Animator animator;

    private void Start()
    {
        if (animator == null)
        {
            animator = GetComponent<Animator>();
            animator.SetBool("CanMove", false);
        }
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
        if (leader == null)
        {
            return;
        }

        Vector3 targetPosition =
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
        bool CanMove = leader.gameObject.GetComponent<PlayerMovement>().CanMove;
        animator.SetBool("CanMove", CanMove);
    }
}