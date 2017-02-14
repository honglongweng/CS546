// Function to count the occurances of each word, called by textMetrics
function wordOccurances(text){
	return text.trim().split(/\s+/).reduce(function(array, word){
        	if (word in array){
        		array[word]++;
        	} else { 
        		array[word] = 1;
        	}
        	return array;
        }, Object.create(null));
}


module.exports = {
	simplify: (text) => {
		// First the text is changed to all lowercase, then non words/spaces are stripped,
		// and finally tabs and 
		return text.toLowerCase().replace(/[^\w\s]/g,'').replace(/[\t\s]/g, ' ');
	},

    textMetrics: (text) => {
        var returnObj = new Object();
        // Writeup requested that the textMetrics function simplify the text.
        text = module.exports.simplify(text);

        // Count alpha characters. Not necessary to check A-Z since everything
        // is lowercase at this point but whatever
        returnObj.totalLetters = text.match(/[A-Za-z]/g).length;

        // Count all words
        returnObj.totalWords = text.match(/(\w+)/g).length;

        //Count all words 6 letters or longer
        returnObj.longWords = text.match(/(\w{6,})/g).length;

        // Divide totalLetters by totalWords to get average length
        returnObj.averageWordLength = returnObj.totalLetters/returnObj.totalWords;
        //returnObj.splitTest = text.trim().split(/\s+/);
        
        // Count the keys of the object to determine the count of unique words
        returnObj.uniqueWords = Object.keys(wordOccurances(text)).length;
        returnObj.wordOccurances = wordOccurances(text);

        return returnObj;
    }
}




