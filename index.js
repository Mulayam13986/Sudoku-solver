

const cells = document.querySelectorAll(".cell");

const text = document.querySelector("#status");
const restartBtn = document.querySelector("#restart");



const winSituations = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let options = ["", "","", "","","", "","", ""];

let curPlayer = "X";

let isGame = false;

initialise();
function initialise(){
    isGame = true;
    cells.forEach(cell => cell.addEventListener("click" , cellclicked));
    restartBtn.addEventListener("click" , restartgame);
    text.textContent = `${curPlayer}'s turn`;

}

function cellclicked(){

    const cellindex = this.getAttribute("cellindex");


    if(options[cellindex] != "" || !isGame){

        return;
    }

    updatecell(this , cellindex);
    checkWinner();
}

function updatecell(cell , index){

    options[index] = curPlayer;
    cell.textContent = curPlayer;

    
}

function changeplayer(){
    curPlayer = (curPlayer == "X") ? "O" : "X";

    text.textContent = `${curPlayer}'s turn`
}

function checkWinner(){


    let ifwin = false;

    for(let i =0 ;  i < 8;i++ ){

        const condition = winSituations[i];

        const cell1 = options[condition[0]];
        const cell2 = options[condition[1]];
        const cell3 = options[condition[2]];

        if(cell1 == "" || cell2 =="" || cell3 ==""){
            continue;
        }

        if(cell1==cell2 && cell2 == cell3){
            ifwin = true;
            break;
        }
    }
    // console.log(ifwin);
    if(ifwin) {

        text.textContent = `${curPlayer} wins!`;
        isGame = false;
    }

    else if (!options.includes("")){

        text.textContent = "Draw";

        isGame = false;

    }
    else {
        changeplayer();
    }
}

function restartgame(){

    curPlayer="X";
    options = ["", "","", "","","", "","", ""];

    text.textContent = `${curPlayer}'s turn`;
    cells.forEach(cell => cell.textContent="");
    isGame=true;
}