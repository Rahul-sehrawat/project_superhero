const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabsHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.app-header-search');
let searchList = document.getElementById('search-list');
let randombtn = document.getElementById('random');

let activeTab = 1, allData;

const init = () => {
    showActiveTabBody();
    showActiveTabHead();
}

const showActiveTabHead = () => allTabsHead[activeTab - 1].classList.add('active-tab');

const showActiveTabBody = () => {
    hideAllTabBody();
    allTabsBody[activeTab - 1].classList.add('show-tab');
}

const hideAllTabBody = () => allTabsBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'));
const hideAllTabHead = () => allTabsHead.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'));

// even listeners
window.addEventListener('DOMContentLoaded', () => init());
// button event listeners
allTabsHead.forEach(singleTabHead => {
    singleTabHead.addEventListener('click', () => {
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    });
});

const getInputValue = (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllSuperHero(searchText);
}

// search form submission
searchForm.addEventListener('submit', getInputValue);


const fetchAllSuperHero = async(searchText) => {
    let url = `https://www.superheroapi.com/api.php/2050666508625889/search/${searchText}`;
    try{
        const response = await fetch(url);
        allData = await response.json();
        if(allData.response === 'success'){
            console.log(allData);
            showSearchList(allData.results);
        }
    } catch(error){
        console.log(error);
    }
}

const showSearchList = (data) => {
    searchList.innerHTML = "";
    data.forEach(dataItem => {
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML = `
            <img src = "${dataItem.image.url ? dataItem.image.url : ""}" alt = "">
            <p data-id = "${dataItem.id}">${dataItem.name}</p>
        `;
        searchList.appendChild(divElem);
    });
}

searchForm.search.addEventListener('keyup', () => {
    if(searchForm.search.value.length > 1){
        fetchAllSuperHero(searchForm.search.value);
    } else {
        searchList.innerHTML = "";
    }
});

searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id;
    let singleData = allData.results.filter(singleData => {
        return searchId === singleData.id;
    })
    showSuperheroDetails(singleData);
    searchList.innerHTML = "";
});




const showSuperheroDetails = (data) => {
    console.log(data);
    document.querySelector('.app-body-content-thumbnail').innerHTML = `
        <img src = "${data[0].image.url}">
    `;

    document.querySelector('.name').textContent = data[0].name;
    document.querySelector('.powerstats').innerHTML = `
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>intelligence</span>
        </div>
        <span>${data[0].powerstats.intelligence}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>strength</span>
        </div>
        <span>${data[0].powerstats.strength}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>speed</span>
        </div>
        <span>${data[0].powerstats.speed}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>durability</span>
        </div>
        <span>${data[0].powerstats.durability}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>power</span>
        </div>
        <span>${data[0].powerstats.power}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>combat</span>
        </div>
        <span>${data[0].powerstats.combat}</span>
    </li>
    `;
    document.querySelector('.biography').innerHTML = `
    <li>
        <span>full name</span>
        <span>${data[0].biography['full-name']}</span>
    </li>
    <li>
        <span>alert-egos</span>
        <span>${data[0].biography['alter-egos']}</span>
    </li>
    <li>
        <span>aliases</span>
        <span>${data[0].biography['aliases']}</span>
    </li>
    <li>
        <span>place-of-birth</span>
        <span>${data[0].biography['place-of-birth']}</span>
    </li>
    <li>
        <span>first-apperance</span>
        <span>${data[0].biography['first-appearance']}</span>
    </li>
    <li>
        <span>publisher</span>
        <span>${data[0].biography['publisher']}</span>
    </li>
    `;


    document.querySelector('.appearance').innerHTML = `
    <li>
        <span>
            <i class = "fas fa-star"></i> gender
        </span>
        <span>${data[0].appearance['gender']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> race
        </span>
        <span>${data[0].appearance['race']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> height
        </span>
        <span>${data[0].appearance['height'][0]}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> weight
        </span>
        <span>${data[0].appearance['weight'][0]}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> eye-color
        </span>
        <span>${data[0].appearance['eye-color']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> hair-color
        </span>
        <span>${data[0].appearance['hair-color']}</span>
    </li>`

}

// random btn
randombtn.onclick = ()=>{
    fetchAllSuperHeroR(Math.floor(Math.random()*730)+1)
}

//for getting the random superhero
const fetchAllSuperHeroR = async(id) => {
    let url = `https://www.superheroapi.com/api.php/2050666508625889/${id}`;
    try{
        const response = await fetch(url);
        allData = await response.json();
        if(allData.response === 'success'){
            console.log(allData);
            document.querySelector('.app-body-content-thumbnail').innerHTML = `
            <img src = "${allData.image.url}"> `;
    
        document.querySelector('.name').textContent = allData.name;
        document.querySelector('.powerstats').innerHTML = `
        <li>
            <div>
                <i class = "fa-solid fa-shield-halved"></i>
                <span>intelligence</span>
            </div>
            <span>${allData.powerstats.intelligence}</span>
        </li>
        <li>
            <div>
                <i class = "fa-solid fa-shield-halved"></i>
                <span>strength</span>
            </div>
            <span>${allData.powerstats.strength}</span>
        </li>
        <li>
            <div>
                <i class = "fa-solid fa-shield-halved"></i>
                <span>speed</span>
            </div>
            <span>${allData.powerstats.speed}</span>
        </li>
        <li>
            <div>
                <i class = "fa-solid fa-shield-halved"></i>
                <span>durability</span>
            </div>
            <span>${allData.powerstats.durability}</span>
        </li>
        <li>
            <div>
                <i class = "fa-solid fa-shield-halved"></i>
                <span>power</span>
            </div>
            <span>${allData.powerstats.power}</span>
        </li>
        <li>
            <div>
                <i class = "fa-solid fa-shield-halved"></i>
                <span>combat</span>
            </div>
            <span>${allData.powerstats.combat}</span>
        </li>
        `;
        document.querySelector('.biography').innerHTML = `
        <li>
            <span>full name</span>
            <span>${allData.biography['full-name']}</span>
        </li>
        <li>
            <span>alert-egos</span>
            <span>${allData.biography['alter-egos']}</span>
        </li>
        <li>
            <span>aliases</span>
            <span>${allData.biography['aliases']}</span>
        </li>
        <li>
            <span>place-of-birth</span>
            <span>${allData.biography['place-of-birth']}</span>
        </li>
        <li>
            <span>first-apperance</span>
            <span>${allData.biography['first-appearance']}</span>
        </li>
        <li>
            <span>publisher</span>
            <span>${allData.biography['publisher']}</span>
        </li>
        `;
    
    
        document.querySelector('.appearance').innerHTML = `
        <li>
            <span>
                <i class = "fas fa-star"></i> gender
            </span>
            <span>${allData.appearance['gender']}</span>
        </li>
        <li>
            <span>
                <i class = "fas fa-star"></i> race
            </span>
            <span>${allData.appearance['race']}</span>
        </li>
        <li>
            <span>
                <i class = "fas fa-star"></i> height
            </span>
            <span>${allData.appearance['height'][0]}</span>
        </li>
        <li>
            <span>
                <i class = "fas fa-star"></i> weight
            </span>
            <span>${allData.appearance['weight'][0]}</span>
        </li>
        <li>
            <span>
                <i class = "fas fa-star"></i> eye-color
            </span>
            <span>${allData.appearance['eye-color']}</span>
        </li>
        <li>
            <span>
                <i class = "fas fa-star"></i> hair-color
            </span>
            <span>${allData.appearance['hair-color']}</span>
        </li>`
    
    }
    } catch(error){
        console.log(error);
    }
}
