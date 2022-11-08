// const name = "andrew"

// const userage = 24

// const user = {
//     name,
//     age: userage,
//     location: "Kyiv"
// }

// console.log(user)

//Object destructuring

const product = {
    label: 'Red notebook',
    price: 20,
    stock: 30,
    salePrice: undefined
}

// const label = product.label
// const stock = product.stock

// const {label:productLabel, stock, rating = 3} = product
// console.log(productLabel, stock, rating)

const transaction = (type, { label, stock }) => {
    console.log(type, label, stock)
}

transaction('order', product)

