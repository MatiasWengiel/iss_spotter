const { nextISSTimesForMyLocation } = require('./iss');

const dateify = (dateInSeconds) => {
  return new Date(dateInSeconds * 1000);
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  for (let eachTime of passTimes) {
    console.log(`Next pass at ${dateify(eachTime.risetime)}, for ${eachTime.duration} seconds`);
  }

});