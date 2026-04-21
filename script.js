// State variables
let images = [];
let mysteryPersonIndex = -1;
let guessMode = false;

// DOM Elements
const views = {
    setup: document.getElementById('setup-view'),
    select: document.getElementById('select-view'),
    play: document.getElementById('play-view')
};

const uploadInput = document.getElementById('image-upload');
const previewGallery = document.getElementById('preview-gallery');
const selectGallery = document.getElementById('select-gallery');
const boardGallery = document.getElementById('board-gallery');
const mysteryContainer = document.getElementById('mystery-person-container');
const btnNextToSelect = document.getElementById('btn-next-to-select');
const btnGuessMode = document.getElementById('btn-guess-mode');
const resultOverlay = document.getElementById('result-overlay');
const btnRestart = document.getElementById('btn-restart');
const btnContinue = document.getElementById('btn-continue');

// File Upload Logic
uploadInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    if (images.length + files.length < 2) {
        alert("Please upload at least 2 images to play.");
        return;
    }

    // Process new files
    files.forEach(file => {
        const url = URL.createObjectURL(file);
        images.push(url);
        
        // Add to preview visually
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('simple-img');
        previewGallery.appendChild(img);
    });

    if (images.length >= 2) {
        previewGallery.classList.remove('hidden');
        btnNextToSelect.classList.remove('hidden');
    }
});

// Navigation Functions
function switchView(viewName) {
    Object.values(views).forEach(view => view.classList.remove('active'));
    views[viewName].classList.add('active');
}

// Start Setup (Move to Select Phase)
btnNextToSelect.addEventListener('click', () => {
    selectGallery.innerHTML = '';
    
    images.forEach((imgSrc, index) => {
        const card = document.createElement('div');
        card.classList.add('card-wrapper');
        
        const inner = document.createElement('div');
        inner.classList.add('card-inner');
        
        const front = document.createElement('div');
        front.classList.add('card-front');
        
        const img = document.createElement('img');
        img.src = imgSrc;
        
        front.appendChild(img);
        inner.appendChild(front);
        card.appendChild(inner);
        
        // On click, select mystery person
        card.addEventListener('click', () => {
            mysteryPersonIndex = index;
            startGame();
        });
        
        selectGallery.appendChild(card);
    });
    
    switchView('select');
    window.scrollTo(0, 0);
});

// Start Game (Move to Play Phase)
function startGame() {
    boardGallery.innerHTML = '';
    
    // Reset guess mode
    if (guessMode) {
        guessMode = false;
        updateGuessModeUI();
    }
    
    // Set mystery person in dock
    mysteryContainer.innerHTML = `<img src="${images[mysteryPersonIndex]}">`;
    
    // Populate board
    images.forEach((imgSrc, index) => {
        const card = document.createElement('div');
        card.classList.add('card-wrapper');
        
        const inner = document.createElement('div');
        inner.classList.add('card-inner');
        
        const front = document.createElement('div');
        front.classList.add('card-front');
        const img = document.createElement('img');
        img.src = imgSrc;
        front.appendChild(img);
        
        const back = document.createElement('div');
        back.classList.add('card-back');
        
        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);
        
        // Handle interactions during play
        card.addEventListener('click', () => {
            if (guessMode) {
                handleGuess(index);
            } else {
                card.classList.toggle('flipped');
            }
        });
        
        boardGallery.appendChild(card);
    });
    
    switchView('play');
    window.scrollTo(0, 0);
}

// Guess Mode Toggle
btnGuessMode.addEventListener('click', () => {
    guessMode = !guessMode;
    updateGuessModeUI();
});

function updateGuessModeUI() {
    if (guessMode) {
        btnGuessMode.textContent = "Guess Mode: ON";
        btnGuessMode.classList.add('active');
        boardGallery.style.cursor = "crosshair";
    } else {
        btnGuessMode.textContent = "Guess Mode: OFF";
        btnGuessMode.classList.remove('active');
        boardGallery.style.cursor = "default";
    }
}

// Handle Guess
function handleGuess(guessedIndex) {
    // Determine if it's the correct answer or just a prompt.
    // For a local 2-device game, the device doesn't know the opponent's choice.
    document.getElementById('result-title').textContent = "Time to Ask!";
    document.getElementById('result-message').textContent = "Ask your opponent if this is their mystery person! If you are correct, you win! If wrong, you lose!";
    resultOverlay.classList.remove('hidden');
    
    // Auto turn off guess mode so they don't accidentally keep guessing
    guessMode = false;
    updateGuessModeUI();
}

// Result Dialog Handlers
btnContinue.addEventListener('click', () => {
    resultOverlay.classList.add('hidden');
});

btnRestart.addEventListener('click', () => {
    // Reset state
    images = [];
    mysteryPersonIndex = -1;
    guessMode = false;
    updateGuessModeUI();
    
    uploadInput.value = '';
    previewGallery.innerHTML = '';
    previewGallery.classList.add('hidden');
    btnNextToSelect.classList.add('hidden');
    resultOverlay.classList.add('hidden');
    
    switchView('setup');
    window.scrollTo(0, 0);
});
