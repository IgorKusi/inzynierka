using System.Collections.Generic;
using UnityEngine;
using System.Collections;

public class FollowerManager : MonoBehaviour
{
    public static FollowerManager Instance;
    private int damagePerFollower;
    [Header("Follower")]
    [SerializeField]
    private GameObject followerPrefab;

    [SerializeField]
    private int maxVisibleFollowers = 300;
    [SerializeField]
    private float maxAttackSpreadTime = 4f;

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
    
    public bool bossFightFinished = false;

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
    
    public void PrepareAttack(BossController boss)
    {
        if (followers.Count == 0)
        {
            damagePerFollower = 0;
            return;
        }

        damagePerFollower =
            Mathf.CeilToInt(
                CrowdManager.Instance.CurrentCount /
                (float)followers.Count
            );

        StartCoroutine(
            SendFollowersCoroutine(boss)
        );
    }
    
    private IEnumerator SendFollowersCoroutine(
        BossController boss
    )
    {
        float attackInterval = 0f;

        if (followers.Count > 1)
        {
            attackInterval =
                maxAttackSpreadTime /
                (followers.Count - 1);
        }

        List<Follower> attackingFollowers =
            new List<Follower>(followers);

        
        foreach (Follower follower in attackingFollowers)
        {
            if (bossFightFinished)
            {
                yield break;
            }
            follower.AttackBoss(
                boss.transform,
                boss,
                damagePerFollower
            );

            yield return new WaitForSeconds(
                attackInterval
            );
        }
    }
    
    public void FollowerFinishedAttack(
        Follower follower
    )
    {
        if (bossFightFinished)
        {
            return;
        }
        followers.Remove(follower);

        Destroy(follower.gameObject);

        BossController boss =
            FindObjectOfType<BossController>();

        if (boss == null)
        {
            return;
        }

        if (boss.IsDead)
        {
            FindObjectOfType<GameManager>()
                .EndGameWin();

            bossFightFinished = true;
            return;
        }

        if (followers.Count == 0)
        {
            FindObjectOfType<GameManager>()
                .EndGameDefeat();
            bossFightFinished = true;
        }
    }
}