# pomodoro_timer
Customizable Pomodoro timer to track focus activities

![sample image](https://i.ibb.co/hCC368T/Pomodoro-Timer-2022-01-27-19-40-06-1.png)

Instructions:
1. Slider
- Use slider to increase or decrease the timer font-size

2. Adding an activity - Single timer
- Choose a timer type from the dropdown, enter minutes and click Add
- This will add a new timer to the activity (Timer list)
- Click 'Load Activity' to load the timer into the main timer
- Click 'Start' and 'Stop' to manage the timer

3. Adding an activity - Multiple timers
- Choose a timer type from the dropdown, enter minutes and click Add
- Repeat this as many time as you like
- This will add new timers to the activity (Timer list)
- Click 'Load Activity' to load all the timers into the main timer
- Click 'Start' and 'Stop' to manage the timers

4. Upload an activity
- Upload a json file of type {"timers": [{"type": 0, "time_in_min": 1, "is_complete": false}]}
- This will automatically load all the timers as specified in your template
- Click 'Load activity' and use timer as usual

5. Save activity to a file
- Enter a prefered file name 
- And click 'Save activity' to save your activity to a file to upload it later if needed

6. Load activity
- Click 'Load activity' to load the timers into the main timer

7. Use penalty timer - Checked 
- When a timer is running and you clicked Stop, an internal timer will count the 'away' time
- When you are back to focus and clicked Start, the 'away' time will be re-added back to the original timer
- (TBD) This will impact the efficiency calculation of your activity

8. Use penalty timer - Unchecked
- No 'away' time is added whenever you stop the clock

9. Auto start next timer - Checked
- Runs through all the timers in the activity are exhausted

10. Auto start next timer - Unchecked 
- Manually start each timer after completion


- by Sachin Chepuri (https://developr.dev)