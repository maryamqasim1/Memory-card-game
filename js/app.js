/*-------------- Constants -------------*/

const pics = [
  'pic/cat1.png',
  'pic/cat2.png',
  'pic/cat3.png',
  'pic/cat4.png',
];

/*---------- Variables (state) ---------*/

let cardsArr = [];
let displayPics = pics.concat(pics);

/*----- Cached Element References  -----*/

const container = document.querySelector('.container')
const startBtn = document.querySelector('button');

// const randomImage = () => { 
//   randomNum = Math.floor(Math.random() * (pics.length)); 
//   displayPics =  pics[randomNum];
//   console.log(displayPics);
// } 
// randomImage();

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
    div3.appendChild(imgHTML);
  });
}
createHTML();

const hiddenCard = document.querySelectorAll('.hideCard')
const showCard = document.querySelectorAll('.display');

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

const flipCard = (event) => {
  if (startBtn.disabled === true && cardsArr.length < 2) {
    cardIndex = event.target.id;
    showCardElement(showCard[cardIndex]);
    cardsArr.push(showCard[cardIndex]);
    if (cardsArr.length === 2)
      matchingCard();
  }
}

const matchingCard = () => {
  const card1 = cardsArr[0];
  const card2 = cardsArr[1];
  if (card1.querySelector('img').src !== card2.querySelector('img').src) {
    setTimeout(() => {
      hideCardElement(card1);
      hideCardElement(card2);
      cardsArr = [];
    }, '1000');
    console.log('not match');
  }
  else if (card1.querySelector('img').src === card2.querySelector('img').src) {
    cardsArr = [];
    console.log('match');
  }
}

/*----------- Event Listeners ----------*/

startBtn.addEventListener('click', handleClick);
hiddenCard.forEach((x) => {
  x.addEventListener('click', (event) => flipCard(event));
});