const expect = require('expect.js');
const ProcessManager = require('../process-manager');
const Process = require('../process');

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
});
