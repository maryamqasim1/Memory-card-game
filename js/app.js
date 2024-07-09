// /*-------------- Constants -------------*/

const pics = [
  'pic/cat1.png',
  'pic/cat2.png',
  'pic/cat3.png',
  'pic/cat4.png',
  'pic/cat5.png',
  'pic/cat6.png',
];

/*---------- Variables (state) ---------*/

let cardsArr = [];
let displayPics = pics.concat(pics);
let win = 0;
let loss = 0;
let winner = Boolean;

/*----- Cached Element References  -----*/

const container = document.querySelector('.container')
const startBtn = document.querySelector('button');

/*-------------- Functions -------------*/

// shuffleArray code from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
shuffleArray(displayPics);
function shuffleArray() {
  for (i = displayPics.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = displayPics[i];
    displayPics[i] = displayPics[j];
    displayPics[j] = temp;
  }
};

/* creating this HTML 
<div class="flip-card">
  <div class="flip-card-inner hideCard display" id="0">
    <div class="showCard">
      <img src="pic/cat1.png" alt="">
    </div>
  </div>
</div> 
*/
const createHTML = () => {
  displayPics.forEach((x, index) => {
    div = document.createElement("div");
    div.classList.add('flip-card');
    container.appendChild(div);

    div2 = document.createElement("div");
    div2.classList.add('flip-card-inner', 'hideCard', 'display');
    div2.setAttribute('id', index);
    div.appendChild(div2);

    div3 = document.createElement("div");
    div3.classList.add('showCard');
    div2.appendChild(div3);

    imgHTML = document.createElement("img");
    imgHTML.src = x;
    imgHTML.alt = 'cute cat image';
    div3.appendChild(imgHTML);
  });
}
createHTML();

/*----- Cached Element References  -----*/

const hiddenCard = document.querySelectorAll('.hideCard')
const showCard = document.querySelectorAll('.display');
const messageEle = document.getElementsByClassName('msg');
const closeBtn = document.querySelector('.close');
const winImg = document.getElementById('win');
const lossImg = document.getElementById('loss');
const text = document.querySelector('.printMsg');

/*-------------- Functions -------------*/

const showCardElement = (card) => {
  card.classList.add('showCard');
  card.classList.remove('hideCard');
}

const hideCardElement = (card) => {
  card.classList.remove('showCard');
  card.classList.add('hideCard');
}

const handleClick = () => {
  showCard.forEach(card => {
    showCardElement(card);
    setTimeout(() => {
      hideCardElement(card);
    }, '5000');
  })
  startBtn.disabled = true;
}
// startBtn.disabled = true; // for test remove later

// flip 2 cards only each time
const flipCard = (event) => {
  if (startBtn.disabled === true && cardsArr.length < 2) {
    cardIndex = event.target.id;
    showCardElement(showCard[cardIndex]);
    cardsArr.push(showCard[cardIndex]);
    if (cardsArr.length === 2)
      matchingCard();
  }
}

// check if the 2 cards are matching
const matchingCard = () => {
  const card1 = cardsArr[0];
  const card2 = cardsArr[1];
  if (card1.querySelector('img').src !== card2.querySelector('img').src && loss < 2) {
    setTimeout(() => {
      hideCardElement(card1);
      hideCardElement(card2);
      cardsArr = [];
    }, '800');
    loss++;
    console.log('loss: ' + loss);
    gameStat();
  }

  else if (card1.querySelector('img').src !== card2.querySelector('img').src && loss === 2) {
    loss++;
    console.log('loss: ' + loss);
    gameStat();
  }

  else if (card1.querySelector('img').src === card2.querySelector('img').src) {
    cardsArr = [];
    win++;
    console.log('win: ' + win);
    gameStat();
  }
}

// cheack game status
const gameStat = () => {
  if (win === 6) {
    winner = true;
  }
  else if (loss === 3) {
    winner = false;
  }
  message();
};

// print popup message and make the hidden div appear
const message = () => {
  if (winner === true) {
    messageEle[0].style.visibility = 'visible';
    messageEle[0].style.opacity = 1;
    winImg.style.display = 'block';
    text.innerHTML = 'Congrats!!! you won :D';
    console.log(win);
  }
  if (winner === false) {
    messageEle[0].style.visibility = 'visible';
    messageEle[0].style.opacity = 1;
    lossImg.style.display = 'block';
    text.innerHTML = 'WORK ON YOUR MEMORY!!!!';
    text.style.color = 'red'
    console.log(loss);
  }
}

// X for closing the hidden div aka popup message
const close = () => {
  messageEle[0].style.visibility = 'hidden';
  messageEle[0].style.opacity = 0;
}

/*----------- Event Listeners ----------*/

startBtn.addEventListener('click', handleClick);
closeBtn.addEventListener('click', close);
hiddenCard.forEach((x) => {
  x.addEventListener('click', (event) => flipCard(event));
});