const plotShip = (name, row, col, length, orientation) =>{
    console.log({
        name: name,
        row: row,
        col: col,
        orientation: orientation
    })

    if(orientation === "horizontal")
    {
        for(let index = 0; index < length; index++){
            const createId = document.getElementById(`${name.toLowerCase()}-${row}-${col + index}`);
            createId.addEventListener(("click"), e =>{console.log(e.currentTarget)});
            createId.classList.add("ship");
        }
    } else if(orientation === "vertical") {
        for(let index = 0; index < length; index++){
            const createId = document.getElementById(`${name.toLowerCase()}-${row + index}-${col}`);
            createId.classList.add("ship");
        }
    } else {
        return "Plotting didn't work."
    }
}

const plotHit = () =>{

}

const plotMiss = () =>{

}

const removePlot = () =>{

}

const clearBoard = () =>{

}

export {plotShip, plotHit, plotMiss, removePlot}