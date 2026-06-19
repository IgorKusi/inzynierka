using System.Collections.Generic;
using UnityEngine;

public class TrapSegmentController : MonoBehaviour
{
    TrackSegmentSpawner trackSegmentSpawner;

    
    private void Awake()
    {
        // trackSegmentSpawner = FindObjectOfType<TrackSegmentSpawner>();
        // GameObject trapSegment = trackSegmentSpawner.trapSegmentPrefabs[Random.Range(0, trackSegmentSpawner.trapSegmentPrefabs.Count)];
        // Debug.Log(trapSegment);
        // //trapSegment.transform.parent = transform.parent.transform;
        // trapSegment.transform.localPosition = Vector3.zero;
        // trapSegment.transform.localRotation = Quaternion.identity;
        // trapSegment.transform.localScale = Vector3.one;
        
        // Instantiate(trapSegment, transform.position, transform.rotation);
        //Destroy(gameObject);
    }
    
}
