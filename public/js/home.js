const gossipPushButton = document.querySelector('#gossip-push-button');
const gossipText = document.querySelector('#gossip-text');
const gossipArea = document.querySelector('#hot-gossips')
var gossipArray = [];

function pushGossip() {
  const gossip = new Gossip('A', gossipText.value)
  gossipArray.push(gossip);
  const XHR = new XMLHttpRequest();
  XHR.open('post', 'http://dildo/gossip/create', true);

  XHR.onload = function(response) {
    console.log(response);
  };

  XHR.setRequestHeader('Content-type', 'application/json');
  //XHR.send(gossip);
  render();
}

function render() {
  while (gossipArea.firstChild) {
    gossipArea.removeChild(gossipArea.firstChild);
  }
  gossipArray.forEach(function(gossip, index) {
    gossipArea.appendChild(gossip.render());
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
