const urlSplit = location.pathname.split('/');
const profileUser = urlSplit[urlSplit.length - 1];
const userGossips = document.querySelector('#user-gossips');
let gossipWorker = null;

function renderProfileData(userGossips) {
  profileName.textContent = profileUser;
  gossipsCount.textContent = userGossips.length;

  upvotesCount.textContent = userGossips
                              .filter((gossip) => gossip.ka_gossip > 0)
                              .reduce((count, currGossip) => {
                                return count + currGossip.ka_gossip
                              }, 0);

  karmaCount.textContent = userGossips
                              .reduce((count, currGossip) => {
                                return count + currGossip.ka_gossip
                              }, 0);
}

const getAndRenderGossips = function() {
  getGossips()
    .then((apiGossips) => {
      const gossips = apiGossips.filter((gossip) => gossip.id_usuario == profileUser);
      renderProfileData(gossips);
      renderGossips(userGossips, gossips, filterByPublicStatus, sortGossipsById, getAndRenderGossips, getAndRenderGossips);
    })
    .catch((err) => {
      console.log(err)
    });
}

function getWorkerMsg(message) {
  const gossips = message.data.filter((gossip) => gossip.id_usuario == profileUser && gossip.id_gossip_status === 1);
  renderProfileData(gossips);
  renderGossips(userGossips, gossips, filterByPublicStatus, sortGossipsById, getAndRenderGossips, getAndRenderGossips);
}

if (!gossipWorker) {
  gossipWorker = new Worker('../js/workers/gossipW.js');
  gossipWorker.postMessage({
    status: 'START',
    user: localStorage.user && JSON.parse(localStorage.user)
  });
  gossipWorker.onmessage = getWorkerMsg;
}

getAndRenderGossips();
