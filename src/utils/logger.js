import Vue from 'vue';

function _getMsg(msg) {
  return msg.map(m => typeof m === 'object' ? JSON.stringify(m, null, 2) : m).join("\n");
}

export default {
  debug(...msgs) {
    Vue.$log.debug(_getMsg(msgs));
  },
  info(...msgs) {
    Vue.$log.info(_getMsg(msgs));
  },
  warn(...msgs) {
    Vue.$log.warn(_getMsg(msgs));
  },
  error(...msgs) {
    Vue.$log.error(_getMsg(msgs));
  }
}