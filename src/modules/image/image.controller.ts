import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AppRequest } from 'src/utils/AppRequest';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadAction } from './services/ImageUploadAction.service';

@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor(private imageUploadAction: ImageUploadAction) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Req() request: AppRequest,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.imageUploadAction.execute(request, file);
  }
}