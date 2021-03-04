const express = require('express')
const app = express()
const port = 3000

const testDb = require('./db-test');
app.get('/', (req, res) => {
    testDb()
        .then(testResult =>
            res.send(`Hello World!<hr>Db test: ${testResult}`))
        .catch((err) => res.send({ err }));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})