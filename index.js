//function to calculate the sum of numbers for a given string
function add(str) {
    try {
        let arr
        let match = str.match(/^\/\/(.+)\n([\d\D]*)$/) //RE check for special Delimiter //[delimeter]\n[Numbers...]
        if(!str.length) {
            return 0 
        } else if (str.length === 1) {
            return Number(str)
        } else if (match) {
            arr = match[2].split(match[1]) 
        } else{ 
            arr = str.split(/,|\n/) // RE for , & \n delimiter string pattern
        }
        let invalidInputs = arr.filter(ele => isNaN(Number(ele)));
        if (invalidInputs.length) throw 'Invalid input';
        let temp = arr.filter(ele => ele < 0);
        if(temp.length) throw `negative numbers not allowed <${temp.join(',')}>` // throw error if it has negative numbers
        return arr.reduce((a,b) => { return Number(a) + Number(b)}, 0) // return the sum.
    }catch(err) {
        return err
    }
}


console.log(add('')) // returns 0
console.log(add('1')) // returns 1 
console.log('ab') // returns Invalid Input
console.log(add('1,2,3,4,5,6')) // returns 21
console.log(add('1,2,4,\n3\n5')) // returns 15
console.log(add('1,2,-3,-4,6')) // returns negative numbers not allowed <-3, -4>
console.log(add('//;\n1;2;3;4;5;6;7')) //returns 28
console.log(add('1,2,a')) // returns invalid input


module.exports = add
