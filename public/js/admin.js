const gossipPushButton = document.querySelector('#gossip-push-button');
const gossipText = document.querySelector('#gossip-text');
const deletedGossips = document.querySelector('#deleted-gossips');
const allGossips = document.querySelector('#all-gossips');
var gossipArray = [];

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

  gossip.onUpdate = onGossipUpdate;

  gossipArray.push(gossip);

  gossip.post()
    .then(function() {
      getAndRender();
    })
    .catch(function(err) {
      console.log(err);
    });
    gossipText.value ="";
}

function render() {
  while (deletedGossips.firstChild) {
    deletedGossips.removeChild(deletedGossips.firstChild);
  }
  while (allGossips.firstChild) {
    allGossips.removeChild(allGossips.firstChild);
  }
  gossipArray.sort((g1, g2) => g2.date.getTime() - g1.date.getTime());
  gossipArray.forEach(function(gossip, index) {
    deletedGossips.appendChild(gossip.render());
  });
  gossipArray.forEach(function(gossip, index) {
    allGossips.appendChild(gossip.render());
  });

}

function getGossips() {
  return new Promise((resolve,reject)=>{
    let XHR = new XMLHttpRequest();
    XHR.open('get', '/gossip/all', true);
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
      gossipArray[index] = gos;
    });
    render();
  })
  .catch(function(err){
    console.log(err);
  });
}
gossipPushButton.onclick = pushGossip;
