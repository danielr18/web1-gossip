class Gossip {
  constructor(id_user, description, id_gossip, status = 1, karma = 0, date = new Date()) {
    this.id_user = id_user;
    this.description = description;
    this.date = date;
    this.karma = karma;
    this.status = status;

    if (id_gossip) {
      this.id_gossip = id_gossip;
    }
  }

  post() {
    return new Promise((resolve, reject) => {
      if (this.id_gossip) {
        reject({
          message: `Gossip #${this.id_gossip} is already posted.`
        });
      } else {
        const XHR = new XMLHttpRequest();
        XHR.open('post', '/gossip/create', true);

        XHR.onload = function(e) {
          //TODO: Grab data from response and set it to the object
          resolve(e.target.response);
        };

        XHR.setRequestHeader('Content-type', 'application/json');
        const payload = {
          id_usuario: this.id_user,
          de_gossip: this.description
        }
        XHR.send(JSON.stringify(payload));
      }
    });
  }

  render() {
    const gossip = document.createElement('div');
    gossip.className = 'gossip notification';
    gossip.innerHTML = '<div class="gossip-wrapper"> <div class="gossip-karma-wrapper"> <div class="vote-wrapper"> <a class="vote-btn positive-vote"> <span class="icon is-small"> <i class="fa fa-arrow-up"></i> </span> </a> </div> <div class="karma-wrapper"> <span class="gossip-karma"></span> </div> <div class="vote-wrapper"> <a class="vote-btn negative-vote"> <span class="icon is-small"> <i class="fa fa-arrow-down"></i> </span> </a> </div> </div> <div class="gossip-content"> <div class="gossip-header"> <p> <strong class="gossip-user"></strong> <span>-</span> <small class="gossip-date"></small> </p> </div> <div class="gossip-body"> <p class="gossip-description"></p> </div> </div> </div>';
    if (localStorage.user) {
      user = JSON.parse(localStorage.user);
      if (user.name == this.id_user || user.admin) {
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        gossip.insertBefore(deleteButton, gossip.querySelector('.gossip-wrapper'));
      }
    }
    gossip.querySelector('.gossip-user').textContent = this.id_user;
    gossip.querySelector('.gossip-description').textContent = this.description;
    gossip.querySelector('.gossip-date').textContent = this.date.toUTCString();
    gossip.querySelector('.gossip-karma').textContent = this.karma;
    return gossip;
  }

}
