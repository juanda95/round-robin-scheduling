function Process(name, executionTime) {
  this.name = name || this.createRandomName();
  this.executionTime = executionTime || 100;
  this.remainingTime = executionTime || 100;
}

Process.prototype.execute = function execute(quantum) {
  let userQuantum = null;
  if (quantum === null || quantum === undefined) {
    throw new Error('Missing argument: quantum');
  }

  if (quantum <= 0) {
    throw new Error('Invalid argument: quantum must be positive and greater than 0');
  }

  userQuantum = (quantum > this.remainingTime) ? this.remainingTime : quantum;
  this.remainingTime = this.remainingTime - userQuantum;
  return userQuantum;
};

Process.prototype.isFinished = function isFinished() {
  return this.remainingTime <= 0;
};

Process.prototype.createRandomName = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
  const number = Math.floor(Math.random() * 1000);
  return `process ${letter}${number}`;
};

module.exports = Process;
