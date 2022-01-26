import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.css']
})
export class TimerListComponent implements OnInit {
  timers: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.timers.push('Regular');
    this.timers.push('ShortBreak');
    this.timers.push('LongBreak');
  }

}
