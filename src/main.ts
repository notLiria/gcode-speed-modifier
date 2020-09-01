
import * as Calculations from "./calculations";
import * as Gcode from "./gcode"
import "normalize.css";
import "./styles/main.scss";


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//const btn = document.getElementById("calc");
const variables = $$(".calc-input");
const outputContainer = $(".output-container") as HTMLDivElement;

variables.forEach((input) => {
  input.addEventListener("change", () => {
    outputContainer.removeAttribute("hidden");
    generate_outputs();
  });
});

function preprocess_gcode_text(text: string){
  const split_text = text.split("\n");
  const cleaned_text = split_text.filter(line => !line.includes(";"))
                                .map(x => x.trim().toUpperCase());
  const initialGcodeArr = cleaned_text.map(x => new Gcode.GcodeLine(x));  
  return initialGcodeArr;
}

function accumulate_layers(gcode: Gcode.GcodeLine[], lines_so_far: number,
                   lines_to_stop: number, output: Gcode.GcodeLine[]){
  if (lines_so_far >= lines_to_stop){
    return output;
  }
  output.push(gcode[0]);
  if (gcode[0].z_move){
    lines_so_far = lines_so_far + 1;
  }
  gcode.shift();
  return accumulate_layers(gcode, lines_so_far, lines_to_stop, output);
}

function increment_speeds(gcode: Gcode.GcodeLine[], step_size: number,
       output: Gcode.GcodeLine[]){
  if (gcode.length > 0){
    
  }
}

function linear_ramp(gcode: Gcode.GcodeLine[]){
  const ramp_level = parseInt((document.getElementById("ramp_layer") as HTMLInputElement).value);
  const ramp_gcode = accumulate_layers(gcode, 0, ramp_level, []);
  const speeds = ramp_gcode.filter(x => x.e_move).map(x => x.speed);
  const max_speed = Math.max.apply(null, speeds);
  const min_speed = Math.min.apply(null, speeds);
  const step = (max_speed - min_speed) / ramp_level
  console.log(min_speed, max_speed, step);
  console.log(gcode.length);
  console.log(ramp_gcode[550].movement_command.command)
  return ramp_gcode;
}

function generate_outputs(){
  const gcode_file = (document.getElementById("input_file") as HTMLInputElement).files[0];
  gcode_file.text().then(text => console.log(linear_ramp(preprocess_gcode_text(text))));
}