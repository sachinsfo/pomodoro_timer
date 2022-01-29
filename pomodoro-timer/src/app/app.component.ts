import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { get_minutes_seconds } from './helpers/get_minutes_seconds';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public constructor(private titleService: Title) {}

  title = 'pomodoro-timer';
  background_color: string;
  color_timer;
  total: number;
  flag: boolean = true;
  seconds: number = 0;

  setTitle(newTitle: string){
    this.titleService.setTitle(newTitle);
  }

  // set_frequency(freq: number, secondary_color: string = 'white'){
  //   // freq in milliseconds
  //   // TODO need to support other frequencies 
  //   this.total = 1000;
  //   let primary_color: string = 'white'
  //   this.color_timer = setInterval(()=>{
  //     console.log('start.', this.total)
  //     if(this.total <= freq){
  //       this.background_color = primary_color;
  //       console.log('1');
  //       this.clear_timer();
  //     }
  //     else{
  //       this.background_color = secondary_color;
  //       console.log('2', this.total);
  //     }
  //     this.total -= freq;
  //     if(this.total < 0) this.clear_timer();
  //     console.log('done.', this.total)
  //   }, freq);
  // }

  clear_timer(){
    clearInterval(this.color_timer);
  }
  
  seconds_remaining(seconds: number){
    this.seconds = seconds;
    let current_time = get_minutes_seconds(this.seconds);
    this.setTitle( current_time[0] + ':' + current_time[1]);
    if(seconds > 120) this.background_color = 'white';
    if(seconds === 0) this.background_color = 'red';
    else {
      if(seconds <= 30){
        //this.set_frequency(500, 'red');
        if(seconds % 2 === 0) this.background_color = 'red';
        if(seconds % 2 !== 0) this.background_color = 'white';
      }
      else if(seconds <= 60) {
        if(seconds % 2 === 0) this.background_color = 'orangered';
        if(seconds % 2 !== 0) this.background_color = 'white';
      }
      else if(seconds <= 90) {
        this.background_color = 'orange'
      }
      else if(seconds <= 120) {
        this.background_color = 'yellow'
      }
    }
  }
}
