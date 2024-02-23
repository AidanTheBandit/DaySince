const axios = require('axios');
const cron = require('node-cron');

const url = "https://barkle.chat/api/";
const key = "Bearer KEY";

const get = async() => {
    const response = await axios.post(`${url}i`, {
    }, {
        headers: {
            'authorization': key,
        },
    });
    let days = 1 + parseInt(response.data.fields[0].value, 10);
    let daysString = days.toString();
    update(daysString);

}

const update = async(days) => {

    const response = await axios.post(`${url}i/update`, {
        "fields": [
            {
              "name": "Days since last issue:",
              "value": days
            }],
    }, {
        headers: {
            'authorization': key,
        },
    });
}
cron.schedule ('5 15 * * *', () => {
    get (); // run the get function every day at 3:05 PM EST
  });