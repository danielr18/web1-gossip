const gossipPushButton = document.querySelector('#gossip-push-button');
const gossipText = document.querySelector('#gossip-text');
const deletedGossips = document.querySelector('#deleted-gossips');
const allGossips = document.querySelector('#all-gossips');
let gossipWorker = null;

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

function getWorkerMsg(message) {
  const gossips = message.data;
  renderGossips(allGossips, gossips, filterByPublicStatus, sortGossipsById, getAndRenderGossips, getAndRenderGossips);
  renderGossips(deletedGossips, gossips, filterByDeleted, sortGossipsById, getAndRenderGossips, getAndRenderGossips);
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

gossipPushButton.onclick = pushGossip;

if (!gossipWorker) {
  gossipWorker = new Worker('../js/workers/gossipW.js');
  gossipWorker.postMessage({
    status: 'START',
    user: localStorage.user && JSON.parse(localStorage.user)
  });
  gossipWorker.onmessage = getWorkerMsg;
}

getAndRenderGossips();
