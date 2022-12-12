import Axios from "axios";
import { message } from "ant-design-vue";

export const baseUrl = "http://localhost:3000";

export const service = Axios.create({});

export async function request(config) {
  const headers = {
    ...config.headers,
  };

  const data = await service.request({
    ...config,
    baseURL: config.baseURL,
    headers,
  });
  return data;
}
