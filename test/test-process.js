const expect = require('expect.js');
const Process = require('../src/process');

describe('Process', () => {
  describe('#Process()', () => {
    it('should create a Process instance', () => {
      const process = new Process();
      expect(process).to.be.a(Process);
    });

    it('should create successfully with the passed arguments', () => {
      const processName = 'Test Process';
      const executionTime = 50;
      const process = new Process(processName, executionTime);
      expect(process.name).to.be(processName);
      expect(process.executionTime).to.be(executionTime);
    });

    it('should create a process with random name if no arguments are passed', () => {
      const process = new Process();
      expect(process.name).to.be.a('string');
      expect(process.name).to.contain('process');
    });

    it('should have 100ms of execution time if no arguments are passed', () => {
      const process = new Process();
      expect(process.executionTime).to.be.a('number');
      expect(process.executionTime).to.be(100);
    });

    it('should have the same amount of execution time and remaining time at the instantiation', () => {
      const executionTime = 30;
      const process = new Process('Test Process', executionTime);
      expect(process.remainingTime).to.be(executionTime);
    });
  });

  describe('#execute()', () => {
    it('should raise an error if no argument is passed', () => {
      const process = new Process();
      expect(process.execute).to.throwError();
    });

    it('should raise an error if a zero quantum is passed', () => {
      const process = new Process();
      expect(process.execute).withArgs(0).to.throwException();
    });

    it('should raise an error if a negative quantum is passed', () => {
      const process = new Process();
      expect(process.execute).withArgs(-5).to.throwException();
    });

    it('should return a number if an argument is passed', () => {
      const process = new Process();
      const number = process.execute(20);
      expect(number).to.be.a('number');
    });

    it('should subtract the quantum if there\'s enough remaining time', () => {
      const quantum = 10;
      const remainingTime = 10;
      const process = new Process('Test Process', 60);
      process.remainingTime = remainingTime;
      process.execute(quantum);
      expect(process.remainingTime).to.be(remainingTime - quantum);
    });

    it('should return the executed time', () => {
      const quantum = 10;
      const process = new Process('Test Process', 40);
      const result = process.execute(quantum);
      expect(result).to.be(quantum);
    });

    it('execution should not surpass remaining time', () => {
      const quantum = 10;
      const remainingTime = 5;
      const process = new Process('Test Process', 50);
      process.remainingTime = remainingTime;
      const result = process.execute(quantum);
      expect(result).to.be(remainingTime);
    });
  });

  describe('#_createRandomName()', () => {
    it('should create a string', () => {
      const process = new Process();
      const randomName = process.createRandomName();
      expect(randomName).to.be.a('string');
    });

    it('should have alphanumeric id at the end', () => {
      const process = new Process();
      const randomName = process.createRandomName();
      const randomId = randomName.split(' ')[1];
      expect(randomId).to.match(/[a-zA-Z]+[0-9]+/);
    });

    it('should return different values each time is called', () => {
      const process = new Process();
      const firstRandomName = process.createRandomName();
      const secondRandomName = process.createRandomName();
      expect(firstRandomName).not.to.be(secondRandomName);
    });
  });
});
