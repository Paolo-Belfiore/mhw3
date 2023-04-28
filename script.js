function onJsonQuote(json){
    console.log(json);
    const results = json.results;
    let num = Math.floor(Math.random() * results.length);
    const quote = document.createElement("p");
    quote.classList.add("da-rimuovere");
    quote.textContent = '"' + results[num].content + '"';
    const author = document.createElement("h4");
    author.classList.add("da-rimuovere");
    author.textContent = '- ' + results[num].author + ' -';
    const quote_box = document.querySelector("#quote-box");
    quote_box.appendChild(quote);
    quote_box.appendChild(author);
}
  
function onJsonGif(json){
    console.log(json);
    const results = json.gfycats;
    const lg = results.length;
    const gifs = document.querySelectorAll(".gif");
    let i = 0;
    do{
        for(const g of gifs){
            const img = document.createElement("img");
            img.classList.add("da-rimuovere");
            img.src = results[i].max1mbGif;
            g.appendChild(img);
            i++;
        }
    }while(i < lg);
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}
  
function reset(){
    const elements = document.querySelectorAll(".da-rimuovere");
    for(const el of elements){
      el.remove();
    }
    const gif_view = document.querySelector("#gif-view");
    gif_view.style.backgroundColor = "blue";
    const gif = document.querySelectorAll(".gif");
    for(const g of gif){
        g.classList.add("hidden");
    }
}

function search(event){
    event.preventDefault();
    reset();
    const gif_view = document.querySelector("#gif-view");
    gif_view.style.backgroundColor = "rgb(178, 146, 208)";
    gif_view.style.border = "3px solid black";
    const gif = document.querySelectorAll(".gif");
    for(const g of gif){
        g.classList.remove("hidden");
    }
    const gif_input = (document.querySelector("#content")).value;
    const gif_value = encodeURIComponent(gif_input);
    fetch('https://api.gfycat.com/v1/gfycats/search?search_text=' + gif_value, {
            headers:
            {
              'Authorization': 'Bearer ' + token
            }
          }
).then(onResponse).then(onJsonGif);
fetch('https://api.quotable.io/quotes/?tags=' + gif_value + '|life' ).then(onResponse).then(onJsonQuote);
}


// Codice contenente fetch con credenziali
 
const client_id = "2_D7JMXw";
const client_secret = "QpbHC5CSizqVfQklBSUzX7U6PNtmfC8TvJ-mA8HpvxksMnIH6aFaCiG-q_IHAkeL";

let token;

function onTokenJson(json){
    console.log(json)
    // Imposta il token global
    token = json.access_token;
}
 

function onTokenResponse(response){
    return response.json();
}


fetch('https://api.gfycat.com/v1/oauth/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: '{"client_id":"2_D7JMXw", "client_secret": "QpbHC5CSizqVfQklBSUzX7U6PNtmfC8TvJ-mA8HpvxksMnIH6aFaCiG-q_IHAkeL", "grant_type": "client_credentials"}'
}).then(onTokenResponse).then(onTokenJson);



const form = document.querySelector("form");
form.addEventListener("submit", search);