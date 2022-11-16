// const promise = new Promise((resolve, reject) =>{
//     setTimeout( ()=>{
//         resolve(true)
//         resolve('other true')
//         reject(false)
//     }, 1000 )
// })

// promise.then((res) =>{
//     console.log(res)
// })
// .catch((err) =>{
//     console.log(err)
// })

const add = (a,b) =>{
    return new Promise((resolve, reject)=>{
        setTimeout( ()=>{
            resolve(a + b)
        }, 1000 )
    })
}

// ------ Promise chaining

// add (1, 2).then((sum)=>{
//     console.log(sum)

//         add (sum, 2).then((sum2)=>{
//             console.log(sum2)
//         }).catch((e) =>{
//             console.log(e)
//         })
// }).catch((e) =>{
//     console.log(e)
// })

add(2, 2).then((sum) =>{
    console.log(sum)

    return add(sum, 5)
}).then((sum2) =>{
    console.log(sum2)
})



//                             / fulfilled
// Promise   --- pending -->
//                             \ rejected