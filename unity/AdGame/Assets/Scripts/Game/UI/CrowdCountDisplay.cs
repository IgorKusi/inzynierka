using TMPro;
using UnityEngine;

public class CrowdCountDisplay : MonoBehaviour
{
    [SerializeField]
    private TMP_Text countText;

    [SerializeField]
    private CrowdManager crowdManager;

    private Camera mainCamera;

    private void Start()
    {
        mainCamera = Camera.main;
    }

    private void Update()
    {
        if(crowdManager == null || mainCamera == null)
        {
            crowdManager = FindObjectOfType<CrowdManager>();
            return;
        }
        countText.text =
            crowdManager.CurrentCount.ToString();

        transform.forward =
            mainCamera.transform.forward;
    }
}