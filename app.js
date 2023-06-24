const tbody = document.querySelector("tbody");
let randomNumbers1 = [];
let randomNumbers2 = [];
let randomNumber = 0;

generateRandomNumber();
createCard();

function generateRandomNumber(){
  randomNumbers1 = [];
  randomNumbers2 = [];
  randomNumber = 0;
  for (let i = 1; randomNumbers1.length < 24; i++) {
    randomNumber = Math.floor(Math.random() * 24) + 1;
    if (randomNumbers1.indexOf(randomNumber) == -1) {
      randomNumbers1.push(randomNumber);
    }
  }
  for (let i = 1; randomNumbers2.length < 24; i++) {
    randomNumber = Math.floor(Math.random() * 24) + 1;
    if (randomNumbers2.indexOf(randomNumber) == -1) {
      randomNumbers2.push(randomNumber);
    }
  }
};

function createCard() {
  let cardValue = 0;
  for (let row = 0; row < 4; row++) {
    let tr = document.createElement("tr");
    for (let col = 0; col < 6; col++) {
      let td1 = document.createElement("td");
      td1.setAttribute("card", randomNumbers1[cardValue]);
      td1.style.backgroundImage = "url('img/card_back.png')";
      td1.addEventListener("click", showCard)
      let td2 = document.createElement("td");
      td2.setAttribute("card", randomNumbers2[cardValue++]);
      td2.addEventListener("click", showCard)
      td2.style.backgroundImage = "url('img/card_back.png')";
      tr.append(td1);
      tr.append(td2);
    }
    tbody.append(tr);
  }
}

function showCard(event){
myCard = event.currentTarget;
myCardValue = parseInt(myCard.getAttribute('card'));
myCard.setAttribute("show", 1 );
myCard.style.backgroundImage = `url('img/${myCardValue}.png')`;
checkMatch()

}

function checkMatch(){
  let visibleCards = document.querySelectorAll('[show="1"]');
  if(visibleCards.length>=2){
    let card1 = parseInt(visibleCards[0].getAttribute("card"));
    let card2 = parseInt(visibleCards[1].getAttribute("card"));
    if(card1==card2){
      setTimeout(() => {
          visibleCards.forEach(visibleCard => {
            visibleCard.classList.add("bg-none");
            visibleCard.removeEventListener("click", showCard);
            visibleCard.removeAttribute("show")
            checkGameOver()
          });
        },500)
    }else{
      setTimeout(() => { 
        visibleCards.forEach(visibleCard => {
          visibleCard.style.backgroundImage = "url('img/card_back.png')";
          visibleCard.removeAttribute("show")
        });
      },500);
    }
  }  
}

function checkGameOver(){
  let emptyCells = document.querySelectorAll(".bg-none");
  if(emptyCells.length === 48){
    let quection="Game Over!\nSzeretnéd újra kezdeni? ";
    setTimeout(() => {
      if(confirm(quection) == true){
        tbody.innerHTML="";
        generateRandomNumber();
        createCard();
      }
    },500)
  }
}