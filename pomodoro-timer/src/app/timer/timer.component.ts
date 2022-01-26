import { Component, DoCheck, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TimerObj } from '../shared/timer.model';
import { TimerTypeEnum } from '../shared/enums/timertype.enum';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, DoCheck{
  timer;
  penalty: number = 0;
  penaltyTimer;
  chkboxPenaltyTime: boolean = false;
  chkboxAutoTimer: boolean = true;

  @ViewChild('initialSetTime', {static: true})
  initialSetTimeMinutes: number = 25;

  @ViewChild('timeTextValue', {static: true})
  timeTextValue;
  paragraphFontSize: string;

  @ViewChild('startButton', {static: true})
  startButton;
  @ViewChild('stopButton', {static: true})
  stopButton;

  timer_list: TimerObj[] = [];

  current_time_seconds: number = this.initialSetTimeMinutes * 60;
  minutes_minutes: number = Math.floor(this.current_time_seconds / 60);
  minutes_seconds: number = this.current_time_seconds % 60;
  
  constructor() { }

  ngOnInit(): void {
    //TODO Calculate efficiency of the activity whenever penalty is used
    //this.timer_list.push({type: TimerType.Regular, time_in_min: 0.3});
    this.timer_list.push({type: TimerTypeEnum.Regular, time_in_min: 0.1});
    this.timer_list.push({type: TimerTypeEnum.Regular, time_in_min: 0.2});
    console.log(this.timer_list)
  }


  ngDoCheck(): void {
    if(!this.initialSetTimeMinutes) this.initialSetTimeMinutes = 1;
    let mult = 6;
    if(this.timeTextValue.value * mult < 25){
      this.paragraphFontSize = 25 + 'px';
    } 
    else {
      this.paragraphFontSize = (this.timeTextValue.value * mult) + 'px';
    }
  }

  updateTimer(new_time: number) {
    this.minutes_minutes = Math.floor(this.current_time_seconds / 60);
    this.minutes_seconds = this.current_time_seconds % 60;

  }

  loadNextTimer() {
    if(this.timer_list.length > 0){
      let newTimer = this.timer_list.pop();
      this.current_time_seconds = newTimer.time_in_min * 60;
      this.updateTimer(this.current_time_seconds);
    }
  }

  onStart() {
    // if penalty is zero that means clock is stopped by the user 
    // Otherwise, the timer is complete
    if(this.penalty === 0){
      this.loadNextTimer();
    }
    else {
      clearInterval(this.penaltyTimer);
    }
    console.log(this.timer_list)
    if(this.current_time_seconds > 0){
      this.current_time_seconds += this.penalty;
      this.timer = setInterval(() => {
        this.current_time_seconds -= 1;
        this.updateTimer(this.current_time_seconds);
        if(this.current_time_seconds === 0) this.onComplete();
      }, 1000);
    }
    this.startButton.nativeElement.disabled = true;
    this.stopButton.nativeElement.disabled = false;
  }

  onComplete() {
    clearInterval(this.timer);
    //this.current_time_seconds = 0;
    console.log(this.chkboxAutoTimer, this.current_time_seconds, this.timer_list)
    this.penalty = 0;
    if(this.chkboxAutoTimer){
      this.onStart();
    }
    //when all timers are exhausted
    if(this.current_time_seconds === 0){
      this.stopButton.nativeElement.disabled = true;
      this.startButton.nativeElement.disabled = false;
    }
  }

  onStop() {
    clearInterval(this.timer);
    // if all the timers are complete, then no need to run the penalty timer
    if(this.current_time_seconds > 0){
      this.stopButton.nativeElement.disabled = true;
      this.startButton.nativeElement.disabled = false;
      // reset the penalty to 1 each time the stop button is clicked
      if(this.chkboxPenaltyTime){
        this.penalty = 1;
        this.penaltyTimer = setInterval(()=>{
          this.penalty += 1;
          console.log(this.penalty)
        }, 1000);
      }
      else{
        clearInterval(this.penaltyTimer);
      }
    }
  } 

  validateInitialSetMinutes(){
    if(this.initialSetTimeMinutes <= 0) this.initialSetTimeMinutes = 1;
    if(this.initialSetTimeMinutes > 99) this.initialSetTimeMinutes = 99;
    if(!this.initialSetTimeMinutes) this.initialSetTimeMinutes = 1;
  }

  onSetTime() {
    this.validateInitialSetMinutes();
    this.current_time_seconds = this.initialSetTimeMinutes * 60;
    this.minutes_minutes = Math.floor(this.current_time_seconds / 60);
    this.minutes_seconds = 0;
    clearInterval(this.timer);
    clearInterval(this.penaltyTimer);
    this.stopButton.nativeElement.disabled = true;
    this.startButton.nativeElement.disabled = false;
  }

  onChangePenaultyCheckbox(event) {
    this.chkboxPenaltyTime = event.checked;
    if(!this.chkboxPenaltyTime) {
      clearInterval(this.penaltyTimer);
      this.penalty = 0;
    }
  }

  onChangeAutoTimerCheckbox(event){
    this.chkboxAutoTimer = event.checked;
  }

  //TODO: Implement a max limit on penalty, otherwise it might go beyond 99 minutes

}
