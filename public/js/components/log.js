class Log {
  constructor(id_gossip_log, id_gossip, de_gossip_log, da_gossip_log) {
    this.id = id_gossip_log;
    this.gossip_id = id_gossip;
    this.description = de_gossip_log;
    this.date = da_gossip_log;
  }

  render() {
    const log = document.createElement('div');
    let p = document.createElement('P');
    div.className = 'log';
    log.setAttribute('log-id', this.id);
    log.setAttribute('gossip-id', this.id_gossip);
    p.textContent = `${this.date} : ${this.description}`
    log.appendChild(p)
    return log;
  }
}
