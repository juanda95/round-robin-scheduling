const Process = require('./process');

function ProcessManager(process) {
  let processList = [];
  if (Array.isArray(process)) {
    processList = process;
  }
  this.processList = processList;
}

ProcessManager.prototype.addProcess = function addProcess(process) {
  if (process instanceof Process) {
    this.processList.push(process);
  }
  return this.processList;
};

ProcessManager.prototype.setQuantum = function setQuantum(number) {
  if (typeof number !== 'number') {
    throw new Error('Invalid argument: quantum should only be a number');
  }

  this.quantum = number;
  return this;
};

module.exports = ProcessManager;
