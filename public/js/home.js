const gossipPushButton = document.querySelector('#gossip-push-button');
const gossipText = document.querySelector('#gossip-text');
const gossipArea = document.querySelector('#hot-gossips')
var gossipArray = [];

function pushGossip() {
  let gossip = {
    id_usuario: "Saskatchetoon",
    id_gossip: gossipText.value
  };

  if (gossip !== undefined && gossip !== "") {
    gossipArray.push(gossip);
    let XHR = new XMLHttpRequest();
    XHR.open('post', 'http://dildo/gossip/create', true);

    XHR.onload = function(response) {
      console.log(response);
    };

    XHR.setRequestHeader('Content-type', 'application/json');
    //XHR.send(gossip);
  }
  render();
}

function render() {
  while (gossipArea.firstChild) {
    gossipArea.removeChild(gossipArea.firstChild);
  }
  gossipArray.forEach(function(data, index) {

    let XHR = new XMLHttpRequest();
    XHR.open('post', 'http://localhost:3000/secret', true);

    XHR.onload = function(response) {
      let div = document.createElement('div');
      div.innerHTML = response.target.response;
      gossipArea.appendChild(div);
    };

    XHR.setRequestHeader('Content-type', 'application/json');
    XHR.send(JSON.stringify(data));

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
