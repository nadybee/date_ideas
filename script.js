var zipCode = 84097
var ideas = document.querySelector(".idea")
var restaurant = document.querySelector(".restaurant")

var zipcodeInput= document.getElementById('zipcode')

let zipcode=84097
let openNow = false;
let price = 2
function setZipcode() {
    
    if(zipcodeInput.value.length ===5){
        zipcode = parseInt(zipcodeInput.value)
    }
    else{
        alert('please enter a valid zipcode')
    }
    console.log(zipcode)
    zipcodeInput.value =''
}
// var apiKey = "Bearer mBoDH4rsoLue6XA8D1yQxqIWgXEuXNblkFNatJOaePgeVk5YMVB_X7fRfx2UG_7WrXCweMV0rAngdQ6DPHxLHe2Iqafgb6KVc1NklA3qpGL4ucfr1f28YQLfQ8iOYnYx"
var apiKey =
  "Bearer HyNYhS-Wk9nc__m_elZsc3b9xAcu1I2Y0VcFoRw7XUMwWUXiwjjOAJU3jIYeFHgOyVHwGgkDE-Tcrp7k0ED2vdCXHAARiWKDylcxBQ-zm19OPXRgpRT_vt3O-1SNYnYx"
var yelpURL =  `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${zipcode}&price=${price}`
// var yelpURL =  `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${zipcode}&price=${price}`


function buildYelpURL() {
    var yelpURL =  `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=84097`
//   &price=2"

}
function fetchRestaurants() {
  var myHeaders = new Headers()
  myHeaders.append("Authorization", apiKey)
  myHeaders.append("mode","no-cors")

  var requestOptions = {
    headers: myHeaders,
    
  }

  fetch(yelpURL, requestOptions )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data)
      let randomIndex = Math.floor(Math.random() * data.businesses.length)

console.log( data.businesses[randomIndex].name + ' ' + data.businesses[randomIndex].location.display_address)
    })

    .catch((error) => console.log("error", error))
}
// var activity = "social"
// var minPrice = 0
// var maxPrice = 0.1
// var participantNum = 2

/** FETCH ACTIVITY IDEA */
function fetchActivities() {
  fetch(`http://www.boredapi.com/api/activity/`)
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then(function (data) {
      console.log(data.activity)

    //   ideas.innerText = data.activity
    })
  // .catch((error)=>{

  //     console.log(error)
  // })
}
function doAll (event){
    event.preventDefault()
    // setZipcode()
    fetchActivities()
    fetchRestaurants()
}

function doBoth(){ 
fetchActivities()
fetchRestaurants()
}


//   document.querySelector('#plan-date')
//   .addEventListener('click', doBoth)


  document.getElementById('plan-date')
  .addEventListener('click', doAll)