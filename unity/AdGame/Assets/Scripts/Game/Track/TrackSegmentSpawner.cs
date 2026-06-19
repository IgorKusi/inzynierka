using System;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.PlayerLoop;

public class TrackSegmentSpawner : MonoBehaviour
{
    [SerializeField]
    private int trackLen = 5;

    [SerializeField]
    private GameObject  trackSegmentPrefab;

    [SerializeField]
    private GameObject  bossArenaPrefab;
    
    [SerializeField]
    private GameObject  bossPrefab;
    private BossController bossController;
    
    [SerializeField]
    private GameObject  playerPrefab;
    
    [SerializeField]
    private GameManager gameManager;
    
    public void Start()
    {
        
        GameObject player = Instantiate(
            playerPrefab,
            new Vector3(0, 0, 0),
            Quaternion.identity
        );
        player.transform.parent = transform;
        //set player tag to Player
        player.tag = "Player";

        int bossPower = player.GetComponent<CrowdManager>().getStartCount();
        
        
        for (int i = 0; i < trackLen ; i++)
        {
            GameObject trackSegment = Instantiate(
                trackSegmentPrefab,
                new Vector3(2*i * (-10), 0, 0),
                Quaternion.identity
            );
            trackSegment.transform.parent = transform;
            Gate gate = trackSegment.GetComponentInChildren<Gate>();
            gate.SetGates();
            if (i != 0)
            {
                if (gate.leftOperation == GateOperationType.Add)
                {
                    bossPower += gate.leftValue;
                    Debug.Log("Left added " + gate.leftValue);
                }

                if (gate.rightOperation == GateOperationType.Add)
                {
                    bossPower += gate.rightValue;
                    Debug.Log("Right added " + gate.rightValue);
                }

                if (gate.leftOperation == GateOperationType.Multiply)
                {
                    bossPower *= gate.leftValue;
                    Debug.Log("Left x  " + gate.leftValue);
                }

                if (gate.rightOperation == GateOperationType.Multiply)
                {
                    bossPower *= gate.rightValue;
                    Debug.Log("Right x  " + gate.rightValue);
                }
            }

            Debug.Log(bossPower);

        }
        bossPower = (int)(bossPower * 3 / 4);
        //spawn boss on last track segment
        int bossArenaSpawnX = trackLen * (-20) -5;
        GameObject bossArena = Instantiate( 
            bossArenaPrefab,
            new Vector3(bossArenaSpawnX, 0, 0),
            Quaternion.identity
        );
        bossArena.transform.parent = transform;
        //spawn boss inside the arena
        GameObject boss = Instantiate( 
            bossPrefab,
            new Vector3(bossArenaSpawnX, 0, 0),
            Quaternion.identity
        );
        boss.transform.parent = transform;
        bossController = boss.GetComponent<BossController>();
        bossController.SetBossPower(bossPower);
    }
}
