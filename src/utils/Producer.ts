import { Kafka, KafkaConfig, Producer as KafkaProducer } from 'kafkajs';

export class Producer {
  kafkaClient: Kafka
  client: KafkaProducer
  constructor(config: KafkaConfig) {
    this.kafkaClient = new Kafka(config)
    this.client = this.kafkaClient.producer()
  }

  connect() {
    return this.client.connect()
  }

  publish(topic: string, payload: Record<string, any>) {
    return this.client.send({
      topic,
      messages: [
        {
          value: JSON.stringify(payload)
        }
      ]
    })
  }

  disconnect() {
    return this.client.disconnect()
  }
}
