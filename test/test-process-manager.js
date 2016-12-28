var expect = require('expect.js');
var ProcessManager = require('../process-manager');
var Process = require('../process');

function createProcessList(processes) {
  let processList = [];
  for (let i = 0; i < processes; i++) {
    processList.push(new Process());
  }
  return processList;
}

describe('ProcessManager', () => {
  describe('#ProcessManager()', () => {
    it('should create an empty process manager instance', () => {
      let processManager = new ProcessManager();
      let processList = processManager._processList;
      expect(processList).to.be.an(Array);
      expect(processList).to.have.length(0);
    });

    it('should have an empty array when something different than an array '
      + 'is passed', () => {
      let processManager = new ProcessManager({ a: 1, b: 2, c: 3 });
      let processList = processManager._processList;
      expect(processList).to.be.an(Array);
      expect(processList).to.have.length(0);
    });

    it('should have the process array passed as argument', () => {
      let generatedProcessList = createProcessList(5);
      let processManager = new ProcessManager(generatedProcessList);
      let processList = processManager._processList;
      expect(processList).to.eql(generatedProcessList);
    });
  });

  describe('#addProcess()', () => {
    it('should add a process to an empty process manager', () => {
      let processManager = new ProcessManager();
      let process = new Process('Test Process', 100);
      processManager.addProcess(process);
      expect(processManager._processList).to.have.length(1);
    });

    it('should return a list of added processes', () => {
      let generatedProcessList = createProcessList(5);
      let processManager = new ProcessManager(generatedProcessList);
      let process = new Process('Test Process', 50);
      let result = processManager.addProcess(process);
      expect(result).to.have.length(6);
    });

    it('should not add a non Process instance to the process list', () => {
      let processManager = new ProcessManager();
      processManager.addProcess([1,3,3,7]);
      expect(processManager._processList).to.have.length(0);
    });
  });

  describe('#setQuantum()', () => {
    it('should receive a number as a parameter', () => {
      let processManager = new ProcessManager();
      processManager.setQuantum(10);
      expect(processManager._quantum).to.be(10);
    });

    it('should raise an error when anything else than a number is passed '
      + 'as a parameter', () => {
      let processManager = new ProcessManager();
      expect(processManager.setQuantum).withArgs('test').to.throwException();
      expect(processManager.setQuantum).withArgs({}).to.throwException();
      expect(processManager.setQuantum).withArgs([]).to.throwException();
      expect(processManager.setQuantum).withArgs(new Process())
        .to.throwException();
    });

    it('should return the ProcessManager instance', () => {
      let processManager = new ProcessManager();
      let result = processManager.setQuantum(10);
      expect(result).to.be.a(ProcessManager);
    });
  });
});
