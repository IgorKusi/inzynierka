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
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.tag == "Player")
        {
            gameManager.EndGameDefeat();
        }
    }
}
