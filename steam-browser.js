const links = document.querySelector('[data-featuretarget="gameslist-root"]').querySelectorAll('span > a[href]');
const url = `https://www.metacritic.com/search/${links[0].innerText}/?page=1&category=13`;
var iframe = document.createElement('iframe');
iframe.src = url;
iframe.height = 400;
links[0].parentElement.parentElement.appendChild(iframe);
