const moment = require("moment-timezone");
const AWS = require("aws-sdk");

module.exports = { getCurrQuarterTs, syncToS3 };

/**
 * Returns the start ts of current quarter of hour
 * @returns 
 */
async function getCurrQuarterTs(ts) {
    if (!(ts && new Date(ts).getTime()))
        ts = Date.now();

    let timeToReturn = new Date(ts);
    timeToReturn.setMilliseconds(Math.floor(timeToReturn.getMilliseconds() / 1000) * 1000);
    timeToReturn.setSeconds(Math.floor(timeToReturn.getSeconds() / 60) * 60);
    timeToReturn.setMinutes(Math.floor(timeToReturn.getMinutes() / 15) * 15);
    return timeToReturn.getTime();
}

/**
 * Sync the data to S3
 * @param {*} key 
 * @param {*} obj 
 */
async function syncToS3(key, obj) {
    return true;
}

module.exports = { getCurrQuarterTs };