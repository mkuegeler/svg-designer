// Support and utility function and classes

// Check if element is in array
export function check_array(id: number, arr: any[]) {
    let el: any;
    id >= arr.length || id < 0 ? el = arr[0] : el = arr[id];
    return el;
}

// Add element to an array
export function add_element(parent:any[],child:any,pos:boolean) {
    let result:any[] = [...parent];
    // if pos is true: add child at the beginning of the parent array, else (false) add it at the end
    pos === true? result.unshift(child) : result.push(child);
    return result;
}
