//on button press it calls function to fetch api
document.querySelector("button").addEventListener("click", getFetch);

//fetches api and calls funtions to manipulate dom
function getFetch() {
  input = document.querySelector("input").value.split(" ").join("_");
  const url = `https://api.pokemontcg.io/v2/cards?q=name:${input}`;
  console.log(url);

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data)
      const card = new TradingCard(data.data);
      
      //clears container if children are present
      card.clear();

      //displays cards container
      card.showCards();

      //removes the welcome message
      card.hideWelcome();
      
      //if user does enter a pokemon card info will be appened to the dom
      //if user doesnt enter a pokemon input will turn red and message
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


//Attempt at OOP
class TradingCard {
  constructor(cards) {
    this.cards = cards;
  }

  //clear container if children present
  clear() {
    const cardContainer = document.querySelector(".cardContainer");
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }
  }


  //loops through data and reverses it so newer cards are on top
  cardInfo() {
      this.cards.reverse().map(card => {

      //some cards dont have price info so the conditional checks for that
      //if data does have price data it will display it but not if it doesnt
      if (card.tcgplayer && card.tcgplayer.prices) {
        let price = Object.values(card.tcgplayer.prices)[0];
        const div = document.createElement("div");
        div.innerHTML = `
                <div>
                    <div class="pb-2">
                        <a href="${card.tcgplayer.url}" target="_blank"><img class="hover:scale-105 transition ease-in-out duration-300 mx-auto" src="${card.images.small}" width="240" height="330" loading="lazy"></a>
                    </div>
                    <ul class="prices">
                        <li>
                          
                        </li>
                        <li>
                          
                        </li>
                        <li>
                          <h2 class="bg-green-100 p-1.5 text-lg">Our Price - $${price.market || " n/a"}</h2>
                        </li>
                        <li>
                          <h2 class="bg-gray-200 p-1.5 text-lg rounded-b-md font-bold"><a href="https://discord.gg/6SRB85bUf7" target="_blank"">Check TCG player</a></h2>
                        </li>
                    </ul>
        
                </div>
                `;

         //appends card image, prices, and link to dom
        document.querySelector(".cardContainer").appendChild(div);
      } else {
        const div = document.createElement("div");
        div.innerHTML = `
                <div>
                    <div class="pb-2">
                        <a href="#" target="_blank"><img class="hover:scale-105 transition ease-in-out duration-300 mx-auto" src="${card.images.small}" width="240" height="330" loading="lazy"></a>
                    </div>
                    <ul class="prices">
                        <li>
                          <h2 class="bg-red-100 p-1.5 text-lg rounded-t-md">n/a</h2>
                        </li>
                        <li>
                          <h2 class="bg-blue-100 p-1.5 text-lg">n/a</h2>
                        </li>
                        <li>
                          <h2 class="bg-green-100 p-1.5 text-lg">n/a</h2>
                        </li>
                        <li>
                          <h2 class="bg-gray-200 p-1.5 text-lg rounded-b-md font-bold">n/a</h2>
                        </li>
                    </ul>
        
                </div>
                `;
        document.querySelector(".cardContainer").appendChild(div);
      }
    })
  }

  //shows container that cards are in
  showCards() {
    document.querySelector(".cardContainer").classList.remove("hidden");
    document.querySelector(".cardContainer").classList.add("flex");
  }

  //hides welcome message
  hideWelcome() {
    document.querySelector(".welcome").classList.add("hidden");
  }

  //if pokemon isnt entered turns input box red and says wrong spelling
  notAPokemon() {
    const input = document.querySelector("input");
    input.classList.add("bg-red-200");
    input.value = "";
    input.placeholder = "Wrong spelling";

    //returns to normal after 3 seconds
    setTimeout(() => {
      input.classList.remove("bg-red-200");
      input.placeholder = "Enter Pokemon";
    }, 3000);
  }
}
