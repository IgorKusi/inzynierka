using System.Collections.Generic;
using UnityEngine;

public class GateSpawner : MonoBehaviour
{
    [SerializeField]
    private GameObject gatePrefab;

    [SerializeField]
    private Transform player;

    [SerializeField]
    private float firstGateX = 520f;

    [SerializeField]
    private float distanceBetweenGates = 40f;

    [SerializeField]
    private float spawnYOffset = 2.5f;

    [SerializeField]
    private int gatesAhead = 3;

    [SerializeField]
    private float destroyDistanceBehindPlayer = 10f;

    private readonly Queue<GameObject> activeGates =
        new Queue<GameObject>();

    private float nextSpawnX;

    private void Start()
    {
        nextSpawnX = firstGateX;

        for (
            int i = 0;
            i < gatesAhead;
            i++
        )
        {
            SpawnGate();
        }
    }

    private void Update()
    {
        if (activeGates.Count == 0)
        {
            return;
        }

        GameObject oldestGate =
            activeGates.Peek();

        if (
            player.position.x <
            oldestGate.transform.position.x -
            destroyDistanceBehindPlayer
        )
        {
            Destroy(oldestGate);

            activeGates.Dequeue();

            SpawnGate();
        }
    }

    private void SpawnGate()
    {
        GameObject gateObject =
            Instantiate(
                gatePrefab,
                new Vector3(
                    nextSpawnX,
                    spawnYOffset,
                    0f
                ),
                Quaternion.identity
            );

        Gate gate =
            gateObject.GetComponent<Gate>();

        GenerateGateOptions(gate);

        activeGates.Enqueue(
            gateObject
        );

        nextSpawnX -=
            distanceBetweenGates;
    }

    private void GenerateGateOptions(
        Gate gate
    )
    {
        bool leftGood =
            Random.value > 0.5f;

        if (leftGood)
        {
            gate.leftOperation =
                GetGoodOperation();

            gate.leftValue =
                GetGoodValue();

            gate.rightOperation =
                GetBadOperation();

            gate.rightValue =
                GetBadValue();
        }
        else
        {
            gate.rightOperation =
                GetGoodOperation();

            gate.rightValue =
                GetGoodValue();

            gate.leftOperation =
                GetBadOperation();

            gate.leftValue =
                GetBadValue();
        }
    }

    private GateOperationType
        GetGoodOperation()
    {
        return Random.value > 0.5f
            ? GateOperationType.Add
            : GateOperationType.Multiply;
    }

    private GateOperationType
        GetBadOperation()
    {
        return Random.value > 0.5f
            ? GateOperationType.Subtract
            : GateOperationType.Divide;
    }

    private int GetGoodValue()
    {
        if (Random.value > 0.5f)
        {
            return Random.Range(2, 20);
        }

        return Random.Range(2, 5);
    }

    private int GetBadValue()
    {
        if (Random.value > 0.5f)
        {
            return Random.Range(1, 15);
        }

        return Random.Range(2, 5);
    }
}