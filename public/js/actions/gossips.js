function filterByPublicStatus(gossip) {
  return parseInt(gossip.id_gossip_status) === 1;
}

function filterByDeleted(gossip) {
  return gossip.id_gossip_status === 0;
}

function sortGossipsByKarma(g1, g2) {
  return g2.ka_gossip - g1.ka_gossip;
}

function sortGossipsById(g1, g2) {
  return g2.id_gossip - g1.id_gossip;
}

function getGossips(admin = false) {
  return new Promise((resolve, reject) => {
    const XHR = new XMLHttpRequest();
    XHR.open('get', `https://gossip-app.herokuapp.com/${admin ? 'admin/' : ''}gossip/all`, true);
    XHR.onload = function(response) {
      const res = JSON.parse(response.target.response);
      resolve(res.gossips);
    };
    XHR.send();
  });
}

function renderGossips(parentNode, gossips, filter, sort, onGossipUpdate, onGossipDelete) {
  if (typeof filter == 'function') {
    gossips = gossips.filter(filter);
  }

  if (typeof sort == 'function') {
    gossips.sort(sort);
  }

  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }

  gossips.forEach((g, index) => {
    const gossip = new Gossip(g.id_usuario, g.de_gossip, g.id_gossip, g.id_gossip_status, g.ka_gossip, new Date(Date.parse(g.da_gossip)));
    if (typeof onGossipUpdate == 'function') gossip.onUpdate = onGossipUpdate;
    if (typeof onGossipDelete == 'function') gossip.onDelete = onGossipDelete;
    parentNode.appendChild(gossip.render());
  });

}
