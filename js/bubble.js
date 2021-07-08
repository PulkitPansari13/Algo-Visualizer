async function bubSort(arr, size, bars){
    let swaps = 0; // store the swap count
    let comparisons = 0;
    let sorted = false;
    for(let i=0; i<size; i++){
        if(sorted)
            break
        sorted = true;
        for(let j=0; j<size-i-1; j++){
            updateColor(bars, j, traverse_color);
            updateColor(bars, j+1, traverse_color);
            comparisons++;
            updateComps(comparisons);
            await waitforme(delay+100);
            if(arr[j]>arr[j+1]){
                sorted = false;
                updateColor(bars, j, "red");
                updateColor(bars, j+1, "red");
                await waitforme(delay);
                swap(arr, j, j+1, bars); 
                swaps++;
                updateSwaps(swaps);
                await waitforme(delay+50);
            }
            else{
                updateColor(bars, j, "#289672");
                updateColor(bars, j+1, "#289672");
                await waitforme(delay+100);
            }
            
            updateColor(bars, j, barpurple);
            updateColor(bars, j+1, barpurple);
            await waitforme(delay);
        }
        updateColor(bars, bars.length-1-i, sorted_color)
    }

    for(let i=0; i<bars.length; i++){
        updateColor(bars, i, sorted_color);
        await waitforme(delay-100);
    }

}

// bubSortBtn.addEventListener('click', function(){
//     let bars = document.querySelectorAll('.bar');
//     bubSort(array, array_size, bars);
// })
