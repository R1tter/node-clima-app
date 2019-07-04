const request = require('request')
const geocode = (adress, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoicjF0dGVyIiwiYSI6ImNqeG1sdWVqZTA1OWkzY3FraHlwMGsyZnUifQ.CWbr4ZlDLdnIa8gLT5SZRA&language=pt-br'

    request({url, json:true}, (error, {body})=>{
        if (error) {
            callback('Nào foi possível conectar no sistema de localização! ', undefined)
        } else if(body.features.length === 0) {
            callback('Tás perdido irmão, ninguém te acha... Tenta de novo ai!')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
