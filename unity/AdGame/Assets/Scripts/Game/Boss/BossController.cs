using UnityEngine;
using TMPro;

public class BossController : MonoBehaviour
{
    [SerializeField]
    private int bossPower = 500;
    private int currentHealth;
    [SerializeField]
    private TMP_Text powerText;
    

    private void Start()
    {
        currentHealth = bossPower;

        if (powerText != null)
        {
            powerText.text =
                currentHealth.ToString();
        }
    }
    
    public void SetBossPower(int value)
    {
        bossPower = value;
        currentHealth = value;

        if (powerText != null)
        {
            powerText.text =
                currentHealth.ToString();
        }
    }

    public TMP_Text GetPowerText()
    {
        return powerText;
    }
    public void TakeDamage(int damage)
    {
        currentHealth -= damage;

        if (currentHealth < 0)
        {
            currentHealth = 0;
        }

        if (powerText != null)
        {
            powerText.text =
                currentHealth.ToString();
        }
    }
    
    public int CurrentHealth
    {
        get
        {
            return currentHealth;
        }
    }
    public bool IsDead
    {
        get
        {
            return currentHealth <= 0;
        }
    }

    public void InvokeAttackAnimation()
    {
        Animator animator = GetComponent<Animator>();
        if (animator != null)
        {
            animator.SetBool("bossFightStarted", true);
        }
    }

    public void StopAttackAnimation()
    {
        Animator animator = GetComponent<Animator>();
        if (animator != null)
        {
            animator.SetBool("bossFightStarted", false);
        }
    }
    
}