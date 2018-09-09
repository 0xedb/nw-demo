const https = require('https');

// Set window dimensions
const appWindow = nw.Window.get();
appWindow.width = 600;
appWindow.height = 400;

// Add menu
const menu = new nw.Menu({ type: 'menubar' });
menu.append(new nw.MenuItem({
  label: 'Home',
  click: () => alert('Welcome Home!')
}));

var sub = new nw.Menu();
sub.append(new nw.MenuItem({label: 'App'}));
sub.append(new nw.MenuItem({label: 'About'}));


menu.append(new nw.MenuItem({ label: 'Edit' }));
menu.append(new nw.MenuItem({ label: 'Code' })); 
menu.append(new nw.MenuItem({
  label: 'Help',
  submenu: sub
}));

appWindow.menu = menu;

// Display Bitcoin price
appWindow.on('loaded', () => {
  getBitcoinPrice();
});


// Reload Window on Click
document.querySelector('.price').addEventListener('click', () => {
  nw.Window.get().reload();
});


function getBitcoinPrice() {
  https.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json', res => {
    let data = ''

    res.on('data', (piece) => {
      data += piece;
    });

    res.on('end', () => {
      // console.log(JSON.parse(data));
      document.querySelector('.price').textContent =
        '1 Bitcoin is $' + JSON.parse(data).bpi.USD.rate
    });
  });
}