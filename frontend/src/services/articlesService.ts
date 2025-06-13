import { TArticle } from '../types/Article';
import { BaseService } from './baseService';

export class ArticlesService extends BaseService<TArticle> {
  get = async () => {
    const response = await fetch(`${this.apiUrl}/articles`, {
      ...this.init,
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = (await response.json()).items as TArticle[];
    return json;
  };

  post = async (data: TArticle) => {
    const response = await fetch(`${this.apiUrl}/articles`, {
      ...this.init,
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.status !== 201) {
      throw new Error(`Response status is bad (not 201): ${response.status}`);
    }
  };

  prepare(data: Partial<TArticle>): TArticle {
    const defaultArticleData: TArticle = {
      sectionId: 'defaultSectionId',
      content: 'no content',
      name: 'no name',
      status: '',
    };
    return {
      ...defaultArticleData,
      ...data,
    };
  }
}
