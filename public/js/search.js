const gossipsCount = document.querySelector('#gossips-count');
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const searchGossips = document.querySelector('#search-gossips');
const searchGossipInput = document.querySelector('.search-gossip-input');
const karmaSearchModes = document.querySelector('.karma-search-modes');

let gossips = [];

function handleSearchModeChange(input) {
  if (input.value == 'karma') {
    searchGossipInput.classList.toggle('invisible', true);
    karmaSearchModes.classList.toggle('invisible', false);
  } else {
    searchGossipInput.classList.toggle('invisible', false);
    karmaSearchModes.classList.toggle('invisible', true);
  }
}

searchBtn.onclick = function() {
  const searchMode = document.querySelector('input[name="search-mode"]:checked').value;
  let matchGossips = [];
  switch (searchMode) {
    case 'words':
      const words = searchInput.value.split(' ').map((word) => `(^|\\s)${word}($|\\s)`).join('');
      const regex = new RegExp(words, 'gi');
      matchGossips = gossips.filter((gossip) => regex.test(gossip.de_gossip));
      break;
    case 'user':
      matchGossips = gossips.filter((gossip) =>
        gossip.id_usuario.toLowerCase() == searchInput.value.toLowerCase()
      );
      break;
    case 'karma':
      const karmaSearchMode = document.querySelector('input[name="karma-mode"]:checked').value;
      switch (karmaSearchMode) {
        case 'equal':
          matchGossips = gossips.filter((gossip) =>
            gossip.ka_gossip == equalKarmaInput.value
          );
          break;
        case 'lower':
          matchGossips = gossips.filter((gossip) =>
            gossip.ka_gossip < lowerKarmaInput.value
          );
          break;
        case 'greater':
          matchGossips = gossips.filter((gossip) =>
            gossip.ka_gossip > greaterKarmaInput.value
          );
          break;
        case 'range':
          matchGossips = gossips.filter((gossip) =>
            minimumRangeKarmaInput.value < gossip.ka_gossip && gossip.ka_gossip < maximumRangeKarmaInput.value
          );
          break;
      }
      break;
  }
  renderGossips(searchGossips, matchGossips);
}

getGossips()
  .then((apiGossips) => {
    gossips = apiGossips.filter(filterByPublicStatus)
    gossipsCount.textContent = gossips.length;
  })
  .catch((err) => {
    console.log(err);
  });
