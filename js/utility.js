function waitforme(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
}

// swaps the given indexs id1 and id2 of arr and
// bars. Only swaps the height, not bg-color.
function swap(arr, id1, id2, bars){
    let temp = arr[id1];
    let temp_height = bars[id1].style.height;
    let temp_txt_content = bars[id1].textContent;

    arr[id1] = arr[id2];
    bars[id1].style.height = bars[id2].style.height;
    bars[id1].textContent = bars[id2].textContent;
    
    arr[id2] = temp;
    bars[id2].style.height = temp_height;
    bars[id2].textContent = temp_txt_content;
}

// updates the color of given bar
function updateColor(bars, barid, color){
    if(barid<bars.length)
        bars[barid].style.backgroundColor = color;
}

// for pulse animation.
function addPulse(bars, barid){
    if(barid<bars.length)
        bars[barid].classList.add("animate__animated", "animate__pulse", "animate__faster");
}
function removePulse(bars, barid){
    if(barid<bars.length)
        bars[barid].classList.remove("animate__animated", "animate__pulse", "animate__faster");
}
