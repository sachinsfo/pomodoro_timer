export class TimerObj {
    public type: number;
    public time_in_min: number;
    public is_complete: boolean;

    constructor(type: number, time_in_min: number, is_complete: boolean = false){
        this.type = type;
        this.time_in_min = time_in_min;
        this.is_complete = is_complete;
    }
}