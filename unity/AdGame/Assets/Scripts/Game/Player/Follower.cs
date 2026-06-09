using UnityEngine;

public class Follower : MonoBehaviour
{
    private Transform leader;

    [SerializeField]
    private float followSpeed = 8f;

    private Vector3 targetOffset;

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
    }
}