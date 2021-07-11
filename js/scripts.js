const body = document.querySelector('body');
const startBtn = document.querySelector('#start-btn');

startBtn.addEventListener('click', () => {
  gameStart();
});

const gameStart = () => {
  body.classList.add('on');
  document.querySelector('.info-section-hidden').style.opacity = 1;

  const selectBtn = document.querySelector('#select-btn');
  const aBtn = document.querySelector('#a-btn');
  const bBtn = document.querySelector('#b-btn');
  const upArrowBtn = document.querySelector('#up-arrow-btn');
  const rightArrowBtn = document.querySelector('#right-arrow-btn');
  const downArrowBtn = document.querySelector('#down-arrow-btn');
  const leftArrowBtn = document.querySelector('#left-arrow-btn');

  const gameboyWrapper = document.querySelector('#gameboy-wrapper');
  const gameboyScreen = document.querySelector('#gameboy-screen');
  const gridContainer = document.querySelector('#grid');

  //GAMEBOY SVG CLASSES
  const lightFill = document.querySelectorAll('.light-fill');
  const darkFill = document.querySelectorAll('.dark-fill');
  const lightStroke = document.querySelectorAll('.light-stroke');
  const darkStroke = document.querySelectorAll('.dark-stroke');

  let userSelectedPalette = 0;
  let gridSize = 10;
  let userSelectedGameboyColor = 0;

  const createGrid = (width, height) => {
    gridContainer.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    const gridSizeArea = width * height;
    for (let i = 0; i < gridSizeArea; i++) {
      let gridItem = '<div class="grid-item"></div>'
      grid.innerHTML += gridItem;
    }
  }

  const colorGrids = (userPalette) => {
    const gridItems = gridContainer.querySelectorAll('.grid-item');
    const colors = [
      ['#b1003a', '#474b9c', '#70a529', '#d7aa00', '#008e83'],
      ['#b8d0d0', '#d880d8', '#8000a0', '#380000'],
      ['#f8f8a8', '#c08048', '#f80000', '#501800'],
      ['#b0e018', '#b82058', '#281000', '#008060'],
      ['#f8f8f8', '#f8e850', '#f83000', '#500058'],
      ['#f8c0f8', '#e88888', '#7830e8', '#282898'],
      ['#08f7fe', '#09fbd3', '#fe53bb', '#f5d300'],
    ];

    if(userPalette > (colors.length - 1)) {
      userPalette = 0;
      userSelectedPalette = 0;
    }
    if(userPalette < 0) {
      userPalette = colors.length -1;
      userSelectedPalette = colors.length -1;
    }

    gridItems.forEach(item => {
      item.addEventListener('mouseover', () => {
        const selectedTheme = colors[userPalette].length;
        const random = Math.floor(Math.random() * selectedTheme);
        const colorsRandom = colors[userPalette][random];
        item.style.background = colorsRandom;
      });
    });
  }

  const clearGrid = () => {
    const gridItems = gridContainer.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
      item.style.background = 'none';
      let clone = item.cloneNode(true)
      item.parentNode.replaceChild(clone, item)
    });
  };

  const removeGrid = () => {
    gridContainer.innerHTML = "";
  };

  rightArrowBtn.addEventListener('click', () => {
    clearGrid();
    userSelectedPalette += 1;
    colorGrids(userSelectedPalette);
  });

  leftArrowBtn.addEventListener('click', () => {
    clearGrid();
    userSelectedPalette -= 1;
    colorGrids(userSelectedPalette);
  });

  upArrowBtn.addEventListener('click', () => {
    gridSize += 1;
    removeGrid();
    createGrid(gridSize, gridSize);
    colorGrids(userSelectedPalette);
  });

  downArrowBtn.addEventListener('click', () => {
    gridSize -= 1;
    removeGrid();
    createGrid(gridSize, gridSize);
    colorGrids(userSelectedPalette);
  });

  const changeGameboyColor = () => {
    const gameboyColors = [
      ['#e8e8e8', '#e2e2e2'],
      ['#5436a3', '#4c2a9a'],
      ['#fdbdbb', '#edb4b5'],
      ['#f19a19', '#e69318'],
      ['#208597', '#007f9d'],
      ['#fd405d', '#fc5675'],
      ['#a5e713', '#92d120'],
    ];

    if(userSelectedGameboyColor > (gameboyColors.length - 1)) {
      userSelectedGameboyColor = 0;
    }
    if(userSelectedGameboyColor < 0) {
      userSelectedGameboyColor = gameboyColors.length -1;
    }

    // light-fill, dark-fill
    // light-stroke, dark-stroke
    lightFill.forEach(item => {
      item.style.fill = gameboyColors[userSelectedGameboyColor][0];
    });
    darkFill.forEach(item => {
      item.style.fill = gameboyColors[userSelectedGameboyColor][1];
    });
    lightStroke.forEach(item => {
      item.style.stroke = gameboyColors[userSelectedGameboyColor][0];
    });
    darkStroke.forEach(item => {
      item.style.stroke = gameboyColors[userSelectedGameboyColor][1];
    });
  };

  aBtn.addEventListener('click', () => {
    userSelectedGameboyColor += 1;
    changeGameboyColor(userSelectedGameboyColor);
  });

  bBtn.addEventListener('click', () => {
    userSelectedGameboyColor -= 1;
    changeGameboyColor(userSelectedGameboyColor);
  });

  selectBtn.addEventListener('click', () => {
    clearGrid();
    colorGrids(userSelectedPalette);
  });

  createGrid(gridSize, gridSize);
  colorGrids(0);
};