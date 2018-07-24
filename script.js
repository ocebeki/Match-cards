var cardsArray = [{
        'name': 'Arryn',
        'img': 'img/Arryn.ico',
},
    {
        'name': 'Baratheon',
        'img': 'img/Baratheon.ico',
},
    {
        'name': 'GameofThrones',
        'img': 'img/GameofThrones.png',
},
    {
        'name': 'Greyjoy',
        'img': 'img/Greyjoy.ico',
},
    {
        'name': 'Lannister',
        'img': 'img/Lannister.ico',
},
    {
        'name': 'Martell',
        'img': 'img/Martell.ico',
    }
                  ,
    {
        'name': 'Stark',
        'img': 'img/Stark.ico',
},

    {
        'name': 'Targaryen',
        'img': 'img/Targaryen.ico',
},

    {
        'name': 'Tully',
        'img': 'img/Tully.ico',
},

    {
        'name': 'Tyrell',
        'img': 'img/Tyrell.ico',
}

];


const gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
let score = 1;

const game = document.getElementById('cardsWrapper');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${item.img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

(function foo() {

    if (window.screen.width < 500) {
        grid.addEventListener('touchstart', event => {

            const clicked = event.target;

            if (
                clicked.nodeName === 'SECTION' ||
                clicked === previousTarget ||
                clicked.parentNode.classList.contains('selected') ||
                clicked.parentNode.classList.contains('match')
            ) {
                return;
            }

            if (count < 2) {
                count++;
                if (count === 1) {
                    firstGuess = clicked.parentNode.dataset.name;
                    clicked.parentNode.classList.add('selected');
                } else {
                    secondGuess = clicked.parentNode.dataset.name;
                    clicked.parentNode.classList.add('selected');
                }

                if (firstGuess && secondGuess) {
                    if (firstGuess === secondGuess) {
                        setTimeout(match, delay);
                        document.getElementById('score').innerHTML = score++
                    }
                    setTimeout(resetGuesses, delay);
                }
                previousTarget = clicked;
            }

            if (score >= 11) {
                document.getElementById('end').style.display = 'flex';

            }

        });
    } else {
        grid.addEventListener('click', event => {

            const clicked = event.target;

            if (
                clicked.nodeName === 'SECTION' ||
                clicked === previousTarget ||
                clicked.parentNode.classList.contains('selected') ||
                clicked.parentNode.classList.contains('match')
            ) {
                return;
            }

            if (count < 2) {
                count++;
                if (count === 1) {
                    firstGuess = clicked.parentNode.dataset.name;
                    clicked.parentNode.classList.add('selected');
                } else {
                    secondGuess = clicked.parentNode.dataset.name;
                    clicked.parentNode.classList.add('selected');
                }

                if (firstGuess && secondGuess) {
                    if (firstGuess === secondGuess) {
                        setTimeout(match, delay);
                        document.getElementById('score').innerHTML = score++
                    }
                    setTimeout(resetGuesses, delay);
                }
                previousTarget = clicked;
            }

            if (score >= 11) {
                document.getElementById('end').style.display = 'flex';

            }

        });
    }
})();
