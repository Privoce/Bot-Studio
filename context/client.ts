import axios, { AxiosInstance } from 'axios';
import {
  ListModelsResponse,
  ListFineTunesResponse,
  CreateFineTuneRequest,
  ListFineTuneEventsResponse,
} from 'openai';
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

  public createFineTune = (body: CreateFineTuneRequest) =>
    this.axios.post('/v1/fine-tunes/', body).then((res) => res.data);

  public listFineTunes = () =>
    this.axios.get<ListFineTunesResponse>('/v1/fine-tunes').then((res) => res.data);

  public listFineTuneEvents = (fineTuneId: string) => {
    console.log('id: ', fineTuneId);
    return this.axios
      .get<ListFineTuneEventsResponse>(`/v1/fine-tunes/${fineTuneId}/events`)
      .then((res) => res.data);
  };
}
