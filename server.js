const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use("views/css", express.static("css"))
app.use("/image", express.static("image"))

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/weather', (req, res) => {
    const city = req.body.City_Name;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27abaa3431bf3553b1d5d00c700203a4`;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const cityData = JSON.parse(data);
            // console.log(cityData);
            const icon = cityData.weather[0].icon;
            const description = cityData.weather[0].description;
            const temp = (cityData.main.temp - 273.15).toFixed(2);
            const minTemp = (cityData.main.temp_min - 273).toFixed(2);
            const maxTemp = (cityData.main.temp_max - 273).toFixed(2);
            const wind = cityData.wind.speed;
            // console.log(wind, maxTemp);
            const humidity = cityData.main.humidity;
            // res.render('index')
            res.render('index', {
                cityname: city.toUpperCase(),
                temp,
                minTemp,
                maxTemp,
                wind,
                humidity,
                icon,
                description
            })
        })
    })
})
app.listen(5000, () => {
    console.log("server started");
})