document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  input = document.querySelector("input").value.split(" ").join("_");
  const url = `https://api.pokemontcg.io/v2/cards?q=name:${input}`;
  console.log(url);

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {

      console.log(data);
      clear();
      showCards();
      hideWelcome();
      
      if (data.data.length > 0) {
        data.data.forEach((card) => {
          console.log(card);
          getImage(card);
        });
      } else {
        notAPokemon()
      }
    })

    .catch((err) => {
      console.log(`error ${err}`);
    });
}
   
function clear() {
  const cardContainer = document.querySelector(".cardContainer");
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
}

function getImage(card) {
  if (card.tcgplayer) {
    let prices = card.tcgplayer.prices;
    let link = card.tcgplayer.url;
    let priceRanges = Object.values(prices)[0];

    const div = document.createElement("div");
    div.innerHTML = `
        <div>
            <div class="pb-2">
                <a href="${link}" target="_blank"><img src="${card.images.small}"></img></a>
            </div>
            <div class="prices">
                <h2 class="bg-red-100 p-1.5 text-lg rounded-t-md">Low - $${priceRanges.low}</h2>
                <h2 class="bg-blue-100 p-1.5 text-lg">High - $${priceRanges.high}</h2>
                <h2 class="bg-green-100 p-1.5 text-lg">Market - $${priceRanges.market}</h2>
                <h2 class="bg-gray-200 p-1.5 text-lg rounded-b-md font-bold"><a href="${link}" target="_blank"">Check TCG player</a></h2>
            </div>

        </div>
        `;
    document.querySelector(".cardContainer").appendChild(div);
  } else {
    const div = document.createElement("div");
    div.innerHTML = `
        <div>
            <div class="pb-2">
                <a href="#" target="_blank"><img src="${card.images.small}" width="245" height="342"></img></a>
            </div>
            <div class="prices">
                <h2 class="bg-red-100 p-1.5 text-lg rounded-t-md">n/a</h2>
                <h2 class="bg-blue-100 p-1.5 text-lg">n/a</h2>
                <h2 class="bg-green-100 p-1.5 text-lg">n/a</h2>
                <h2 class="bg-gray-200 p-1.5 text-lg rounded-b-md font-bold">n/a</h2>
            </div>

        </div>
        `;
    document.querySelector(".cardContainer").appendChild(div);
  }
}

function showCards() {
  document.querySelector(".cardContainer").classList.remove("hidden");
  document.querySelector(".cardContainer").classList.add("flex");
}

function hideWelcome() {
  document.querySelector(".welcome").classList.add("hidden");
}

function notAPokemon() {
  const input = document.querySelector("input")
  input.classList.add("bg-red-200");
  input.value = ''
  input.placeholder = 'Wrong spelling'
  setTimeout(() => {
    input.classList.remove("bg-red-200");
    input.placeholder = 'Enter Pokemon'
  }, 3000);
}
