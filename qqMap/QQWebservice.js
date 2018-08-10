import "isomorphic-fetch";

export function UrlBuilder(url, options) {
    let esc = encodeURIComponent;
    let query = Object.keys(options)
      .map(k => k + '=' + options[k])
      .join('&');
    url += '?' + query;
    return url;
}
const WebserviceAPIs = {
    drivingRouteApi: 'http://apis.map.qq.com/ws/direction/v1/driving/',
    distanceApis:'Http://apis.map.qq.com/ws/distance/v1/'
}
export const QQWebservice = {
    DrivingRoute:(key,points,policy)=>{
        if(!key){
            console.warn('Tencent Api key is required!');
            return null;
        }
        if(points.length<2){
            console.warn('From and To are required!');
            return null;
        }else{
            let waypoints = points.splice(1,points.length-2).map(pos=>{
                return pos.lat+','+pos.lng;
            })
            let options = {
                from: points[0].lat +','+points[0].lng,
                Policy: policy,
                to:points[points.length-1].lat +','+points[points.length-1].lng,
                key:key
              }
              if(waypoints && waypoints.length>0){
                options.waypoints = waypoints;
              }
            return UrlBuilder(WebserviceAPIs.drivingRouteApi,options)
        }
        
    },
    DistanceMatrix: (key,from, destinations,mode)=>{
        if(!key){
            console.warn('Tencent Api key is required!');
            return null;
        }
        if(!from){
            console.warn('From is required!');
            return null;
        }
        if(!destinations && destinations.length>0){
            console.warn('Destinations is required!');
            return null;
        }
        let options = {
            key:key,
            from:from.lat +','+from.lng,
            to: destinations.map(pos=>{
                return pos.lat+','+pos.lng;
            }).join(';'),
            mode:mode
        }
        return UrlBuilder(WebserviceAPIs.distanceApis,options)
    }    
}