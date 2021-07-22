const {Utils} = require("./formattime.js")

module.exports = (duration) => {

    if(isNaN(duration) || typeof duration === 'undefined') return '00:00';

    if(duration > 3600000000) return 'Live';

let x;

  if(Utils.formatTime(duration, true) <= 60) x = `00:${Utils.formatTime(duration, true)}`

  else x = Utils.formatTime(duration, true)

  //  return Utils.formatTime(duration, true);

return x

};