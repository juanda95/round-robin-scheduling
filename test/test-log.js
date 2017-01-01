const expect = require('expect.js');
const Process = require('../src/process');
const Log = require('../src/log');

function createProcess() {
  return new Process();
}

describe('Log', () => {
  describe('#Log()', () => {
    it('should create a Log instance', () => {
      const process = createProcess();
      const actualTime = 30;
      const log = new Log(process, actualTime);
      expect(log).to.be.a(Log);
    });

    it('should raise an error if no arguments are passed', () => {
      expect(Log).to.throwError();
    });

    it('should have a process', () => {
      const process = createProcess();
      const log = new Log(process, 30);
      expect(log.process).to.be(process);
    });

    it('should have an actualTime', () => {
      const actualTime = 20;
      const log = new Log(createProcess(), actualTime);
      expect(log.actualTime).to.be(actualTime);
    });
  });
});
