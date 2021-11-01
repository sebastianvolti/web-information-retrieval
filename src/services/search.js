import axios from "axios";

export function NewSearch(url_params, body) {
  const request = {
      url: url_params,
      method: "post",
      baseURL: "http://localhost:9200",
      body: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
  };
  console.log(request);
  return axios(request);
}


