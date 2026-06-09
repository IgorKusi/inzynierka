using TMPro;
using UnityEngine;

public class CrowdUI : MonoBehaviour
{
    [SerializeField]
    private TMP_Text countText;

    private void Update()
    {
        if (
            CrowdManager.Instance == null
        )
        {
            return;
        }

        countText.text =
            CrowdManager.Instance
                .CurrentCount
                .ToString();
    }
}