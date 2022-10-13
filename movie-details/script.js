let params = (new URL(document.location)).searchParams;
let idParams = params.get("id");
const API_URL = `https://api.themoviedb.org/3/movie/${idParams}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
    // Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMoviesDetails(data)
}

function showMoviesDetails(movies) {
    main.innerHTML = ''
    const { id, title, poster_path, vote_average, overview, status, genres, production_companies } = movies

    const movieEl = document.createElement('div')
    const ulElement = document.createElement('ul')
    const productElement = document.createElement('div')
    movieEl.classList.add('movie')
    genres.forEach(element => {
        const liElement = document.createElement('li')
        liElement.innerText = element.name
        ulElement.appendChild(liElement)

    });
    production_companies.forEach(element => {
        const liElement = document.createElement('li')
        liElement.innerHTML = `
            <div class="display-companies">
                <img src="${IMG_PATH + element.logo_path}" alt="${title}">
                <p>${element.name}</p>
            </div>
        `
        productElement.appendChild(liElement)

    });
    movieEl.innerHTML = `
    <div class="movie-details">
        <div class="movie-photo">
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <div class="header-overview">
                    <h3>Overview</h3>
                    <a href="/movie-details?id=${id}">Details</a>
                </div>
               
            </div>
        </div>
        <div class="movie-text">
            <h1>${title} <span class="release">${status}</span></h1>
            <p >
                <ul class="ul-genre">
                   ${ulElement.innerHTML}
                </ul>
            </p>
            
            <p> ${overview}</p>
            <p>
                Product companies:
                <ul class="ul-genre">
                   ${productElement.innerHTML}
                </ul>
            </p>
        </div>
    </div>
        `
    main.appendChild(movieEl)
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})