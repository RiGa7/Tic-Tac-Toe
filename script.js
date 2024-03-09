let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");

let turnO = true;
//winning Patterns 
const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", function () {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        //disabling box  after click so that value can't be changed
        box.disabled = true;
        checkWinner();
    });
})

function checkWinner() {
    for (pattern of winningPattern) {
        console.log(pattern[0], pattern[1], pattern[2]);
        var pos1 = boxes[pattern[0]].innerText;
        var pos2 = boxes[pattern[1]].innerText;
        var pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos1 === pos3 && pos2 === pos3) {
                document.querySelector("#heading").classList.add("hide");
                var message = document.querySelector("#won");
                message.classList.remove("hide");
                message.innerText = "Player " + pos1 + " Won";
                reset.classList.add("highlight");
                reset.innerText = "New Game";
                for (box of boxes) {
                    box.disabled = true;
                }
            }
        }

    }
    checkDraw();
}

function checkDraw() {
    // Check if all boxes are filled but there's no winner
    let allFilled = true;
    for (box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
            break;
        }
    }
    if (allFilled) {
        document.querySelector("#heading").classList.add("hide");
        var message = document.querySelector("#won");
        message.classList.remove("hide");
        message.innerText = "It's a Draw!";
        reset.innerText = "New Game";
        reset.classList.add("highlight");
    }
}

function newGame() {
    reset.classList.remove("highlight");
    turnO = true;
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
        document.querySelector("#heading").classList.remove("hide");
        var message = document.querySelector("#won");
        message.classList.add("hide");
        reset.innerText = "Reset";
    }
}



reset.addEventListener("click", newGame);
