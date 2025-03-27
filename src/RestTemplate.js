// import axios from "axios";

// export default class RestTemplate {

//   makeHeader = (headers) => {
//     var headersMade = headers;
//     if(headersMade===undefined || headersMade===null) {
//         headersMade = {};
//     }

//     headersMade = {
//       ...headersMade,
//       "Content-Type": 'application/json;charset=UTF-8',
//       "Accept": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     }
//     return headersMade;
//   }

//   get = (url, onResponse, headers=new Map(), withHeader=false) => {
//     var headersMade=this.makeHeader(headers);
//     axios.get(url, {
//         headers: headersMade,
//     }).then(response => {
//         if(onResponse!==undefined) {
//           onResponse(response.data, undefined);
//         }
//     }).catch( error => {
//       console.error(error.message);
//       onResponse({}, error)
//     });
//   }

//   post = (url, body, onResponse, headers=new Map(), withHeader=false) => {
//     var headersMade=this.makeHeader(headers);
//     axios.post(url, body, {
//       headers: headersMade,
//     }).then(response => {
//       if(onResponse!==undefined) {
//         onResponse(response.data, undefined);
//       }
//     }).catch( error => {
//       console.error(error.message);
//       onResponse({}, error)
//     });
//   }
// }

// const restTemplate = new RestTemplate();

// export const createRestTemplate = () => {
//   return restTemplate;
// }