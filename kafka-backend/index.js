const express = require('express');
const bodyParser = require('body-parser');
const { KafkaClient, Producer, Consumer } = require('kafka-node');
const cors = require('cors'); // Import the cors package

const app = express();
app.use(bodyParser.json());
// Enable CORS middleware
app.use(cors());

const kafkaClient = new KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(kafkaClient);
const consumer = new Consumer(kafkaClient, [{ topic: 'simple-topic', partition: 0 }], { autoCommit: true });

// Kafka Producer
producer.on('ready', () => {
    console.log('Producer is ready');
});

app.post('/produce', (req, res) => {
    const message = JSON.stringify(req.body);

    producer.send([{ topic: 'simple-topic', messages: [message] }], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error producing message');
        }
        res.send('Message produced: ' + message);
    });
});

// Kafka Consumer
consumer.on('message', (message) => {
    console.log('Consumed message:', message.value);
});

app.listen(3000, () => {
    console.log('Backend running on http://localhost:3000');
});
