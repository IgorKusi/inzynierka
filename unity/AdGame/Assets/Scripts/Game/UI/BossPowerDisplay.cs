using System;
using UnityEngine;
using TMPro;
public class BossPowerDisplay : MonoBehaviour
{
    [SerializeField]
    private TMP_Text countText;
    
    [SerializeField]
    private BossController bossController;

    private Camera mainCamera;
    private void Start()
    {
        mainCamera = Camera.main;
        if (bossController == null)
        {
            bossController = FindObjectOfType<BossController>();
        }
    }

    void Update()
    {
        if(bossController == null)
        {
            bossController = FindObjectOfType<BossController>();
            return;
        }
        countText.text = bossController.GetPowerText().text;
        transform.forward = mainCamera.transform.forward;
    }
}
