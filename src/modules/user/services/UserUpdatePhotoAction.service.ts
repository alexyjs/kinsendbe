import { Injectable } from '@nestjs/common';
import { AwsS3Service } from 'src/shared/services/AwsS3Service';
import { RequestContext } from '../../../utils/RequestContext';
import {  UserDocument } from '../user.schema';
import { UserFindByIdAction } from './UserFindByIdAction.service';
import { convertFileToBase64 } from 'src/utils/imageBase64Helpers';

@Injectable()
export class UserUpdatePhotoAction {
  constructor(private userFindByIdAction: UserFindByIdAction, private awsS3Service: AwsS3Service) {}

  async execute(context: RequestContext, photo: Express.Multer.File): Promise<UserDocument> {
    const { user } = context;
    const userInfo = await this.userFindByIdAction.execute(context, user.id);
    const imageKey = user.id + 'photo';
    await this.awsS3Service.uploadFileBase64(
      context,
      convertFileToBase64(photo),
      imageKey,
      photo.mimetype
    );
    const image = await this.awsS3Service.getFile(context, imageKey);
    userInfo.image = image;
    return userInfo;
  }
}