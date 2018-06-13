$(document).ready(function () {

    let taille = 4;

    let tab = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, " "]
    ];

    $("#reinitialize").on('click', function () {
        $("#reinitialize").off('click');
        for (let i = 0; i < tab.length; i++) {
            $("table").append("<tr class='row" + i + "'></tr>");
            for (let j = 0; j < tab.length; j++) {
                $(".row" + i).append("<td class='cas" + j + "'>" + tab[i][j] + "</td>");
                $('.row' + i + ' .cas' + j).click(function () {
                    permute(i,j);
                })
            }
        }
    });

    function draw() {
        for (let i = 0; i < tab.length; i++) {
            for (let j = 0; j < tab.length; j++) {
                $('.row' + i + ' .cas' + j).html( tab[i][j]);

            }
        }
    }

    //recherche les coordonnées x,y de la case vide
    function emptyPosition() {
        for (let i = 0; i < tab.length; i++) {
            for (let j = 0; j < tab.length; j++) {
                if(tab[i][j] === " ") {
                    return {"i": i, "j": j};
                }
            }
        }
    }

    //vérifie que la cellule voisine est vide
    function cellIsEmpty(i, j) {
        return (cellExist(i, j) && (tab[i][j] === " "));
    }

    //vérifie que la cellule existe
    function cellExist(i, j) {
        return ((i >= 0 && i < taille) && (j >= 0 && j < taille));
    }

    //vérfie que la cellule pleine est permutable avec la cellule voisine qui doit être vide
    function cellPermutable(i, j) {
        return( cellIsEmpty(i, j - 1) && cellExist(i, j - 1)
            || cellIsEmpty(i, j + 1) &&  cellExist(i,j+1)
            || cellIsEmpty(i - 1, j) && cellExist(i-1,j)
            || cellIsEmpty(i + 1, j) && cellExist(i+1,j))
    }

    //permute la cellule vide avec la cellule pleine
    function permute(i, j) {
        // où est la case vide ?
        let emptyCase = emptyPosition(); // retourne un objet

        // est-ce permutable ?
        let casePerm = cellPermutable(i,j);

        //récupère la valeur de la cellule pleine
        let fullCase = tab[i][j];

        //récupére la valeur de la cellule vide
        let newEmptyCase = tab[emptyCase.i][emptyCase.j]; // nomVariable.clé car objet

        // permuter
         if(casePerm === true){
             tab[i][j]= newEmptyCase;
             tab[emptyCase.i][emptyCase.j] = fullCase ;
             draw();
        }
    }

    // console.log(cellIsEmpty(3, 3));
    // console.log(cellExist(4, 2));
    // console.log(cellPermutable(1, 2));
    // console.log(positionVide());


});


