const gossipPushButton = document.querySelector('#gossip-push-button');
const gossipText = document.querySelector('#gossip-text');
const deletedGossips = document.querySelector('#deleted-gossips');
const allGossips = document.querySelector('#all-gossips');

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
    gossipText.value ="";
}


gossipPushButton.onclick = pushGossip;
getAndRenderGossips();
