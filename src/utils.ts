// Support and utility function and classes

// Check if element is in array
export function check_array(id: number, arr: any[]) {
    let el: any;
    id >= arr.length || id < 0 ? el = arr[0] : el = arr[id];
    return el;
}

