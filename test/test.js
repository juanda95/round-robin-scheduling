var expect = require('expect.js');
var Process = require('../process');

describe('Process', () => {
  describe('#Process()', () => {
    it('should create a Process instance', () => {
      let process = new Process();
      expect(process).to.be.a(Process);
    });

    it('should create successfully with the passed arguments', () => {
      let processName = 'Test Process';
      let executionTime = 50;
      let process = new Process(processName, executionTime);
      expect(process.name).to.be(processName);
      expect(process.executionTime).to.be(executionTime);
    });

    it('should create a process with random name if no arguments are passed', () => {
      let process = new Process();
      expect(process.name).to.be.a('string');
      expect(process.name).to.contain('process');
    });

    it('should have 100ms of execution time if no arguments are passed', () => {
      let process = new Process();
      expect(process.executionTime).to.be.a('number');
      expect(process.executionTime).to.be(100);
    });

    it('should have the same amount of execution time and remaining time at the instantiation', () => {
      let executionTime = 30;
      let process = new Process('Test Process', executionTime);
      expect(process.remainingTime).to.be(executionTime);
    })
  });

  describe('#execute()', () => {
    it('should raise an error if no argument is passed', () => {
      let process = new Process();
      expect(process.execute).to.throwError();
    });

    it('should raise an error if a zero quantum is passed', () => {
      let process = new Process();
      expect(process.execute).withArgs(0).to.throwException();
    });

    it('should raise an error if a negative quantum is passed', () => {
      let process = new Process();
      expect(process.execute).withArgs(-5).to.throwException();
    });

    it('should return a number if an argument is passed', () => {
      let process = new Process();
      let number = process.execute(20);
      expect(number).to.be.a('number');
    });

    it('should subtract the quantum from the remaining time', () => {
      let quantum = 10;
      let executionTime = 60;
      let process = new Process('Test Process', executionTime);
      process.execute(quantum);
      expect(process.remainingTime).to.be(executionTime - quantum);
    });

    it('should return the remaining time', () => {
      let quantum = 10;
      let executionTime = 40;
      let process = new Process('Test Process', executionTime);
      let result = process.execute(quantum);
      expect(result).to.be(executionTime - quantum);
    });
  })

  describe('#_createRandomName()', () => {
    it('should create a string', () => {
      let process = new Process();
      let randomName = process._createRandomName();
      expect(randomName).to.be.a('string');
    });

    it('should have alphanumeric id at the end', () => {
      let process = new Process();
      let randomName = process._createRandomName();
      let randomId = randomName.split(' ')[1];
      expect(randomId).to.match(/[a-zA-Z]+[0-9]+/);
    });

    it('should return different values each time is called', () => {
      let process = new Process();
      let firstRandomName = process._createRandomName();
      let secondRandomName = process._createRandomName();
      expect(firstRandomName).not.to.be(secondRandomName);
    })
  });
});
