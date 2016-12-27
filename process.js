function Process(name, executionTime) {
  this.name = name || this._createRandomName();
  this.executionTime = executionTime || 100;
  this.remainingTime = executionTime || 100;
}

Process.prototype.execute = function (quantum) {
  if (quantum === null || quantum === undefined) {
    throw new Error('Missing argument: quantum');
  }

  if (quantum <= 0) {
    throw new Error('Invalid argument: quantum must be positive and greater than 0');
  }

  this.remainingTime = this.remainingTime - quantum;
  return this.remainingTime;
};

Process.prototype._createRandomName = () => {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let letter = alphabet[Math.floor(Math.random() * alphabet.length)];
  let number = Math.floor(Math.random() * 1000);
  return `process ${letter}${number}`;
};

module.exports = Process;
