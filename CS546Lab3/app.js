/* Matt Telker
 * CS-546 Lab 3
 */


const textMetrics = require("./textMetrics.js");
const fileData = require("./fileData.js");
const fs = require("fs");

// This function loops over i so that I only had to write the main logic once for all
// 3 files
function doWork(i){
	if (fs.existsSync("./chapter"+ i + ".result.json")){
		//console.log("Found it!");
		fileData.getFileAsJSON("./chapter" + i + ".result.json").then((fileContent) => {
			console.log(fileContent);
		}, (fileReadError) => {
			console.log(fileReadError);
		});
	}
	else {
		fileData.getFileAsString("chapter"+ i + ".txt").then((fileContent)=>{
			fileData.saveStringToFile("./chapter" + i + ".debug.txt", textMetrics.simplify(fileContent));
			var results = textMetrics.textMetrics(fileContent);
			fileData.saveJSONToFile("./chapter" + i + ".result.json", results);
			console.log(results);
		}, (error) => {
			console.log(error);
		});
	}

}

// A loop to run doWork 3 times, one for each chapter.
for (var i = 1; i < 4; i++){
	doWork(i);
}



/* Below you will find my testing code */

//console.log(textMetrics.simplify("Hi all, here comes a tab\tand a \n ALL CAPS and some special chars @#$%&"));

//console.log(textMetrics.textMetrics("@ Hi all, here        cu  comes a tab\tand a \n ALL CAPS And some special chars @#$@#%"));

//let testobj = textMetrics.textMetrics("@ Hi all, here        cu  comes a tab\tand a \n ALL CAPS And some special chars @#$@#%");
//let saveJSON = fileData.saveJSONToFile("./saveJSON.json", testobj);


//let test2 = fileData.getFileAsString();
//let text = fileData.getFileAsString("./test.txt");
//let jsontest = fileData.getFileAsJSON();
//let jsontest2 = fileData.getFileAsJSON("./test.json");
//let savestring = fileData.saveStringToFile("./save.txt", "This is a test!");


/*
text.then((fileContent) => {
	console.log(fileContent);
}, (readFileError) => {
	console.log(readFileError);
})

test2.then((fileContent) => {
	console.log(fileContent);
}, (fileReadError) => {
	console.log(fileReadError);
})


jsontest.then((fileContent) => {
	console.log(fileContent);
}, (fileReadError) => {
	console.log(fileReadError);
})
jsontest2.then((fileContent) => {
	console.log(fileContent);
}, (fileReadError) => {
	console.log(fileReadError);
})

savestring.then((success) => {
	console.log(success);
}, (fileSaveError) => {
	console.log(fileSaveError);
})

saveJSON.then((success) => {
	console.log(success);
}, (fileSaveError) => {
	console.log(fileSaveError);
})
*/

