const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/c0f3d57cc2a79bd6f3cdda4c9deae8a9/'+ latitude + ','+ longitude + '?units=si&lang=pt'

    request({ url, json:true }, (error, {body})=>{
        if (error) {
            callback('Não foi possível conectar meu querido', undefined)
        } else if (body.error){
            callback('Cadê tu istepó, assim fica foda de te achar po', undefined)
        } else{
            callback(undefined, body.daily.data[0].summary + ' No momento são ' + body.currently.temperature + ' graus. Temos uma chance de ' + body.currently.precipProbability + '% de chuva.')
        }
    })

}

module.exports = forecast