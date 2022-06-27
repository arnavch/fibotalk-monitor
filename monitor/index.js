const { json } = require('body-parser');
const express = require('express');
const redis = require('redis');
const { monitor } = require("./monitor.js");
const { logViolations, eventMapper, logEvent } = require("./newmapper.js");
const { mapper } = require("./mapper.js");
const { getCurrQuarterTs } = require("../utils/lib.js");

const client = redis.createClient();
const app = express();

const PORT = 3000;


// let s={
//     "name": "Login event",
//     "dimensions": {
//         "appname": {
//             "name": "appname",
//             "isNull": "Null Not Allowed",
//             "required": "Required",
//             "datatype": "Number",
//             "keyName": "appname",
//             "children": {}
//         },
//         "address": {
//             "name": "address",
//             "isNull": "Null Not Allowed",
//             "required": "Optional",
//             "datatype": "Object",
//             "keyName": "address",
//             "children": {
//                 "address.m": {
//                     "name": "m",
//                     "isNull": "Null Allowed",
//                     "required": "Required",
//                     "datatype": "Object",
//                     "keyName": "address.m",
//                     "children": {
//                       "address.m.mm": {
//                         "name": "mm",
//                         "isNull": "Null Allowed",
//                         "required": "Optional",
//                         "datatype": "String",
//                         "keyName": "address.m.mm",
//                         "children": {}
//                       }
//                     }
//                   },
//                 "address.city": {
//                     "name": "city",
//                     "isNull": "Null Allowed",
//                     "required": "Optional",
//                     "datatype": "Array",
//                     "keyName": "address.city",
//                     "children": {}
//                 },
//                 "address.street": {
//                     "name": "street",
//                     "isNull": "Null Not Allowed",
//                     "required": "Required",
//                     "datatype": "String",
//                     "keyName": "address.street",
//                     "children": {}
//                 }
//             }
//         }
//     }
// }

let errorType = Object.freeze({
  0: "requiredKeyDoesNotExist",
  2: "invalidDataType",
  1: "nullValue",
  3: "keyNotDefined"
})



// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Homme page
app.get('/', (req, res) => {
  return res.send("<h1 style='text-align: center;'>Hello,<br />from the Express.js server!</h1>");
})


app.post('/monitor', async (req, res) => {
  let data = req.body.data;
  let gid = (req.body.gid)
  let planId = (req.body.planid)
  let eventName = null
  let type = req.body.type
  let key = ''
  let endKey=''
  let platform='segment'
  if (type == 'user') {
    endKey=`:user`
    key = `${gid}:${planId}:user`
  }
  else if (type == 'group') {
    endKey=`:group`
    key = `${gid}:${planId}:group`
  }
  else if (type == 'event') {
    endKey=`:event:${eventName}`
    eventName = req.body.name
    key = `${gid}:${planId}:event:${eventName}`
  }
  else {
    return res.json({ status: 400, body: "incorrect type" })
  }

  let validation = (value) => (value != null && value != undefined)

  if (!(validation(data) && validation(gid) && validation(planId) && (type != 'event' || validation(eventName)))) {
    return res.json({ status: 400, body: "incorrect input data" })
  }


  await client.connect()

  console.log(key, await client.exists(key));
  if (await client.exists(key) != 1) {
    console.log("schema does not exist");
    await client.quit()
    return res.json({ status: 400, body: "schema does not exist" });
  }
  else {
    let schemaData = await client.get(key)

    if (!schemaData) {
      console.log("schema is null")
      await client.quit()
      return res.json({ status: 400, body: "schema is null" });
    }

    try {
      let schema = JSON.parse(schemaData)
      let mappedEvent = eventMapper(data)
      //trafficlog:gid:platform:event name: ts
      let logKey = `trafficLog:` + `${gid}:${platform}`  + endKey + ':' + await getCurrQuarterTs()
      await logEvent(client, mappedEvent, logKey)
      let violationLog = (monitor(schema, data, errorType))

      if (typeof violationLog !== 'undefined' && Object.keys(violationLog).length === 0) {
        console.log('no errors')
      }
      else {

        console.log(violationLog)
        logkey = `violations:` + key + ':' + await getCurrQuarterTs()
        await logViolations(client, violationLog, logkey)
        // for(let i in violationLog){
        //   let errMessg=violationLog[i]
        //   await client.lPush(key+`:${i}`, errMessg)
        // }
      }
    } catch (e) {
      console.log(e)
      await client.quit()
      return res.json({ status: 400, body: "error in event processing" });
    }
  }
  await client.quit()
  res.json(req.body);
});


app.post('/setschema', async (req, res) => {
  let originalSchema = req.body;
  let gid = (req.body.gid)
  let planId = (originalSchema.planID)

  let newSchema = mapper(originalSchema)
  await client.connect()
  for (let i in newSchema.events) {
    let eventSchema = newSchema.events[i]
    await client.set(`${gid}:${planId}:event:${eventSchema.name}`, JSON.stringify(eventSchema))
  }
  if (newSchema.hasOwnProperty('user')) {
    await client.set(`${gid}:${planId}:user`, JSON.stringify(newSchema.user))
  }
  if (newSchema.hasOwnProperty('group')) {
    await client.set(`${gid}:${planId}:group`, JSON.stringify(newSchema.group))
  }
  await client.quit()
  console.log(JSON.stringify(newSchema, 2, 2))
  res.json(req.body);
});



// 404 page
app.use((req, res, next) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.sendFile(__dirname + '/error404.html');
    return;
  }
  // respond with json
  else if (req.accepts('json')) {
    res.send({
      status: 404,
      error: 'Not found'
    });
    return;
  }
  // respond with text
  else {
    res.type('txt').send('Error 404 - Not found');
  }
});

// Listening to the port
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});