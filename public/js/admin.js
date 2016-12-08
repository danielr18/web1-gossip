const gossipPushButton = document.querySelector('#gossip-push-button');
const gossipText = document.querySelector('#gossip-text');
const deletedGossips = document.querySelector('#deleted-gossips');
const allGossips = document.querySelector('#all-gossips');
var gossipWorker = null;

// function onGossipUpdate(oldGossip, newGossip) {
//   const gossipElems = document.querySelectorAll(`[gossip_id="${newGossip.id_gossip}"]`);
//   gossipElems.forEach((gossipElem) => {
//     const karma = gossipElem.querySelector('.gossip-karma');
//     const description = gossipElem.querySelector('.gossip-description');
//     karma.textContent = newGossip.karma;
//     description.textContent = newGossip.description;
//     //DO something on delete
//   });
// }

const getAndRenderGossips = function() {
  getGossips(true)
    .then((gossips) => {
      renderGossips(allGossips, gossips, filterByPublicStatus, sortGossipsById, getAndRenderGossips, getAndRenderGossips);
      renderGossips(deletedGossips, gossips, filterByDeleted, sortGossipsById, getAndRenderGossips, getAndRenderGossips);
    })
    .catch((err) => {
      console.log(err)
    });
}

function pushGossip() {
  const user = localStorage.user && JSON.parse(localStorage.user);
  const gossip = new Gossip(user.name, gossipText.value);
  gossip.post()
    .then(getAndRenderGossips)
    .catch(function(err) {
      console.log(err);
    });
  gossipText.value = "";
}


function getWorkerMsg(message){
  gossips.forEach(function(g, index) {
  let gossips = message.data;
    let gossip = new Gossip(g.id_usuario, g.de_gossip, g.id_gossip, g.id_gossip_status, g.ka_gossip, new Date(Date.parse(g.da_gossip)));
    gossip.onUpdate = onGossipUpdate;
    gossip.onDelete = getAndRender;
    gossip.onRecover = getAndRender;
    gossipArray[index] = gossip;
  });
  render();
}
      if(!gossipWorker){
        gossipWorker = new Worker('../js/workers/gossipW.js');
        gossipWorker.postMessage({status: 'START', user: localStorage.user && JSON.parse(localStorage.user)});
        gossipWorker.onmessage = getWorkerMsg;
      }
gossipPushButton.onclick = pushGossip;
getAndRenderGossips();
