---
title: provide_weather
timestamp: 2016-12-07T12:27:11.9701133+02:00
---

How is the weather like?
* ask_current_weather/temperature

< What is the weather like where?
* prompt/weather_city

How is the weather like in [Cluj-Napoca](city)?
* provide_weather/current

< There are [50](temperature) degrees in [Cluj-Napoca](city) right now.
* provide_weather/current
