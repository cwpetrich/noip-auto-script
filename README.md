# noip-auto-script

### Disclosure:
#### _Spur of the moment nodejs typescript implementation to automate the updating process for maintaining a valid public facing IP address for a domain being hosted with the free NOIP hosting services._

### Purpose:
This was a project created in order to place a convenient reocurring script on a Raspberry Pi running PIVPN on my home network. I use NOIP as a free domain hosting service which requires some additional work in order to maintain the free cost. But also there is the issue of having my public facing IP address change unexpectedly due to power outage, router rebooting, etc... The script generated from this project will be responsible for ensuring that NOIP always has my current public IP. There is another hoop NOIP requires of users with free domain hosting being you must continually confirm your domain every 30 days or it will be deleted and inaccessible for an unspecified amount of time. This is extremely inconvenient and probably effective at getting people to cough up the $24.99 a year to avoid it. BUT that's $24.99 I can save 👍!

### Details:
*  The project is written in Typescript, but the script to run is transpiled into Javascript as `/build/index.js`.
*  The project uses cron job scheduling to repeatedly validate NOIP's records for the IP's of the domains you host with them.
