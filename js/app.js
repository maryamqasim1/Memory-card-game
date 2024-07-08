/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/

let cardsArr = [];

/*----- Cached Element References  -----*/

const startBtn = document.querySelector('button'); //
const hiddenCard = document.querySelectorAll('.hideCard')
const showCard = document.querySelectorAll('.display');
// const container = document.querySelector('.container')

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
hiddenCard.forEach((x, index) => {
  x.addEventListener('click', (event, index) => flipCard(event));
})