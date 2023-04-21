import { Admin as KafkaAdmin, Kafka, KafkaConfig } from 'kafkajs';

export class Admin {
  kafkaClient: Kafka
  client: KafkaAdmin
  constructor(config: KafkaConfig) {
    this.kafkaClient = new Kafka(config)
    this.client = this.kafkaClient.admin()
  }

  connect() {
    return this.client.connect()
  }

  async deleteTopics(topics: string[]) {
    await this.client.deleteTopics({ topics });
  }

  async createTopics(topics: string[]) {
    await this.client.createTopics({ topics: topics.map(topic => ({ topic })) });
  }
  disconnect() {
    return this.client.disconnect()
  }
}
