var ideas = document.querySelector(".idea")
var restaurant = document.querySelector(".restaurant")
var zipcodeInput = document.getElementById("zipcode")

/** BUTTONS */
var next = document.getElementById("next")
var savedDates = document.querySelector(".fa-book-heart")
var planDate = document.getElementById("plan-date")
var newRestaurant = document.getElementById("new-restaurant")
var newActivity = document.getElementById("new-activity")
var back1 = document.getElementById("back-1")
var back2 = document.getElementById("back-2")
var save = document.getElementById("save")
var returnHome = document.getElementById("return-home")
var homeIcon = document.getElementById("home-icon")
var backIcon = document.querySelector(".fa-angle-left")
var cards = document.getElementById("cards")
var goBack = document.getElementById("go-back")
/**PAGES CONTAINERS AND HEADERS */
var page1Header = document.getElementById("page1-header")
var page1Cont = document.getElementById("page-one")
var page2Cont = document.getElementById("page-two")
var page2Header = document.getElementById("page2-header")
var page3Header = document.getElementById("page3-header")

var page3Cont = document.getElementById("page-three")
var page4Header = document.getElementById("page4-header")
var page4Cont = document.getElementById("page-four")
var page5Cont = document.getElementById("page-five")

/** SELECTED DIVS TO DISPLAY DATA */
var restaurantImg = document.getElementById("restaurant-img")
var restaurantInfo = document.getElementById("restaurant-info")
var activity = document.getElementById("activity")
var people = document.getElementById("people")
var accessible = document.getElementById("accessible")

/** FUNCTIONS TO SHOW AND HIDE PAGES */
function showPage1() {
  page1Header.classList.remove("hidden")
  page1Cont.classList.remove("hidden")
  page2Header.classList.add("hidden")
  page2Cont.classList.add("hidden")
  page3Header.classList.add("hidden")
  page3Cont.classList.add("hidden")
  page4Header.classList.add("hidden")
  page4Cont.classList.add("hidden")
  page5Cont.classList.add("hidden")
  zipcodeInput.value = ""
}

function showPage2() {
  page2Header.classList.remove("hidden")
  page2Cont.classList.remove("hidden")
  page1Header.classList.add("hidden")
  page1Cont.classList.add("hidden")
  page3Header.classList.add("hidden")
  page3Cont.classList.add("hidden")
  page4Header.classList.add("hidden")
  page4Cont.classList.add("hidden")
  page5Cont.classList.add("hidden")
}

function showPage3() {
  page3Cont.classList.remove("hidden")
  page3Header.classList.remove("md:hidden")
  page1Header.classList.add("hidden")
  page1Cont.classList.add("hidden")
  page2Header.classList.add("hidden")
  page2Cont.classList.add("hidden")
  page4Header.classList.add("hidden")
  page4Cont.classList.add("hidden")
  page5Cont.classList.add("hidden")
}

function showPage4() {
  page4Header.classList.remove("hidden")
  page4Cont.classList.remove("hidden")
  page1Header.classList.add("hidden")
  page1Cont.classList.add("hidden")
  page1Cont.classList.add("hidden")
  page2Header.classList.add("hidden")
  page2Cont.classList.add("hidden")
  page3Header.classList.add("md:hidden")
  page3Cont.classList.add("hidden")
  page5Cont.classList.add("hidden")
}

function showPage5() {
  page5Cont.classList.remove("hidden")
  page1Cont.classList.add("hidden")
  page1Cont.classList.add("hidden")
  page2Header.classList.add("hidden")
  page2Cont.classList.add("hidden")
  page3Header.classList.add("md:hidden")
  page3Cont.classList.add("hidden")
  page4Header.classList.add("hidden")
  page4Cont.classList.add("hidden")
}
/** API KEYS */

// var apiKey = "Bearer mBoDH4rsoLue6XA8D1yQxqIWgXEuXNblkFNatJOaePgeVk5YMVB_X7fRfx2UG_7WrXCweMV0rAngdQ6DPHxLHe2Iqafgb6KVc1NklA3qpGL4ucfr1f28YQLfQ8iOYnYx"
var apiKey =
  "Bearer HyNYhS-Wk9nc__m_elZsc3b9xAcu1I2Y0VcFoRw7XUMwWUXiwjjOAJU3jIYeFHgOyVHwGgkDE-Tcrp7k0ED2vdCXHAARiWKDylcxBQ-zm19OPXRgpRT_vt3O-1SNYnYx"

