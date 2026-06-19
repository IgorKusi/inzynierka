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
        if (Instance == null)
        {
            Instance = this;
        }

        CurrentCount =
            startCount;
    }
    
    public void Add(
        int value
    )
    {
        CurrentCount += value;

        NotifyFollowers();
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
        
    }

    public void Multiply(
        int value
    )
    {
        CurrentCount *= value;

        NotifyFollowers();
        
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

    public int getStartCount()
    {
        return startCount;
    }
}