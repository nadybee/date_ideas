var zipCode = 84097
var ideas = document.querySelector(".idea")
var restaurant = document.querySelector(".restaurant")
var zipcodeInput= document.getElementById('zipcode')
let zipcode=84097
let openNow = false;
let price = 2

/** BUTTONS */
var next = document.getElementById('next')
var savedDates= document.querySelector('.fa-book-heart')
var planDate = document.getElementById('plan-date')
var newRestaurant = document.getElementById('new-restaurant')
var newActivity = document.getElementById('new-activity')
var back1 = document.getElementById('back-1')
var back2= document.getElementById('back-2')
var save = document.getElementById('save')
var returnHome = document.getElementById('return-home')
var homeIcon = document.getElementById('home-icon')

/**PAGES CONTAINERS AND HEADERS */
var page1Header = document.getElementById('page1-header')
var page1Cont = document.getElementById('page-one')
var page2Cont = document.getElementById('page-two')
var page3Header = document.getElementById('page3-header')
var page3Cont = document.getElementById('page-three')
var page4Header = document.getElementById('page4-header')
var page4Cont = document.getElementById('page-four')



/** FUNCTIONS TO SHOW AND HIDE PAGES */
function showPage1 () {
    page1Header.classList.remove('hidden')
    page1Cont.classList.remove('hidden')
    page2Cont.classList.add('hidden')
    page3Header.classList.add('hidden')
    page3Cont.classList.add('hidden')
    page4Header.classList.add('hidden')
    page4Cont.classList.add('hidden')
}

function showPage2(){

    page2Cont.classList.remove('hidden')
    page1Header.classList.add('hidden')
    page1Cont.classList.add('hidden')
    page3Header.classList.add('hidden')
    page3Cont.classList.add('hidden')
    page4Header.classList.add('hidden')
    page4Cont.classList.add('hidden')
    
}

function showPage3(){
  
    page3Cont.classList.remove('hidden')
    page1Header.classList.add('hidden')
    page1Cont.classList.add('hidden')
    page2Cont.classList.add('hidden')
    page4Header.classList.add('hidden')
    page4Cont.classList.add('hidden')

}

function showPage4(){
    page4Header.classList.remove('hidden')
    page4Cont.classList.remove('hidden')   
    page1Header.classList.add('hidden')
    page1Cont.classList.add('hidden')
    page1Cont.classList.add('hidden')
    page2Cont.classList.add('hidden')
    page3Header.classList.add('hidden')
    page3Cont.classList.add('hidden') 

}



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

function showMyDate(){ 
fetchActivities()
fetchRestaurants()
showPage3()
}


/** EVENT LISTENERS */
next.addEventListener('click',showPage2)
back1.addEventListener('click',showPage1)
planDate.addEventListener('click', showMyDate)
back2.addEventListener('click', showPage2)
save.addEventListener('click', showPage4)
returnHome.addEventListener('click',showPage1)
savedDates.addEventListener('click',showPage4)
homeIcon.addEventListener('click', showPage1)
