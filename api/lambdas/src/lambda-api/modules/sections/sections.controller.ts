import { Request, Response } from 'lambda-api';
import { BaseController } from '../baseController';
import { Section } from '../../entities/section.entity';
import { TControllerParams } from '../controllerParams.type';
import { CreateSectionDto } from 'dto-lib';
import { validateOrRejectRequest } from '../../shared/validation-tools';

export class SectionsController extends BaseController {
  constructor({ api, dbConnection, path }: TControllerParams) {
    api.post(`${path}`, async (req: Request, res: Response) => {
      const sectionDto = await validateOrRejectRequest(
        req,
        res,
        CreateSectionDto,
      );
      if (!sectionDto) return;

      const section = await dbConnection.entityManager.create(sectionDto);

      res.status(201).send(section);
    });

    api.get(`${path}`, async (req: Request, res: Response) => {
      const result = await dbConnection.entityManager.find(Section, {});
      res.status(200).send(result);
    });

    super(api, dbConnection);
  }
}
