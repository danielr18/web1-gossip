var logsArray = [];
var getInterval = 0;

function getLogs(){
  return new Promise((resolve,reject)=>{
    let XHR = new XMLHttpRequest();
    let url = `https://gossip-app.herokuapp.com/admin/log/all`;
    XHR.open('get', url, true);
    XHR.onload = function(response) {
      let res = JSON.parse(response.target.response);
      let logs = res.logs;
      resolve(logs)
    };
    XHR.send();
  });
}

onmessage = function(e) {
  let status = e.data.status;
  switch(status){
    case 'START':
      if (!getInterval){
        getInterval = setInterval(function(){
          getLogs()
            .then((logs) => {
              postMessage(logs);
            });
        },10000);
      }
      break;
    case 'OK':
      break;
  }
}
