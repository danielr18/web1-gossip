const gossipPushButton = document.querySelector('#gossip-push-button');
const gossipText = document.querySelector('#gossip-text');
const deletedGossips = document.querySelector('#deleted-gossips');
const allGossips = document.querySelector('#all-gossips');
var gossipArray = [];
var gossipWorker = null;

function onGossipUpdate(oldGossip, newGossip) {
  const gossipElems = document.querySelectorAll(`[gossip_id="${newGossip.id_gossip}"]`);
  gossipElems.forEach((gossipElem) => {
    const karma = gossipElem.querySelector('.gossip-karma');
    const description = gossipElem.querySelector('.gossip-description');
    karma.textContent = newGossip.karma;
    description.textContent = newGossip.description;
    //DO something on delete
  });
}

function pushGossip() {
  const user = localStorage.user && JSON.parse(localStorage.user);
  const gossip = new Gossip(user.name, gossipText.value);

  gossip.post()
    .then(function() {
      getAndRender();
    })
    .catch(function(err) {
      console.log(err);
    });
  gossipText.value = "";
}

function render() {
  while (deletedGossips.firstChild) {
    deletedGossips.removeChild(deletedGossips.firstChild);
  }
  while (allGossips.firstChild) {
    allGossips.removeChild(allGossips.firstChild);
  }
  //CHECK THIS
  gossipArray.sort((g1, g2) => g2.id_gossip - g1.id_gossip);
  let deletedArray = gossipArray.filter((gossip) => {
    return gossip.status === 0;
  });
  deletedArray.forEach(function(gossip, index) {
    deletedGossips.appendChild(gossip.render());
  });
  let allArray = gossipArray.filter((gossip) => {
    return gossip.status === 1;
  });
  allArray.forEach(function(gossip, index) {
    allGossips.appendChild(gossip.render());
  });

}

function getGossips() {
  return new Promise((resolve, reject) => {
    let XHR = new XMLHttpRequest();
    XHR.open('get', 'https://gossip-app.herokuapp.com/admin/gossip/all', true);
    XHR.onload = function(response) {
      let res = JSON.parse(response.target.response);
      let gossips = res.gossips;
      resolve(gossips)
    };
    XHR.send();
  });
}

function getAndRender() {
  getGossips()
    .then((gossips) => {
      if(!gossipWorker){
        gossipWorker = new Worker('../js/workers/gossipW.js');
        gossipWorker.postMessage({status: 'START', user: localStorage.user && JSON.parse(localStorage.user)});
        gossipWorker.onmessage = getWorkerMsg;
      }
      gossips.forEach(function(g, index) {
        let gossip = new Gossip(g.id_usuario, g.de_gossip, g.id_gossip, g.id_gossip_status, g.ka_gossip, new Date(Date.parse(g.da_gossip)));
        gossip.onUpdate = onGossipUpdate;
        gossip.onDelete = getAndRender;
        gossip.onRecover = getAndRender;
        gossipArray[index] = gossip;
      });
      render();
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getWorkerMsg(message){
  let gossips = message.data;
  gossips.forEach(function(g, index) {
    let gossip = new Gossip(g.id_usuario, g.de_gossip, g.id_gossip, g.id_gossip_status, g.ka_gossip, new Date(Date.parse(g.da_gossip)));
    gossip.onUpdate = onGossipUpdate;
    gossip.onDelete = getAndRender;
    gossip.onRecover = getAndRender;
    gossipArray[index] = gossip;
  });
  render();
}

gossipPushButton.onclick = pushGossip;
getAndRender();
