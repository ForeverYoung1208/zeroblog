import { Article } from '../types/Article';

export class ArticlesService {
  private init: RequestInit = {};
  private apiUrl: string = '';
  private key: string = '';

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL || '';
    this.key = process.env.REACT_APP_APIGATEWAY_KEY || '';
    if (!this.key || !this.apiUrl) {
      throw new Error('api key or url not found');
    }
    this.init = {
      headers: {
        'x-api-key': this.key,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: window.location.origin,
      },
    };
  }

  getArticles = async () => {
    const response = await fetch(`${this.apiUrl}/articles`, {
      ...this.init,
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = (await response.json()).items as Article[];
    return json;
  };

  postArticle = async (data: Article) => {
    const response = await fetch(`${this.apiUrl}/articles`, {
      ...this.init,
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.status !== 201) {
      throw new Error(`Response status is bad (not 201): ${response.status}`);
    }
  };
}
