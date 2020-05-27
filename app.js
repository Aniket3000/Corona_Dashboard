//to search in an array of objects
function searchindex(name,arr){
    name = name.toUpperCase();
    for(var i=0;i<arr.length;i++) {
        if(arr[i].country.toUpperCase() == name)
            return i
    }
}
function search(){
var name = document.forms["myForm"]["country_name"].value

var request = new XMLHttpRequest();
//request.withCredentials = true;

request.open('GET','http://coronavirus-tracker-api.herokuapp.com/v2/locations',true);

request.onload = function(){
    var data = JSON.parse(this.responseText);
    
    var id = searchindex(name,data.locations)

    if(request.status>=200 && request.status<400){


        console.log(data)
        

        var cases = document.getElementById('cases')
        cases.textContent = data.locations[id].latest.confirmed

        var death = document.getElementById('deaths')
        death.textContent = data.locations[id].latest.deaths

        var percent = document.getElementById('percent')
        percent.textContent = ((death.textContent/cases.textContent)*100).toFixed(2)

        var country = document.getElementById('country')
        country.textContent = data.locations[id].country

        var population = document.getElementById('population')
        population.textContent = data.locations[id].country_population

        var updated = document.getElementById('update')
        updated.textContent = data.locations[id].last_updated
        //console.log(data.locations[131]);
    } else{
        console.log('error');
    }
}

request.send();
}

const app = document.getElementById('news_block');
//const logo = document.createElement('img');
//logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class','container');

//app.appendChild(logo);
app.appendChild(container);
var request2  = new XMLHttpRequest();

//request.headers['Access-Control-Allow-Origin'] = true;

request2.onload = function(){
    var data = JSON.parse(this.responseText);
    
    if (request2.status >= 200 && request2.status < 400) {
        for(i in data.articles){
            const card = document.createElement('div')
            card.setAttribute('class','card')

            const h1 = document.createElement('h1')
            h1.textContent = data.articles[i].title

            const p = document.createElement('p')
            data.articles[i].description = data.articles[i].description.substring(0,200)
            p.textContent = `${data.articles[i].description}...`

            container.appendChild(card)
            card.appendChild(h1);
            card.appendChild(p);
            //console.log(data.articles[i]);
        }
      } 
    else {
        console.log('error');
    }
};
request2.open('GET','https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?' +
'country=in&' +
'q=covid&' + 
'apiKey=Your API KEY',true);
request2.send();