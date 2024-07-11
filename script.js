const cardContainer = document.getElementById('card-container');
let cards = [];
let flippedCards = [];
let matchedCards = [];
let canFlip = false;

// Imagens para os pares de cartas
const images = [
  '🍎', '🍎',
  '🍌', '🍌',
  '🍒', '🍒',
  '🍇', '🍇',
  '🍍', '🍍',
  '🥑', '🥑',
  '🍋', '🍋',
  '🍉', '🍉'
];

// Função para iniciar o jogo
function startGame() {
  canFlip = true;
  matchedCards = [];
  flippedCards = [];
  cards = [];
  cardContainer.innerHTML = '';
  
  // Embaralhar as imagens
  const shuffledImages = shuffle(images.slice());
  
  // Criar as cartas
  for (let i = 0; i < shuffledImages.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = shuffledImages[i];
    card.textContent = '';
    card.addEventListener('click', flipCard);
    cardContainer.appendChild(card);
    cards.push(card);
  }
}

// Função para virar a carta
function flipCard() {
  if (!canFlip || this === flippedCards[0]) return;
  
  this.textContent = this.dataset.image;
  this.classList.add('flipped');
  flippedCards.push(this);
  
  if (flippedCards.length === 2) {
    canFlip = false;
    setTimeout(checkMatch, 1000);
  }
}

// Função para verificar se as cartas são correspondentes
function checkMatch() {
  const [card1, card2] = flippedCards;
  
  if (card1.dataset.image === card2.dataset.image) {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
    matchedCards.push(card1, card2);
    
    if (matchedCards.length === cards.length) {
      setTimeout(() => {
        alert('Parabéns! Você encontrou todos os pares!');
      }, 500);
    }
  } else {
    card1.textContent = '';
    card2.textContent = '';
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }
  
  flippedCards = [];
  canFlip = true;
}

// Função para embaralhar as imagens
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
