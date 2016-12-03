const gossipPushButton = document.querySelector('#gossip-push-button');
const gossipText = document.querySelector('#gossip-text');
const hotGossips = document.querySelector('#hot-gossips');
const newGossips = document.querySelector('#new-gossips');
var gossipArray = [];

function onGossipUpdate(oldGossip, newGossip) {
  const gossipElems = document.querySelectorAll(`[gossip_id="${newGossip.id_gossip}"]`);
  gossipElems.forEach((gossipElem) => {
    const karma = gossipElem.querySelector('.gossip-karma');
    const description = gossipElem.querySelector('.gossip-description');
    karma.textContent = newGossip.karma;
    description.textContent = newGossip.description;
    if (gossipElem.parentNode.id == 'hot-gossips') {
      const previousSiblingKarma = (gossipElem.previousElementSibling) ? parseInt(gossipElem.previousElementSibling.querySelector('.gossip-karma').textContent) : gossipElem.karma;
      const nextSiblingKarma = (gossipElem.nextElementSibling) ? parseInt(gossipElem.nextElementSibling.querySelector('.gossip-karma').textContent) : gossipElem.karma;
      if (newGossip.karma > previousSiblingKarma) {
        gossipElem.parentNode.insertBefore(gossipElem, gossipElem.previousElementSibling);
      } else if (newGossip.karma < nextSiblingKarma) {
        gossipElem.parentNode.insertBefore(gossipElem.nextElementSibling, gossipElem);
      }
    }
  });
}

function pushGossip() {
  const user = localStorage.user && JSON.parse(localStorage.user);
  const gossip = new Gossip(user.name, gossipText.value);

  gossip.onUpdate = onGossipUpdate;

  gossipArray.push(gossip);

  gossip.post()
    .then(function() {
      render();
    })
    .catch(function(err) {
      console.log(err);
    });
}

function render() {
  while (hotGossips.firstChild) {
    hotGossips.removeChild(hotGossips.firstChild);
  }
  while (newGossips.firstChild) {
    newGossips.removeChild(newGossips.firstChild);
  }
  gossipArray.sort((g1, g2) => g2.karma - g1.karma);
  gossipArray.forEach(function(gossip, index) {
    hotGossips.appendChild(gossip.render());
  });
  gossipArray.sort((g1, g2) => g2.date.getTime() - g1.date.getTime());
  gossipArray.forEach(function(gossip, index) {
    newGossips.appendChild(gossip.render());
  });

}

function getGossips() {
  let XHR = new XMLHttpRequest();
  XHR.open('get', 'http://dildo/gossip/all', true);
  XHR.onload = function(response) {
    // TODO: Parse response, set gossipArray
    console.log(response);
  };
  //XHR.send();
}

gossipPushButton.onclick = pushGossip;
