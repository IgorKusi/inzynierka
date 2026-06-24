using System;
using UnityEngine;

public class Trap : MonoBehaviour
{
    GameManager gameManager;
    Collider trapCollider;
    private void Start()
    {
        gameManager = GameObject.Find("GameManager").GetComponent<GameManager>();
        trapCollider = GetComponent<Collider>();
        if (trapCollider == null)
        {
            Debug.LogError("TrapCollider is missing");
        }

        if (gameManager == null)
        {
            Debug.LogError("GameManager is missing");
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        Debug.Log("Collision detected with " + other.name);
        if (other.tag == "Player")
        {
            gameManager.EndGameDefeat();
        }
    }
}