/** ----------FETCH FUNCTIONS-------- */
//FOR YELP API
let yelpURL

function fetchRestaurants(yelpURL) {
  var myHeaders = new Headers()
  myHeaders.append("Authorization", apiKey)
  myHeaders.append("mode", "no-cors")

  var requestOptions = {
    headers: myHeaders,
  }

  fetch(yelpURL, requestOptions)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data)
      let randomIndex = Math.floor(Math.random() * data.businesses.length)
   

      showImg(data.businesses[randomIndex])
      showInfo(data.businesses[randomIndex])
    })

    .catch((error) => {
      console.log("error", error)
      restaurantInfo.innerHTML = `<p class="p-5 text-orange-700"> there was an error, click back and try again</p>`
    })
}

function buildYelpURL() {
  let zipcode = zipcodeInput.value
  let price = document.querySelector("input[name=price-options]:checked").value
  let open = document.querySelector("input[name=hours]:checked").value
  yelpURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${zipcode}&price=${price}&open_now=${open}`
  fetchRestaurants(yelpURL)
}

//FOR BORED API
let boredURL

function fetchActivities(boredURL) {
  fetch(boredURL)
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then(function (data) {
      //hide spinner
      console.log(data.activity)
      showActivity(data)
    })
    .catch((error) => {
      console.log(error)
      activity.innerHTML = `<p class="p-5 text-orange-700"> there was an error, click back and try again</p>`
    })
}

function buildActivity() {
  let actPrice = document.querySelector("input[name=free]:checked").value
  // let participants = people.value
  let accessibility = "0.0"
  boredURL = `http://www.boredapi.com/api/activity?minaccessibility=0&maxaccessibility=${accessibility}&minprice=0&maxprice=${actPrice}`

  fetchActivities(boredURL)
}

/** DISPLAY RANDOM RESTAURANT AND ACTIVITY TO DOM */
function showImg(restaurant) {
  restaurantImg.innerHTML = `<img src="${restaurant.image_url}" alt="image of food " class="w-32 h-32 md:h-56 md:w-56 object-cover rounded-md " id='restaurant-pic'>`
}

function showInfo(restaurant) {
  buildMapsURL(restaurant)
  restaurantInfo.innerHTML = `<h3 class= "text-xl md:text-2xl font-bold text-textcolor" id="restaurant-name" "> ${restaurant.name}</h3>
  <span class="hidden" id="restaurant-id"> ${restaurant.id} </span>
  
  <a href=${googleURL} class="text-secondary"> <p class="md:text-xl" id="restaurant-address"> ${restaurant.location.display_address} </p></a>
    <p class="md:text-xl" id="restaurant-phone">${restaurant.display_phone} </p>`
}

function showActivity(data) {
  activity.innerHTML = `<h3 class="text-xl text-textcolor font-bold text-center w-full  mx-2 my-auto md:text-2xl" id="shown-activity"> ${data.activity}</h3>`
}

/** functions to change the date */

function getNewRestaurant() {
  fetchRestaurants(yelpURL)
}

function getNewActivity() {
  fetchActivities(boredURL)
}

/** date history to local storage functions */
let googleURL
function buildMapsURL(restaurant) {
  let restName = restaurant.name.replaceAll(" ", "+")
  let restAddress = restaurant.location.display_address
    .toString()
    .replaceAll(" ", "+")
  googleURL = `https://www.google.com/maps/search/?api=1&query=${restName}+${restAddress}`
  return googleURL
}
//STORE SAVED DATES
let storedHistory = "storedDate_"
function dateHistory() {
  let restaurantImage = document.getElementById("restaurant-pic").src
  let storedDate = {
    id: document.getElementById("restaurant-id").innerText,
    name: document.getElementById("restaurant-name").innerText,
    image: restaurantImage,
    storedActivity: document.getElementById("shown-activity").innerText,
    storedAddress: document.getElementById("restaurant-address").innerText,
    storedPhone: document.getElementById("restaurant-phone").innerText,
  }

  localStorage.setItem(
    storedHistory + storedDate.id,
    JSON.stringify(storedDate)
  )
  console.log(storedDate)
  renderDates()
  showSavedDates()
}
//RENDER DATES FROM LOCAL STORAGE
function renderDates() {
  let allDates = []
  for (let i = 0; i < localStorage.length; i++) {
    allDates.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
  }
  return allDates
}

