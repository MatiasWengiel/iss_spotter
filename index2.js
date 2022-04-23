const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = (passTimes) => {
  for (let eachTime of passTimes) {
    const date = new Date(eachTime.risetime * 1000); //Time provided in passTimes is in seconds from 01/01/70 rather than ms
    console.log(`Next pass at ${date}, for ${eachTime.duration} seconds`);
  }
   
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work! ", error.message);
  });





