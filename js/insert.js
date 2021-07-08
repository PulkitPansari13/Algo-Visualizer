async function insertSort(arr, size, bars){
    let swaps = 0; // store the swap count
    let comparisons = 0;
    for(let i=0; i<size; i++){
        let key = arr[i];
        let hole = i;
        while(hole != 0 && arr[hole-1]>key){
            comparisons++;
            updateComps(comparisons);
            updateColor(bars, hole, traverse_color);
            await waitforme(delay-50);
            arr[hole] = arr[hole-1];
            bars[hole].style.height = `${arr[hole-1]*2}px`;
            // await waitforme(delay);
            hole--;
            updateColor(bars, hole+1, intermediate_sorted_color);
            swaps++;
            updateSwaps(swaps);
            await waitforme(delay-50);
        }
        comparisons++; // when while condition fails.
        updateComps(comparisons); 
        updateColor(bars, hole, traverse_color);
        await waitforme(delay-50);
        updateColor(bars, hole, comparing_ele_color);
        addPulse(bars, hole);
        await waitforme(delay+100);
        arr[hole] = key;
        removePulse(bars, hole);
        bars[hole].style.height = `${key*2}px`;
        updateColor(bars, hole, intermediate_sorted_color);
        await waitforme(delay);
    }

    for(let i=0; i<size; i++){
        updateColor(bars, i, sorted_color);
        await waitforme(delay-100);
    }

}
