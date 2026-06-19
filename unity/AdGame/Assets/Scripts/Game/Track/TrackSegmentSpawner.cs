using System;
using System.Collections.Generic;
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
    
    [SerializeField]
    public List<GameObject> trapSegmentPrefabs;
    
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
                new Vector3(3*i * (-10), 0, 0),
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
                }

                if (gate.rightOperation == GateOperationType.Add)
                {
                    bossPower += gate.rightValue;
                }

                if (gate.leftOperation == GateOperationType.Multiply)
                {
                    bossPower *= gate.leftValue;
                }

                if (gate.rightOperation == GateOperationType.Multiply)
                {
                    bossPower *= gate.rightValue;
                }
            }
            
            

        }
        bossPower = (int)(bossPower * 3 / 4);
        //spawn boss on last track segment
        int bossArenaSpawnX = trackLen * (-30) -5;
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
