using UnityEngine;

public class TrapSegmentController : MonoBehaviour
{
    private TrackSegmentSpawner trackSegmentSpawner;
    private GameManager gameManager;
    private GameObject trapSegmentPlaceholder;
    private void Awake()
    {
        trapSegmentPlaceholder =
            gameObject.transform.Find("TrapSegment")?.gameObject;
        
        if (trapSegmentPlaceholder == null)
        {
            Debug.LogError(
                "TrapSegment child not found"
            );

            return;
        }
        
        gameManager = FindObjectOfType<GameManager>();
        if (gameManager == null)
        {
            Debug.LogError("No GameManager found");
        }
        
        if (trackSegmentSpawner == null)
        {
            trackSegmentSpawner =
                FindObjectOfType<TrackSegmentSpawner>();
        }
        
        if (trackSegmentSpawner == null)
        {
            Debug.LogError(
                "TrackSegmentSpawner not found"
            );
            return;
        }
        
        if (
            trackSegmentSpawner.trapSegmentPrefabs == null ||
            trackSegmentSpawner.trapSegmentPrefabs.Count == 0
        )
        {
            Debug.LogError(
                "No trap prefabs assigned"
            );
            return;
        }

        GameObject prefab =
            trackSegmentSpawner.trapSegmentPrefabs[
                Random.Range(
                    0,
                    trackSegmentSpawner.trapSegmentPrefabs.Count
                )
            ];

        if (trapSegmentPlaceholder == null)
        {
            Debug.LogError(
                $"Placeholder is NULL on {gameObject.name}"
            );

            return;
        }
        Transform parent =
            trapSegmentPlaceholder.transform.parent;

        Instantiate(
            prefab,
            trapSegmentPlaceholder.transform.position,
            trapSegmentPlaceholder.transform.rotation,
            parent
        );

        Destroy(trapSegmentPlaceholder);
    }
}