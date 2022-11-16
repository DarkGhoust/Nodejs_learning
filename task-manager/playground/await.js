const doWork = async () =>{
    throw new Error('Something went wrong')
    return 1
}

// console.log(doWork())

doWork().then((res) =>{
    console.log(res)
}).catch((e) =>{
    console.log(e)
})