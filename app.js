let searchButton = document.querySelector("#searchButton")
let dateBox = document.querySelector("#searchTerm")


//Add an event listener to the button that runs the function sendApiRequest when it is clicked
searchButton.addEventListener("click", ()=>{

    let str = new Date(dateBox.value).toISOString();
    var rawDate = str.substring(0, 10);
    console.log(rawDate);


    sendApiRequest(rawDate)
})


//An asynchronous function to fetch data from the API.
async function sendApiRequest(date){
    let API_KEY = "SAah6C0uGcZ7AATFJn8UbuyXjpGnZGXkbgdKwJ99"
    // let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);

    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${date}&end_date=${date}`);
    
    let data = await response.json();
    console.log(data[0]);
    useApiData(data[0]);
}


//function that does something with the data received from the API. The name of the function should be customized to whatever you are doing with the data
function useApiData(data){
    document.querySelector("#image-title").innerHTML = data.title;

    var date = setDate(data);

    document.querySelector("#date").innerHTML += date;
    document.querySelector("#image").innerHTML += `<img src="${data.url}">`;
    document.querySelector("#content").innerHTML += data.explanation;


}

function setDate(data){
    var d = new Date(data.date);
    var year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var month = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    var day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    
    var formattedDate = (`${month} ${day}, ${year}`);
    return formattedDate;
}
