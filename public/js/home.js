const gossipPushButton = document.querySelector('#gossip-push-button');
const gossipText = document.querySelector('#gossip-text');
const gossipArea = document.querySelector('#gossip-area')
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
    let content;
    let div = document.createElement('div');
    div.innerHTML='<div class="columns"><div class="column"><div class="column"><div class="box"><article class="media"><div class="media-left"></div><div class="media-content"><div class="content"><p id="cont"><strong></strong><small></small><small></small><br><span></span></p></div><nav class="level"><div class="level-left"><a class="level-item"><span class="icon is-small"><i class="fa fa-arrow-up"></i></span></a><a class="level-item"><span class="icon is-small"><i class="fa fa-arrow-down"></i></span></a></div></nav></div></article></div></div></div></div>';
    content = div.querySelector('#cont');
    content.querySelector('strong').textContent=`${data.id_usuario}`;
    let small = content.querySelectorAll('small');
    small[0].textContent = `${data.id_usuario}`;
    small[1].textContent = `31`;
    content.querySelector('span').textContent = `${data.id_gossip}`;
    gossipArea.appendChild(div);
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
