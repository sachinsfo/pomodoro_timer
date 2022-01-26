import { Component, DoCheck, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, DoCheck{
  timer;
  @ViewChild('initialSetTime', {static: true})
  initialSetTimeMinutes: number = 25;

  @ViewChild('timeTextValue', {static: true})
  timeTextValue;
  paragraphFontSize: string;

  @ViewChild('startButton', {static: true})
  startButton;
  @ViewChild('stopButton', {static: true})
  stopButton;

  current_time: number = this.initialSetTimeMinutes * 60;
  minutes_minutes: number = Math.floor(this.current_time / 60);
  minutes_seconds: number = this.current_time % 60;

  constructor() { }

  ngOnInit(): void {
  }


  ngDoCheck(): void {
    let mult = 6;
    if(this.timeTextValue.value * mult < 25){
      this.paragraphFontSize = 25 + 'px';
    } 
    else {
      this.paragraphFontSize = (this.timeTextValue.value * mult) + 'px';
    }
  }

  runTimer() {
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
    this.startButton.nativeElement.disabled = true;
    this.stopButton.nativeElement.disabled = false;
  }

  onComplete() {
    clearInterval(this.timer);
    this.current_time = 0;
  }

  onStop() {
    clearInterval(this.timer);
    this.stopButton.nativeElement.disabled = true;
    this.startButton.nativeElement.disabled = false;
  } 

  onReset(){
    clearInterval(this.timer);
    this.stopButton.nativeElement.disabled = true;
    this.startButton.nativeElement.disabled = false;
    this.validateInitialSetMinutes();
  }

  validateInitialSetMinutes(){
    if(this.initialSetTimeMinutes <= 0) this.initialSetTimeMinutes = 1;
    if(this.initialSetTimeMinutes > 99) this.initialSetTimeMinutes = 99;
  }

  onSetTime() {
    this.validateInitialSetMinutes();
    this.current_time = this.initialSetTimeMinutes * 60;
    this.minutes_minutes = Math.floor(this.current_time / 60);
    this.minutes_seconds = 0;
    this.onReset();
    this.startButton.nativeElement.disabled = false;
  }

}
