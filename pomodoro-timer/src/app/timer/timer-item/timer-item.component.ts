import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { TimerTypeEnum } from 'src/app/shared/enums/timertype.enum';
import { MatButtonModule } from '@angular/material/button';
import { TimerObj } from 'src/app/shared/timer.model';

@Component({
  selector: 'app-timer-item',
  templateUrl: './timer-item.component.html',
  styleUrls: ['./timer-item.component.css']
})
export class TimerItemComponent implements OnInit {
  timerTypes: {
    'name': string,
    'value': number
  }[] = [];
  selectedTimerType: number = 0;
  inputTimeValue: number = 1;
  @ViewChild('timeEntered')
  timeEntered: ElementRef;

  @Output()
  newTimerItemEvent = new EventEmitter<TimerObj>();

  constructor() { }

  ngOnInit(): void {
    this.insertTimerTypes();
  }

  insertTimerTypes() {
    for(const val in Object.keys(TimerTypeEnum)){
      if(typeof TimerTypeEnum[val] !== 'string') continue;
      let typeId: number = Number(val);
      let typeName: string = TimerTypeEnum[Number(val)];
      this.timerTypes.push({'name': typeName, 'value': typeId});
    }
    this.selectedTimerType = 0;
  }

  onAddItem() {
    let time_entered: number = parseInt(this.timeEntered.nativeElement.value);
    if(time_entered <= 0) time_entered = 1;
    if(time_entered > 99) time_entered = 99;
    let newTimerObj: TimerObj = {type: this.selectedTimerType, time_in_min: time_entered, is_complete: false}
    this.newTimerItemEvent.emit(newTimerObj);
  }

}
