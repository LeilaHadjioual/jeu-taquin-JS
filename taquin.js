let tableauLenght = 4;

let tab = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, " "]
];

let tabRef = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, " "]
];

//redessine le tableau en incluant le html modifié
function draw() {
    for (let x = 0; x < tab.length; x++) {
        for (let y = 0; y < tab.length; y++) {
            $('#row' + x + ' .cas' + y).html(tab[x][y]);
        }
    }
}

//recherche les coordonnées x,y de la case vide
function emptyPosition() {
    for (let x = 0; x < tab.length; x++) {
        for (let y = 0; y < tab.length; y++) {
            if (tab[x][y] === " ") {
                return {"x": x, "y": y};
            }
        }
    }
}

//vérifie que la cellule voisine est vide
function cellIsEmpty(x, y) {
    return (cellExist(x, y) && (tab[x][y] === " "));
}

//vérifie que la cellule existe
function cellExist(x, y) {
    return ((x >= 0 && x < tableauLenght) && (y >= 0 && y < tableauLenght));
}

//vérifie que la cellule pleine est permutable avec la cellule voisine qui doit être vide
function cellPermutable(x, y) {
    return (cellIsEmpty(x, y - 1)
        || cellIsEmpty(x, y + 1)
        || cellIsEmpty(x - 1, y)
        || cellIsEmpty(x + 1, y))
}

//permute la cellule vide avec la cellule pleine
function permute(x, y) {
    if (!cellExist(x, y)) {
        return;
    }
    // où est la case vide ?
    let emptyCase = emptyPosition();// retourne un objet

    // est-ce permutable ?
    let casePerm = cellPermutable(x, y);

    //récupère la valeur de la cellule pleine
    let fullCase = tab[x][y];

    //récupére la valeur de la cellule vide
    let newEmptyCase = tab[emptyCase.x][emptyCase.y]; //[nomVariable.clé] car la fonction emptyPosition retourne un objet

    // permuter les cellules
    if (casePerm === true) {
        tab[x][y] = newEmptyCase;
        // $('#row' + x + ' .cas' + y).addClass("colorCase");
        tab[emptyCase.x][emptyCase.y] = fullCase;
        // $('#row' + emptyCase.x + ' .cas' + emptyCase.y).removeClass("colorCase");
        // youWin();
        draw();
    }
}

//mélanger aléatoire des cases du tableau
function shuffleAuto(array) {
    let tab1D = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            tab1D.push(array[i][j]); //transforme le tableau à 2 dimensions en tableau à 1 dimension
        }
    }

    for (var x = tab1D.length - 1; x > 0; x--) {
        var rand = Math.floor(Math.random() * (x + 1));
        var temp = tab1D[x];
        tab1D[x] = tab1D[rand];
        tab1D[rand] = temp;
        createTab2D(tab1D);
        draw();
    }
}

// transforme le tableau 1 dim en tableau à 2 dimensions
function createTab2D(array) {
    for (let x = 0; x < tab.length; x++) {
        for (let y = 0; y < tab.length; y++) {
            let z = tab.length * x + y; //variable qui stocke la valeur de la cellule qui correspond à (3 X indice x + indice y)
            tab[x][y] = array[z];//valeurs du tableau 1D prend les valeurs du tableau 2D (tab)
        }
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//mélange case par case
function shuffle(x, y) {
    let tirage = getRandom(0, 4);
    if (tirage === 0 && cellPermutable(x, y + 1)) {
        permute(x, y + 1);
    } else if (tirage === 1 && cellPermutable(x, y - 1)) {
        permute(x, y + -1);
    } else if (tirage === 2 && cellPermutable(x + 1, y)) {
        permute(x + 1, y);
    } else if (tirage === 3 && cellPermutable(x - 1, y)) {
        permute(x - 1, y);
        youWin();
    }
}

//fonction qui détermine si tu as gagné
function youWin() {
    for (let i = 0; i < tabRef.length; i++) {
        for (let j = 0; j < tab.length; j++) {
            if (tabRef[i][j] !== tab[i][j]) {
                return false
            }
        }
    }
    // alert( 'gagné');
    $("table").before("<div class='winAlert'> Vous avez gagné</div>");
    $(".winAlert").fadeOut(3000);
}

//fonction qui vérifie si la partie est gagnable
function winnable() {
    let pV = parityEmptyCase();
    let pT = countPermutation(tab);
    console.log(pV);
    console.log(pT);
    if (pV === pT) {
        alert("Le jeu est résolvable");
        console.log("ok");
    } else {
        alert("Le jeu n'est pas résolvable");
        console.log("pas ok");
    }
}


//fonction qui vérifie la parité des permutations
function countPermutation(tableau) {
    let simpleArray = [];
    let tmp;
    let count = 0;
    let parity;
    for (let i = 0; i < tableau.length; i++) {
        for (let j = 0; j < tableau.length; j++) {
            simpleArray.push(tableau[i][j]);
        }
    }
    for (let i = 0; i < simpleArray.length; i++) {
        if (simpleArray[i] === " ") {
            simpleArray[i] = 16;
        }
    }
    for (let i = 0; i < simpleArray.length; i++) {
        let k = i;
        for (let j = i + 1; j < simpleArray.length; j++) {
            if (simpleArray[j] < simpleArray[k]) {
                k = j;
            }
        }
        if (k !== i) {
            tmp = simpleArray[k];
            simpleArray[k] = simpleArray[i];
            simpleArray[i] = tmp;
            count++;
        }
    }
    if (count % 2 === 0) {
        parity = "pair";
    } else {
        parity = "impair"
    }
    return parity;
}

//vérifie la parité de la case vide
function parityEmptyCase() {
    let emptyCase = emptyPosition();
    let sum = emptyCase.i + emptyCase.j;
    let par;
    if (sum % 2 === 0) {
        par = "pair";
    } else {
        par = "impair";
    }
    return par;
}

$(document).ready(function () {

    $("#show").on('click', function () {
        $("#show").hide();
        for (let x = 0; x < tab.length; x++) {
            $("table").append("<tr id='row" + x + "'></tr>");
            for (let y = 0; y < tab.length; y++) {
                $("#row" + x).append("<td class='cas" + y + "'>" + tab[x][y] + "</td>");
                $('#row' + x + ' .cas' + y).click(function () {
                    permute(x, y);
                });
            }
        }
        $("#btn-shuffle").on('click', function () {
            shuffleAuto(tab);
        });

        $('#mix').click(function () {
            for (let a = 1; a < 1000; a++) {
                let emptyCase = emptyPosition();
                shuffle(emptyCase.x, emptyCase.y);
            }
        });

        $('#parity').click(function () {
            winnable();
        })
    });

});