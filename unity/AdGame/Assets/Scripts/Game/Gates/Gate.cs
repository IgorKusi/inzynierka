using System;
using UnityEngine;
using TMPro;
using Random = System.Random;

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

    private bool used;
    
    [SerializeField]
    private TMP_Text leftText;

    [SerializeField]
    private TMP_Text rightText;

    public void Start()
    {
        
    }

    public void ApplyOption(
        bool leftSide
    )
    {
        if (used)
        {
            return;
        }

        used = true;

        GateOperationType operation =
            leftSide
                ? leftOperation
                : rightOperation;

        int value =
            leftSide
                ? leftValue
                : rightValue;

        ApplyOperation(
            operation,
            value
        );

        Debug.Log(
            $"Gate used: {operation} {value}"
        );
    }

    private void ApplyOperation(
        GateOperationType operation,
        int value
    )
    {
        switch (operation)
        {
            case GateOperationType.Add:

                CrowdManager.Instance
                    .Add(value);

                break;

            case GateOperationType.Multiply:

                CrowdManager.Instance
                    .Multiply(value);

                break;

            case GateOperationType.Subtract:

                CrowdManager.Instance
                    .Subtract(value);

                break;

            case GateOperationType.Divide:

                CrowdManager.Instance
                    .Divide(value);

                break;
        }
    }
    
    public void UpdateTexts()
    {
        leftText.text =
            FormatOperation(
                leftOperation,
                leftValue
            );

        rightText.text =
            FormatOperation(
                rightOperation,
                rightValue
            );
    }
    
    private string FormatOperation(
        GateOperationType operation,
        int value
    )
    {
        switch (operation)
        {
            case GateOperationType.Add:
                return $"+{value}";

            case GateOperationType.Multiply:
                return $"x{value}";

            case GateOperationType.Subtract:
                return $"-{value}";

            case GateOperationType.Divide:
                return $"/{value}";
        }

        return "";
    }

    public void SetGates()
    {
        int i = new Random().Next(1, 4);
        leftOperation = (GateOperationType)i;
        if (leftOperation == GateOperationType.Add)
            rightOperation = GateOperationType.Subtract;
        else if (leftOperation == GateOperationType.Multiply)
            rightOperation = GateOperationType.Divide;
        else if (leftOperation == GateOperationType.Subtract)
            rightOperation = GateOperationType.Add;
        else if (leftOperation == GateOperationType.Divide)
            rightOperation = GateOperationType.Multiply;
        
        leftValue = new Random().Next(1, 10);
        rightValue = new Random().Next(1, 10);
        
        UpdateTexts();
    }
}