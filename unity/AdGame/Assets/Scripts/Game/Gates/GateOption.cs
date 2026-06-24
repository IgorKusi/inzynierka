using TMPro;
using UnityEngine;

public class GateOption : MonoBehaviour
{
    [Header("Text Materials")]
    [SerializeField] private Material AddOptionMaterial;
    [SerializeField] private Material SubOptionMaterial;
    
    
    [SerializeField]
    private ParticleSystem optionEffect;
    
    [SerializeField]
    private bool isLeftOption;

    private Gate gate;

    private bool activated;

    private void Start()
    {
        gate = GetComponentInParent<Gate>();
        GateOperationType operation;
        if (isLeftOption)
        {
            operation = gate.leftOperation;
        }
        else
        {
            operation = gate.rightOperation;
        }

        if (operation == GateOperationType.Add || operation == GateOperationType.Multiply)
        {
            GetComponent<Renderer>().material = AddOptionMaterial;
        }
        else if (operation == GateOperationType.Subtract || operation == GateOperationType.Divide)
        {
            GetComponent<Renderer>().material = SubOptionMaterial;
        }
        else
        {
            throw new System.Exception("Unknown operation type");
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (activated)
        {
            return;
        }

        if (!other.CompareTag("Player"))
        {
            return;
        }

        activated = true;

        gate.ApplyOption(isLeftOption);
        Destroy(gameObject);
    }

    private void OnDestroy()
    {
        optionEffect.Play();
    }
}