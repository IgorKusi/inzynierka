using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    [Header("Forward Movement")]
    [SerializeField]
    private float forwardSpeed = 10f;

    [Header("Lane Movement")]
    [SerializeField]
    private float laneOffset = 2.5f;

    [SerializeField]
    private float laneChangeSpeed = 10f;

    private int currentLane = 0;

    private void Update()
    {
        if (currentLane == 0)
        {
            //wait for player 1st input to start game
            HandleLaneInput();
            return;
        }
        
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
            currentLane = -1;
        }

        if (
            Input.GetKeyDown(KeyCode.D) ||
            Input.GetKeyDown(KeyCode.RightArrow)
        )
        {
            currentLane = 1;
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