const listContainer = document.getElementById("listContainer");
const searchInput = document.getElementById("searchInput");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const detailContainer = document.getElementById("detailContainer");
const detailContent = document.getElementById("detailContent");
const backBtn = document.getElementById("backBtn");

let starships = [];
let nextPage = "https://swapi.dev/api/starships/";

async function fetchStarships(url) {
  const res = await fetch(url);
  const data = await res.json();
  starships = [...starships, ...data.results];
  nextPage = data.next;
  renderStarships();
}

function renderStarships(filter = "") {
  listContainer.innerHTML = "";
  const filtered = starships.filter(
    (s) =>
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.model.toLowerCase().includes(filter.toLowerCase())
  );
  filtered.forEach((ship) => {
    const div = document.createElement("div");
    div.className = "starship-item";
    div.innerHTML = `
      <img src="images/starship.jpg" alt="${ship.name}">
      <h3>${ship.name}</h3>
      <p>Model: ${ship.model}</p>
      <p>Hız: ${ship.max_atmosphering_speed}</p>
    `;
    div.addEventListener("click", () => showDetails(ship));
    listContainer.appendChild(div);
  });
}

function showDetails(ship) {
  detailContent.innerHTML = `
    <h2>${ship.name}</h2>
    <p><strong>Model:</strong> ${ship.model}</p>
    <p><strong>Yolcu:</strong> ${ship.passengers}</p>
    <p><strong>Maks Atmosfer Hızı:</strong> ${ship.max_atmosphering_speed}</p>
    <p><strong>Üretici:</strong> ${ship.manufacturer}</p>
    <p><strong>Mürettebat:</strong> ${ship.crew}</p>
    <p><strong>Kargo Kapasitesi:</strong> ${ship.cargo_capacity}</p>
    <img src="images/starship.jpg" alt="${ship.name}" style="width:100%;margin-top:10px;border-radius:5px;">
  `;
  listContainer.classList.add("hidden");
  loadMoreBtn.classList.add("hidden");
  detailContainer.classList.remove("hidden");
}

backBtn.addEventListener("click", () => {
  detailContainer.classList.add("hidden");
  listContainer.classList.remove("hidden");
  loadMoreBtn.classList.remove("hidden");
});

searchInput.addEventListener("input", () => {
  renderStarships(searchInput.value);
});

loadMoreBtn.addEventListener("click", () => {
  if (nextPage) {
    fetchStarships(nextPage);
  }
});

// İlk sayfayı yükle
fetchStarships(nextPage);
