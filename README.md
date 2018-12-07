# express-nock
_Automate request traffic recording and replay for express._

![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
[![npm version](https://badge.fury.io/js/express-nock.svg)](https://badge.fury.io/js/express-nock)

Automatically record and replay external requests made during an express request/response cycle.

## Install
```
yarn add express-nock
```

## Usage
```js
const express = require('express');
const { nockMiddleware, replayNocks } = require('express-nock');
const app = express();
const nockPath = './path/to/recordings';

if(process.env.RECORD) { app.use(nockMiddleware({ nockPath })) }
else if (process.env.REPLAY) { replayNocks({ nockPath }) }

app.get('/aggregate', async () => {
  const agg = await makeExternalRequests();
  res.send(agg);
})
```


---
Copyright 2018 Sebastian Herrlinger (SPRING Axel Springer Digital News Media GmbH)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.