import axios, { AxiosInstance } from 'axios';
import { ListModelsResponse } from 'openai';
import { hasText } from '../utils/string';

export class OpenAIApi {
  private readonly axios: AxiosInstance;

  private readonly apiKey: string;

  public readonly enabled: boolean;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.enabled = hasText(apiKey);
    this.axios = axios.create({
      baseURL: 'https://api.openai.com/',
      headers: { Authorization: `Bearer ${apiKey}` },
    });
  }

  public listModels = () =>
    this.axios.get<ListModelsResponse>('/v1/models').then((res) => res.data);

  public deleteModel = (id: string) =>
    this.axios.delete(`/v1/models/${id}`).then((res) => res.data);
}
