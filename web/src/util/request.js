import Axios from "axios";
import { message } from "ant-design-vue";

export const baseUrl = import.meta.env.SERVICE_HOST;

export const service = Axios.create({});

export async function request(config) {
  const headers = {
    ...config.headers,
  };

  const data = await service.request({
    ...config,
//
    headers,
  });
  return data;
}
