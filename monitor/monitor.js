let schema = {
    "name": "Login event",
    "dimensions": {
      "appname": {
        "name": "appname",
        "isNull": "Null Not Allowed",
        "required": "Required",
        "datatype": "String",
        "keyName": "appname",
        "children": {}
      },
      "address": {
        "name": "address",
        "isNull": "Null Not Allowed",
        "required": "Optional",
        "datatype": "Object",
        "keyName": "address",
        "children": {
          "address.street": {
            "name": "street",
            "isNull": "Null Allowed",
            "required": "Required",
            "datatype": "String",
            "keyName": "address.street",
            "children": {}
          },
          "address.city": {
            "name": "city",
            "isNull": "Null Allowed",
            "required": "Optional",
            "datatype": "String",
            "keyName": "address.city",
            "children": {}
          }
        }
      },
      "friends": {
        "name": "friends",
        "isNull": "Null Allowed",
        "required": "Required",
        "datatype": "array of object",
        "keyName": "friends",
        "children": {
          "friends.$.fname": {
            "name": "fname",
            "isNull": "Null Allowed",
            "required": "Required",
            "datatype": "String",
            "keyName": "friends.$.fname",
            "children": {}
          },
          "friends.$.age": {
            "name": "age",
            "isNull": "Null Not Allowed",
            "required": "Required",
            "datatype": "Number",
            "keyName": "friends.$.age",
            "children": {}
          }
        }
      },
      "list": {
        "name": "list",
        "isNull": "Null Allowed",
        "required": "Required",
        "datatype": "array of array",
        "keyName": "list",
        "children": {
          "list.$": {
            "name": "$",
            "isNull": "Null Allowed",
            "required": "Required",
            "datatype": "array of array",
            "keyName": "list.$",
            "children": {
              "list.$.$": {
                "name": "$",
                "isNull": "Null Allowed",
                "required": "Required",
                "datatype": "array of string",
                "keyName": "list.$.$",
                "children": {}
              }
            }
          }
        }
      },
    //   "hobbies": {
    //     "name": "hobbies",
    //     "isNull": "Null Allowed",
    //     "required": "Required",
    //     "datatype": "Array",
    //     "keyName": "hobbies",
    //     "children": {}
    //   }
    }
  }

let test1 = {
    "appname": '14124',
    "address": {
        "city": 24,
        'afasdf':'d'
    },
    "friends": [{'fname':'asdfdas', 'age':323}, {'fname':'asdfdas', 'age':323}],
    "list":[[ ['adsfa'], 234], [ ['adsfa']]]
    //"hobbies":["adsf"]
}


function monitor(schema, eventObj, errorType) {

    function violationHandler(violationLog, int, key, additionalString){
            if (!violationLog.hasOwnProperty(errorType[int])) {
                violationLog[errorType[int]] = new Set()
            }
            violationLog[errorType[int]].add(key+additionalString)
    }

    function recurse(schema, eventObj, violationLog, path, arrayType) {
        let isNullAllowed = (s) => s == "Null Allowed" ? true : false
        let isRequired = (s) => s == "Required" ? true : false
        let capitalize=(v)=>v.charAt(0).toUpperCase() + v.slice(1);
        let returnTypeData = (value) => (Array.isArray(value)) ? 'Array' : capitalize(typeof value)
        let keyExists = (obj, key) => obj.hasOwnProperty(key)
        let handleArrayType=(datatype)=>datatype.split(' ')[0]=='array'?'Array':datatype

        if(arrayType){
        //     console.log(arrayType)         
            for(let index in eventObj){
                if(eventObj[index]==null||returnTypeData(eventObj[index])!=arrayType){
                    violationHandler(violationLog, 2, path, '.'+returnTypeData(eventObj[index]))
                }
            }
            if(arrayType=='Object'){
                for(let index in eventObj){
                if(eventObj[index]!=null && returnTypeData(eventObj[index])=='Object'){
                recurse(schema, eventObj[index], violationLog, path, false)
                    }
                }
            } else if(arrayType=='Array'){
                let key=Object.keys(schema)[0]
                for(let index in eventObj){
                    if(eventObj[index]!=null && returnTypeData(eventObj[index])=='Array'){
                        recurse(schema[key].children, eventObj[index], violationLog, key+'.$', capitalize(schema[key]["datatype"].split(' ')[2]))
                    }
                }
            }
        }
        else{
            for (let key in schema) {
                let k = schema[key].name

                if (isRequired(schema[key].required) && !keyExists(eventObj, k)) {
                    // console.log(eventObj)
                    // console.log(k)
                    violationHandler(violationLog, 0, key, '')
                }

                if (keyExists(eventObj, k)) {
                    if (eventObj[k] == null && !isNullAllowed(schema[key].isNull)) {
                        violationHandler(violationLog, 1, key)
                    }
                    else if (eventObj[k] != null && handleArrayType(schema[key]["datatype"]) != returnTypeData(eventObj[k])) {
                        violationHandler(violationLog, 2, key, '.'+returnTypeData(eventObj[k]))
                    }
                    else if (schema[key]["datatype"] == 'Object') {
                        recurse(schema[key].children, eventObj[k], violationLog, key, false)
                    } else if(handleArrayType(schema[key]["datatype"]) == 'Array'){
                        recurse(schema[key].children, eventObj[k], violationLog, key+'.$', capitalize(schema[key]["datatype"].split(' ')[2]))
                    }
                }
            }
            
            for (let k in eventObj) {
                let key = (path == '') ? k : path + '.' + k
                if (!keyExists(schema, key)) {
                    violationHandler(violationLog, 3, key, '')
                }
            }
        }
    }
    let err = {}
    recurse(schema.dimensions, eventObj, err, '', false)
    for(let k in err){
        err[k] = Array.from(err[k]);
    }
    return err
}

let errorType = Object.freeze({
    0: "requiredKeyDoesNotExist",
    2: "invalidDataType",
    1: "nullValue",
    3: "keyNotDefined"
})

console.log(monitor(schema, test1, errorType))

module.exports = { monitor };