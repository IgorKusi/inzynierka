using UnityEngine;

public class StartGameUI : MonoBehaviour
{
    public static StartGameUI Instance;

    [SerializeField]
    private GameObject startGamePanel;

    private void Awake()
    {
        Instance = this;

        startGamePanel.SetActive(true);
    }

    public void Hide()
    {
        startGamePanel.SetActive(false);
    }
}