const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=4d862900-c25f-11ec-8bac-c52bfff9dffd`);
};

const fetchISSFlyOverTimes = (body) => {
  const latitude = JSON.parse(body).latitude;
  const longitude = JSON.parse(body).longitude;
  
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;
    });
};
module.exports = { nextISSTimesForMyLocation };