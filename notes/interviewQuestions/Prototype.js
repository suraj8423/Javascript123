//---------------------------------------------------------------------------------------------------------------------------------------

const p1 = {
    fName : "Suraj",
    lName : "Tripathi",
    getName : function() {
        return this.fName + " " + this.lName;
    }
}

// now if I want to create a new object with the same properties and methods as p1,

const p2 = {
    fName : "John",
    lName : "Doe",
    getName : p1.getName
}

console.log(p2.getName());