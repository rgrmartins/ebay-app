/**
 * Configuração da fila de processamento do Redis com Bee Queue,
 */
import Bee from 'bee-queue';
import redisConfig from '../config/redis';

const jobs = [];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // Adicionando jobs a fila
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // Processando as filas
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
