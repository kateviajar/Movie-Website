/****************************/
/**  Authou: PaoHua Chien  **/
/**  Student ID: 200453641 **/
/****************************/

//TMDB API - popular movies
//https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c19daf718efb7c6b28aac67ace7984c5

//TMDB - movie details by id
//https://api.themoviedb.org/3/movie/580489?api_key=c19daf718efb7c6b28aac67ace7984c5

const API_KEY = 'api_key=c19daf718efb7c6b28aac67ace7984c5';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const DETAILS_URL = 'https://api.themoviedb.org/3/movie/';

const main = document.getElementById('main');
const otherMovies = document.querySelector('.otherMovies');
var closeBtn = document.querySelector('.closeBtn');

//just hide the original mock code in HTML
main.innerHTML = '';
main.appendChild(otherMovies);

//call the getMovies method
getMovies(API_URL);

//This method will get movies json data from API
function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        loadMovies(data.results);
    });
}

//This method will get each movie poster and display them
function loadMovies(data){
    otherMovies.innerHTML = ''; //clear the innerHTML
    
    
    //to get each movie poster
    data.forEach(movie => {
        const title = movie.title;
        var poster_path = movie.poster_path;

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.id = movie.id;
        if(poster_path == null) {
            movieElement.innerHTML = '<img src="./img/no_image.png" alt="no_image.png">';
            poster_path = './img/no_image.png';
        } else {
            movieElement.innerHTML = `<img src="${IMG_URL+poster_path}" alt="${title}">`;
        }
        
        //Event: make the image bigger when mouse hover
        movieElement.onmouseover = function(){
            this.style.transform  = "scale(1.05)";
        }
        movieElement.onmouseout = function(){
            this.style.transform  = "scale(1)";
        }

        //Event: click the movie to show details
        movieElement.onclick = function(){
            main.after(otherMovies);//move otherMovires div after main
            getMovieDetails(this.id);
            main.scrollIntoView(); //scroll to view main after click a movie
        }

        //append the movie element to otherMovies div
        otherMovies.appendChild(movieElement);
    });    
}

//this method get the movie details from API by passing movieID
function getMovieDetails(movieID){
    fetch(DETAILS_URL+movieID+'?'+API_KEY).then(res => res.json()).then(data => {
        showMovieDetails(data);
    });
}


//This method shows a movie details
function showMovieDetails(movie){
    const title = movie.title;
    var poster_path = movie.poster_path;
    const rating = movie.vote_average;
    const overview = movie.overview;
    const released = movie.release_date;
    var genresName = '';

    var imgTag = null;
    if(poster_path != null) {
        imgTag = `<img src="${IMG_URL+poster_path}" alt="${title}">`
        // console.log(poster_path)
    } else {
        poster_path = './img/no_image.png';
        imgTag = `<img src="${poster_path}" alt="${title}">`;
    }
    
    movie.genres.forEach(g => genresName += (g.name+' | ')); //concatenate all genres names as a string
    
    main.innerHTML = `
    <section>
        <div>
        ${imgTag}   
        </div>
        <article>
            <h2>${title}</h2>
            <p class="rating">Rating: ${rating}</p>
            <p class="release">Release Date: ${released}</p>
            <p class="genres">${genresName}</p>
            <h3>Overview</h3>
            <p class="overview">${overview}</p>
        </article>
        <button class="closeBtn" type="button">&times;</button>
    </section>
    `;


    //the close button will close the movie details after click it
    document.querySelector('.closeBtn').onclick = function(e){
        e.preventDefault();
        main.innerHTML = '';
        main.appendChild(otherMovies);   
    };
}

//Click the close button -> the movie details will be closed
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    main.innerHTML = '';
    main.appendChild(otherMovies);
})

/*############################################################################################################################################
##############################################################################################################################################
##############################################################################################################################################
##############################################################################################################################################
############################################################################################################################################## */


/****************************/
/**  Authou: Amar          **/
/**  Student ID: 200442824 **/
/****************************/

