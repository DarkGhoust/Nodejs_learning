// const names = ["1", "2", "3"]

// const arr = names.filter( (name) => {
//     return name === "1"
// } )

// const geocode = (address, callback) =>{
//     setTimeout( () =>{
//         const data = {
//             lat: 0,
//             long: 0
//         }
    
//         callback(data)
//     }, 2000 )
// }

// geocode('Los Angeles', (data) =>{
//     console.log(data)
// })


// ************************************

const add = (x, y, callback) =>{
    setTimeout( ()=>{
        callback (x+y)
    }, 1000 )
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})