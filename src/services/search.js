import axios from "axios";

export function NewSearch(params) {
  const request = {
      url: "/sites/MLU/search",
      method: "get",
      baseURL: "https://api.mercadolibre.com",
      params: params
  };
  return axios(request);
}


