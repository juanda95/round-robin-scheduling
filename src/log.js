const Process = require('./process');

function Log(process, actualTime, finalTime) {
  if (!(process instanceof Process)) {
    throw Error('Invalid argument: process should be an instance of Process');
  }

  this.process = process;
  this.actualTime = actualTime;
  this.finalTime = finalTime;
}

module.exports = Log;
