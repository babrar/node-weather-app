console.log("Client side javascript is loaded")

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     console.log(response.json())
// })


const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

const msgOne = document.querySelector("#message-1")
const msgTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const location = search.value
    msgOne.textContent = "Loading ..."
    msgTwo.textContent = ""

    const forecastURL = "http://localhost:3000/weather?address=" + encodeURIComponent(location)
    
    fetch(forecastURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            } 
        })
    })

})