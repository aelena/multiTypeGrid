/*  
Small library to mimic the .net StringBuilder class functionality.
All operations (except toString()) return the updated object reference
so concatenation can be done like this:
    
var sb = new StringBuilder().append("string 1 ").append(" for whatever reason").append(" appears here");

or

sb.append("string 1 ").append(" for whatever reason").append(" appears here");

or clear the object and start from scratch

sb.clear().append("string 1 ").append(" for whatever reason").append(" appears here");

There is a shorter syntax where append can be replaced by add with the same effect:

sb.add("string 1 ").add(" for whatever reason").add(" appears here");

Similarly, we clear and continue to append

sb.clear().add("string 1 ").add(" for whatever reason").add(" appears here");

Use toString() to return the full concatenated representation

sb.add("string 1 ").add(" for whatever reason").add(" appears here").toString();

Created by Antonio Elena (03/10/2012 16:23)

*/

function StringBuilder(value) {
    this.buffer = new Array("");
    this.append(value);
    return this;
}

/*
Append a new string to the internal array of buffer
*/
StringBuilder.prototype.add = StringBuilder.prototype.append = function (value) {
    if (value) {
        this.buffer.push(value);
    }
    return this;
}

/*
Clears the internal buffer 
*/
StringBuilder.prototype.clear = function () {
    this.buffer.length = 1;
    return this;
}

/*
Returns the string representation
*/
StringBuilder.prototype.toString = function () {
    return this.buffer.join("");
}