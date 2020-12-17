const { Kafka } = require('kafkajs');
const ProdutoController = require('./produtoController');
const config = require('../config/config');

const kafkaServer = config.KAFKA_SERVER;

let KafkaFunction = {

    addProduto: async function(){

      const kafka = new Kafka({
        clientId: 'easypet',
        brokers: [kafkaServer]
      })
      
      const consumer = kafka.consumer({ groupId: 'group1' })
      
      await consumer.connect()
      await consumer.subscribe({ topic: '1', fromBeginning: true })
      
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {    
          console.log('Kafka - menssagem recebida no topic: '+topic);
          await ProdutoController.add(message);
        },
      })   

    },

    updateProduto: async function(){

        const kafka = new Kafka({
          clientId: 'easypet',
          brokers: [kafkaServer]
        })
        
        const consumer = kafka.consumer({ groupId: 'group2' })
        
        await consumer.connect()
        await consumer.subscribe({ topic: '2', fromBeginning: true })
        
        await consumer.run({
          eachMessage: async ({ topic, partition, message }) => {    
            console.log('Kafka - menssagem recebida no topic: '+topic);
            await ProdutoController.update(message);
          },
        })   
  
    },

    deleteProduto: async function(){

      const kafka = new Kafka({
        clientId: 'easypet',
        brokers: [kafkaServer]
      })
      
      const consumer = kafka.consumer({ groupId: 'group3' })
      
      await consumer.connect()
      await consumer.subscribe({ topic: '3', fromBeginning: true })
      
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {    
          console.log('Kafka - menssagem recebida no topic: '+topic);
          await ProdutoController.delete(message);
        },
      })   

  }
}

module.exports = KafkaFunction;
