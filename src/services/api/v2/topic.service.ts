import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { IFormattedTopic, ITopic } from "@/interfaces/api/v2/topic.interface";
import Http, { HttpResponse } from "@/services/http";
import ApiResource from "@/services/api/resource";

export default class Topic extends ApiResource {
  baseVersion = "v2";
  basePath = "topic";

  async getTopics(): Promise<HttpResponse<IApiPagedResult<ITopic>>> {
    return await Http.get<IApiPagedResult<ITopic>>(this.formatEndpointUrl(""));
  }

  async getTopic(id: number): Promise<HttpResponse<ITopic>> {
    return await Http.get<ITopic>(this.formatEndpointUrl(`${id}`));
  }

  async getFormattedTopic(id: number): Promise<HttpResponse<IFormattedTopic>> {
    return await Http.get<IFormattedTopic>(
      this.formatEndpointUrl(`${id}/formatted`)
    );
  }

  async getIdentifiedTopic(
    sourceId: string,
    type: string
  ): Promise<HttpResponse<ITopic>> {
    return await Http.get<ITopic>(
      this.formatEndpointUrl(`ident/${type}/${sourceId}`)
    );
  }

  async getFormattedIdentifiedTopic(
    sourceId: string,
    type: string
  ): Promise<HttpResponse<IFormattedTopic>> {
    return await Http.get<IFormattedTopic>(
      this.formatEndpointUrl(`ident/${type}/${sourceId}/formatted`)
    );
  }
}
