import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpMethods {
    get: (path: string, config?: AxiosRequestConfig) => Promise<AxiosResponse>;
    post: (
        path: string,
        data: any,
        config?: AxiosRequestConfig
    ) => Promise<AxiosResponse>;
    put: (
        path: string,
        data: any,
        config?: AxiosRequestConfig
    ) => Promise<AxiosResponse>;
    delete: (
        path: string,
        config?: AxiosRequestConfig
    ) => Promise<AxiosResponse>;
}

export class HttpImplementation implements HttpMethods {
  basePath: string;

  constructor (basepath: string) {
    this.basePath = basepath;
  }

  async get (path: string, config?: AxiosRequestConfig) {
    return await axios.get(`${this.basePath}${path}`, config);
  }

  async post (path: string, data: any, config?: AxiosRequestConfig) {
    return await axios.post(`${this.basePath}${path}`, data, config);
  }

  async put (path: string, data: any, config?: AxiosRequestConfig) {
    return await axios.put(`${this.basePath}${path}`, data, config);
  }

  async delete (path: string, config?: AxiosRequestConfig) {
    return await axios.delete(`${this.basePath}${path}`, config);
  }
}
