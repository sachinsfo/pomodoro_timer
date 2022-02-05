
export function get_minutes_seconds(current_time_seconds: number) {
    let minutes_minutes: number = Math.floor(current_time_seconds / 60);
    let minutes_seconds: number = current_time_seconds % 60;
    return [minutes_minutes, minutes_seconds];
}