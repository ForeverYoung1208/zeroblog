import { Request, Response } from 'lambda-api';
import { BaseController } from '../baseController';
import { TControllerParams } from '../controllerParams.type';
import { ArticlesService } from './articles.service';
import { instanceToPlain } from 'class-transformer';
import { CreateArticleDto } from 'dto-lib';
import { validateOrRejectRequest } from '../../shared/validation-tools';

export class ArticlesController extends BaseController {
  constructor({ api, dbConnection, path }: TControllerParams) {
    const articlesService = new ArticlesService(dbConnection);

    api.post(`${path}`, async (req: Request, res: Response) => {
      const articleDto = await validateOrRejectRequest(
        req,
        res,
        CreateArticleDto,
      );
      if (!articleDto) return;

      const article = await articlesService.create(articleDto);

      res.status(201).send(instanceToPlain(article));
    });

    api.get(`${path}`, async (req: Request, res: Response) => {
      const articles = await articlesService.findAll();
      res.status(200).send(articles);
    });

    super(api, dbConnection);
  }
}
