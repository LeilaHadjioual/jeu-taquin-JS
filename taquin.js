let tableauLenght = 4;

let tab = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, " "]
];

$(document).ready(function () {

    $("#reinit").on('click', function () {
        $("#reinit").off('click');
        for (let x = 0; x < tab.length; x++) {
            $("table").append("<tr class='row" + x + "'></tr>");
            for (let y = 0; y < tab.length; y++) {
                $(".row" + x).append("<td class='cas" + y + "'>" + tab[x][y] + "</td>");
                $('.row' + x + ' .cas' + y).click(function () {
                    permute(x, y);
                });
                // $("#btn-shuffle").on('click', function () {
                //     shuffleArray(tab);
                //
                // })
            }
        }
    });
});

//redessine le tableau en incluant le html modifié
function draw() {
    for (let x = 0; x < tab.length; x++) {
        for (let y = 0; y < tab.length; y++) {
            $('.row' + x + ' .cas' + y).html(tab[x][y]);
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
    return (cellIsEmpty(x, y - 1) && cellExist(x, y - 1)
        || cellIsEmpty(x, y + 1) && cellExist(x, y + 1)
        || cellIsEmpty(x - 1, y) && cellExist(x - 1, y)
        || cellIsEmpty(x + 1, y) && cellExist(x + 1, y))
}

//permute la cellule vide avec la cellule pleine
function permute(x, y) {
    // où est la case vide ?
    let emptyCase = emptyPosition(); // retourne un objet

    // est-ce permutable ?
    let casePerm = cellPermutable(x, y);

    //récupère la valeur de la cellule pleine
    let fullCase = tab[x][y];

    //récupére la valeur de la cellule vide
    let newEmptyCase = tab[emptyCase.x][emptyCase.y]; // nomVariable.clé car objet

    // permuter les cellules
    if (casePerm === true) {
        tab[x][y] = newEmptyCase;
        tab[emptyCase.x][emptyCase.y] = fullCase;
        draw();
    }
}

// //mélanger les cases
// function shuffleArray(array) {
//     let tabsimple = [];
//     for(let i = 0; i < array.length; i++){
//         for(let j=0; j<array.length; j++){
//             tabsimple.push(array[i][j]);
//         }
//     }
//     // console.log(tabsimple);
//     for (var x = tabsimple.length - 1; x > 0; x--) {
//         var rand = Math.floor(Math.random() * (x + 1));
//         var temp = tabsimple[x];
//         console.log(temp);
//         tabsimple[x] = tabsimple[rand];
//         tabsimple[rand] = temp;
//         // console.log(temp);
//     }
////     draw();
//
// }








