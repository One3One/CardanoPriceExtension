/* Coinbase ADA*/
let ws_coinbase = new WebSocket('wss://ws-feed.pro.coinbase.com');
let div_coinbase = document.getElementById('price_coinbase');

let last_price_coinbase = null;

ws_coinbase.onopen = function () {
    ws_coinbase.send(JSON.stringify ({
        'type': 'subscribe',
        'channels': [{'name': 'ticker', 'product_ids': ['ADA-USDT']}]
    }))
};

ws_coinbase.onmessage = function (event) {
    let current_price_coinbase = JSON.parse(event.data);
    let price_coinbase = parseFloat(current_price_coinbase.price).toFixed(2);
    div_coinbase.innerText = price_coinbase;

    if ((price_coinbase < last_price_coinbase) && (isNaN(price_coinbase) == false)) {
        div_coinbase.innerText = '↓' + price_coinbase;
        div_coinbase.style.color = 'red';
        
    } else if ((price_coinbase > last_price_coinbase) && (isNaN(price_coinbase) == false)) {
        div_coinbase.innerText = '↑' + price_coinbase;
        div_coinbase.style.color = 'green';

    } else if ((price_coinbase == last_price_coinbase) && (isNaN(price_coinbase) == false)) {
        div_coinbase.innerText = '=' + price_coinbase;
        div_coinbase.style.color = 'black';
    }

    last_price_coinbase = price_coinbase;
};

