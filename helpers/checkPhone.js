let AreaCodes = require('areacodes');

export async function checkAreaCode(phone) {
    let areaCodes = new AreaCodes();
    const onlyNum = phone.replace(/\D/g, '');

    let isValid = true;
                
    await areaCodes.get(onlyNum, function( err, data ) {
        if(err) {
            isValid = false;
        }
    });

    return isValid;
}