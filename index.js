const bars = document.getElementById("bars");
const nav = document.getElementById("nav");
const input = document.querySelector("#search input");
const searchBtn = document.querySelector("#search button");

bars.addEventListener("click", () => {
  nav.classList.toggle("responsivBar");
});

// fetching data

const apiKey = "8465a2663f6d43929912a4ce9cc5bb90";
const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=16&apikey=${apiKey}`;
    const respons = await fetch(apiUrl);
    const data = await respons.json();
    return data.articles;
  } catch (error) {
    console.error("error fetching random news");
    return [];
  }
}

searchBtn.addEventListener("click", async () => {
  const query = input.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.error("error fetching spesific data!", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=30&apikey=${apiKey}`;
    const respons = await fetch(apiUrl);
    const data = await respons.json();
    return data.articles;
  } catch (error) {
    console.error("error fetching random news");
    return [];
  }
}

// desplaying

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;

    const description = document.createElement("div");
    description.className = "description";

    const title = document.createElement("h2");
    title.textContent = article.title;
    const text = document.createElement("p");
    text.textContent = article.description;

    description.append(title, text);
    card.append(description, img);
    blogContainer.appendChild(card);

    card.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
  });
}
// use data

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("error fetching random news", error);
  }
})();
