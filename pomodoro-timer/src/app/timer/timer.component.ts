import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timer;
  @ViewChild('initialSetTime', {static: true})
  initialSetTime: number = 1500;

  current_time: number = this.initialSetTime;
  minutes_minutes: number = Math.floor(this.current_time / 60);
  minutes_seconds: number = this.current_time % 60;

  constructor() { }

  ngOnInit(): void {
  }

  onStart() {
    if(this.current_time > 0){
      this.timer = setInterval(() => {
        this.current_time -= 1;
        this.minutes_minutes = Math.floor(this.current_time / 60);
        this.minutes_seconds = this.current_time % 60;
        if(this.current_time == 0) this.onComplete();
      }, 1000);
    }
  }

  onComplete() {
    clearInterval(this.timer);
    this.current_time = 0;
  }

  onStop(){
    clearInterval(this.timer);
  }

  onReset(){
    clearInterval(this.timer);
  }

  onSetTime() {
    this.current_time = this.initialSetTime * 60;
    this.minutes_minutes = Math.floor(this.current_time / 60);
    this.minutes_seconds = 0;
    console.log(this.current_time, this.initialSetTime);
  }

}
