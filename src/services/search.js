import axios from "axios";

export function NewSearch(url_params, body) {
  /*const request = {
      url: "/sites/MLU/search",
      method: "get",
      baseURL: "https://api.mercadolibre.com",
      params: params
  };
  */
 //alq-20000
 //
  const request = {
    url: url_params+"/_search",
    method: "post",
    baseURL: "http://localhost:9200",
    data: body,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
};

  console.log(request);
  return axios(request);
}


