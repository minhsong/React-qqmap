var convert = require('convert-units')
function toHumanFormat(time) {
    /***
     * obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    }*/
    var mins = time.m + " min", hours = time.h + " hour";
    if (time.m > 1) mins = time.m + " mins";
    if (time.h > 1) hours = time.h + " hours";
    if (time.h > 0) return hours + " " + mins;
    return mins;
}
function secondsToTime(secs) {
    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}
export const QQUltis = {
    geocodeAddress: (address, _callback)=>{
        if(!address) return;
        let geoCode = new window.qq.maps.Geocoder();
        geoCode.setComplete(function(result) {
            result.detail.location.city = result.detail.addressComponents.city;
            _callback(null, result.detail.location, result)
        });
    
        geoCode.setError(function(result) {
            console.warn('Can not reserver geocode: ',address, result);
            _callback(result,false);
        });
    
        geoCode.getLocation(address);
    },
    
    reserverGeoCodeAdress: (latLng, _callback)=>{
        let geoCode = new window.qq.maps.Geocoder();
        geoCode.setComplete(function(result) {
            result.detail.location.city = result.detail.addressComponents.city;
            _callback({formatted_address:result.detail.address},result.detail.location)
        });
    
        geoCode.setError(function(result) {
            _callback(false,latLng);
        });
    
        geoCode.getAddress(latLng);
    },
    getMinWayFromTencentResults:(result, vehicleType, unit)=> {
        var distance = 0, duration = 0;
        if (result != null){
            var minDistance = 0, minDuration = 0;
            for (var i = 0; i < result.routes.length; i++) {
                let route = result.routes[i];
                minDistance = route.distance;
                minDuration = route.duration;
                if (distance == 0 || distance > minDistance) {
                    distance = minDistance;
                    duration = minDuration;
                } else if (distance == minDistance && duration > minDuration) {
                    duration = minDuration;
                }
                minDistance = 0;
                minDuration = 0;
            }
        }
        duration = duration * 60;
        var ggFactor = (vehicleType && vehicleType.googleETAFactor) ? vehicleType.googleETAFactor : 1;
        return {
            distance: {
                value: distance,
                text: Math.round(convert(distance).from('m').to(unit)*10)/10 + ' ' +unit
            },
            duration: {
                value: Math.floor(duration * ggFactor),
                text: toHumanFormat(secondsToTime(Math.floor(duration * ggFactor)))
            }
        }
    },
    PolylineDecompression:(coors)=>{
        for(var i = 2; i < coors.length ; i++){
            {coors[i] = coors[i-2] + coors[i]/1000000}
        }
        let result = []
        for(var i = 0; i < coors.length ; i+=2){
            result.push(new window.qq.maps.LatLng(coors[i],coors[i+1]))
        }
        return result;
    },
    fullAddressGeocode: (place)=>{
        var name;
        if(place.name){
            name = place.name.replace('[','').replace(']','');
            if(place.address){
                name = place.address + name;
            }
            return name;
        }
        return null;
    }
}
