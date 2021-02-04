import {getParks, useParks} from "./ParkProvider.js"
import {parkCard} from "./Park.js"
import { getWeather, useWeather } from "../weather/WeatherProvider.js"
import {weatherCard} from "../weather/Weather.js"

//reference in HTML where the <select> will be rendered
const parksTarget = document.querySelector(".parks-Dropdown")

//define a function of ParkSelect
export const ParkSelect = () => {
    getParks().then(() => {
        let allTheParks = useParks()
       //passing the allTheParks into the function of render
        render (allTheParks)
        
    })
}

//.map is the loop that is looping over the array of parksCollection and taking in the parameter of currentParkInLoop
const render = parksCollection => {
    //building the dropdown menu for parks for the DOM
    parksTarget.innerHTML = `
    <select class="dropdown" id="ParkSelectDropdown">
    <option value="">Please select a park...</option>
    ${parksCollection.map((currentParkInLoop) => { 
        return `<option>${currentParkInLoop.fullName}</option>`}

    )}
    </select>`
}




//"change" is the type of event on my addEventListener
//changeEvent is the parameter on my callback function
parksTarget.addEventListener("change",(changeEvent) => {
    console.log("i clicked this park" ,changeEvent.target.value)
    //declared a variable for the array produced by useParks
    let allTheParks = useParks()
    
    //looping through the array of allTheParks
    for(const currentParkInLoop of allTheParks){
        //creates a conditional to compare the park name against the changeEvent.target.value
        //if they match, the parkCard function-defined on Park.js that creates the HTML is inserted into the parks.list div and will print in the DOM
        if(currentParkInLoop.fullName === changeEvent.target.value){
            document.querySelector(".parksList").innerHTML = parkCard(currentParkInLoop)
        }
        //call the getWeather function from the WeatherProvider module; pass in a parameter of currentParkInLoop.addresses[0].postalCode so it will target an individual park's zip code
        //use .then() to make sure the function getWeather fetches the data so I can useWeather() to create the parameter for the weatherCard() 
        //which will print the HTML representation of the weather in the DOM in the weatherList div
        getWeather(currentParkInLoop.addresses[0].postalCode).then(() => {
            let allTheWeather = useWeather()

            for(const currentWeatherInLoop of allTheWeather)
                if(currentParkInLoop.fullName === changeEvent.target.value){
                document.querySelector(".weatherList").innerHTML = weatherCard(currentWeatherInLoop)
            }
        }
        )
        }
    }
)

