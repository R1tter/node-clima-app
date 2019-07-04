console.log('lado do cliente está dando load.')

const climaForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')


climaForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent ='Carregando...'
    messagetwo.textContent =''

    fetch('/clima?address=' + location).then((response)=>{
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messagetwo.textContent = data.forecast
        }
    })
})
})