const fs = require('fs')
const express = require('express')
const cors = require('cors')
import { PythonShell } from 'python-shell'

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.post('/python', (req, res) => {
  let options = {
    mode: 'text',
    // pythonPath: 'path/to/python',
    pythonOptions: ['-u'], // get print results in real-time
    // scriptPath: 'path/to/my/scripts',
    args: [1, 2, 3],
  }

  PythonShell.run('test.py', options, function (err, results) {
    if (err) throw err
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results)
  })

  fs.writeFileSync('test.py', req.body.code)
  console.log(req.body)
  res.json({ message: 'sucess' })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
