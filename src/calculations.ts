export function clamp(min_speed : number, max_speed: number, x: number){
  return Math.min(Math.max(x, min_speed), max_speed)
}

export function scale(min_speed: number, max_speed: number, 
                old_min: number, old_max: number, x: number){
  const percentage = x/(old_max - old_min);
  return clamp(min_speed, max_speed, percentage * (max_speed - min_speed))
}
