import { Consumer } from './Consumer';
import { Producer } from './utils/Producer';
import { Admin } from './utils/Admin';
import waitForExpect from 'wait-for-expect';
import { EachMessagePayload } from 'kafkajs';

const topics = ['topic-test']

describe('demo test', () => {
  let consumer: Consumer;
  let producer: Producer;
  let admin: Admin;
  let res = false

  const handler = async ({ message }: EachMessagePayload) => {
    res = true;
    if (message.value) {
      console.log(JSON.parse(message.value.toString()))
      return
    }

    console.log('message empty');
  }

  beforeAll(async () => {
    producer = new Producer({
      clientId: 'producer',
      brokers: ['127.0.0.1:9092']
    });
    admin = new Admin( {
      clientId: 'producer',
      brokers: ['127.0.0.1:9092']
    });
    await Promise.all([producer.connect(), admin.connect()]);
    await admin.createTopics(topics);
  });

  beforeEach(async () => {
    consumer = new Consumer({
      clientId: 'producer',
      brokers: ['127.0.0.1:9092'],
      groupId: 'test-group',
    });
    await consumer.connect();
    await consumer.subscribe(topics, handler)
  });

  afterEach(async () => {
    await consumer.disconnect()
  });

  afterAll(async () => {
    await admin.deleteTopics(topics);
    await Promise.all([producer.disconnect(), admin.disconnect()]);
  });

  it('should return true', () => {
    producer.publish(topics[0], { foo: 'bar' })

    return waitForExpect(() => {
      expect(res).toBe(true)
    });
  });
});
