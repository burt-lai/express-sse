import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send("Hello /, I'm Express server for SSE!");
});

let count = 0;
app.get('/stream', async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });
  // console.log(scheduler.queue)
  // res.write('retry: 10000\n');
  // res.write('event: connecttime\n');
  // res.write('data: ' + 1000 + '\n\n')
  // res.write('data: ' + new Date() + '\n\n');

  const interval = setInterval(function () {
    const data = JSON.stringify({
      name: 'lucy',
      age: 18,
      count: count++,
    });
    // console.log(data);
    res.write('data: ' + data + '\n\n');
  }, 1000);
});

app.listen(44000, () => {
  console.log(`Example app listening on port 44000`);
});
