//variable declarations
let openCards = [];
let matchCards = [];
let moves = 0;
let numOfStars = 0;

const cards = document.querySelectorAll(".card i"); 
const deck = document.querySelectorAll(".deck li");
const moveCounter = document.querySelector(".moves");
const myCards = ["fa fa-diamond",
                "fa fa-anchor",
                "fa fa-bolt",
                "fa fa-paper-plane-o",
                "fa fa-cube",
                "fa fa-anchor",
                "fa fa-leaf",
                "fa fa-bicycle",
                "fa fa-diamond",
                "fa fa-bomb",
                "fa fa-leaf",
                "fa fa-bomb",
                "fa fa-bolt",
                "fa fa-bicycle",
                "fa fa-paper-plane-o",
                "fa fa-cube"];
                
//function declarations               
const resetGame = function () {
    openCards = [];
    matchCards = [];
    moves = 0;
    moveCounter.textContent = moves;
    shuffle(myCards);
    //clear the classname of the elements <i> under the class "card" and replace it with the values of the shuffled class under myCards 
    for (let x = 0; x < cards.length; x++) {
        cards[x].className = "";
        cards[x].className = myCards[x];
        deck[x].className = "card"; //removes the classes open, show and match
    }
    document.getElementById("star1").style.color = "yellow";
    document.getElementById("star2").style.color = "yellow";
    document.getElementById("star3").style.color = "yellow";
    numOfStars = 3;
};

const compareTwoCards = function() {
    //check if there are two clicked cards and if those cards are match or not.
    if (openCards.length === 2 && (openCards[0].innerHTML === openCards[1].innerHTML)) {
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");//if match, add a class "match" for the two elements
        matchCards.push(openCards[0]);      //and transfer them to the matchCards array and reset
        matchCards.push(openCards[1]);      //the openCards array
        openCards = [];
        incrementCounter();
    } else if (openCards.length === 2 && (openCards[0].innerHTML !== openCards[1].innerHTML)) {
        setTimeout(function() {
            openCards[0].className = "card";//if not match, set the class to "card" to remove the
            openCards[1].className = "card";//"show" and "open" classes and reset the openCards array
            openCards = [];
        },500);
        incrementCounter();
    }
}

const displaySymbol = function(ele) {
    if (!ele.classList.contains("open")) {//add the class "open" and "show" if the element is not click yet
        ele.classList.add("show");
        ele.classList.add("open");
    }
}

//increment the number of moves and changes the color of the stars depending on how many moves
const incrementCounter = function () {
    moves++;
    moveCounter.textContent = moves;
    if(moves <= 15) {
        document.getElementById("star1").style.color = "yellow";
        document.getElementById("star2").style.color = "yellow";
        document.getElementById("star3").style.color = "yellow";
        numOfStars = 3;
    } else if (moves > 15 && moves <=30) {
        document.getElementById("star1").style.color = "yellow";
        document.getElementById("star2").style.color = "yellow";
        document.getElementById("star3").style.color = "black";
        numOfStars = 2;
    } else {
        document.getElementById("star1").style.color = "yellow";
        document.getElementById("star2").style.color = "black";
        document.getElementById("star3").style.color = "black";
        numOfStars = 1;
    } 
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(openCardsay) {
    var currentIndex = openCardsay.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = openCardsay[currentIndex];
        openCardsay[currentIndex] = openCardsay[randomIndex];
        openCardsay[randomIndex] = temporaryValue;
    }

    return openCardsay;
}

resetGame();

//add eventlistener to the reset game button
document.querySelector(".fa-repeat").addEventListener("click", resetGame);

//adding eventlistener to the class deck with e.target with class card
document.querySelector(".deck").addEventListener("click", function(e) {
    //check if e.target has a class "card" and not yet open and that open cards will not open more than 2 cards at a time
    if (e.target.classList.contains("card") && !e.target.classList.contains("open") && openCards.length < 2) {
        displaySymbol(e.target);
        openCards.push(e.target);
        compareTwoCards(openCards);
        
        if (matchCards.length === 16) {//check if all the cards are matched
            setTimeout( function() {
                if (numOfStars > 1) {
                    swal("Congratulations", `You Win with ${numOfStars} stars`, "success");
                } else {
                    swal("Congratulations", `You Win with ${numOfStars} star`, "success");
                }                
                resetGame(); 
            }, 500); 
        }
    }
});