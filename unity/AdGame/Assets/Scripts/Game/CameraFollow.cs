using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    [SerializeField]
    private Transform player;

    [SerializeField]
    private float xOffset = 10f;

    [SerializeField]
    private float yOffset = 8f;

    [SerializeField]
    private float zPosition = 0f;

    private void LateUpdate()
    {
        if (player == null)
        {
            return;
        }

        transform.position =
            new Vector3(
                player.position.x + xOffset,
                yOffset,
                zPosition
            );
    }
}