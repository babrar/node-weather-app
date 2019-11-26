const path = require('path')
const express = require('express')
const hbs = require('hbs')
// util modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths to be used in express configs below
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Handlebar settings for express
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// serves up static files. Accessible by localhost:xxxx/filename.html
app.use(express.static(publicDirectoryPath))  // equivalent to app.get('/', ...)

app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Banin Abrar"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Banin Abrar",
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Banin Abrar",
        message: "This is the help page where you will find answers to most common questions.",
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastString) => {
            if (error) {
                return res.send({
                    error,
                })
            }
            res.send({
                location,
                forecast: forecastString,
                address: req.query.address,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Banin Abrar",
        errorMessage: "Help article not found.",
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Banin Abrar",
        errorMessage: "Page not found.",
    })
})

app.listen(3000, () => {
    console.log("Server Has Started...")
})