let data={
    "planName": "sample plan",
    "desc": "sample desc",
    "tags": [
        "tags 1"
    ],
    "creator": "dummy local user",
    "editor": "dummy local user",
    "startTime": 1655704802674,
    "editTime": 1655705111000,
    "status": "Offline",
    "platform": "",
    "VersionId": "gQxjSbrRhfAopxuieuNqhmMo8zeREx7Z",
    "kpis": [
        {
            "name": "kp 1",
            "desc": "kp1 desc",
            "events": [
                {
                    "name": "Login event",
                    "desc": "",
                    "eventGUI": "ap-e8-dr"
                }
            ],
            "creator": "dummy local user",
            "editor": "dummy local user",
            "startTime": 1655704839685,
            "editTime": 1655704839685
        }
    ],
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
                },
                {
                    "name": "friends",
                    "desc": "",
                    "isNull": "Null Allowed",
                    "required": "Required",
                    "datatype": "array of object",
                    "parentChildKey": "5:0",
                    "parentChildPrefix": "",
                    "expanded": false,
                    "keyName": "friends",
                    "creator": "dummy local user",
                    "editor": "dummy local user",
                    "startTime": 1656048626678,
                    "editTime": 1656048626678
                },
                {
                    "name": "list",
                    "desc": "",
                    "isNull": "Null Allowed",
                    "required": "Required",
                    "datatype": "array of array",
                    "parentChildKey": "5:0",
                    "parentChildPrefix": "",
                    "expanded": false,
                    "keyName": "list",
                    "creator": "dummy local user",
                    "editor": "dummy local user",
                    "startTime": 1656048626678,
                    "editTime": 1656048626678
                },
                {
                    "name": "listList",
                    "desc": "",
                    "isNull": "Null Allowed",
                    "required": "Required",
                    "datatype": "array of array",
                    "parentChildKey": "5:0",
                    "parentChildPrefix": "",
                    "expanded": false,
                    "keyName": "list.$",
                    "creator": "dummy local user",
                    "editor": "dummy local user",
                    "startTime": 1656048626678,
                    "editTime": 1656048626678
                },
                {
                    "name": "listListString",
                    "desc": "",
                    "isNull": "Null Allowed",
                    "required": "Required",
                    "datatype": "array of string",
                    "parentChildKey": "5:0",
                    "parentChildPrefix": "",
                    "expanded": false,
                    "keyName": "list.$.$",
                    "creator": "dummy local user",
                    "editor": "dummy local user",
                    "startTime": 1656048626678,
                    "editTime": 1656048626678
                },
                {
                    "name": "fname",
                    "desc": "",
                    "isNull": "Null Allowed",
                    "required": "Required",
                    "datatype": "String",
                    "parentChildKey": "5:0:1",
                    "parentChildPrefix": "friends.$.",
                    "expanded": true,
                    "keyName": "friends.$.fname",
                    "creator": "dummy local user",
                    "editor": "dummy local user",
                    "startTime": 1656048626678,
                    "editTime": 1656048626678
                },
                {
                    "name": "age",
                    "desc": "",
                    "isNull": "Null Not Allowed",
                    "required": "Required",
                    "datatype": "Number",
                    "parentChildKey": "5:0:2",
                    "parentChildPrefix": "friends.$.",
                    "expanded": true,
                    "keyName": "friends.$.age",
                    "creator": "dummy local user",
                    "editor": "dummy local user",
                    "startTime": 1656048626678,
                    "editTime": 1656048626678
                },
                {
                    "name": "hobbies",
                    "desc": "",
                    "isNull": "Null Allowed",
                    "required": "Required",
                    "datatype": "Array",
                    "parentChildKey": "8:0",
                    "parentChildPrefix": "",
                    "expanded": true,
                    "keyName": "hobbies",
                    "creator": "dummy local user",
                    "editor": "dummy local user",
                    "startTime": 1656048674713,
                    "editTime": 1656048674713
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
    "group": [],
    "IsLatest": true,
    "planID": "pp9t-61ro-8w72"
}


function mapper(originalSchema){
    function arrayToObject(dimensions, originalDimentions){
        for(let j in originalDimentions){
            let keyName=originalDimentions[j].keyName.split('.')
            let path=''
            let d=dimensions
            
            for(let m in keyName){
                let name=keyName[m]
                
                if(name=='$'&&originalDimentions[j-1].datatype!='array of array'){
                    // console.log(originalDimentions[j].keyName.split('.'))
                    // console.log(originalDimentions[j].datatype)
                    path+='.$'
                    continue
                }
                else{
                    path=(path=='')?name:path+'.'+name

                    
                    if(m!=keyName.length-1){
                        if(!d.hasOwnProperty(path)){
                            d[path]={
                                "name": name,
                                "isNull": null,
                                "required": null,
                                "datatype": null,
                                "keyName": path,
                                "children": {}
                            }
                        }
                    }
                    else{
                        if(!d.hasOwnProperty(path)){       
                            d[path]={
                                "name": name,
                                "isNull": originalDimentions[j].isNull,
                                "required": originalDimentions[j].required,
                                "datatype": originalDimentions[j].datatype,
                                "keyName": path,
                                "children": {}
                            }
                        }
                        else{
                            d[path].isNull=originalDimentions[j].isNull
                            d[path].required=originalDimentions[j].required
                            d[path].datatype=originalDimentions[j].datatype
                        }
                        
                    }
                }
                d=d[path].children
                }
            }
    }

    let schema={}
    
    //events
    schema.events={}
    for(let i in originalSchema.events){
        schema.events[originalSchema.events[i].name]={
            "name": originalSchema.events[i].name,
            "dimensions": {}
        }
        let dimensions=schema.events[originalSchema.events[i].name].dimensions
        let originalDimentions=originalSchema.events[i].dimensions
        arrayToObject(dimensions, originalDimentions)
        }
    //user
    schema.user={
            "dimensions": {}
        }
    let userDimensions=originalSchema.user
    arrayToObject(schema.user.dimensions, userDimensions)

    //group
    schema.group={
        "dimensions": {}
    }
    let groupDimensions=originalSchema.group
    arrayToObject(schema.group.dimensions, groupDimensions)

    return schema
}
console.log(JSON.stringify(mapper(data),2,2))

module.exports = { mapper };