export class TimerObj {
    public type: number;
    public time_in_min: number;

    constructor(type: number, time_in_min: number){
        this.type= type;
        this.time_in_min= time_in_min;
    }
}