const Process = require('./process');
const Log = require('./log');

function ProcessManager(process) {
  let processList = [];
  if (Array.isArray(process)) {
    processList = process;
  }
  this.processList = processList;
  this.queue = [];
  this.quantum = 5;
  this.logs = [];
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

ProcessManager.prototype.execute = function execute() {
  if (this.isFinished()) return this.elapsedTime;

  this.elapsedTime = 0;
  this.queue = this.processList;

  while (!this.isFinished()) {
    const actualProcess = this.queue.shift();
    actualProcess.execute(this.quantum);
    this.logs.push(new Log(actualProcess, this.elapsedTime));

    if (actualProcess.remainingTime > 0) {
      this.queue.push(actualProcess);
    }
    this.elapsedTime += this.quantum;
  }

  return this.elapsedTime;
};

ProcessManager.prototype.isFinished = function isFinished() {
  return this.processList.every(process => process.isFinished());
};

module.exports = ProcessManager;
