const promise = new Promise((resolve, reject) =>{
    setTimeout( ()=>{
        resolve(true)
        resolve('other true')
        reject(false)
    }, 1000 )
})

promise.then((res) =>{
    console.log(res)
})
.catch((err) =>{
    console.log(err)
})



//                             / fulfilled
// Promise   --- pending -->
//                             \ rejected