console.log('javascript connected')
var zipCode =84097
function fetchRestaurants () { 
    var yelpURL = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${zipCode}$limit=1`
    fetch(yelpURL,{
        mode: "no-cors",
        headers: { 
            Authorization:  "Bearer HyNYhS-Wk9nc__m_elZsc3b9xAcu1I2Y0VcFoRw7XUMwWUXiwjjOAJU3jIYeFHgOyVHwGgkDE-Tcrp7k0ED2vdCXHAARiWKDylcxBQ-zm19OPXRgpRT_vt3O-1SNYnYx "
        }
    } )
    .then(function(response){

    })

}
var activity='social';
var minPrice=0;
var maxPrice=.1
var participantNum=2;
var ideas = document.querySelector('.idea')
function fetchActivities(){
    fetch(`http://www.boredapi.com/api/activity/`)
    .then(function(response){
        if(!response.ok) {
            throw Error(response.statusText)
        }
        return response.json()
    })
    .then(function(data){
    console.log(data.activity)
        
        ideas.innerText = data.activity

    })
    // .catch((error)=>{

    //     console.log(error)
    // })
}

document.querySelector('.date-ideas').addEventListener('click',fetchActivities)

document.querySelector('.restaurants').addEventListener('click', fetchRestaurants)