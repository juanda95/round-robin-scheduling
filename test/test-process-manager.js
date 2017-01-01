const expect = require('expect.js');
const ProcessManager = require('../src/process-manager');
const Process = require('../src/process');

function createProcessList(processes) {
  const processList = [];
  for (let i = 0; i < processes; i += 1) {
    processList.push(new Process());
  }
  return processList;
}

describe('ProcessManager', () => {
  describe('#ProcessManager()', () => {
    it('should create an empty process manager instance', () => {
      const processManager = new ProcessManager();
      const processList = processManager.processList;
      expect(processList).to.be.an(Array);
      expect(processList).to.have.length(0);
    });

    it('should have an empty array when something different than an array '
      + 'is passed', () => {
      const processManager = new ProcessManager({ a: 1, b: 2, c: 3 });
      const processList = processManager.processList;
      expect(processList).to.be.an(Array);
      expect(processList).to.have.length(0);
    });

    it('should have the process array passed as argument', () => {
      const generatedProcessList = createProcessList(5);
      const processManager = new ProcessManager(generatedProcessList);
      const processList = processManager.processList;
      expect(processList).to.eql(generatedProcessList);
    });

    it('should have a default 5 quantum', () => {
      const processManager = new ProcessManager();
      expect(processManager.quantum).to.be(5);
    });
  });

  describe('#addProcess()', () => {
    it('should add a process to an empty process manager', () => {
      const processManager = new ProcessManager();
      const process = new Process('Test Process', 100);
      processManager.addProcess(process);
      expect(processManager.processList).to.have.length(1);
    });

    it('should return a list of added processes', () => {
      const generatedProcessList = createProcessList(5);
      const processManager = new ProcessManager(generatedProcessList);
      const process = new Process('Test Process', 50);
      const result = processManager.addProcess(process);
      expect(result).to.have.length(6);
    });

    it('should not add a non Process instance to the process list', () => {
      const processManager = new ProcessManager();
      processManager.addProcess([1, 3, 3, 7]);
      expect(processManager.processList).to.have.length(0);
    });
  });

  describe('#setQuantum()', () => {
    it('should receive a number as a parameter', () => {
      const processManager = new ProcessManager();
      processManager.setQuantum(10);
      expect(processManager.quantum).to.be(10);
    });

    it('should raise an error when anything else than a number is passed '
      + 'as a parameter', () => {
      const processManager = new ProcessManager();
      expect(processManager.setQuantum).withArgs('test').to.throwException();
      expect(processManager.setQuantum).withArgs({}).to.throwException();
      expect(processManager.setQuantum).withArgs([]).to.throwException();
      expect(processManager.setQuantum).withArgs(new Process())
        .to.throwException();
    });

    it('should return the ProcessManager instance', () => {
      const processManager = new ProcessManager();
      const result = processManager.setQuantum(10);
      expect(result).to.be.a(ProcessManager);
    });
  });

  describe('#execute()', () => {
    it('should leave the queue empty', () => {
      const generatedProcessList = createProcessList(5);
      const processManager = new ProcessManager(generatedProcessList)
        .setQuantum(10);
      processManager.execute();
      expect(processManager.queue).to.have.length(0);
    });

    it('should return the elapsed time', () => {
      // Generate 5 process of 100 execution time each
      const generatedProcessList = createProcessList(5);
      const processManager = new ProcessManager(generatedProcessList)
        .setQuantum(10);
      const elapsedTime = 5 * 100;

      const result = processManager.execute();
      expect(result).to.be(elapsedTime);
    });

    it('should return elapsed time if executed again', () => {
      // Generate 5 process of 100 execution time each
      const generatedProcessList = createProcessList(5);
      const processManager = new ProcessManager(generatedProcessList)
        .setQuantum(10);
      const elapsedTime = 5 * 100;
      // First execution, ignore it.
      processManager.execute();
      // Second execution, get the information.
      const result = processManager.execute();
      expect(result).to.be(elapsedTime);
    });
  });

  describe('#isFinished()', () => {
    it('should return true if all the process have finished', () => {
      const generatedProcessList = createProcessList(5);
      const processManager = new ProcessManager(generatedProcessList);

      // Set all processes remaining time to 0
      for (let i = 0; i < processManager.processList.length; i += 1) {
        const process = processManager.processList[i];
        process.remainingTime = 0;
      }

      expect(processManager.isFinished()).to.be.ok();
    });

    it('should return false if at least one process is has not finished', () => {
      const generatedProcessList = createProcessList(5);
      const processManager = new ProcessManager(generatedProcessList);

      // Set all processes remaining time to 0 except the last one
      for (let i = 0; i < processManager.processList.length - 1; i += 1) {
        const process = processManager.processList[i];
        process.remainingTime = 0;
      }

      expect(processManager.isFinished()).to.not.be.ok();
    });
  });
});