//SHOW DATES FROM LOCAL STORAGE

function showSavedDates() {
  const datesToShow = renderDates()
  let datesHTML = []
  let dateCards = document.getElementById("cards")

  for (let i = 0; i < datesToShow.length; i++) {
    var restaurant = generateRestaurant(
      datesToShow[i].image,
      datesToShow[i].name,
      datesToShow[i].storedActivity,
      datesToShow[i].storedAddress,
      datesToShow[i].storedPhone
    )
    datesHTML.push(restaurant)
  }

  if (datesHTML.length > 0) {
    dateCards.innerHTML = datesHTML.join("")
  } else {
    dateCards.innerHTML = `<h3> No dates saved yet!</h3>`
  }
}

function generateRestaurant(image, restName, activity, address, phone) {
  return `   <a href="#" class="flex items-center align-center bg-white rounded-lg border shadow-md hover:bg-gray-100 mb-5 mx-1 restaurant-card">
  <img class="object-cover w-1/3 h-32 rounded-l-md aspect-square" src="${image}" alt="">
  <div class="flex flex-col justify-between p-4 leading-normal">
      <h4 class="mb-2 text-xl font-bold tracking-tight text-secondary" id="restaurantName">${restName}</h4>
      <h5 class="mb-3 font-normal text-textcolor" id="dateAct">${activity}</h5>
      <span class="hidden" id="restAddress"> ${address}</span>
      <p class="hidden" id="restPhone"> ${phone}</p>
  
  </div>
</a>`
}

function savedRestaurant(event) {
  var targetRestaurant = event.target.closest(".restaurant-card")
  showPage5()
  console.log(targetRestaurant)
  let newImage = targetRestaurant.querySelector("img").src
  let newName = targetRestaurant.querySelector("h4").innerText
  let newActivity = targetRestaurant.querySelector("h5").innerText
  let newAddress = targetRestaurant.querySelector("#restAddress").innerText
  let newPhone = targetRestaurant.querySelector("#restPhone").innerText
  document.getElementById(
    "saved-restaurant-img"
  ).innerHTML = `<img src="${newImage}" alt="image of food " class="w-32 h-32 md:h-56 md:w-56 object-cover rounded-md">`
  document.getElementById(
    "saved-restaurant-info"
  ).innerHTML = `<h3 class= "text-xl md:text-2xl font-bold text-textcolor" id="restaurant-name" "> ${newName}</h3>
<a href=${googleURL} class="text-secondary"> <p class="md:text-xl" id="restaurant-address"> ${newAddress} </p></a>
<p class="md:text-xl" id="restaurant-phone">${newPhone} </p>
`
  document.getElementById(
    "saved-activity"
  ).innerHTML = `<h3 class="text-xl text-textcolor font-bold text-center w-full  mx-2 my-auto md:text-2xl" id="shown-activity"> ${newActivity}</h3>`
}

function showMyDate() {
  buildActivity()
  showPage3()
}

function restaurantCreator() {
  showPage2()
  buildYelpURL()
}



function onSave() {
  showPage4()
  dateHistory()
}

function onFavoritesIcon() {
  showPage4()
  renderDates()
  showSavedDates()
}
function isUSAZipCode(str) {
  return /^\d{5}(-\d{4})?$/.test(str)
}

function validateInput() {
  console.log("validateInput")
  let zipCode = document.getElementById("zipcode").value
  let message = ""
  if (!isUSAZipCode(zipCode)) {
    message = "Invalid zipcode please try again"
  }
  document.getElementById("msg").innerHTML = message
}

/** EVENT LISTENERS */
next.addEventListener("click", restaurantCreator)
back1.addEventListener("click", showPage1)
planDate.addEventListener("click", showMyDate)
back2.addEventListener("click", showPage2)
save.addEventListener("click", onSave)
returnHome.addEventListener("click", showPage1)
savedDates.addEventListener("click", onFavoritesIcon)
homeIcon.addEventListener("click", showPage1)
backIcon.addEventListener("click", showPage1)
newRestaurant.addEventListener("click", getNewRestaurant)
newActivity.addEventListener("click", getNewActivity)
cards.addEventListener("click", savedRestaurant)
goBack.addEventListener("click", onFavoritesIcon)
