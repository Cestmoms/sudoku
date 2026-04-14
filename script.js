let sudoku = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],

    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],

    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
];

let grid = document.getElementById("grid");
let message = document.getElementById("message");

let inputs = [];

for (let i = 0; i < 9; i++) {

    for (let j = 0; j < 9; j++) {

        let input = document.createElement("input");

        input.type = "text";
        input.maxLength = 1;

        if (sudoku[i][j] !== 0) {
            input.value = sudoku[i][j];
            input.disabled = true;
        }

        grid.appendChild(input);

        inputs.push(input);
    }
}

function sauvegarder() {

    let valeurs = [];

    for (let i = 0; i < inputs.length; i++) {
        valeurs.push(inputs[i].value);
    }

    localStorage.setItem("sudoku", valeurs.join(","));
}

function charger() {

    let data = localStorage.getItem("sudoku");

    if (data !== null) {

        let valeurs = data.split(",");

        for (let i = 0; i < inputs.length; i++) {

            if (inputs[i].disabled === false) {
                inputs[i].value = valeurs[i];
            }
        }
    }
}

charger();

for (let i = 0; i < inputs.length; i++) {

    inputs[i].addEventListener("input", function () {

        let v = inputs[i].value;

        if (v < 1 || v > 9) {
            inputs[i].value = "";
        }

        sauvegarder();
    });
}

let btn = document.getElementById("checkBtn");

btn.onclick = function () {

    let grille = [];
    let index = 0;

    for (let i = 0; i < 9; i++) {

        let ligne = [];

        for (let j = 0; j < 9; j++) {

            let val = inputs[index].value;

            if (val === "") {
                val = 0;
            } else {
                val = Number(val);
            }

            ligne.push(val);
            index++;
        }

        grille.push(ligne);
    }

    let ok = true;

    for (let i = 0; i < 9; i++) {

        let deja = [];

        for (let j = 0; j < 9; j++) {

            let val = grille[i][j];

            if (val === 0) ok = false;

            if (deja[val] === true) {
                ok = false;
            }

            deja[val] = true;
        }
    }

    for (let j = 0; j < 9; j++) {

        let deja = [];

        for (let i = 0; i < 9; i++) {

            let val = grille[i][j];

            if (val === 0) ok = false;

            if (deja[val] === true) {
                ok = false;
            }

            deja[val] = true;
        }
    }

    for (let blocLigne = 0; blocLigne < 9; blocLigne += 3) {

        for (let blocCol = 0; blocCol < 9; blocCol += 3) {

            let deja = [];

            for (let i = blocLigne; i < blocLigne + 3; i++) {

                for (let j = blocCol; j < blocCol + 3; j++) {

                    let val = grille[i][j];

                    if (val === 0) ok = false;

                    if (deja[val] === true) {
                        ok = false;
                    }

                    deja[val] = true;
                }
            }
        }
    }

    if (ok === true) {
        message.textContent = "Bravo, Sudoku réussi !";
    } else {
        message.textContent = "Erreur dans la grille.";
    }
};

document.getElementById("resetBtn").onclick = function () {

    localStorage.removeItem("sudoku");

    location.reload();
};