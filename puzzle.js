var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

// var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
 var imgOrder = ["a", "b", "d", "e", "f", "g", "h", "i", "cc"];
// var imgOrder = ["d", "b", "h", "e", "a", "f", "g", "i", "cc"];

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

           
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles

            document.getElementById("board").append(tile);

        }
    }
}

function dragStart() {
    currTile = this; 
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; 
}

function dragEnd() {
 if(!otherTile.src.includes("cc.jpg")) {
         return;
     }

    let currCoords = currTile.id.split("-"); 
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
        puzzleIsSolved();
            
        
    }}
    function puzzleIsSolved() {
        const solveOrder = ["a", "b", "cc", "d", "e", "f", "g", "h", "i"];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let tile = document.getElementById(r + "-" + c);
                let expectedImg = solveOrder[r * columns + c] + ".jpg";
                if (tile.src.endsWith(expectedImg) || tile.src.endsWith("cc.jpg")) {
                    continue;
                } else {
                   
                    return false;
                }
            }
        }
      
        showModal();
        return true;
    }
    
    function showModal() {
        var modal = document.getElementById("puzzleModal");
        var message = document.getElementById("puzzleMessage");
        modal.style.display = "block";
        
        message.innerHTML = "Congratulations! Puzzle Solved!";
    }
    
    function closeModal() {
        var modal = document.getElementById("puzzleModal");
        modal.style.display = "none";
    }


