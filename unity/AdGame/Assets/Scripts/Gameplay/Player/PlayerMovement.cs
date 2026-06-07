using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    [Header("Forward Movement")]
    [SerializeField]
    private float forwardSpeed = 10f;

    [Header("Lane Movement")]
    [SerializeField]
    private float laneOffset = 3f;

    [SerializeField]
    private float laneChangeSpeed = 10f;

    private int currentLane = 0;

    private void Update()
    {
        MoveForward();

        HandleLaneInput();

        MoveToLane();
    }

    private void MoveForward()
    {
        transform.position +=
            Vector3.left *
            forwardSpeed *
            Time.deltaTime;
    }

    private void HandleLaneInput()
    {
        if (
            Input.GetKeyDown(KeyCode.A) ||
            Input.GetKeyDown(KeyCode.LeftArrow)
        )
        {
            currentLane--;

            currentLane =
                Mathf.Clamp(
                    currentLane,
                    -1,
                    1
                );
        }

        if (
            Input.GetKeyDown(KeyCode.D) ||
            Input.GetKeyDown(KeyCode.RightArrow)
        )
        {
            currentLane++;

            currentLane =
                Mathf.Clamp(
                    currentLane,
                    -1,
                    1
                );
        }
    }

    private void MoveToLane()
    {
        float targetZ =
            currentLane *
            laneOffset;

        Vector3 targetPosition =
            new Vector3(
                transform.position.x,
                transform.position.y,
                targetZ
            );

        transform.position =
            Vector3.Lerp(
                transform.position,
                targetPosition,
                laneChangeSpeed *
                Time.deltaTime
            );
    }
}