/* Matt Telker
 * CS 546
 * Lab 8
 */

var myForm = document.getElementById('palForm');

/* This is the eventListener for the submit button click */
myForm.addEventListener('submit', function(e)
{
    e.preventDefault();
    /* I store the value of the palindrome in possPalindrome */
    var possPalindrome = document.getElementById("inputText").value;

    /* If the value is something other than an empty string, check if
     * it's a palindrome. If not, fire an alert informing the user
     * to input some text */
    if (possPalindrome != ""){
        /* Create the li to be inserted  */
        var node=document.createElement("li");

        /* Give it the class that is returned from isPalindrome */
        node.className = isPalindrome(possPalindrome);
        var textnode=document.createTextNode(possPalindrome);
        node.appendChild(textnode);

        /* Add it to the list and clear the input box */
        document.getElementById('palList').appendChild(node);
        document.getElementById("inputText").value = "";
    } else {
        alert("You must enter some text to check!");
    }
}); 

/* This function takes a parameter text that it analyze to see if it
 * is a palindrome. If it is, it returns 'is-palindrome' and if it is
 * not it returns 'not-palindrome'. To be called from the event listener */
function isPalindrome(text){
    if (text === undefined){
        return;
    }
    /* Store original formatted string using regex to strip all symbols and whitespace */
    var originalString = text.toLowerCase().replace(/[^\w]|_/g, "");

    /* Store formatted reversed string */
    var reversedString = text.toLowerCase().replace(/[^\w]|_/g, "").split("").reverse().join("");

    /* If the two strings are equal to each other, it is a palindrome */
    if (originalString == reversedString){
        return 'is-palindrome';
    } else{
        return 'not-palindrome';
    }
}