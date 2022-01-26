import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { TimerTypeEnum } from 'src/app/shared/enums/timertype.enum';
import { MatButtonModule } from '@angular/material/button';

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
  selectedTimerType: number;
  inputTimeValue: number;

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
    console.log(this.timerTypes);
  }

}
