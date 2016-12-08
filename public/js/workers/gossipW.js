var gossipArray = [];
var user = {};
var missingCounter = 0;
var getInterval = 0;

function getGossips(user){
  return new Promise((resolve,reject)=>{
    let XHR = new XMLHttpRequest();
    let url = user.admin ? `https://gossip-app.herokuapp.com/admin/gossip/all` : `https://gossip-app.herokuapp.com/gossip/all`;
    XHR.open('get', url, true);
    XHR.onload = function(response) {
      let res = JSON.parse(response.target.response);
      let gossips = res.gossips;
      resolve(gossips)
    };
    XHR.send();
  });
}

onmessage = function(e) {
  let status = e.data.status;
  switch(status){
    case 'START':
      if (!getInterval){
        user = e.data.user;
        getInterval = setInterval(function(){
          getGossips(user)
            .then((gossips) => {
              postMessage(gossips);
            });
        },10000);
      }
      break;
    case 'OK':
      break;
  }
}
