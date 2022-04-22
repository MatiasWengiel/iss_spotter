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

const fetchISSFlyOverTimes = (coordinates, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (error, response, body) => {
    if (error) {
      console.log("It didn't work!", error)
      return
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
    }
    const flyOverTimes = JSON.parse(body).response
    callback(null, flyOverTimes);
  })
}

const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    console.log('It worked! Returned IP: ', ip);
    const ipOut = ip
    
    fetchCoordsByIP(ipOut, (error, coord) => {
      if (error) {
        console.log("It didn't work! ", error);
        return;
      }

      const coordinates = coord;
      console.log(coordinates.latitude, coordinates.longitude);

      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
        if (error) {
          console.log("It didn't work!", error)
        }

        callback(null, passTimes)

      })
      
    });
    
  });

};
module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
  };