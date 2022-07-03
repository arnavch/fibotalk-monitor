/* let data = {
    "events": [
        {
            "name": "Login event",
            "eventGUI": "ap-e8-dr",
            "creator": "dummy local user",
            "editor": "dummy local user",
            "startTime": 1655704880201,
            "editTime": 1655704880201,
            "desc": "",
            "dimensions": [
                {
                    "name": "appname",
                    "desc": "",
                    "isNull": "Null Not Allowed",
                    "required": "Required",
                    "datatype": "String",
                    "parentChildKey": "1:0",
                    "parentChildPrefix": "",
                    "expanded": true,
                    "keyName": "appname",
                    "creator": "dummy local user",
                    "editor": "dummy local user",
                    "startTime": 1655704929697,
                    "editTime": 1655704929697
                },
                {
                    "name": "address",
                    "desc": "",
                    "isNull": "Null Not Allowed",
                    "required": "Optional",
                    "datatype": "Object",
                    "parentChildKey": "2:0",
                    "parentChildPrefix": "",
                    "expanded": false,
                    "keyName": "address",
                    "creator": "dummy local user",
                    "editor": "dummy local user",
                    "startTime": 1655705047057,
                    "editTime": 1655705047057
                },
                {
                    "name": "street",
                    "desc": "",
                    "isNull": "Null Allowed",
                    "required": "Optional",
                    "datatype": "String",
                    "parentChildKey": "2:0:1",
                    "parentChildPrefix": "address.",
                    "expanded": true,
                    "keyName": "address.street",
                    "creator": "dummy local user",
                    "editor": "dummy local user",
                    "startTime": 1655705047057,
                    "editTime": 1655705047057
                },
                {
                    "name": "m",
                    "desc": "",
                    "isNull": "Null Allowed",
                    "required": "Optional",
                    "datatype": "Object",
                    "parentChildKey": "2:0:1",
                    "parentChildPrefix": "address.",
                    "expanded": true,
                    "keyName": "address.m",
                    "creator": "dummy local user",
                    "editor": "dummy local user",
                    "startTime": 1655705047057,
                    "editTime": 1655705047057
                },
                {
                    "name": "mm",
                    "desc": "",
                    "isNull": "Null Allowed",
                    "required": "Optional",
                    "datatype": "String",
                    "parentChildKey": "2:0:1",
                    "parentChildPrefix": "address.",
                    "expanded": true,
                    "keyName": "address.m.mm",
                    "creator": "dummy local user",
                    "editor": "dummy local user",
                    "startTime": 1655705047057,
                    "editTime": 1655705047057
                },
                {
                    "name": "city",
                    "desc": "",
                    "isNull": "Null Allowed",
                    "required": "Optional",
                    "datatype": "String",
                    "parentChildKey": "2:0:2",
                    "parentChildPrefix": "address.",
                    "expanded": true,
                    "keyName": "address.city",
                    "creator": "dummy local user",
                    "editor": "dummy local user",
                    "startTime": 1655705047057,
                    "editTime": 1655705047057
                }
            ]
        }
    ],
    "user": [
        {
            "name": "name",
            "desc": "",
            "isNull": "Null Not Allowed",
            "required": "Required",
            "datatype": "String",
            "parentChildKey": "1:0",
            "parentChildPrefix": "",
            "expanded": true,
            "keyName": "name",
            "creator": "dummy local user",
            "editor": "dummy local user",
            "startTime": 1655705083178,
            "editTime": 1655705083178
        },
        {
            "name": "role",
            "desc": "",
            "isNull": "Null Allowed",
            "required": "Optional",
            "datatype": "String",
            "parentChildKey": "2:0",
            "parentChildPrefix": "",
            "expanded": true,
            "keyName": "role",
            "creator": "dummy local user",
            "editor": "dummy local user",
            "startTime": 1655705110068,
            "editTime": 1655705110068
        }
    ],
    "group": [
        {
            "name": "companyname",
            "desc": "",
            "isNull": "Null Not Allowed",
            "required": "Required",
            "datatype": "String",
            "parentChildKey": "1:0",
            "parentChildPrefix": "",
            "expanded": true,
            "keyName": "companyname",
            "creator": "dummy local user",
            "editor": "dummy local user",
            "startTime": 1655705134803,
            "editTime": 1655705134803
        },
        {
            "name": "companyid",
            "desc": "",
            "isNull": "Null Not Allowed",
            "required": "Optional",
            "datatype": "Number",
            "parentChildKey": "2:0",
            "parentChildPrefix": "",
            "expanded": true,
            "keyName": "companyid",
            "creator": "dummy local user",
            "editor": "dummy local user",
            "startTime": 1655705163578,
            "editTime": 1655705163578
        }
    ],
    "IsLatest": true,
    "planID": "pp9t-61ro-8w72"
}



function schemaMapper(originalSchema) {
    let mappedKeys = {}
    let returnTypeData = (value) => (Array.isArray(value)) ? 'Array' : (typeof value).charAt(0).toUpperCase() + (typeof value).slice(1);

    function arrayToObject(dimensions, originalDimentions) {
        for (let j in originalDimentions) {
            dimensions[originalDimentions[j].keyName] = originalDimentions[j]
        }
    }

    let schema = {}

    //events
    schema.events = {}
    for (let i in originalSchema.events) {
        schema.events[originalSchema.events[i].name] = {
            "name": originalSchema.events[i].name,
            "dimensions": {}
        }
        let dimensions = schema.events[originalSchema.events[i].name].dimensions
        let originalDimentions = originalSchema.events[i].dimensions
        arrayToObject(dimensions, originalDimentions)
    }
    //user
    schema.user = {
        "dimensions": {}
    }
    let userDimensions = originalSchema.user
    arrayToObject(schema.user.dimensions, userDimensions)

    //group
    schema.group = {
        "dimensions": {}
    }
    let groupDimensions = originalSchema.group
    arrayToObject(schema.group.dimensions, groupDimensions)

    return schema
}*/


