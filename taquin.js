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
            $("table").append("<tr id='row" + x + "'></tr>");
            for (let y = 0; y < tab.length; y++) {
                $("#row" + x).append("<td class='cas" + y + "'>" + tab[x][y] + "</td>");
                $('#row' + x + ' .cas' + y).click(function () {
                    permute(x, y);
                });

            }
        }
        $("#btn-shuffle").on('click', function () {
            shuffleArray(tab);

        })
    });
});

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
    return (cellIsEmpty(x, y - 1) && cellExist(x, y - 1)
        || cellIsEmpty(x, y + 1) && cellExist(x, y + 1)
        || cellIsEmpty(x - 1, y) && cellExist(x - 1, y)
        || cellIsEmpty(x + 1, y) && cellExist(x + 1, y))
}

//permute la cellule vide avec la cellule pleine
function permute(x, y) {
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
        $('#row' + x + ' .cas' + y).addClass("colorCase");
        tab[emptyCase.x][emptyCase.y] = fullCase;
        $('#row' + emptyCase.x + ' .cas' + emptyCase.y).removeClass("colorCase");
        draw();
    }
}

//mélanger les cases du tableau
function shuffleArray(array) {
    let tab1D = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            tab1D.push(array[i][j]); //transforme le tableau à 2 dimensions en tableau à 1 dimension
        }
    }

    for (var x = tab1D.length - 1; x > 0; x--) {
        var rand = Math.floor(Math.random() * (x + 1));
        var temp = tab1D[x];
        console.log(temp);
        tab1D[x] = tab1D[rand];
        tab1D[rand] = temp;
        // console.log(temp);
        createTab2D(tab1D);
        draw();
    }
}

// transforme le tableau 1 dim en tableau à 2 dimensions
    function createTab2D(array){
    for(let x=0; x<tab.length;x++){
        for(let y=0; y<tab.length;y++){
            let z = tab.length * x + y; //variable qui stocke la valeur de la cellule qui correspond à 3 X indice de x + indice y
            tab[x][y] = array[z];//valeurs du tableau 1D prend les valeurs du tableau 2D (tab)
        }
    }

}








