const gridContainer = document.querySelector(".grid-container")

var slider = document.querySelector(".slider")
let gridSizeValue = document.querySelector("#grid-size-value")

slider.oninput = function() {
    gridSizeValue.innerHTML = this.value + " X " + this.value;
  }

let gridSize = 600
let squaresPerRow = 16;

slider.oninput = function() {
    gridSizeValue.innerHTML = this.value + " X " + this.value;
    squaresPerRow = this.value
    generateGrid(this.value);
  }

function generateGrid(squaresPerRow) {
    gridContainer.innerHTML = '';
    let numberOfSquares = squaresPerRow * squaresPerRow;
    let squareSize = gridSize / squaresPerRow;

    for (let i = 0; i < numberOfSquares; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.id = `square-${i}`;
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.style.boxSizing = 'border-box';

        gridContainer.appendChild(square);

        square.addEventListener("mouseover", () => {
            fillSquare(square.id);
        });
    }
}

function fillSquare(sqrid) {
    squareTofill = document.querySelector('#'+sqrid)
    if (isRainbowMode) {
        generateNewColor();        
    }    
    else if (isDarkMode) {

        if(!squareTofill.style.backgroundColor) {
            return
        }

        const toRGBArray = rgbStr => rgbStr.match(/\d+/g).map(Number);
        const rgbArray = toRGBArray(squareTofill.style.backgroundColor);
        
        let red = rgbArray[0];
        let green = rgbArray[1];
        let blue = rgbArray[2];
        
        const adjustColor = color => color <= 26 ? 0 : color - 26;
        
        red = adjustColor(red);        
        green = adjustColor(green);        
        blue = adjustColor(blue);
        
        const darkenedRGB = `rgb(${red},${green},${blue})`;
        brushColor = darkenedRGB;

    }
    squareTofill.style.backgroundColor = brushColor;

}

// Classic Mode //

let classicModeBtn = document.querySelector('#classic-mode-btn');

classicModeBtn.addEventListener("click", () => {
    isRainbowMode = false;
    isDarkMode = false;
    brushColor = changeColorInput.value

    rainbowBtn.classList.remove("is-used");
    darkModeBtn.classList.remove("is-used");
    classicModeBtn.classList.add("is-used");
});

let changeColorInput = document.querySelector('#color-btn');
let brushColor = changeColorInput.value;
changeColorInput.addEventListener('change', listenColorInput);

function listenColorInput(e) {
    brushColor = e.target.value
    isRainbowMode = false;
    isDarkMode = false;

    rainbowBtn.classList.remove("is-used");
    darkModeBtn.classList.remove("is-used");
    classicModeBtn.classList.add("is-used");


}

// Rainbow Mode //

let isRainbowMode = false;

function generateNewColor() {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r},${g},${b})`; 
    brushColor = rgb
}

rainbowBtn = document.querySelector('#rainbow-mode-btn')
rainbowBtn.addEventListener("click", () => {
    isRainbowMode = true;
    isDarkMode = false;

    rainbowBtn.classList.add("is-used");
    darkModeBtn.classList.remove("is-used");
    classicModeBtn.classList.remove("is-used");
})

// Darkening Mode //

darkModeBtn = document.querySelector('#darkening-mode-btn')

let isDarkMode = false;

darkModeBtn.addEventListener("click", () => {
    isDarkMode = true;
    isRainbowMode = false;

    darkModeBtn.classList.add("is-used");
    rainbowBtn.classList.remove("is-used");
    classicModeBtn.classList.remove("is-used");
})

// Clear Button //

let ClearBtn = document.querySelector('#clear-btn');

ClearBtn.addEventListener("click", () => {
    generateGrid(squaresPerRow);
    });


// Main Grid (default)
generateGrid(16);





