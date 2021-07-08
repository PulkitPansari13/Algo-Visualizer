let array;
let array_copy;

let array_size_input = document.querySelector('#size_input');
let array_size = parseInt(array_size_input.value);
let speed_input = document.getElementById('speed_input');
let reduce_delay = parseInt(speed_input.value);

let new_array_btn = document.getElementById('new-arraybtn');
let reset_array_btn = document.getElementById('resetbtn');

const bubSortBtn = document.getElementById('bubbleSort');
const insertSortBtn = document.getElementById('insertSort');
const selectionSortBtn = document.getElementById('selectionSort');
const mergeSortBtn = document.getElementById('mergeSort');
const quickSortBtn = document.getElementById('quickSort');
const randomQuickSortBtn = document.getElementById('randomQuickSort');

const srtStatus = document.getElementById('srt-status');
const compCount = document.getElementById('ncomp');
const swapCount = document.getElementById('nswap');
const mgsrtInfo = document.getElementById('mgsrt-info');

let array_container = document.getElementById('array-container');
let default_delay = 260;
const margin_size = 0.1; // left margin for each bar in %

let delay = default_delay - reduce_delay;

function makeNewArray(no_of_bars = 60){
    updateSwaps(0);
    updateComps(0);
    array_container.innerHTML = '';
    array = new Array();
    array_copy = new Array();
    for(let i=0; i<no_of_bars; i++){
        let height = Math.floor(Math.random()*240)+5;
        let barheight = 2*height;
        array.push(height);
        array_copy.push(height);
        const bar = document.createElement('div');
        // bar.textContent = `${height}`;
        bar.classList.add('bar');
        bar.style.height = `${barheight}px`; // actual height of bar
        bar.style.width = `${100/no_of_bars- margin_size}%`;
        array_container.appendChild(bar);
    }
}

function resetArray(){
    updateSwaps(0);
    updateComps(0);
    array_container.innerHTML = '';
    const no_of_bars = array_size;
    for(let i=0; i<no_of_bars; i++){
        let height = array_copy[i];
        let barheight = 2*height;
        array[i] = height;
        const bar = document.createElement('div');
        // bar.textContent = `${height}`;
        bar.classList.add('bar');
        bar.style.height = `${barheight}px`; // actual height of bar
        bar.style.width = `${100/no_of_bars- margin_size}%`;
        array_container.appendChild(bar);
    }
}


// create array on page load.
makeNewArray(array_size);

// create new array on new_array_btn click.
new_array_btn.addEventListener('click', function(){makeNewArray(array_size)});

// reset array to unsorted array without creating new one.
reset_array_btn.addEventListener('click', function(){resetArray()});

// create new array on array size change.
array_size_input.addEventListener('input', function(){
    array_size = parseInt(this.value);
    makeNewArray(array_size);
});

speed_input.addEventListener('input', function(){
    reduce_delay = parseInt(this.value);
    delay = default_delay - reduce_delay;
})


function disableBtns(boolval){
    // if true, disables the btns
    // else enables them.

    array_size_input.disabled = boolval;

    new_array_btn.disabled = boolval;
    reset_array_btn.disabled = boolval;

    bubSortBtn.disabled = boolval;
    insertSortBtn.disabled = boolval;
    selectionSortBtn.disabled = boolval;
    mergeSortBtn.disabled = boolval;
    quickSortBtn.disabled = boolval;
    randomQuickSortBtn.disabled = boolval;
}



let sortBtns = document.getElementsByClassName('srtbtn');
[...sortBtns].forEach(srtbtn => {
    srtbtn.addEventListener('click', async function(){
        mgsrtInfo.classList.add('d-none');
        srtStatus.classList.remove('invisible');
        // srtStatus.classList.add('visible');
        let srtfunc = this.dataset.sortName;
        let bars = document.querySelectorAll('.bar');
        updateSwaps(0);
        updateComps(0);
        disableBtns(true);
        switch (srtfunc) {
            case "bubble":
                await bubSort(array, array_size, bars);
                break;
            case "insert":
                await insertSort(array, array_size, bars);
                break;
            case "select":
                await selectionSort(array, array_size, bars);
                break;
            case "merge":
                mgsrtInfo.classList.remove('d-none');
                await mergeSort(array, 0, array_size-1, bars);
                break;
            case "quick":
                await quickSort(array, 0, array_size-1, array_size, bars);
                break;
            case "randquick":
                await randomQuickSort(array, 0, array_size-1, array_size, bars);
                break;
            default:
                console.log("select valid function.");
                break;
        }
        disableBtns(false);
    })
});

function updateComps(value){
    compCount.textContent = value;
}

function updateSwaps(value){
    swapCount.textContent = value;
}