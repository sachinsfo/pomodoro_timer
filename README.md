# pomodoro_timer
Customizable Pomodoro timer to track focus activities

Instructions:
1. Slider
- Use slider to increase or decrese the timer font-size

2. Adding an activity - Single timer
- Choose a dropdown of timer type, enter minutes and click Add
- This will add a new timer to the activity (Timer list)
- Click 'Load Activity' to load the timer into the main timer
- Click 'Start' and 'Stop' to manage the timer

3. Adding an activity - Multiple timers
- Choose a dropdown of timer type, enter minutes and click Add
- Repeat this as many time as you like
- This will add a new timers to the activity (Timer list)
- Click 'Load Activity' to load all the timers into the main timer
- Click 'Start' and 'Stop' to manage the timers

4. Upload an activity
- Upload a json file of type {"timers": {"type": 0, "time_in_min": 1, "is_complete": false}}
- This will automatically load all the timers as specified in your template
- Click 'Load activity' and use timer as usual

5. Save activity to a file
- Click to save your existing activity to a file

6. Use penalty timer - Checked 
- When a timer is running and you clicked Stop, an internal timer will count the 'away' time
- When you are back to focus and clicked Start, the 'away' will be re-added back to the original timer
- (TBD) This will impact the efficiency calculation of your activity

7. Use penalty timer - Unchecked
- No 'away' time is added whenever you stop the clock

8. Auto start next timer - Checked
- Runs through all timers in the activity are completed

9. Auto start next timer - Unchecked 
- Manually start each timer after completion