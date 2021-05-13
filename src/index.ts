import axios, { AxiosError, AxiosResponse } from "axios";
import { schedule } from "node-cron";

async function updateIp() {
  const isSuccessful = (response: string): boolean =>
    ["nochg", "good"].includes(response.split(" ")[0]);

  try {
    const ip_response = await axios
      .get(`http://ip1.dynupdate.no-ip.com/`, {
        validateStatus: (status: number) => status >= 200 && status < 300,
      })
      .catch((error: AxiosError) => {
        throw error;
      });
    const ip: string = ip_response.data;

    const update_response = await axios
      .get(
        `https://${process.env.NOIP_USERNAME}:${process.env.NOIP_PASSWORD}@dynupdate.no-ip.com/nic/update?hostname=${process.env.DOMAINS}&myip=${ip}`,
        {
          validateStatus: (status: number) => status >= 200 && status < 300,
        }
      )
      .catch((error: AxiosError) => {
        throw error;
      });
    if (!isSuccessful(update_response.data)) {
      throw update_response.data;
    }
    console.log(update_response.data);
  } catch (error: any) {
    throw error;
  }
}

// This is a cron job for updating your domains to have the correct public facing ip of the network the machine is currently running on
// Scheduled to run every 10 seconds by default
schedule("*/10 * * * * *", async () => {
  try {
    await updateIp();
  } catch (error: any) {
    console.log(error);
  }
});
