
import { getAvailability } from "./scraping.mjs";
import { notify } from "./notification.mjs";
import schedule from 'node-schedule';

const isDebugMode = () => {
  const args = process.argv.slice(2);
  return args.includes('--debug=true');
}

const checkAvailabilities = async () => {
  console.debug('Checking availabilites')
  try {
    const availabilities = await getAvailability();

    // For the moment there's only the Fnac Pack wristband available, notify only if another one becomes available
    // in debug mode, we'll send the notifications
    if (availabilities.filter(a => !a.isSoldOut).length > 1 || isDebugMode()) {
      let message = availabilities
        .map(availability => `${availability.title}: ${availability.isSoldOut ? 'Sold out' : 'Available'}`).join('\n');
      message += "\n https://madcoolfestival.es/en/tickets.php \n https://www.festicket.com/eventgenius/mad-cool-festival/shop/25858/";
      notify(message);
    }
  } catch (e) {
    console.error(e);
    notify("Couldn't retrieve and send availabilities", e.message);
  }
};

schedule.scheduleJob('* * * * *', checkAvailabilities);