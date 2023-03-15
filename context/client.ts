import axios, { AxiosInstance } from 'axios';
import {
  ListModelsResponse,
  ListFineTunesResponse,
  CreateFineTuneRequest,
  ListFineTuneEventsResponse,
  FineTune,
  ListFilesResponse,
  DeleteFileResponse,
  OpenAIFile,
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
    this.axios.post('/v1/fine-tunes', body).then((res) => res.data);

  public listFineTunes = () =>
    this.axios.get<ListFineTunesResponse>('/v1/fine-tunes').then((res) => res.data);

  public listFineTuneEvents = (fineTuneId: string) =>
    this.axios
      .get<ListFineTuneEventsResponse>(`/v1/fine-tunes/${fineTuneId}/events`)
      .then((res) => res.data);

  public cancelFineTune = (fineTuneId: string) =>
    this.axios.post<FineTune>(`/v1/fine-tunes/${fineTuneId}/cancel`).then((res) => res.data);

  public listFiles = () => this.axios.get<ListFilesResponse>('/v1/files').then((res) => res.data);

  public createFile = (dto: { file: File; purpose: string }) => {
    const formData = new FormData();
    formData.append('file', dto.file);
    formData.append('purpose', dto.purpose);
    return this.axios.post<OpenAIFile>('/v1/files', formData).then((res) => res.data);
  };

  public retrieveFile = (fileId: string) =>
    this.axios.get<string>(`/v1/files/${fileId}`).then((res) => res.data);

  public deleteFile = (fileId: string) =>
    this.axios.delete<DeleteFileResponse>(`/v1/files/${fileId}`).then((res) => res.data);
}
