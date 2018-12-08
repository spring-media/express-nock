const nock = require('nock');
const crypto = require('crypto');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

const defaultHashFn = ({ url, query }) => crypto.createHash('md5').update(JSON.stringify({ url, query })).digest('hex');
const resolveNockPath = (nockPath) => {
  return path.isAbsolute(nockPath) ? nockPath : path.resolve(process.cwd(), nockPath);
}
const nockMiddleware = ({ nockPath, hashFn = defaultHashFn }) => (req, res, next) => {
  const resolvedNockPath = resolveNockPath(nockPath);

  nock.recorder.rec({
    /* eslint-disable camelcase */
    dont_print: true,
    output_objects: true,
    /* eslint-enable camelcase */
  });

  res.on('finish', () => {
    const recording = nock.recorder.play();

    nock.recorder.clear();
    nock.cleanAll();
    nock.restore();

    if (recording.length === 0) {
      return;
    }

    const fileName = hashFn(req);
    const nockFileName = `${fileName}.json`;
    const nockFilePath = path.join(resolvedNockPath, nockFileName);

    if (!fs.existsSync(resolvedNockPath)) {
      mkdirp.sync(resolvedNockPath);
    }
    fs.writeFileSync(nockFilePath, JSON.stringify(recording, null, 2));
  });

  next();
};

const replayNocks = ({ nockPath }) => {
  const resolvedNockPath = resolveNockPath(nockPath);
  const dirFiles = fs.readdirSync(resolvedNockPath);
  const files = dirFiles.filter(file => (file.match(/\.json$/)));

  if (!nock.isActive()) {
    nock.activate();
  }

  files.forEach(file => {
    const scopes = nock.load(path.join(resolvedNockPath, file));

    scopes.forEach(scope => scope.persist());
  });

  nock.disableNetConnect();
};

module.exports = {
  nockMiddleware,
  replayNocks,
};
