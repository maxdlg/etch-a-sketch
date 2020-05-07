let defaultSize = 16; //sets default size for the grid and cell numbers

let color = "black"; //sets default color scheme as black

let container = document.getElementById("cont"); //sets default grid size
container.style.gridTemplate =
	"repeat(" + defaultSize + ", 1fr) / repeat(" + defaultSize + ", 1fr)";

const changeSize = document.querySelector(".change-size");
changeSize.addEventListener("click", sizeChange);

const reset = document.querySelector(".reset");
reset.addEventListener("click", resetCells);

const black = document.querySelector(".black");
const random = document.querySelector(".random");
const shading = document.querySelector(".shading");
black.addEventListener("click", makeCellsBlack);
random.addEventListener("click", makeCellsRandom);
shading.addEventListener("click", makeCellsShaded);

makeCells(defaultSize, color);
let cellNodeList = document.querySelectorAll(".cell");

function makeCells(numberOfBoxes, colorType) {
	for (let i = 0; i < numberOfBoxes * numberOfBoxes; i++) {
		let cell = document.createElement("div");
		cell.classList.add("cell");
		container.appendChild(cell);
		cell.addEventListener("mouseover", function () {
			changeColor(colorType);
		});

		let j = 1; // allows for shading to happen, starts the counter at 1 so everytime the event listener is triggered, the color gets darker
		function changeColor(desiredColor) {
			if (desiredColor === "black") {
				cell.style.backgroundColor = "rgb(0, 0, 0)";
			}
			if (desiredColor === "random") {
				cell.style.backgroundColor = "rgb(" + RNG() + ", " + RNG() + ", " + RNG() + ")";
			}
			if (colorType === "shaded") {
				j = j + 1;
				cell.style.backgroundColor = "rgba(0, 0, 0," + j / 10 + ")";
			}
		}
	}
}

function makeCellsBlack() {
	for (let i = 0; i < cellNodeList.length; i++) {
		container.removeChild(container.childNodes[0]);
	}
	container.style.gridTemplate =
		"repeat(" + defaultSize + ", 1fr) / repeat(" + defaultSize + ", 1fr)";
	color = "black";
	makeCells(defaultSize, color);
	cellNodeList = document.querySelectorAll(".cell");
}

function makeCellsRandom() {
	for (let i = 0; i < cellNodeList.length; i++) {
		container.removeChild(container.childNodes[0]);
	}
	container.style.gridTemplate =
		"repeat(" + defaultSize + ", 1fr) / repeat(" + defaultSize + ", 1fr)";
	color = "random";
	makeCells(defaultSize, color);
	cellNodeList = document.querySelectorAll(".cell");
}

function makeCellsShaded() {
	for (let i = 0; i < cellNodeList.length; i++) {
		container.removeChild(container.childNodes[0]);
	}
	container.style.gridTemplate =
		"repeat(" + defaultSize + ", 1fr) / repeat(" + defaultSize + ", 1fr)";
	color = "shaded";
	makeCells(defaultSize, color);
	cellNodeList = document.querySelectorAll(".cell");
}

function resetCells() {
	for (let x = 0; x < cellNodeList.length; x++) {
		cellNodeList[x].style.backgroundColor = "rgb(255, 255, 255)";
	}
}

function sizeChange() {
	//removes the existing nodes
	for (let i = 0; i < cellNodeList.length; i++) {
		container.removeChild(container.childNodes[0]);
	}

	let desiredSize = Number(prompt("Enter a number between 1 and 100"));

	//checks for possible errors in the input
	let desiredSizeCheck = isNaN(desiredSize);
	if (desiredSize > 100) {
		alert("That number is greater than 100");
		desiredSize = 100;
	}
	if (desiredSize < 1) {
		alert("That number is less than 1");
		desiredSize = 1;
	}
	if (desiredSizeCheck === true) {
		alert("That is not a number");
		desiredSize = 16;
	}

	//changes the params to match desired size
	container.style.gridTemplate =
		"repeat(" + desiredSize + ", 1fr) / repeat(" + desiredSize + ", 1fr)";
	makeCells(desiredSize, color);
	cellNodeList = document.querySelectorAll(".cell");
}
// allows the random color function to work
function RNG() {
	return Math.floor(Math.random() * 255);
}
