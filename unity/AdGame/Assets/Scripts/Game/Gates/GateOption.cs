using UnityEngine;

public class GateOption : MonoBehaviour
{
    [SerializeField]
    private bool isLeftOption;

    private Gate gate;

    private bool activated;

    private void Start()
    {
        gate =
            GetComponentInParent<Gate>();
    }

    private void OnTriggerEnter(
        Collider other
    )
    {
        if (activated)
        {
            return;
        }

        if (
            !other.CompareTag("Player")
        )
        {
            return;
        }

        activated = true;

        gate.ApplyOption(
            isLeftOption
        );
    }
}