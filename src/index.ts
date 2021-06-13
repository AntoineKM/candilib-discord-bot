import { CronJob } from "cron";
import { Client, TextChannel } from "discord.js";
import "dotenv-safe/config";

import departmentsData from "./data/departements.json";

const client = new Client();
const token = process.env.TOKEN || "";
const channelId = process.env.CHANNEL_ID || "";
const roleSansPermisId = process.env.ROLE_SANS_PERMIS_ID || "";

const runReminder = () => {
  const channel = client.channels.cache.get(channelId);
  if (channel && channel.isText) {
    (<TextChannel>channel).send(`:alarm_clock: **Rappel du jour pour les <@&${roleSansPermisId}>**\n${departmentsData.map(departement => `:round_pushpin: ${departement}: <https://beta.interieur.gouv.fr/candilib/candidat/${departement}/selection/selection-centre>`).join("\n")}`)
  }
}

const main = () => {
  let reminderTask = new CronJob('00 00 12 * * *', runReminder);

  client.on("ready", () => {
    // console.log(`Logged in as ${client.user.tag}!`);

    reminderTask.start();
    runReminder();
  });

  client.login(token);

}

main();