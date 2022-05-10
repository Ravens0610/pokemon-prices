document.querySelector("button").addEventListener("click", getFetch);

function getFetch() {
  input = document.querySelector("input").value.split(" ").join("_");
  const url = `https://api.pokemontcg.io/v2/cards?q=name:${input}`;
  console.log(url);

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      const card = new TradingCard(data.data);
      card.clear();
      card.cardInfo();
      card.showCards();
      card.hideWelcome();
      if (data.data.length > 0) {
        card.cardInfo();
      } else {
        card.notAPokemon();
      }
    })

    .catch((err) => {
      console.log(`error ${err}`);
    });
}

class TradingCard {
  constructor(cards) {
    this.cards = cards;
  }

  clear() {
    const cardContainer = document.querySelector(".cardContainer");
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }
  }

  cardInfo() {
    for (const card of this.cards) {
      if (card.tcgplayer) {
        let price = Object.values(card.tcgplayer.prices)[0];
        const div = document.createElement("div");
        div.innerHTML = `
                <div>
                    <div class="pb-2">
                        <a href="${card.tcgplayer.url}" target="_blank"><img class="hover:scale-105 transition ease-in-out duration-300" src="${card.images.small}" width="240" height="330" loading="lazy"></a>
                    </div>
                    <div class="prices">
                        <h2 class="bg-red-100 p-1.5 text-lg rounded-t-md">Low - $${price.low}</h2>
                        <h2 class="bg-blue-100 p-1.5 text-lg">High - $${price.high}</h2>
                        <h2 class="bg-green-100 p-1.5 text-lg">Market - $${price.market}</h2>
                        <h2 class="bg-gray-200 p-1.5 text-lg rounded-b-md font-bold"><a href="${card.tcgplayer.url}" target="_blank"">Check TCG player</a></h2>
                    </div>
        
                </div>
                `;
        document.querySelector(".cardContainer").appendChild(div);
      } else {
        const div = document.createElement("div");
        div.innerHTML = `
                <div>
                    <div class="pb-2">
                        <a href="#" target="_blank"><img class="hover:scale-105 transition ease-in-out duration-300" src="${card.images.small}" width="240" height="330" loading="lazy"></a>
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
  }

  showCards() {
    document.querySelector(".cardContainer").classList.remove("hidden");
    document.querySelector(".cardContainer").classList.add("flex");
  }

  hideWelcome() {
    document.querySelector(".welcome").classList.add("hidden");
  }

  notAPokemon() {
    const input = document.querySelector("input");
    input.classList.add("bg-red-200");
    input.value = "";
    input.placeholder = "Wrong spelling";
    setTimeout(() => {
      input.classList.remove("bg-red-200");
      input.placeholder = "Enter Pokemon";
    }, 3000);
  }
}
