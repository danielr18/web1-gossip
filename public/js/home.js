const gossipPushButton = document.querySelector('#gossip-push-button');
const gossipText = document.querySelector('#gossip-text');
const gossipArea = document.querySelector('#gossip-area')
var gossipArray = [];

function pushGossip() {
  let gossip = {
    user: "Saskatchetoon",
    content: gossipText.value
  };
  if (gossip !== undefined && gossip !== "") {
    gossipArray.push(gossip);
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

gossipPushButton.onclick = pushGossip;
