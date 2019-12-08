import { CronJob } from 'cron';
import searchOnEbay from './searchOnEbay';

const jobs = {};

export const addJob = data => {
  const { _id: id, research_time, search_phrase } = data;
  const cronJob = new CronJob(
    `*/${research_time}  * * * *`,
    () => {
      searchOnEbay(search_phrase);
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
