const { log } = require("console");
const { response } = require("express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

});
app.post("/", function (req, res) {

    const apiKey = "6c8f533fceff3c0511fccc6b0432f505";
    const query = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const iconid = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + iconid + "@2x.png";

            res.write("<h1>Weather in " + query + "</h1>")
            res.write("description: " + description);
            res.write("<br>");
            res.write("Temperature: " + temp + " degree Celcius");
            res.write("<br>");
            res.write("<img src='" + imgURL + "'>");

            res.send();
        });

    });

});


app.listen(3000, function () {
    console.log("Server is running on port 3000");
});