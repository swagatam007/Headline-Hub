const API_KEY = "41c4453ffee24bac9f95aa046215b461";
const url = "https://newsapi.org/v2/everything?q=";
const searchText = document.getElementById('search-text')
const sidebar = document.querySelector('.sidebar');
let curSelectedNav = null;
let sidedNavs = null;
window.addEventListener('load', () => {
    sidebar.style.display = "none";
    searchText.value = null;
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
    fetchNews("India");
});

const logo = document.getElementById('company-logo');
logo.addEventListener('click', () => {
    searchText.value = null;
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
    fetchNews("India");
});

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardContainer.innerHTML = '';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImage = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name}, ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}


function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    const sideNavItem = "#".concat(id);
    const sidedNavBar = document.querySelectorAll(sideNavItem)[1];
    curSelectedNav?.classList.remove('active');
    sidedNavs?.classList.remove('active');
    curSelectedNav = navItem;
    sidedNavs = sidedNavBar;
    sidedNavs.classList.add('active');
    console.log(sidedNavs);
    curSelectedNav.classList.add('active');
    searchText.value = null;
}



function closeSidebar() {
    sidebar.style.display = "none";
}

function showSidebar() {
    sidebar.style.display = "flex";
}

function search() {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
}