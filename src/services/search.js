import axios from "axios";

export function NewSearch(input, body) {
  
  const url_params = "alq-20000/_search"
  const request = {
      url: url_params,
      method: "post",
      baseURL: "http://localhost:9200",
      body: body,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Length, Content-Type, Authorization, Accept',
        'Access-Control-Allow-Credentials': true,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'

      }
  };
  console.log(request);
  return axios(request);
}


