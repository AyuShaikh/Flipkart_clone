// Recent search - Use localStorage to persist the recent search array
let recentArray = JSON.parse(localStorage.getItem('recentArray')) || [];

const input_search = document.querySelector("#search_input");
const form_search = document.querySelector("#search_form");
const recent_searchEl = document.querySelector(".recent_search");

form_search.addEventListener('submit', (e) => {
    e.preventDefault();
    recentArray.unshift(input_search.value);
    console.log(recentArray);
    renderRecent();
    localStorage.setItem('recentArray', JSON.stringify(recentArray)); // Save to localStorage
});

function renderRecent() {
    let recent_search_html = recentArray.map(el => `
        <div class="recent_list">
            <i class="fa-solid fa-clock-rotate-left" style="color: #669af5;"></i>
            <p>${el}</p>
        </div>
    `).join('');
    recent_searchEl.innerHTML = recent_search_html;
}

renderRecent();

// Slider - Use event delegation to optimize click event handling
const slider = document.querySelector(".slider_container");
const buttonContainer = document.querySelector(".button-container");

buttonContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("button")) {
        const index = Array.from(buttonContainer.children).indexOf(e.target);
        slider.style.transform = `translateX(${-98 * index}vw)`;
    }
});

// API with JSON
const container = document.querySelector(".container");
let itemArray = [];

fetch("./item.json")
    .then(res => res.json())
    .then(data => {
        itemArray = data.watch;
        listItem(itemArray);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

function listItem(data) {
    const fragment = document.createDocumentFragment();
    data?.forEach(item => {
        const watchItem = document.createElement('div');
        watchItem.classList.add('watch_item');
        watchItem.innerHTML = `
            <div class="all_items">
                <a href="#">Watch Product</a>
            </div>
            <div class="left_arrow">
                <i class="fa-solid fa-arrow-left-long" style="color: #3e83f9;"></i>
            </div>
            <div class="watch_item">
                <img src="${item.image}" alt="">
                <h3 class="price">Price: $${item.price}</h3>
                <p class="company">${item.company}</p>
            </div>
            <div class="right_arrow">
                <i class="fa-solid fa-arrow-right-long" style="color: #3e83f9;"></i>
            </div>
        `;
        fragment.appendChild(watchItem);
    });
    container.appendChild(fragment);
}

setTimeout(() => {
    // Any code that needs to be executed after the fetch and rendering.
}, 2000);
