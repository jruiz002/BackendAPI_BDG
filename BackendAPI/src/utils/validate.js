'use strict'

exports.dataObligatory = async (data) => {
    let keys = Object.keys(data);
    let msg = '';
    
    for(let key of keys){
        if(data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
            msg += `The param ${key} is required \n`;
    }
    return msg.trim();
}