function eventMapper(object) {
    let mappedKeys = {}
    let returnTypeData = (value) => value == null ? 'null' : (Array.isArray(value)) ? 'Array' : (typeof value).charAt(0).toUpperCase() + (typeof value).slice(1);

    function recurse(curObj, path) {
        if (returnTypeData(curObj) == 'Object') {
            for (let i in curObj) {
                let key = path == '' ? i : path + '.' + i
                // mappedKeys[key]=mappedKeys[key]||[null, false]
                // mappedKeys[key][0] = returnTypeData(curObj[i])
                mappedKeys[key]= returnTypeData(curObj[i])
                // if(mappedKeys[key]=='null'){
                //     mappedKeys[key]+=" true"
                // }
                if (returnTypeData(curObj[i]) == 'Object' || returnTypeData(curObj[i]) == 'Array') {
                    recurse(curObj[i], key)
                }
            }
        }
        else if (returnTypeData(curObj) == 'Array') {
            for (let i in curObj) {
                let key = path == '' ? i : path + '.$'
                mappedKeys[key]= returnTypeData(curObj[i])
                if (returnTypeData(curObj[i]) == 'Object' || returnTypeData(curObj[i]) == 'Array') {
                    recurse(curObj[i], key)
                }
            }
        }
    }
    recurse(object, '')
    return mappedKeys
}

async function logEvent(client, mappedKeys, key) {
    await client.incr(key+':count')
    for (let i in mappedKeys) {
        let result = await client.hIncrBy(key, i, 1)
    }
    return true
}

async function logViolations(client, violations, key, event, queKey) {
    for (let i in violations) {
        violationQue(client, queKey+':'+i, event)
        await client.incr(key+':'+ i+':count')
        let list = violations[i]
        for(let j in list){
            let newKey=key+':'+list[j]
            let result = await client.hIncrBy(newKey, i, 1)
            await client.expire(newKey, 35 * 60);
        }
    }
}

// async function ViolationQue1(client, key, event){
//     let queSize=20
//     async function incCurrentNumber(){
//         let curNum=await client.incr(key)
//         if(curNum>=queSize){
//             await client.set(key, 0)
//             curNum=0
//         }
//         return curNum
//     }
//     async function setEvent(count){
//         return await client.set(key+':'+count, JSON.stringify(event))
//     }
//     // function getBottomEvent(curNum){
//     //     if(curNum/queSize>1){
//     //         return curNum%queSize
//     //     }
//     //     return false
//     // }
//     let count= await incCurrentNumber()
//     let result= await setEvent(count)
// }


// async function violationQue2(client, key, event){
//     let queSize=20
//     async function incCurrentNumber(){
//         return await client.incr(key)
//     }
//     async function setEvent(count){
//         return await client.set(key+':'+count, JSON.stringify(event))
//     }
//     function getBottomEvent(curNum){
//         if(curNum-queSize>0){
//             return curNum-queSize
//         }
//         return false
//     }
//     let count= await incCurrentNumber()
//     let deleteCount=getBottomEvent(count)
//     if(deleteCount!=false){
//         await client.delete(key+':'+deleteCount)
//     }
//     let result= await setEvent(count)
// }


async function violationQue(client, key, event){
    let queSize=20
    async function getListSize(){
        return await client.llen(key)
    }
    async function setEvent(){
        if(getListSize()>=queSize){
            await client.lpop(key)
        }
        await client.rpush(key, JSON.stringify(event))
    }
    setEvent()
}

let obj={
    'asdf':{
        'adsfdasf':null,
        'adfdasf':{'asf': 343},
        'li':['asfdasdf']
    }
}


console.time('codezup')

for(let i=0;i<999;i++){
eventMapper(obj)
}

console.timeEnd('codezup')

module.exports = { logViolations, eventMapper, logEvent, violationQue};