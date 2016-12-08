const gossipPushButton = document.querySelector('#gossip-push-button');
const gossipText = document.querySelector('#gossip-text');
const hotGossips = document.querySelector('#hot-gossips');
const newGossips = document.querySelector('#new-gossips');
var gossipArray = [];
var gossipWorker = null;

// function onGossipUpdate(oldGossip, newGossip) {
//   const gossipElems = document.querySelectorAll(`[gossip_id="${newGossip.id_gossip}"]`);
//   gossipElems.forEach((gossipElem) => {
//     const karma = gossipElem.querySelector('.gossip-karma');
//     const description = gossipElem.querySelector('.gossip-description');
//     karma.textContent = newGossip.karma;
//     description.textContent = newGossip.description;
//     if (gossipElem.parentNode.id == 'hot-gossips') {
//       const previousSiblingKarma = (gossipElem.previousElementSibling) ? parseInt(gossipElem.previousElementSibling.querySelector('.gossip-karma').textContent) : gossipElem.karma;
//       const nextSiblingKarma = (gossipElem.nextElementSibling) ? parseInt(gossipElem.nextElementSibling.querySelector('.gossip-karma').textContent) : gossipElem.karma;
//       if (newGossip.karma > previousSiblingKarma) {
//         gossipElem.parentNode.insertBefore(gossipElem, gossipElem.previousElementSibling);
//       } else if (newGossip.karma < nextSiblingKarma) {
//         gossipElem.parentNode.insertBefore(gossipElem.nextElementSibling, gossipElem);
//       }
//     }
//   });
// }

const getAndRenderGossips = function() {
  getGossips()
    .then((gossips) => {
      renderGossips(hotGossips, gossips, filterByPublicStatus, sortGossipsByKarma, getAndRenderGossips, getAndRenderGossips);
      renderGossips(newGossips, gossips, filterByPublicStatus, sortGossipsById, getAndRenderGossips, getAndRenderGossips);
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
  let gossips = message.data;
  gossips.forEach(function(g, index) {
    let gossip = new Gossip(g.id_usuario, g.de_gossip, g.id_gossip, g.id_gossip_status, g.ka_gossip, new Date(Date.parse(g.da_gossip)));
    gossip.onUpdate = onGossipUpdate;
    gossip.onDelete = getAndRender;
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
