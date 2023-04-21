import { Kafka, Consumer as KafkaConsumer, ConsumerConfig, KafkaConfig, EachMessageHandler } from 'kafkajs';

export class Consumer {
  kafkaClient: Kafka
  client: KafkaConsumer
  constructor(config: ConsumerConfig & KafkaConfig) {
    const { groupId, ...kafkaConfig } = config
    this.kafkaClient = new Kafka(kafkaConfig)
    this.client = this.kafkaClient.consumer({ groupId })
  }

  connect() {
    return this.client.connect()
  }

  async subscribe(topics: string[], eachMessage: EachMessageHandler) {
    try {
      await this.client.subscribe({ topics })
      return this.client.run({ eachMessage })
    } catch (err) {
      console.log(err)
    }
  }
  disconnect() {
    return this.client.disconnect()
  }
}
