const add = (a,b) =>{
    return new Promise((resolve, reject)=>{
        setTimeout( ()=>{
            if( a < 0 || b < 0){
                return reject('undefined')
            }
            resolve(a + b)
        }, 1000 )
    })
}

const doWork = async () =>{
    const sum = await add(-1,99)
    console.log(sum)

    const sum2 = await add(-5,100)
    console.log(sum2)

    const sum3 = await add(sum, 100)
    return sum3
}

// console.log(doWork())

doWork().then((res) =>{
    console.log(res)
}).catch((e) =>{
    console.log(e)
})