using System.Runtime.CompilerServices;
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

    [Header("Mobile Input")]
    [SerializeField]
    private float swipeThreshold = 50f;

    private Vector2 touchStartPosition;

    private int currentLane = 0;

    public bool CanMove = false;

    private bool firstInput = false;
    
    [SerializeField]
    public Animator animator;

    private void Start()
    {
        animator = GetComponent<Animator>();
    }
    private void Update()
    {
        if (currentLane == 0)
        {
            // Wait for first input to start game
            HandleLaneInput();
            return;
        }
        else if (currentLane != 0 && !firstInput)
        {
            CanMove = true;
            firstInput = true;
        }
        
        if (!CanMove)
        {
            return;
        }

        MoveForward();

        HandleLaneInput();

        MoveToLane();
        
        UpdateAnimator();
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
        HandleKeyboardInput();

        HandleTouchInput();
    }

    private void HandleKeyboardInput()
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

    private void HandleTouchInput()
    {
        if (Input.touchCount == 0)
        {
            return;
        }

        Touch touch =
            Input.GetTouch(0);

        if (
            touch.phase ==
            TouchPhase.Began
        )
        {
            touchStartPosition =
                touch.position;
        }

        if (
            touch.phase ==
            TouchPhase.Ended
        )
        {
            float deltaX =
                touch.position.x -
                touchStartPosition.x;
            
            if (
                Mathf.Abs(deltaX) <
                swipeThreshold
            )
            {
                return;
            }

            if (deltaX > 0)
            {
                currentLane = 1;
            }
            else
            {
                currentLane = -1;
                
            }
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

    private void UpdateAnimator()
    {
        if (animator != null)
        {
            if (!CanMove)
            {
                animator.SetBool("CanMove", false);
            }
            else
            {
                animator.SetBool("CanMove", true);
            }
        }
    }
}