const express = require('express')
const app = express()
const port = 3000

const testDb = require('./db-test');
app.get('/', async(req, res) => {
    const testResult = await testDb();
    res.send(`Hello World!<hr>Db test: ${testResult}`);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})