# pomodoro_timer
Customizable Pomodoro timer to track focus activities

Instructions:
1. Use slider to increase or decrese the timer font-size

2. Adding an activity
2.1 Single timer
- Choose a dropdown of timer type, enter minutes and click Add
- This will add a new timer to the activity (Timer list)
- Click 'Load Activity' to load the timer into the main timer
- Click 'Start' and 'Stop' to manage the timer

2.2 Multiple timers
- Choose a dropdown of timer type, enter minutes and click Add
- Repeat this as many time as you like
- This will add a new timers to the activity (Timer list)
- Click 'Load Activity' to load all the timers into the main timer
- Click 'Start' and 'Stop' to manage the timers

3. Upload an activity
- Upload a json file of type {"timers": {"type": 0, "time_in_min": 1, "is_complete": false}}
- This will automatically load all the timers as specified in your template
- Click 'Load activity' and use timer as usual

4. Save activity to a file
- Click to save your existing activity to a file

5. Use penalty timer 
5.1 Checked 
- When a timer is running and you clicked Stop, an internal timer will count the 'away' time
- When you are back to focus and clicked Start, the 'away' will be re-added back to the original timer
- (TBD) This will impact the efficiency calculation of your activity

5.2 Unchecked
- No 'away' time is added whenever you stop the clock

6. Auto start next timer
6.1 Checked
- Runs through all timers in the activity are completed

6.2 Unchecked 
- Manually start each timer after completion