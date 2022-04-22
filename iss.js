const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) =>  {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const data = JSON.parse(body);
    const ip = data.ip;
    callback(null, ip);

  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://api.freegeoip.app/json/${ip}?apikey=4d862900-c25f-11ec-8bac-c52bfff9dffd`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
    }

    const data = JSON.parse(body);
    const coordinates = {latitude: data.latitude, longitude: data.longitude};
    callback(null, coordinates);
  });
};

const nextISSTimesForMyLocation = (callback) => {

}
module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  nextISSTimesForMyLocation };