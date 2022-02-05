import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { TimerTypeEnum } from 'src/app/shared/enums/timertype.enum';
import { TimerObj } from 'src/app/shared/timer.model';
import { MatIconModule } from '@angular/material/icon';
import { saveAs } from 'file-saver';

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
  activity_loaded: boolean = false;

  uploaded_file_name: string = 'No file chosen';
  file_content: string = '';
  displayFileReadError: boolean = false;
  fileUploadSuccessful: boolean = false;
  file_uploaded_once: boolean = false;
  file_name: string = '';

  total_time_left: number = 0;
  time_left_hrs: number = 0;
  time_left_min: number = 0;
  time_left_sec: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  calcTotalTimeLeft(seconds_remaining: number = 0) {
      this.total_time_left = 0;
      let flag: boolean = true;
      if(this.activity_loaded){
        for(var i=0; i<this.timers.length; i++){
          let t: TimerObj = this.timers[i];
          // first incomplete timer is the current timer
          // So, seconds_remaining is the seconds_remaining of the current timer
          if(!t.is_complete && flag){
            this.total_time_left += Math.floor(seconds_remaining/60);
            flag = false;
          }
          else if(!this.timers[i].is_complete){
            this.total_time_left += t.time_in_min;
          }
        }
      }
      else {
        // when default 25 minute timer is started without loading the activity
        if(this.timers.length == 0){
          this.total_time_left = Math.floor(seconds_remaining/60);
        }
        else{
          this.timers.forEach(t => {
            if(!t.is_complete) this.total_time_left += t.time_in_min;
          });
        }
      }
      this.time_left_hrs = Math.floor(this.total_time_left / 60);
      this.time_left_min = this.total_time_left % 60;
      this.time_left_sec = seconds_remaining % 60;
  }

  onAdd(newTimer: TimerObj){
    // add only if the activity is not loaded
    if(!this.activity_loaded){
      //newTimer.time_in_min = 0.1;
      this.timers.push(newTimer);
      //console.log(this.timers)
      this.calcTotalTimeLeft();
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
    this.calcTotalTimeLeft();
  }

  getTimerName(typeId: number){
    return TimerTypeEnum[Number(typeId)];
  }

  onDelete(timer_index: number, timer: TimerObj){
    // Can delete only if load activity is not clicked
    if(!this.activity_loaded){
      if(!timer.is_complete) this.timers.splice(timer_index, 1);
      this.calcTotalTimeLeft();
    }    
    else{
      //TODO: toastr notification
    }
  }

  loadActivity() {
    this.loadActivityEmit.emit(this.timers);
    this.btnLoadActivity.nativeElement.disabled = true;
    this.activity_loaded = true;
  }

  saveActivity(){
    let downloadTimersObj = {
      "timers": this.timers
    };
    var blob = new Blob([JSON.stringify(downloadTimersObj)], {type: 'text/plain;charset=utf-8'});
    if(!this.file_name){
      this.file_name = Date.now().toString();
    }
    this.file_name = this.file_name.replace(/[^a-zA-Z0-9._]/g, '');
    saveAs(blob, `${this.file_name}.txt`);
  }

  onFileUpload(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    let self = this;
    fileReader.onloadend = (x) => {     
      self.timers = JSON.parse(fileReader.result as string)['timers'];
      // all timers are false when they are uploaded
      self.timers.forEach(element => {
        element.is_complete = false;
        if(element.time_in_min <= 0) element.time_in_min = 1;
        if(element.time_in_min > 99) element.time_in_min = 99;
      });
      self.calcTotalTimeLeft();
      this.file_uploaded_once = true;
      this.fileUploadSuccessful = true;
      this.displayFileReadError = false;
    };
    // TODO not working as expected
    fileReader.onerror = (error) => {
      self.displayFileReadError = true;
      this.fileUploadSuccessful = false;
    };
  }

}
