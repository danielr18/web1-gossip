const logsWrapper = document.querySelector('.logs-wrapper');
var logsArray = [];
var logWorker = null;

function render() {
  while (logsWrapper.firstChild) {
    logsWrapper.removeChild(logsWrapper.firstChild);
  }
  logsArray.sort((g1, g2) => g2.karma - g1.karma);
  logsArray.forEach(function(log, index) {
    logsWrapper.appendChild(log.render());
  });
}

function getLogs() {
  return new Promise((resolve, reject) => {
    let XHR = new XMLHttpRequest();
    XHR.open('get', 'https://gossip-app.herokuapp.com/admin/log/all', true);
    XHR.onload = function(response) {
      // TODO: Parse response, set logsArray
      if (response.target.status === 500 || 404) {
        reject({
          message: 'fuk',
          status: response.target.status
        });
      } else {
        let res = JSON.parse(response.target.response);
        console.log(res);
        let logs = res.logs;
        resolve(logs)
      }
    };
    XHR.send();
  });
}


function getAndRender() {
  getLogs()
    .then(() => {
      if(!logWorker){
        console.log("doing");
        logWorker = new Worker('../js/workers/logW.js');
        logWorker.postMessage({status: 'START', user: localStorage.user && JSON.parse(localStorage.user)});
        logWorker.onmessage = getWorkerMsg;
      }
      logs.forEach(function(l, index) {
        let log = new log(l.id_gossip_log, l.id_gossip, l.de_gossip_log, l.da_gossip_log);
        logsArray[index] = log;
      });
      render();
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getWorkerMsg(message){
  let gossips = message.data;
  console.log(message);
  logs.forEach(function(l, index) {
    let log = new log(l.id_gossip_log, l.id_gossip, l.de_gossip_log, l.da_gossip_log);
    logsArray[index] = log;
  });
  render();
}

getAndRender();
