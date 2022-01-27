import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { TimerTypeEnum } from 'src/app/shared/enums/timertype.enum';
import { TimerObj } from 'src/app/shared/timer.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.css']
})
export class TimerListComponent implements OnInit {
  timers: TimerObj[] = [];
  @Output()
  loadActivityEmit = new EventEmitter<TimerObj[]>();

  @ViewChild('btnLoadActivity')
  btnLoadActivity;

  total_time: number = 0;
  total_time_hrs: number = 0;
  total_time_min: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getTotalTime() {
      this.total_time = 0;
      this.timers.forEach(t => {
        this.total_time += t.time_in_min;
      });
      this.total_time_hrs = Math.floor(this.total_time / 60);
      this.total_time_min = this.total_time % 60;
  }

  onAdd(newTimer){
    if(!this.btnLoadActivity.nativeElement.disabled){
      newTimer.time_in_min = 0.1;
      this.timers.push(newTimer);
      this.getTotalTime();
    }    
    else{
      //TODO: toastr notification
    }
  }

  timerComplete(num_of_timers_completed: number){
    let t: number = 0;
    this.timers.forEach(timer => {
      if(t < num_of_timers_completed){
        timer.is_complete = true;
        t += 1;
      }
    });
  }

  getTimerName(typeId: number){
    return TimerTypeEnum[Number(typeId)];
  }

  onDelete(timer_index: number, timer: TimerObj){
    // Can delete only if load activity is not clicked
    if(!this.btnLoadActivity.nativeElement.disabled){
      if(!timer.is_complete) this.timers.splice(timer_index, 1);
      this.getTotalTime();
    }    
    else{
      //TODO: toastr notification
    }
  }

  loadActivity() {
    this.loadActivityEmit.emit(this.timers);
    this.btnLoadActivity.nativeElement.disabled = true;
  }

}
