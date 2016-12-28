let Process = require('./process');

function ProcessManager(process) {
  if (!Array.isArray(process)) {
    process = [];
  }
  this._processList = process;
}

ProcessManager.prototype.addProcess = function (process) {
  if (process instanceof Process) {
    this._processList.push(process);
  }
  return this._processList;
};

ProcessManager.prototype.setQuantum = function (number) {
  if (typeof number !== 'number') {
    throw new Error('Invalid argument: quantum should only be a number');
  }

  this._quantum = number;
  return this;
};

module.exports = ProcessManager;
