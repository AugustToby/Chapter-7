let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
 
let issLong = document.querySelector('#iss-long')

let timeIssLocationFetched = document.querySelector('#time')

let update = 1000
let maxFailedAttempts = 3

let issMarker
let Icon = L.icon({
    iconUrl: 'iss_icon.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
})



let map = L.map('iss-map').setView([0, 0], 1) 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',    
}).addTo(map)

iss(maxFailedAttempts)  // call function one time to start
// setInterval(iss, 10000)  // 10 seconds

function iss(attempts) {

    if( attempts <= 0) {
        alert('Attempted to contact server, failed after several attempts')
        return
    }

    fetch(url).then ( (res) => {  // res = response
        return res.json()    // process responses into JSON
    }).then ( ( issData) => {
        console.log(issData)  // TODO - display data on web page
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long

        //create marker if it doesn't exist
        // move marker if it does exist

        if (!issMarker) {
            // create marker
            issMarker = L.marker([lat, long], {icon: Icon}).addTo(map)  // creates a marker
        } else {
            issMarker.setLatLng([lat, long]) //Already exists - moved to new location
        }

        // Update the time element to the current date and time
        let now = Date()
        timeIssLocationFetched.innerHTML = `This data was fetched at ${now}`

        // Could call setTimeout(iss, update) if you only want to re-try if fetch was successful

    }).catch ( ( err) => {        // if the request catches an error it'll run through this function and return ERROR
        attempts = attempts - 1 // subtract 1 from the number of attempts
        console.log('ERROR!', err)
    }).finally( () =>{
        // Finally runs whether the fetch() was succesful or not
        // Call the iss function after a delay of update milliseconds
        // to update the position
        setTimeout(iss, update, attempts)
    })
}
