let cardFiles: { 'Player': string[], 'Dealer': string[] } = { 'Player': [], 'Dealer': [] }
let cards: { 'Player': string[], 'Dealer': string[] } = { 'Player': [], 'Dealer': [] }


function Play() {

    while (cards.Player.length < 2) {

        let playerCard = getUnique(cards.Player, cards.Dealer);
        let playerfile = getFileName(playerCard);
        cards.Player.push(playerCard);
        cardFiles.Player.push(playerfile)

        let dealerCard = getUnique(cards.Player, cards.Dealer);
        let dealerfile = getFileName(playerCard);
        cards.Dealer.push(dealerCard);
        cardFiles.Dealer.push(dealerfile);
    }



    console.log(cardFiles);
    console.log(cards);

    return (
        <>
            <div className="col-md-4">

                <h1 className="card-title">Dealer Cards : </h1>


                <div className="card-group">
                    {cards['Dealer'].map((cardName, index) => (
                        <div key={index} className="DealerCards">

                            {index == 0 ?
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

                <button type="button" className="btn btn-success col-md-4" onClick={hitHandler}>Hit</button>
                &nbsp;&nbsp;
                <button type="button" className="btn btn-danger col-md-4" onClick={standHandler}>Stand</button>


            </div>



            <br />




        </>
    );

}

export default Play;
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

const hitHandler = () => {

}

const standHandler = () => { }
