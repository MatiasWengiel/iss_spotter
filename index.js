const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes} = require('./iss')
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  console.log(passTimes)
})
// fetchCoordsByIP('24.76.174.146', (error, coord) => {
//   if (error) {
//     console.log("It didn't work! ", error);
//     return;
//   }

//   console.log('It worked! Returned coord', coord);
// });
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP: ', ip);
// });
