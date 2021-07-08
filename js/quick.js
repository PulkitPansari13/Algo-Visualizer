// selects last element as pivot.

let qsrtSwaps = 0;
let qsrtComps = 0;

async function partition(arr, start, end, size, bars){
    let pivot = arr[end];
    let pindex = start;
    updateColor(bars, end, comparing_ele_color);
    updateColor(bars, pindex, "red");
    await waitforme(delay);
    if(start == end){
        updateColor(bars, pindex, sorted_color);
        await waitforme(delay+100);
        return pindex;
    }
    for(let i= start; i<end; i++){
        if(i != pindex){
            updateColor(bars, i, traverse_color);
            await waitforme(Math.max(delay-100, 25));
        }
        qsrtComps++;
        updateComps(qsrtComps);
        if(arr[i]<= pivot){
            if(i != pindex){
                swap(arr, i, pindex, bars);
                qsrtSwaps++;
                updateSwaps(qsrtSwaps);
                await waitforme(delay);
            }
            updateColor(bars, pindex, barpurple);
            pindex++;
            updateColor(bars, pindex, "red");
            await waitforme(delay-50);
        }
        if(pindex != i){
            updateColor(bars, i, barpurple);
            // await waitforme(delay);
        }
    }
    addPulse(bars,pindex);
    addPulse(bars,end);
    await waitforme(500 - Math.floor(2.5*(reduce_delay)));
    swap(arr, end, pindex, bars);
    qsrtSwaps++;
    updateSwaps(qsrtSwaps);
    // await waitforme(delay+100);
    removePulse(bars,pindex);
    removePulse(bars,end);

    updateColor(bars, end, barpurple);
    updateColor(bars, pindex, sorted_color);
    await waitforme(delay+100);
    return pindex;
}


async function randomPartition(arr, start, end, size, bars){
    if(start == end){
        return await partition(arr, start, end, size, bars);
    }
    let p = start + Math.floor(Math.random()*(end-start+1));
    addPulse(bars,p);
    addPulse(bars,end);

    updateColor(bars, p, merge_left_color);
    updateColor(bars, end, merge_right_color);
    await waitforme(delay-50);
    swap(arr, end, p, bars);
    qsrtSwaps++;
    updateSwaps(qsrtSwaps);
    updateColor(bars, p, merge_right_color);
    updateColor(bars, end, merge_left_color);
    await waitforme(delay-50);

    updateColor(bars, p, barpurple);
    updateColor(bars, end, barpurple);
    await waitforme(delay-50);
    removePulse(bars,p);
    removePulse(bars,end);
    return await partition(arr, start, end, size, bars);
}

async function quickSortUtil(arr, start, end, size, bars){
    if(start>end)
        return
    let pindex = await partition(arr, start, end, size, bars);
    await quickSortUtil(arr, start, pindex-1, size, bars);
    await quickSortUtil(arr, pindex+1, end, size, bars);
}

async function randomQuickSortUtil(arr, start, end, size, bars){
    if(start>end)
        return
    let pindex = await randomPartition(arr, start, end, size, bars);
    await randomQuickSortUtil(arr, start, pindex-1, size, bars);
    await randomQuickSortUtil(arr, pindex+1, end, size, bars);
}


async function quickSort(arr, start, end, size, bars){
    qsrtSwaps = 0;
    qsrtComps = 0;
    await quickSortUtil(arr, start, end, size, bars);
}

async function randomQuickSort(arr, start, end, size, bars){
    qsrtSwaps = 0;
    qsrtComps = 0;
    await randomQuickSortUtil(arr, start, end, size, bars);
}

// quickSortBtn.addEventListener('click', function(){
//     let bars = document.querySelectorAll('.bar');
//     quickSort(array, 0, array_size-1, array_size, bars);
// })


// randomQuickSortBtn.addEventListener('click', function(){
//     let bars = document.querySelectorAll('.bar');
//     randomQuickSort(array, 0, array_size-1, array_size, bars);
// })

