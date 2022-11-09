const form = document.querySelector('form')
const search = document.querySelector('input')
const error = document.querySelector('.error')
const success = document.querySelector('.success')

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    error.textContent = "loading"

    fetch('http://localhost:3000/weather?address=' + search.value).then( (responce) =>{
        responce.json().then((data) =>{
            if(data.error){
                error.textContent = data.error
            } else {
                success.textContent = data.forecast
            }
        })
    })
})