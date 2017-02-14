// Matt Telker
// CS 546 Lab 2


function checkIsProperNumber(val, variableName){
    if (val === undefined || typeof val !== "number"){
            throw `${variableName || 'provided variable'} is not a number`;
    }
}


module.exports = {
    triangle: (lines)=>{
        //check for nonsense input and throw
        checkIsProperNumber(lines,"lines");
        var y = 0;
        var line = "";

        //loop to build the shape of the triangle
        for (var x = 1;x <= lines;x++){

            //loop to add the padding spaces before the left of the triangle
            for (var a = y; a < lines - 1; a++){
                line += " ";
            }
            //begin left of triangle
            line += "/";

            //loop to add either white space or bottom line
            for (var z = 0; z < y; z++){
                if (x == lines){
                   line += "--";
                }
                else{
                    line += "  ";
                }
            }
            y++;
            line+= "\\\n";
        }
        console.log(line);
        line = "";
    },


    square: (lines) =>{
        checkIsProperNumber(lines,"lines");
        if (lines > 1){
            var line = "";
            for (var x = 1; x<=lines;x++){

                line += "    |";
                for (var a = 0; a < lines; a++){
                    if (x == 1 || x == lines){
                        line += "-";
                    } else {
                        line += " ";
                    }
                }
                line += "|";
                console.log(line);
                line = "";
            }

        } else {
            throw `Provided variable is not valid.`;
        }
    },

    rhombus: (lines) =>{
        checkIsProperNumber(lines, "lines");
        if (lines> 1 && !(lines % 2)){
            var line = "";
            var whiteSpace = 0;
            var interior = 1;
            for (var x = 1; x <= lines; x++){
                if (whiteSpace < lines/2) {
                    for (var a = whiteSpace; a < lines; a++){
                        line += " ";
                    }
                } else {
                    for (var a = lines-whiteSpace-1; a<lines; a++){
                        line += " ";
                    }
                }
                whiteSpace++;
                if (whiteSpace <= lines/2){
                    line += "/";
                } else {
                    line += "\\";
                }

                //left side complete, now to create the interior and right side

                if (x == 1){
                    line += "-\\";
                } else if (x == lines) {
                    line += "-/";
                } else {
                    if (x <= lines/2){
                        for (var k = 1; k < x; k++){
                            line += "  ";
                        }
                        line+= " ";
                    } else {
                        for (var k = 1; k<= lines-x;k++ ){
                            line += "  ";
                        }
                        line += " ";
                    }

                    //right side
                    if (x <= lines/2){
                        line+="\\";
                    } else{
                        line += "/";
                    }
                }
                console.log(line);
                line = "";
            }

        } else{
            throw `Provided variable is invalid.`;
        }
    }
};

