let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector('#play-again')

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 

let randomCountryData = countriesAndCodes[Math.floor(Math.random() * countriesAndCodes.length)]
    console.log(randomCountryData)  // generatesa a random country object from countries.js


let selectedCountryName = randomCountryData['name']  // extracts only the country name from the randomly generated country object
console.log(selectedCountryName)
randomCountryElement.innerHTML = selectedCountryName


submitButton.addEventListener('click', function() {
    let userAnswerCapital = userAnswerElement.value
    
    let CountryCode = randomCountryData["alpha-2"] // extracts only the alpha-2/capital object from the countries array
    console.log(CountryCode)

    let url = `https://api.worldbank.org/v2/country/${CountryCode}?format=json`  // url with the country data associated with the randomly generated country code

    fetch(url)
        .then( response => response.json())
        .then( countryDataResponse => {
            let countryDataArray = countryDataResponse[1] // we only need the capital city which is in index 1
            let countryData = countryDataArray[0] // reads the object in index 0 (not neccessary)
            let correctAnswerCapital = countryData.capitalcity
            console.log(correctAnswerCapital) 

            //write an if statement correctAnswerCapital to userAnswerCapital
            //set innerHTML of resultTextElement to appropiate message
        })
        .catch( err => {
            console.log(err)
            alert('Sorry that isn\t the correct capital')
        })

})

playAgainButton.addEventListener('click', function(){

})

// TODO when the page loads, select an element at random from the countriesAndCodes array

// TODO display the country's name in the randomCountryElement 

// TODO add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement 
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare it to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"


// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 
