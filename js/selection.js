// selects min element to the left.
async function selectionSort(arr, size, bars){
    let swaps = 0; // store the swap count
    let comparisons = 0;
    for(let i=0; i<size; i++){
        let minbar = i;
        let minval = arr[i];
        updateColor(bars, minbar, comparing_ele_color);
        await waitforme(delay);
        for (let j = i+1; j <size; j++) {
            updateColor(bars, j, traverse_color);
            comparisons++;
            updateComps(comparisons);
            await waitforme(Math.max(delay-100, 50));
            if(arr[j]<minval){
                if(minbar != i)
                    updateColor(bars, minbar, barpurple);
                minval = arr[j];
                minbar = j;
                updateColor(bars, minbar, 'red');
                await waitforme(delay);
            }
            else{
                updateColor(bars, j, barpurple);
            }
        }
        await waitforme(delay);
        swap(arr, i, minbar, bars);
        swaps++;
        updateSwaps(swaps);
        updateColor(bars, minbar, comparing_ele_color);
        updateColor(bars, i, 'red');
        await waitforme(delay);
        
        updateColor(bars, minbar, barpurple);
        updateColor(bars, i, sorted_color);
        // await waitforme(delay);

    }
} 


// selectionSortBtn.addEventListener('click', function(){
//     let bars = document.querySelectorAll('.bar');
//     selectionSort(array, array_size, bars);
// })