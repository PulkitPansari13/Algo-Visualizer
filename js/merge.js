let mgsrtComps = 0;

async function mergeSortUtil(arr, start, end, bars){    
    let arrlen = arr.length;
    if(arrlen <2)
        return;
    
    // let mid = start + Math.floor((end-start)/2);
    let mid = Math.floor(arrlen/2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid, arrlen);

    updateColor(bars, start+mid-1, "red");
    await waitforme(delay);

    await mergeSortUtil(left, start, start+mid-1, bars);
    await mergeSortUtil(right, start+mid, end, bars);

    await merge(arr, left, right, start, end, bars);    
}

async function merge(arr, left, right, start, end, bars){
    const n1 = left.length;
    const n2 = right.length;
    const o = arr.length;

    for(let t1=0; t1<n1; t1++){
        updateColor(bars, start+t1, merge_left_color);
        await waitforme(delay-100);
    }

    for(let t2=0; t2<n2; t2++){
        updateColor(bars, start+n1+t2, merge_right_color);
        await waitforme(delay-100);
    }

    let i=0, j=0, k=0;
    let merged_color = intermediate_sorted_color;
    if(n1+n2 == bars.length)
        merged_color = sorted_color;

    while (i<n1 && j<n2 && k<o){
        if(left[i]<=right[j]){
            arr[k] = left[i];
            i++;
        }
        else{
            arr[k] = right[j];
            j++;
        }
        mgsrtComps++;
        updateComps(mgsrtComps);
        bars[start+k].style.height = `${arr[k]*2}px`;
        updateColor(bars, start+k, merged_color);
        await waitforme(delay-50);
        k++;
    } 
    while(i<n1){
        arr[k] = left[i];
        bars[start+k].style.height = `${arr[k]*2}px`;
        updateColor(bars, start+k, merged_color);
        await waitforme(delay-50);
        k++;
        i++;
    }

    while(j<n2){
        arr[k] = right[j];
        bars[start+k].style.height = `${arr[k]*2}px`;
        updateColor(bars, start+k, merged_color);
        await waitforme(delay-50);
        k++;
        j++;
    }
}

async function mergeSort(arr, start, end, bars){
    mgsrtComps = 0;
    // const msg = `0 (not-in-place, no swapping!)`;
    // updateSwaps(msg);
    await mergeSortUtil(arr, start, end, bars);
}


// mergeSortBtn.addEventListener('click', function(){
//     let bars = document.querySelectorAll('.bar');
//     mergeSort(array, 0, array_size-1, bars);
// })