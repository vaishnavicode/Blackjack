import { useState, MouseEvent } from "react";

let cardFiles: { 'Player': string[], 'Dealer': string[] } = { 'Player': [], 'Dealer': [] }
let cards: { 'Player': string[], 'Dealer': string[] } = { 'Player': [], 'Dealer': [] }

function Play() {

    const [playerCardCount, updatePlayerCard] = useState(2);
    const [dealerCardCount, updateDealerCard] = useState(2);
    let [isGameOver, updateGameOver] = useState(false);
    let [result, updateResult] = useState('');

    function handleClick(event: MouseEvent<HTMLButtonElement>): void {
        if ((sumOfAll(cards.Player) > 21) || (sumOfAll(cards.Dealer) > 21)) {

            updateGameOver(isGameOver = true);

        }

        let id = (event.target as HTMLButtonElement).id;
        id == 'Hit' && updatePlayerCard(playerCardCount + 1);

        let shouldDealerHit = optimalStrategy(cards.Dealer);
        (id == 'Stand' && shouldDealerHit) && updateDealerCard(dealerCardCount + 1);


        (!shouldDealerHit && !optimalStrategy(cards.Dealer)) && updateGameOver(isGameOver = true)

        let resultTemp = checker();

        if (isGameOver) {
            updateResult(result = resultTemp);
        }

    }


    while (cards.Player.length < playerCardCount) {

        let playerCard = getUnique(cards.Player, cards.Dealer);
        let playerfile = getFileName(playerCard);
        cards.Player.push(playerCard);
        cardFiles.Player.push(playerfile)

    }

    while (cards.Dealer.length < dealerCardCount) {

        let dealerCard = getUnique(cards.Player, cards.Dealer);
        let dealerfile = getFileName(dealerCard);
        cards.Dealer.push(dealerCard);
        cardFiles.Dealer.push(dealerfile);
    }


    return (
        <>
            <div className="col-md-4">

                <h1 className="card-title">Dealer Cards : </h1>


                <div className="card-group">
                    {cards['Dealer'].map((cardName, index) => (
                        <div key={index} className="DealerCards">

                            {!isGameOver && index == 0 ?
                                <>
                                    <h3>Hidden Card</h3>
                                    <img className='card img-responsive' src='cards/RED_BACK.svg'></img>
                                </>
                                :
                                <>
                                    <h3>{cardName}</h3>
                                    <img className='card' src={cardFiles.Dealer[index]}></img>
                                </>}

                        </div>
                    ))}

                </div>

                <h1 className="card-title">Player Cards : </h1>

                <div className="card-group">

                    {cards['Player'].map((cardName, index) => (
                        <div className="card" key={index}>
                            <div key={index} className="PlayerCards">
                                <h3>{cardName}</h3>
                                <img className='card img-responsive' src={cardFiles.Player[index]}></img>
                            </div>
                        </div>
                    ))}

                </div>

                <h3>Player Sum : {sumOfAll(cards.Player)}</h3>

                <button type="button" className="btn btn-success col-md-4" onClick={handleClick} id='Hit'>Hit</button>
                &nbsp;&nbsp;
                <button type="button" className="btn btn-danger col-md-4" onClick={handleClick} id='Stand'>Stand</button>


            </div>

            <div className="final-result">
                {isGameOver &&
                    <>
                        <h1>Result : {result}</h1>

                    </>}

            </div>



            <br />




        </>
    );

}

function getUnique(player: string[], dealer: string[]) {
    let card = generateARandomCard();

    while (player.includes(card) || dealer.includes(card)) {
        card = generateARandomCard();
    }

    return card;
}
//Generating a random card 
function generateARandomCard() {
    const cardNum = getRandomInt(1, 13);
    const suit = getRandomInt(1, 4);

    let card;
    switch (cardNum) {
        case 1:
            card = 'Ace';
            break;
        case 11:
            card = 'Jack';
            break;
        case 12:
            card = 'Queen';
            break;
        case 13:
            card = 'King';
            break;
        default:
            card = cardNum;
    }

    let suitName;
    switch (suit) {
        case 1:
            suitName = 'Hearts';
            break;
        case 2:
            suitName = 'Diamonds';
            break;
        case 3:
            suitName = 'Clubs';
            break;
        case 4:
            suitName = 'Spades';
            break;
    }

    return `${card} of ${suitName}`;

}

//Generating a random integer in between (inclusive) two integers
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sumOfAll(deck: string[]) {
    let sum = 0;
    let flag = 0;
    for (let i = 0; i < deck.length; i++) {
        if (deck[i].includes("Ace")) {
            flag++;
        }
        else {
            sum += getCardValue(deck[i]);
        }

    }

    for (let i = 0; i < flag; i++) {
        if (sum + 11 <= 21) {
            sum += 11;
        }
        else {
            sum += 1;
        }
    }

    return sum;

}

function getCardValue(card: string) {
    switch (card[0]) {
        case "2":
            return 2;
        case "3":
            return 3;
        case "4":
            return 4;
        case "5":
            return 5;
        case "6":
            return 6;
        case "7":
            return 7;
        case "8":
            return 8;
        case "9":
            return 9;
        default:
            return card.includes("Ace") ? 11 : 10;

    }

}

function getFileName(cardName: string) {

    let splitList = cardName.split(' ');

    if (cardName[1] == '0') {
        return 'cards/' + cardName[0] + cardName[1] + splitList[2][0] + '.svg';
    }

    return 'cards/' + cardName[0] + splitList[2][0] + '.svg';



}


function optimalStrategy(dealer: string[]) {
    if (sumOfAll(dealer) <= 16) {
        return true;
    }

    return false;

}

function checker() {
    let playerSum = sumOfAll(cards.Player);
    let dealerSum = sumOfAll(cards.Dealer);
    let resultTemp;

    if (playerSum > 21) {
        resultTemp = 'Player busted and lost.'
    }
    else if (dealerSum > 21) {
        resultTemp = 'Dealer busted and player won!.'
    }
    else if (playerSum == dealerSum) {
        resultTemp = 'Draw!'
    }
    else if (playerSum > dealerSum) {
        resultTemp = 'Player won!'
    }
    else {
        resultTemp = 'Player lost.'
    };
    return resultTemp;
}

export default Play;
