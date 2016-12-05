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

  //gossip.onUpdate = onGossipUpdate;

  // gossipArray.push(gossip);

  gossip.post()
    .then(() => {
      getAndRender();
    })
    .catch(function(err) {
      console.log(err);
    });
    gossipText.value ="";
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
  return new Promise((resolve,reject)=>{
    let XHR = new XMLHttpRequest();
    XHR.open('get', 'https://gossip-app.herokuapp.com/gossip/all', true);
    XHR.onload = function(response) {
      // TODO: Parse response, set gossipArray
      let res = JSON.parse(response.target.response);
      let gossips = res.gossips;
      gossipArray = gossips;
      resolve()
    };
    XHR.send();
  });
}

function getAndRender(){
  getGossips()
  .then(() => {
      gossipArray.forEach(function(g,index){
      let gos = new Gossip(g.id_usuario,g.de_gossip,g.id_gossip,g.id_gossip_status,g.ka_gossip,new Date(Date.parse(g.da_gossip)));
      gos.onUpdate = onGossipUpdate;
      gos.onDelete = getAndRender;
      gossipArray[index] = gos;
    });
    //Filtering
    gossipArray = gossipArray.filter((gossip) => {
      return parseInt(gossip.status) === 1;
    });
    render();
  })
  .catch(function(err){
    console.log(err);
  });
}

gossipPushButton.onclick = pushGossip;
getAndRender();
