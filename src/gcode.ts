export class MovementCommand{    
    g_command: string;
    f_value: number;
    x_value: number;
    y_value: number;
    z_value: number;
    e_value: number;    
    constructor(g: string){
        const command = g.split(" ");
        this.g_command = command[0]
        if(command.length > 1){
            const movements = command.slice(1)
                .map(x => [x.substring(0, 1), x.slice(1)]);
            let pair;
            for (pair of movements){
                if (pair[0] == "X") this.x_value = parseFloat(pair[1]);
                if (pair[0] == "Y") this.y_value = parseFloat(pair[1]);
                if (pair[0] == "Z") this.z_value = parseFloat(pair[1]);
                if (pair[0] == "F") this.f_value = parseFloat(pair[1]);
                if (pair[0] == "E") this.e_value = parseFloat(pair[1]);
            }
        }
    
    
    }
    get command(){
        let output = this.g_command + " ";
        if (this.f_value) output = output + "F" + this.f_value.toString() + " ";
        if (this.x_value) output = output + "X" + this.x_value.toString() + " ";
        if (this.y_value) output = output + "Y" + this.y_value.toString() + " ";
        if (this.z_value) output = output + "Z" + this.z_value.toString() + " ";
        if (this.e_value) output = output + "E" + this.e_value.toString() + " ";
        return output;
    }
}

export class GcodeLine{
    private readonly _line : string;    
    movement_command: MovementCommand;
    move_command: boolean;
    z_move: boolean;
    e_move: boolean;
    speed: number;
    constructor(g: string){
        this._line = g;  
        if (this._line.includes("F") && 
                    ["X", "Y", "Z"].some(el => this._line.includes(el))){
            if (this._line.includes("Z")){
                this.z_move = true
            }
            if (this._line.includes("E")){
                this.e_move = true
            }
            this.move_command = true;
            const feedrateRegex = /(F[0-9]{1,})/g
            const feedrateArray = feedrateRegex.exec(this._line);
            this.speed = parseFloat(feedrateArray[0].substring(1));
            this.movement_command = new MovementCommand(g);
        }
    }
    toString(){
        return this._line;
    }    
}

export class GcodeFile{
    private readonly _gcode: GcodeLine[];
    is_modded: boolean;
    constructor(g: GcodeLine[]){
        this._gcode = g;
    }
    get gcode (){
        return this._gcode;
    }

}

