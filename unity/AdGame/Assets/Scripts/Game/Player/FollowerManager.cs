using System.Collections.Generic;
using UnityEngine;

public class FollowerManager : MonoBehaviour
{
    public static FollowerManager Instance;

    [Header("Follower")]
    [SerializeField]
    private GameObject followerPrefab;

    [SerializeField]
    private int maxVisibleFollowers = 500;

    [Header("Crowd Shape")]
    [SerializeField]
    private float minCrowdWidth = 2f;

    [SerializeField]
    private float maxCrowdWidth = 5f;

    [SerializeField]
    private float minCrowdLength = 1f;

    [SerializeField]
    private float maxCrowdLength = 8f;

    [SerializeField]
    private float laneLimit = 5f;

    private readonly List<Follower> followers = new();

    private void Awake()
    {
        Instance = this;
    }

    private void Start()
    {
        SyncFollowers();
    }

    public void SyncFollowers()
    {
        int targetCount = Mathf.Min(
            CrowdManager.Instance.CurrentCount - 1,
            maxVisibleFollowers
        );

        while (followers.Count < targetCount)
        {
            SpawnFollower();
        }

        while (followers.Count > targetCount)
        {
            RemoveFollower();
        }
    }

    private void SpawnFollower()
    {
        GameObject followerObject = Instantiate(
            followerPrefab,
            transform.position,
            transform.rotation
        );

        Follower follower =
            followerObject.GetComponent<Follower>();

        follower.SetLeader(transform);

        float density =
            followers.Count /
            (float)maxVisibleFollowers;

        float crowdWidth = Mathf.Lerp(
            minCrowdWidth,
            maxCrowdWidth,
            density
        );

        float crowdLength = Mathf.Lerp(
            minCrowdLength,
            maxCrowdLength,
            density
        );

        float x = Random.Range(
            -0.1f,
            crowdLength
        );

        float leaderZ =
            transform.position.z;

        float minAllowedOffset =
            -laneLimit - leaderZ;

        float maxAllowedOffset =
            laneLimit - leaderZ;

        float minOffsetZ = Mathf.Max(
            -crowdWidth,
            minAllowedOffset
        );

        float maxOffsetZ = Mathf.Min(
            crowdWidth,
            maxAllowedOffset
        );

        float z = Random.Range(
            minOffsetZ,
            maxOffsetZ
        );

        follower.SetTargetOffset(
            new Vector3(
                x,
                0f,
                z
            )
        );

        followers.Add(follower);
    }

    private void RemoveFollower()
    {
        if (followers.Count == 0)
        {
            return;
        }

        Follower follower =
            followers[^1];

        followers.RemoveAt(
            followers.Count - 1
        );

        Destroy(
            follower.gameObject
        );
    }
}