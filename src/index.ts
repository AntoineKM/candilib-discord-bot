import { CronJob } from "cron";
import { Client, TextChannel } from "discord.js";
import "dotenv-safe/config";

const client = new Client();
const token = process.env.TOKEN;
const channelId = process.env.CHANNEL_ID;
const roleSansPermisId = process.env.ROLE_SANS_PERMIS_ID;

const runReminder = () => {
  const channel = client.channels.cache.get(channelId);
  if (channel.isText) {
    (<TextChannel>channel).send(`:alarm_clock: **Rappel pour les <@&${roleSansPermisId}>**\n`)
  }
}

const main = () => {
  let reminderTask = new CronJob('00 00 12 * * *', runReminder);

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

    reminderTask.start();
    runReminder();
  });

  client.login(token);

}

main();