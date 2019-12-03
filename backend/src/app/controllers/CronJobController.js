import CronJob from 'cron';

const job = new CronJob(
  '* * * * * *',
  () => {
    console.log('Testing');
  },
  null,
  true,
  'America/Sao_paulo'
);

export default job;
