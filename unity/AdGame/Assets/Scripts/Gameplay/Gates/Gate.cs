using UnityEngine;

public enum GateOperationType
{
    Add,
    Multiply,
    Subtract,
    Divide
}

public class Gate : MonoBehaviour
{
    [Header("Left Option")]
    public GateOperationType leftOperation;
    public int leftValue;

    [Header("Right Option")]
    public GateOperationType rightOperation;
    public int rightValue;

    public int ApplyLeftOption(int currentCount)
    {
        return ApplyOperation(
            currentCount,
            leftOperation,
            leftValue
        );
    }

    public int ApplyRightOption(int currentCount)
    {
        return ApplyOperation(
            currentCount,
            rightOperation,
            rightValue
        );
    }

    private int ApplyOperation(
        int currentCount,
        GateOperationType operation,
        int value
    )
    {
        switch (operation)
        {
            case GateOperationType.Add:
                return currentCount + value;

            case GateOperationType.Multiply:
                return currentCount * value;

            case GateOperationType.Subtract:
                return Mathf.Max(
                    1,
                    currentCount - value
                );

            case GateOperationType.Divide:

                return Mathf.Max(
                    1,
                    currentCount / value
                );

            default:
                return currentCount;
        }
    }
}