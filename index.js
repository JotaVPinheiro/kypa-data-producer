require("dotenv/config");

const axios = require("axios");

exports.handler = async function () {
  const channels = process.env.THINGSPEAK_CHANNELS_WRITE_KEYS.split(",");

  const client = axios.create({
    baseURL: "https://api.thingspeak.com",
  });

  const hoursNow = new Date().getHours();
  const umidityMeasurement =
    (Math.cos((Math.PI * hoursNow) / 12) * 0.5 + 1) / 2;

  await Promise.all(
    channels.map(async (channel) => {
      try {
        await client.get("/update", {
          params: {
            api_key: channel,
            field1: umidityMeasurement,
          },
        });

        console.log(`Data sent to channel ${channel}: ${umidityMeasurement}`);
      } catch (error) {
        const errorData = isAxiosError(error)
          ? error.response?.data
          : error.message;

        console.error(`Error sending data to channel ${channel}:`, errorData);
      }
    })
  );
};
