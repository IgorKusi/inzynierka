using UnityEngine;
using TMPro;

public class BossController : MonoBehaviour
{
    [SerializeField]
    private int bossPower = 500;

    [SerializeField]
    private TMP_Text powerText;

    private void Start()
    {
        if (powerText != null)
        {
            powerText.text = bossPower.ToString();
        }
    }

    public bool IsDefeated()
    {
        return CrowdManager.Instance.CurrentCount >= bossPower;
    }
    
    public void SetBossPower(int value)
    {
        bossPower = value;
    }

    public TMP_Text GetPowerText()
    {
        return powerText;
    }
}