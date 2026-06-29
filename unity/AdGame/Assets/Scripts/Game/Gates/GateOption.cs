using TMPro;
using UnityEngine;

public class GateOption : MonoBehaviour
{
    [Header("Text Materials")]
    [SerializeField] private Material AddOptionMaterial;
    [SerializeField] private Material SubOptionMaterial;

    [Header("Effects")]
    [SerializeField] private GameObject particleEmitterPrefab;

    [SerializeField] private bool isLeftOption;

    private Gate gate;
    private bool activated;

    private Renderer optionRenderer;
    private Collider optionCollider;

    private void Start()
    {
        gate = GetComponentInParent<Gate>();

        optionRenderer = GetComponent<Renderer>();
        optionCollider = GetComponent<Collider>();

        GateOperationType operation =
            isLeftOption
                ? gate.leftOperation
                : gate.rightOperation;

        if (operation == GateOperationType.Add ||
            operation == GateOperationType.Multiply)
        {
            optionRenderer.material = AddOptionMaterial;
        }
        else if (operation == GateOperationType.Subtract ||
                 operation == GateOperationType.Divide)
        {
            optionRenderer.material = SubOptionMaterial;
        }
        else
        {
            throw new System.Exception("Unknown operation type");
        }

        if (particleEmitterPrefab == null)
        {
            Debug.LogError("No particle emitter prefab assigned");
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (activated)
            return;

        if (!other.CompareTag("Player"))
            return;

        activated = true;

        gate.ApplyOption(isLeftOption);
        
        
        optionRenderer.enabled = false;
        optionCollider.enabled = false;
        
        TMP_Text text = GetComponentInChildren<TMP_Text>();
        if (text != null)
            text.enabled = false;

        Instantiate(
            particleEmitterPrefab,
            transform.position,
            Quaternion.identity
        );
        gameObject.SetActive(false);
    }
}