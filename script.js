var zipCode = 84097
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

/**PAGES CONTAINERS AND HEADERS */
var page1Header = document.getElementById("page1-header")
var page1Cont = document.getElementById("page-one")
var page2Cont = document.getElementById("page-two")
var page2Header = document.getElementById("page2-header")
var page3Header = document.getElementById("page3-header")

var page3Cont = document.getElementById("page-three")
var page4Header = document.getElementById("page4-header")
var page4Cont = document.getElementById("page-four")

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
  people.value = ""
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
}

// var apiKey = "Bearer mBoDH4rsoLue6XA8D1yQxqIWgXEuXNblkFNatJOaePgeVk5YMVB_X7fRfx2UG_7WrXCweMV0rAngdQ6DPHxLHe2Iqafgb6KVc1NklA3qpGL4ucfr1f28YQLfQ8iOYnYx"
var apiKey =
  "Bearer HyNYhS-Wk9nc__m_elZsc3b9xAcu1I2Y0VcFoRw7XUMwWUXiwjjOAJU3jIYeFHgOyVHwGgkDE-Tcrp7k0ED2vdCXHAARiWKDylcxBQ-zm19OPXRgpRT_vt3O-1SNYnYx"
// var yelpURL =  `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${zipcode}&price=${price}`

// var yelpURL =  `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${zipcode}&price=${price}`

function buildYelpURL() {
  let zipcode = zipcodeInput.value
  let price = document.querySelector("input[name=price-options]:checked").value
  let open = document.querySelector("input[name=hours]:checked").value

  var yelpURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${zipcode}&price=${price}&open_now=${open}`
  fetchRestaurants(yelpURL)
}
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

      console.log(
        data.businesses[randomIndex].name +
          " " +
          data.businesses[randomIndex].location.display_address
      )
      showImg(data.businesses[randomIndex])
      showInfo(data.businesses[randomIndex])
    })

    .catch((error) => {
      // display error for user
      console.log("error", error)
    })
}

function buildActivity() {
  let actPrice = document.querySelector("input[name=free]:checked").value
  let participants = people.value
  let accessibility = "0.0"
  let boredURL = `http://www.boredapi.com/api/activity?minaccessibility=0&maxaccessibility=${accessibility}&minprice=0&maxprice=${actPrice}&participants=${participants}`

  fetchActivities(boredURL)
}

/** FETCH ACTIVITY IDEA */
function fetchActivities(boredURL) {
  //show spinner

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
    })
}

function showImg(restaurant) {
  restaurantImg.innerHTML = `<img src="${restaurant.image_url}" alt="image of food " class="w-full object-cover rounded-md" id='restaurant-img'>`
}

function showInfo(restaurant) {
  restaurantInfo.innerHTML = `<h3 class= "text-xl md:text-2xl font-bold text-textcolor" id="restaurant-name"> ${restaurant.name}</h3>
    <p class="md:text-xl"> ${restaurant.location.display_address}</p>
    <p class="md:text-xl">${restaurant.phone}</p>`
}

function showActivity(data) {
  activity.innerHTML = `<h3 class="text-xl text-textcolor font-bold text-center w-full mx-2 my-auto md:text-2xl" id="shown-activity"> ${data.activity}</h3>`
}
/** date history to local storage functions */

//STORE SAVED DATES
function dateHistory() {
  let restaurantImage = document.getElementById("restaurant-img").getAttribute('src')
  let storedDate = {
    name: document.getElementById("restaurant-name").innerText,
    image: restaurantImage,
    storedActivity: document.getElementById("shown-activity").innerText,
  }

  localStorage.setItem(
    `storedDate_${storedDate.name}`,
    JSON.stringify(storedDate)
  )
  console.log(storedDate)
  renderDates()
  showSavedDates()
}
//RENDER DATES FROM LOCAL STORAGE
function renderDates () {
  let allDates=[]
  for(let i=0; i<localStorage.length; i++){
    allDates.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
  }
  return allDates
}

//SHOW DATES FROM LOCAL STORAGE

function showSavedDates (){
  const datesToShow = renderDates()
  let datesHTML =[]
  let dateCards = document.getElementById('cards')
  for (let i=0; i<datesToShow.length; i++){
    datesHTML.push (
      ` <div class="grid grid-cols-3 gap-2 mx-2 mb-5 h-24 bg-pearl rounded-md">
      <div class="">
        <img src=${datesToShow[i].image} alt"food image" class="w-25">
      </div>
      <div
        class="col-span-2"
      >
       <h3> ${datesToShow[i].name}</h3>
       <p> ${datesToShow[i].storedActivity}</p>
      </div>`
    )
  }
  // if (datesHTML.length>0){
  //   dateCards.innerHTML = datesHTML.join('')
  // }
  // else {
  //   dateCards.innerHTML =  `<h3> No dates saved yet!</h3>`
  // }
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

/** EVENT LISTENERS */
next.addEventListener("click", restaurantCreator)
back1.addEventListener("click", showPage1)
planDate.addEventListener("click", showMyDate)
back2.addEventListener("click", showPage2)
save.addEventListener("click", onSave)
returnHome.addEventListener("click", showPage1)
savedDates.addEventListener("click", showPage4)
homeIcon.addEventListener("click", showPage1)
backIcon.addEventListener("click", showPage1)
