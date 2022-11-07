// const square = function (x){
//     return x * x
// }

// const square = (x) =>{
//     return x * x
// }

// const square = (x) => x * x

// console.log(square(5))

const event = {
    name: 'nameevt',
    guestlist: ['Andrew', 'Jan', "Mike"],
    print() {
        console.log('Guest list: ' + this.name)

        this.guestlist.forEach((guest) => console.log(guest + ' is invited to ' + this.name) )
    }
}

event.print()