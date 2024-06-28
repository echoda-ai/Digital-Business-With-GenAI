from genai_application.utils.kafka_service import KafkaService

if __name__ == "__main__":
    kafka_client = KafkaService()
    producer = kafka_client.create_producer()
    kafka_client.produce_message(producer, key='1', value='Hello, Kafka!')
    consumer = kafka_client.create_consumer()
    kafka_client.consume_messages(consumer)
