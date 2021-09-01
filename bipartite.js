// This bulit in function take inputs from console
// npm install readline-sync -- this line will install readline sync
var readlineSync = require('readline-sync');

// Takes inputs for number of V and E
console.log("Please enter vertices and edges")
console.log("***********************************")
let vertices = readlineSync.question("Number of Vertices: ")
let numberOfEdges = readlineSync.question("Number of Edges: ")

// To store edges
let edgeArray = [];



console.log("***********************************")
console.log("Please enter edges. (i.e. as 12, not as 1 2)")
console.log("***********************************")

// Will take input for incidents, and store into edge array
// input should be given as 12, not as 1 2
for (let i = 0; i < numberOfEdges; i++) {
    let temp = readlineSync.question("Enter " + (i + 1) + " edge :");
    let temp1 = [Math.floor(temp / 10), temp % 10]
    edgeArray.push(temp1)
}

// creates V based number of vertices
let totalVertices = [];
for (let i = 0; i < vertices; i++) {
    totalVertices.push(i + 1)
}

// sorts vertices, to make it easier to calculate
edgeArray.sort((a, b) => a[0] - b[0])

let setA = [];
let setB = [];


// take first edge, and put these two vertices in two different sets
setA.push(edgeArray[0][0])
setB.push(edgeArray[0][1])



// A separate functon for counting internal edges
function internalEdges(sampleSet, vertex) {
    let counter = 0;
    for (let i = 0; i < sampleSet.length; i++) {
        let temp = sampleSet[i];
        for (let j = 0; j < edgeArray.length; j++) {
            if (vertex === edgeArray[j][0] && temp === edgeArray[j][1]) {
                counter++;
            }
        }
    }
    return counter;
}


// A separate function for counting external edges
function externalEdges(sampleSet, vertex) {
    let counter = 0;
    for (let i = 0; i < sampleSet.length; i++) {
        let temp = sampleSet[i];
        for (let j = 0; j < edgeArray.length; j++) {
            if (vertex === edgeArray[j][0] && temp === edgeArray[j][1]) {
                counter++;
            }
        }
    }
    return counter;
}


//Divdes vertices into two sets, comparing internal edges
// to external edges

for (let i = 0; i < totalVertices.length; i++) {
    let temp = totalVertices[i];
    if (!setA.includes(temp) && !setB.includes(temp)) {
        if (internalEdges(setA, temp) < externalEdges(setB, temp)) {
            setA.push(temp)
        } else {
            setB.push(temp)
        }
    }

}


// A separte functon to print incidents
function printExternalEdges(sampleSet, vertex) {
    // let counter =0;
    for (let i = 0; i < sampleSet.length; i++) {
        let temp = sampleSet[i];
        for (let j = 0; j < edgeArray.length; j++) {
            if (vertex === edgeArray[j][0] && temp === edgeArray[j][1]) {
                // counter++;
                console.log(edgeArray[j][0], edgeArray[j][1])
            }
        }
    }
    // return counter;
}



console.log("***********************************")
console.log("A has: " + setA);
console.log("***********************************")
console.log("Edges are: ")

// Prints all edges that goes out from A
for (let i = 0; i < setA.length; i++) {
    printExternalEdges(setB, setA[i])
}

console.log("***********************************")

console.log("B has: " + setB);

console.log("***********************************")
console.log("Edges are: ")
// Prints all edges that goes out from B
for (let i = 0; i < setA.length; i++) {
    printExternalEdges(setA, setB[i])
}