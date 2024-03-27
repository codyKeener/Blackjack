let firstCard = 0;
let newCard = 0;
let sum = 0;
let cardArray = [];
let hasBlackJack = false;
let isAlive = true;
let message = "Want to play a round?";
let messageEl = document.getElementById("message-el", "messageEl");
let sumEl = document.getElementById("sum-el", "sumEl");
// let sumEl = document.querySelector("#sum-el") -- alternate way to do this
let cardsEl = document.getElementById("cards-el", "cardsEl");

let player = {
    name: "Player",
    chips: 50
}

let playerEl = document.getElementById("player-el", "playerEl");
playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
    let CardValue = 0;
    let card = Math.floor((Math.random() * 13) + 1);
    if (card === 1 && sum <= 10) {
        cardValue = 11;
    } else if (card === 1 && sum > 10) {
        cardValue = 1;
    } else if (card > 1 && card < 10) {
        cardValue = card;
    } else {
        cardValue = 10;
    }
    return cardValue;
}

function checkBlackjack() {
    sumEl.textContent = "Sum: " + sum;
    cardsEl.textContent = "Cards: " + cardArray;

    if (sum < 21) {
        message = ("Do you want to draw a new card?");
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        player.chips = player.chips + 10;
        playerEl.textContent = player.name + ": $" + player.chips;
    } else {
        message = "Bust! You are out of the game."
        isAlive = false;
    }
    messageEl.textContent = message;
}

function startGame() {
    if (player.chips == 0) {
        message = "You're broke!"
        messageEl.textContent = message;
    } else if (hasBlackJack === true || isAlive === false) {
        sum = 0;
        cardArray = [];
        hasBlackJack = false;
        isAlive = true;
        player.chips = player.chips - 5;
        playerEl.textContent = player.name + ": $" + player.chips;
        firstCard = getRandomCard();
        sum += firstCard;
        cardArray.push(firstCard);
        checkBlackjack();
    } else if (firstCard === 0) {
        player.chips = player.chips - 5;
        playerEl.textContent = player.name + ": $" + player.chips;
        firstCard = getRandomCard();
        sum += firstCard;
        cardArray.push(firstCard);
        checkBlackjack();
    }
}

function getNewCard() {
    if (firstCard === 0 || hasBlackJack === true || isAlive === false){
        return;
    } else {
        newCard = getRandomCard();
        sum += newCard;
        cardArray.push(" " + newCard);
        checkBlackjack();   
    }
}

function getDealerCards() {
    let dealerFirstCard = getRandomCard();
    let dealerSecondCard = getRandomCard();
    let dealerSum = dealerFirstCard + dealerSecondCard;

    while (dealerSum < sum && dealerSum < 21) {
        dealerSum += getRandomCard();
    }
    return dealerSum;
}

function stay() {
    if (isAlive === true) {
        let dealerSum = getDealerCards();
        if (dealerSum > 21) {
            message = "Dealer bust. You win!";
            player.chips = player.chips + 10;
            playerEl.textContent = player.name + ": $" + player.chips;
        } else if (dealerSum == sum) {
            message = "Dealer had " + dealerSum + ". Push!";
        } else if (dealerSum > sum) {
            message = "Dealer had " + dealerSum + "! You lose :(";
            player.chips = player.chips - 5;
            playerEl.textContent = player.name + ": $" + player.chips;
        } else {
            message = "Dealer had " + dealerSum + ". You win!";
            player.chips = player.chips + 10;
            playerEl.textContent = player.name + ": $" + player.chips;
        }
        messageEl.textContent = message;
        isAlive = false;
    }
}