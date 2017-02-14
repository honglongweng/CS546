fs = require('fs');



module.exports = {
	// Read file as string using promises.
	getFileAsString: (path) => {
		return new Promise((fulfill, reject) => {
			if (!path) reject("No path provided");
			fs.readFile(path, 'utf8', function(err,data) {
				if (err) reject(err);
				else fulfill(data);
				}
			)
		}
	)},

	// Read file as JSON using promises.
	getFileAsJSON: (path) => {
		return new Promise((fulfill, reject) => {
			if (!path) reject("No path provided");
			fs.readFile(path, 'utf8', function(err,data){
				if (err) reject(err);
				else {
					try {
						fulfill(JSON.parse(data));
					}
					catch (err) {
						reject(err);
					}
				}
				
			})
		})
	},

	// Save string to file using promises.
	saveStringToFile: (path, text) => {
		return new Promise((fulfill, reject) => {
			if (!path || !text) reject("One or both params not supplied");
			fs.writeFile(path, text, function(err) {
    			if(err)	reject("Error saving file.");
    			fulfill(true);
			})
		})
	},

	// Save JSON to file using promises.
	saveJSONToFile: (path, obj) => {
		return new Promise((fulfill, reject) => {
			if (!path || !obj || typeof obj !== 'object') reject("One or both params not valid.");
			//module.exports.saveStringToFile(path, JSON.stringify(obj));
			fs.writeFile(path, JSON.stringify(obj), function(err) {
    			if(err)	reject("Error saving file.");
    			fulfill(true);
			})
		})
	}
}