const nav = document.querySelector('.nav')
window.addEventListener('scroll', fixNav)

function fixNav() {
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}


const API_URL = 'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=df7f2ad26a832bf8f5c9479034663a2b&page=1&with_genres=10759'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=df7f2ad26a832bf8f5c9479034663a2b&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
            showMovies(data.results);
    
    })

}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { name, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${name}">
            <div class="movie-info">
          <h3>${name}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}
 

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if(searchTerm && searchTerm !== '') {
      getMovies(SEARCH_API + searchTerm)

      search.value = ''
  } else {
      window.location.reload()
  }
})

prev.classList.add('disabled');

