// Define constant
const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

// Define global variables
let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE
let mouseDown = false

// Create reference variable to DOM element
const gridContainer = document.querySelector('.grid-container');
const sizeSlider = document.querySelector('#sizeSlider')
const sizeValue = document.querySelector('#sizeValue')
const colorPicker = document.querySelector('#colorPicker')
const eraserBtn = document.querySelector('#eraserBtn')
const colorBtn = document.querySelector('#colorBtn')
const clearBtn = document.querySelector('#clearBtn')

// Add event listener
sizeSlider.addEventListener('mousemove', (e) => updateSizeValue(e.target.value))
sizeSlider.addEventListener('change', (e) => changeSize(e.target.value))
colorPicker.addEventListener('input', (e) => currentColor = e.target.value)
colorBtn.addEventListener('click', () => setCurrentMode('color'))
eraserBtn.addEventListener('click', () => setCurrentMode('eraser'))
clearBtn.addEventListener('click', () => clearGrid())

function updateSizeValue(size) {
    sizeValue.textContent = `${size} x ${size}`
}

function setCurrentMode(newMode) {
    currentMode = newMode
    // activate button
    if (currentMode == 'color') {
        colorBtn.style.backgroundColor = 'var(--primary-dark)'
        colorBtn.style.color = 'var(--primary-light)'
        eraserBtn.style.background = 'var(--primary-light)'
        eraserBtn.style.color = 'var(--primary-dark)'
    } else {
        eraserBtn.style.background = 'var(--primary-dark)'
        eraserBtn.style.color = 'var(--primary-light)'
        colorBtn.style.backgroundColor = 'var(--primary-light)'
        colorBtn.style.color = 'var(--primary-dark)'
    }
}

function clearGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.style.backgroundColor = 'white';
    });
}

function changeSize(size) {
    // Clear contents in gridContainer
    gridContainer.innerHTML = ''
    // Setup Grid container according to changed size
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`
    // Create and append gridItem to gridContainer
    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div') // create gridItem
        gridItem.classList.add('grid-item') // define "grid-item" class to a gridItem
        gridItem.addEventListener('mouseover', (e) => changeColor(e))
        gridItem.addEventListener('mousedown', (e) => changeColor(e)) // smoother
        gridContainer.appendChild(gridItem)
    }
}

function changeColor(e) {
    // Check if "mousedown" on web page or not 
    document.body.onmousedown = () => (mouseDown = true) 
    document.body.onmouseup = () => (mouseDown = false)
    if (mouseDown || e.type === 'mousedown') { // This function work when mouse over and mouse down simultaneously
        if (currentMode === 'color') {
            e.target.style.backgroundColor = currentColor
        } else {
            e.target.style.backgroundColor = 'white'
        }
    }   
}

// Initial Setup 16x16 grid, Color mode with primary black color
changeSize(DEFAULT_SIZE)
setCurrentMode(DEFAULT_MODE)