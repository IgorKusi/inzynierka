using UnityEngine;

public class CrowdManager : MonoBehaviour
{
    public static CrowdManager Instance;

    [SerializeField]
    private int startCount = 10;

    public int CurrentCount
    {
        get;
        private set;
    }

    private void Awake()
    {
        Debug.Log("CrowdManager Awake");
        if (Instance == null)
        {
            Instance = this;
        }

        CurrentCount =
            startCount;
    }

    private void Start()
    {
        Debug.Log("Current Count = " + CurrentCount);
    }

    public void Add(
        int value
    )
    {
        CurrentCount += value;

        NotifyFollowers();

        Debug.Log(
            $"Crowd: {CurrentCount}"
        );
    }

    public void Subtract(
        int value
    )
    {
        CurrentCount -= value;

        if (CurrentCount < 1)
        {
            CurrentCount = 1;
        }

        NotifyFollowers();

        Debug.Log(
            $"Crowd: {CurrentCount}"
        );
    }

    public void Multiply(
        int value
    )
    {
        CurrentCount *= value;

        NotifyFollowers();

        Debug.Log(
            $"Crowd: {CurrentCount}"
        );
    }

    public void Divide(
        int value
    )
    {
        if (value <= 0)
        {
            return;
        }

        CurrentCount /= value;

        if (CurrentCount < 1)
        {
            CurrentCount = 1;
        }

        NotifyFollowers();

        Debug.Log(
            $"Crowd: {CurrentCount}"
        );
    }

    private void NotifyFollowers()
    {
        if (
            FollowerManager.Instance != null
        )
        {
            FollowerManager.Instance
                .SyncFollowers();
        }
    }
}