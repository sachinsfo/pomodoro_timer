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

  total_time: number = 0;
  total_time_hrs: number = 0;
  total_time_min: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getTotalTime() {
      this.total_time = 0;
      this.timers.forEach(t => {
        if(!t.is_complete) this.total_time += t.time_in_min;
      });
      this.total_time_hrs = Math.floor(this.total_time / 60);
      this.total_time_min = this.total_time % 60;
  }

  onAdd(newTimer: TimerObj){
    // add only if the activity is not loaded
    if(!this.activity_loaded){
      //newTimer.time_in_min = 0.1;
      this.timers.push(newTimer);
      //console.log(this.timers)
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
    this.getTotalTime();
  }

  getTimerName(typeId: number){
    return TimerTypeEnum[Number(typeId)];
  }

  onDelete(timer_index: number, timer: TimerObj){
    // Can delete only if load activity is not clicked
    if(!this.activity_loaded){
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
      self.getTotalTime();
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
