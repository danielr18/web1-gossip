class Gossip {
  constructor(id_user, description, id_gossip, status = 1, karma = 0, date = new Date()) {
    this.id_user = id_user;
    this.description = description;
    this.date = date;
    this.karma = karma;
    this.status = status;
    if (id_gossip !== (undefined || null)) {
      this.id_gossip = id_gossip;
    }

  }
//https://gossip-app.herokuapp.com
  onUpdate(oldGossip, newGossip) {
    //Needs to be implemented by the object.
  }

  onUpvote() {
    //Needs to be implemented by the object.
  }

  onDownvote() {
    //Needs to be implemented by the object.
  }

  onDelete() {
    //Needs to be implemented by the object.
  }

  onRecover(){
    //Needs to be implemented by the object.
  }

  update(properties) {
    const old = Object.assign({}, this);
    Object.assign(this, properties);
    this.onUpdate(old, this);
  }

  post() {
    return new Promise((resolve, reject) => {
      if (this.id_gossip) {
        reject({
          message: `Gossip #${this.id_gossip} is already posted.`
        });
      } else {
        const XHR = new XMLHttpRequest();
        XHR.open('post', 'https://gossip-app.herokuapp.com/gossip/create', true);

        XHR.onload = (e) => {
          resolve();
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

  up() {
    return new Promise((resolve, reject) => {
      let user = localStorage.user && JSON.parse(localStorage.user);
      const XHR = new XMLHttpRequest();
      XHR.open('post', 'https://gossip-app.herokuapp.com/gossip/up', true);

      XHR.onload = (e) => {
        //TODO: Grab data from response and set it to the object
        if (e.target.status == 200) {
          this.update({
            karma: this.karma + 1
          });
          resolve(e.target.response);
        } else {
          reject({
            message: "Something went wrong"
          });
        }
    };

      XHR.setRequestHeader('Content-type', 'application/json');
      const payload = {
        id_usuario: user.name,
        id_gossip: this.id_gossip
      }
      XHR.send(JSON.stringify(payload));
    });
  }

  down() {
    return new Promise((resolve, reject) => {
      let user = localStorage.user && JSON.parse(localStorage.user);
      const XHR = new XMLHttpRequest();
      XHR.open('post', 'https://gossip-app.herokuapp.com/gossip/down', true);

      XHR.onload = (e) => {
        //TODO: Grab data from response and set it to the object
        if (e.target.status == 200) {
          this.update({
            karma: this.karma - 1
          });
          resolve(e.target.response);
        } else {
          reject({
            message: "Something went wrong"
          });
        }
      };

      XHR.setRequestHeader('Content-type', 'application/json');
      const payload = {
        id_usuario: user.name,
        id_gossip: this.id_gossip
      }
      XHR.send(JSON.stringify(payload));
    });
  }

  remove(){
    return new Promise((resolve, reject) => {
      const XHR = new XMLHttpRequest();
      let user = localStorage.user && JSON.parse(localStorage.user);
      let url = JSON.parse(window.localStorage.getItem('user')).admin ? `https://gossip-app.herokuapp.com/admin/gossip/delete?id_gossip=${this.id_gossip}&id_usuario=${user.name}` : `https://gossip-app.herokuapp.com/gossip/delete?id_gossip=${this.id_gossip}&id_usuario=${this.id_user}`;
      XHR.open('get', url , true);
      XHR.onload = (e) => {
        //TODO: Grab data from response and set it to the object
        if (e.target.status == 200) {
          this.update({
            status: 0
          });
          resolve(e.target.response);
        } else {
          reject({
            message: "Unable to remove"
          });
        }
      };
      XHR.setRequestHeader('Content-type','application/x-www-form-urlencoded');
      XHR.send();
    });
  }

  recover(){
      return new Promise((resolve, reject) => {
        const XHR = new XMLHttpRequest();
        let user = localStorage.user && JSON.parse(localStorage.user);
        let url = `https://gossip-app.herokuapp.com/admin/gossip/recover?id_gossip=${this.id_gossip}&id_usuario=${user.name}`;
        XHR.open('get', url , true);
        XHR.onload = (e) => {
          //TODO: Grab data from response and set it to the object
          if (e.target.status == 200) {
            this.update({
              status: 1
            });
            resolve(e.target.response);
          } else {
            reject({
              message: "Unable to restore",
              response: e.target.response
            });
          }
        };
        //XHR.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        XHR.send();
    });
  }

  render() {
    const gossip = document.createElement('div');
    gossip.className = 'gossip notification';
    gossip.setAttribute('gossip_id', this.id_gossip);
    gossip.innerHTML = '<div class="gossip-wrapper"> <div class="gossip-karma-wrapper"> <div class="vote-wrapper"> <button class="vote-btn positive-vote"> <span class="icon is-small"> <i class="fa fa-arrow-up"></i> </span> </button> </div> <div class="karma-wrapper"> <span class="gossip-karma"></span> </div> <div class="vote-wrapper"> <button class="vote-btn negative-vote"> <span class="icon is-small"> <i class="fa fa-arrow-down"></i> </span> </button> </div> </div> <div class="gossip-content"> <div class="gossip-header"> <p> <strong class="gossip-user"></strong> <span>-</span> <small class="gossip-date"></small> </p> </div> <div class="gossip-body"> <p class="gossip-description"></p> </div> </div> </div>';
    if (localStorage.user) {
      user = JSON.parse(localStorage.user);
      if ((user.name == this.id_user || user.admin) && this.status !== 0) {
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.addEventListener('mouseup', () =>{
          this.remove()
            .then(this.onDelete)
            .catch((e) => {
              console.log(e);
            });
        });
        gossip.insertBefore(deleteButton, gossip.querySelector('.gossip-wrapper'));
      }
      if(user.admin && this.status === 0){
        // TODO: Implement recovery of gossips for admin
        const recoverButton = document.createElement('button');
        const recoverInner = document.createElement('I');
        recoverInner.className = "fa fa-check";
        recoverButton.className = 'search';
        recoverButton.addEventListener('mouseup', () => {
          this.recover()
            .then(this.onRecover)
            .catch((e) => {
              console.log(e);
            });
        });
        recoverButton.appendChild(recoverInner);
        gossip.insertBefore(recoverButton, gossip.querySelector('.gossip-wrapper'));
      }
    }
    gossip.querySelector('.gossip-user').textContent = this.id_user;
    gossip.querySelector('.gossip-description').textContent = this.description;
    gossip.querySelector('.gossip-date').textContent = this.date.toUTCString();
    gossip.querySelector('.gossip-karma').textContent = this.karma;

    gossip.querySelector('.negative-vote').addEventListener('mouseup', () => {
      //No puedo usar this porq es un nuevo contexto verdad?
      this.down()
        .then(this.onUpvote)
        .catch((e) => {
          console.log(e);
        });
    });

    gossip.querySelector('.positive-vote').addEventListener('mouseup', () => {
      //No puedo usar this porq es un nuevo contexto verdad?
      this.up()
        .then(this.onDownvote)
        .catch((e) => {
          console.log(e);
        });
    });

    return gossip;
  }
}
