/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/


/*----- Cached Element References  -----*/

const startBtn = document.querySelector('button'); //
const showCard = document.querySelectorAll('.display');
const hiddenCard = document.querySelectorAll('.hideCard')
const container = document.querySelector('.container')

/*-------------- Functions -------------*/

const handleClick = () => {
  showCard.forEach(x => {
    x.classList.add('showCard');
    x.classList.remove('hideCard');
    setTimeout(() => {
      x.classList.remove('showCard');
      x.classList.add('hideCard');
    }, '3000');
  })
  // startBtn.disabled = true;
}
startBtn.disabled = true; // for test remove later

const flipCard = (event) => {
  if (startBtn.disabled == true)
    {
      cardIndex = event.target.id;
      console.log(cardIndex);
    // hiddenCard[x].classList.remove('hideCard');
    // hiddenCard[x].classList.add('showCard');
  }
}

/*----------- Event Listeners ----------*/

startBtn.addEventListener('click', handleClick);
hiddenCard.forEach((x, index) => {
  x.addEventListener('click', (event, index) => flipCard(event));
})