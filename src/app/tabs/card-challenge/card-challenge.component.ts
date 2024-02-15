import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-challenge',
  templateUrl: './card-challenge.component.html',
  styleUrls: ['./card-challenge.component.scss']
})
export class CardChallengeComponent implements OnInit {

  cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  cardSuits = ['♠', '♣', '♥', '♦'];
  deckOfCards: string[] = [];
  deckOfCardsUniqueNoSuit: string[] = [];

  cardVal = '';
  cardSuit = '';
  gameStarted = false;
  wonHighLow = false;
  wonGuessColor = false;
  wonGuessSuit = false;
  wonGuessValue = false;
  lostGame = false
  highLowWins = 0;
  guessColorWins = 0;
  guessSuitWins = 0;
  guessValueWins = 0;
  timesLost = 0;
  timesWon = 0;

  constructor() { }

  ngOnInit(): void {
    this.populateDeck();
  }

  populateDeck() {
    for (let cardValue of this.cardValues) {
      for (let cardSuit of this.cardSuits) {
        this.deckOfCards.push(cardValue+cardSuit);
        if(this.deckOfCardsUniqueNoSuit.indexOf(cardValue) == -1) {
          this.deckOfCardsUniqueNoSuit.push(cardValue);
        }
      }
    }
  }

  highLow(choice: string) {
    let nextCard = this.randomCard();
    const lastCharacter = nextCard.charAt(nextCard.length - 1);
    const splitArray = nextCard.split(lastCharacter);
    let nextConvertedCardVal = this.convertCardValue(splitArray[0]);
    let currentConvertedCardVal = this.convertCardValue(this.cardVal);

    if (choice === 'high' && parseInt(nextConvertedCardVal) >= parseInt(currentConvertedCardVal)) {
      this.wonHighLow = true;
      this.highLowWins += 1;
    } else if (choice === 'low' && parseInt(nextConvertedCardVal) <= parseInt(currentConvertedCardVal)) {
      this.wonHighLow = true;
      this.highLowWins += 1;
    } else {
      this.gameLoss();
    }
    this.setCardVal(nextCard);
  }

  guessColor(choice: string) {
    let nextCard = this.randomCard();
    const suit = nextCard.charAt(nextCard.length - 1);
    if (choice == 'red' && (suit == '♥' || suit == '♦')) {
      this.wonGuessColor = true;
      this.guessColorWins += 1;
    } else if(choice == 'black' && (suit == '♠' || suit == '♣')) {
      this.wonGuessColor = true;
      this.guessColorWins += 1;
    } else {
      this.gameLoss();
    }
    this.setCardVal(nextCard);
  }

  guessSuit(choice: string) {
    let nextCard = this.randomCard();
    const suit = nextCard.charAt(nextCard.length - 1);
    if (choice == suit) {
      this.wonGuessSuit = true;
      this.guessSuitWins += 1;
    } else {
      this.gameLoss();
    }
    this.setCardVal(nextCard);
  }

  guessValue(selectElem: any) {
    let choice = selectElem.value;
    let nextCard = this.randomCard();
    const lastCharacter = nextCard.charAt(nextCard.length - 1);
    const splitArray = nextCard.split(lastCharacter);
    let nextConvertedCardVal = this.convertCardValue(splitArray[0]);
    let convertedChoiceValue = this.convertCardValue(choice);
    if (convertedChoiceValue == nextConvertedCardVal) {
      this.wonGuessValue = true;
      this.guessValueWins += 1;
      this.timesWon += 1;
    } else {
      this.gameLoss();
    }
    this.setCardVal(nextCard);

  }


  randomCard() {
    let randomCard = '';
    if (this.deckOfCards.length > 0) {
      let randomIndex = Math.floor(Math.random() * this.deckOfCards.length);
      randomCard = this.deckOfCards[randomIndex];
      if(this.deckOfCards.indexOf(randomCard) >= 0) {
        this.deckOfCards = this.deckOfCards.filter((card) => card !== randomCard);
      } else {
        this.randomCard();
      }
    } else {
      this.cardVal = '';
      this.cardSuit = '';
    }
    if(!this.gameStarted) {
      this.setCardVal(randomCard);
      this.gameStarted = true;
    }
    return randomCard;
  }

  setCardVal(randomCard: string) {
    const lastCharacter = randomCard.charAt(randomCard.length - 1);
    const splitArray = randomCard.split(lastCharacter);
    this.cardVal = splitArray[0];
    this.cardSuit = lastCharacter;
  }

  convertCardValue(cardVal: string) {
    let convertedVal = ''
    switch (cardVal) {
      case 'A':
        convertedVal = '1';
        break;
      case 'J':
        convertedVal = '11';
        break;
      case 'Q':
        convertedVal = '12';
        break;
      case 'K':
        convertedVal = '13';
        break;
      default:
        convertedVal = cardVal;
    }
    return convertedVal;
  }

  gameLoss() {
    this.lostGame = true;
    this.timesLost += 1;
  }

  resetGame() {
    this.populateDeck();
    this.cardSuit = '';
    this.cardVal = '';
    this.lostGame = false;
    this.gameStarted = false;
    this.wonHighLow = false;
    this.wonGuessSuit = false;
    this.wonGuessValue = false;
    this.wonGuessColor = false;
  }
}