//Seach movies
// https://api.themoviedb.org/3/search/movie?api_key=c19daf718efb7c6b28aac67ace7984c5&language=en-US&query=fast&page=1&include_adult=false

const searchBar = document.getElementById('gameSearch');

function updateURL(searchString) { 
    var SEARCH_URL = `${BASE_URL}/search/movie?${API_KEY}&language=en-US&query=${searchString}&page=1&include_adult=false`;
    return SEARCH_URL;
}

searchBar.addEventListener('keyup', ()=> {
    var searchString = searchBar.value;
    var searchURL = updateURL(searchString);
    
    if(searchString == "") {
        getMovies(API_URL);
    } else {
        getMovies(searchURL);
    }
    
});


/*############################################################################################################################################
##############################################################################################################################################
##############################################################################################################################################
##############################################################################################################################################
############################################################################################################################################## */


/*****************************************
 *   Author: Manjinder Singh             |
 *   Student Number: 200455485           |
 *****************************************/
var mode = 0;

function gameTime(){
    document.getElementById('title').innerHTML = "Movie@ Game Time";
    let header = document.getElementById('header');
    main.style.display = "none";
    if(document.getElementById('body').children[2] != null){
        main.innerHTML = '';
        main.appendChild(otherMovies);  
    }
    header.classList.remove("movieTimeHead");
    header.classList.add("gameTimeHead");
    searchBar.value = "";
}

function loadGame(){
    if(mode == 0){
        main.style.display = "none";
        mode = 1;
    }
}

function loadSlider(){
    var gameSec = document.createElement("section");
    gameSec.id = "gameArena";
    gameSec.innerHTML = `<section id="gameArena"><h3>Lets Guess the rating of this movie</h1><form><div><label for="ratingGuess" id="guessVal">your guess</label><input name="ratingGuess" type="range" min="1" max="100"  value="50" class="slider" id="guessSlider"></div><div><a href="#!" onClick="resultSubClick()" id="subResult">Submit</a></div></form><div id="result" class="result"></div></section>`;
    main.appendChild(gameSec);

    var slider = document.getElementById("guessSlider");
    var sliderVal = document.getElementById("guessVal");
    
    sliderVal.innerHTML = "Your Guessed Rating: " + (slider.value/10);
    slider.oninput = function(){
        sliderVal.innerHTML = "Your Guessed Rating: "+ (slider.value/10);
    }
    console.log('loaded');
}

document.getElementById('gameTime').addEventListener('click',() =>{
    gameTime();
    loadGame();
});

searchBar.addEventListener('input',()=>{
        main.style.display = "block";
        header.classList.add("movieTimeHead");
        header.classList.remove("gameTimeHead");
        if(document.getElementById('body').children[2] != null){
            main.innerHTML = '';
            main.appendChild(otherMovies);
            otherMovies.style.display = "flex"  ;
        }

});


main.addEventListener('mouseover',()=>{

var mainChild = main.children[0];
    if( mainChild.id != 'otherMovies' && mode == 1 ){
        loadGame();
        if(main.children[1] == null)
            loadSlider();
        document.getElementById('otherMovies').style.display = "none";
        document.getElementsByClassName('closeBtn')[0].style.display = "none";
        document.getElementsByClassName('rating')[0].style.display = "none";
    }
});

var subResult = document.getElementById('subResult');

function resultSubClick(){
    var result = document.getElementById('result');
    var rating = document.getElementsByClassName('rating')[0];
    var sliderVal = document.getElementById("guessSlider");

    if(rating.textContent === ("Rating: "+(sliderVal.value/10))){
        result.innerHTML = "Correct!";
        result.classList.add("resultCorrect");
        result.classList.remove("resultWrong");
    }
    else{
        result.innerHTML = "Wrong Answer :( " + rating.textContent;
        result.classList.remove("resultCorrect");
        result.classList.add("resultWrong");
    }
};



