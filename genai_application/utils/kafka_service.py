from confluent_kafka import Producer, Consumer, KafkaError
from dotenv import load_dotenv
import os 
load_dotenv(override=True)

class KafkaService:
    def __init__(self):

        self.bootstrap_servers = os.environ.get("KAFKA_HOST")
        self.group_id = '1'
        self.topic = 'ecom-ai'

    def create_producer(self):
        return Producer({'bootstrap.servers': self.bootstrap_servers})

    def produce_message(self, producer, key, value):
        try:
            producer.produce(self.topic, key=key, value=value)
            producer.flush()
        except Exception as e:
            print(f"Failed to produce message: {e}")

    def create_consumer(self):
        consumer_conf = {
            'bootstrap.servers': self.bootstrap_servers,
            'group.id': self.group_id,
            'auto.offset.reset': 'earliest'
        }
        return Consumer(consumer_conf)

    def consume_messages(self, consumer, timeout=1.0):
        consumer.subscribe([self.topic])
        try:
            while True:
                msg = consumer.poll(timeout)
                if msg is None:
                    continue
                if msg.error():
                    if msg.error().code() == KafkaError._PARTITION_EOF:
                        print(f"{msg.topic()} [{msg.partition()}] reached end at offset {msg.offset()}")
                    elif msg.error():
                        raise KafkaException(msg.error())
                else:
                    print(f"Received message: {msg.value().decode('utf-8')}")
        except KeyboardInterrupt:
            pass
        finally:
            consumer.close()