import { CronJob } from 'cron';
import searchOnEbay from './searchOnEbay';

const jobs = {};

export const addJob = alert => {
  const { _id: id, research_time } = alert;
  const cronJob = new CronJob(
    `*/${research_time}  * * * *`,
    () => {
      searchOnEbay(alert);
    },
    null,
    true,
    'America/Sao_Paulo'
  );
  jobs[id] = cronJob;
  console.log(`JOBS ======> ${jobs}`);
};

export const removeJob = id => {
  if (jobs[id]) {
    jobs[id].stop();
    delete jobs[id];
  }
};
