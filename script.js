var zipCode = 84097
var ideas = document.querySelector(".idea")
var restaurant = document.querySelector(".restaurant")
// var apiKey = "Bearer mBoDH4rsoLue6XA8D1yQxqIWgXEuXNblkFNatJOaePgeVk5YMVB_X7fRfx2UG_7WrXCweMV0rAngdQ6DPHxLHe2Iqafgb6KVc1NklA3qpGL4ucfr1f28YQLfQ8iOYnYx"
var apiKey =
  "Bearer HyNYhS-Wk9nc__m_elZsc3b9xAcu1I2Y0VcFoRw7XUMwWUXiwjjOAJU3jIYeFHgOyVHwGgkDE-Tcrp7k0ED2vdCXHAARiWKDylcxBQ-zm19OPXRgpRT_vt3O-1SNYnYx"

function fetchRestaurants() {
  var myHeaders = new Headers()
  myHeaders.append("Authorization", apiKey)

  var requestOptions = {
    headers: myHeaders,
  }

  fetch(
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=84097&price=2",
    requestOptions
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data)
      let randomIndex = Math.floor(Math.random() * data.businesses.length)

      restaurant.innerText = data.businesses[randomIndex].name
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

      ideas.innerText = data.activity
    })
  // .catch((error)=>{

  //     console.log(error)
  // })
}
function doBoth (){
    fetchActivities()
    fetchRestaurants()
}
document.querySelector(".date-ideas").addEventListener("click", fetchActivities)

document
  .querySelector(".restaurants")
  .addEventListener("click", fetchRestaurants)

  document.querySelector('.do-both')
  .addEventListener('click', doBoth)