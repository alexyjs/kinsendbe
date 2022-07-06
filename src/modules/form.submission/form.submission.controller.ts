import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../providers/guards/JwtAuthGuard.provider';
import MongooseClassSerializerInterceptor from '../../utils/interceptors/MongooseClassSerializer.interceptor';
import { AppRequest } from '../../utils/AppRequest';
import { FormSubmissionModule } from './form.submission.module';
import { FormSubmissionCreatePayload } from './dtos/FormSubmissionCreatePayload.dto';
import { FormSubmissionCreateAction } from './services/FormSubmissionCreateAction.service';
import { TranformObjectIdPipe } from '../../utils/ParseBigIntPipe';
import { FormSubmissionCountByFormIdAction } from './services/FormSubmissionCountByFormIdAction.service';

@ApiTags('FormSubmission')
@UseInterceptors(MongooseClassSerializerInterceptor(FormSubmissionModule))
@Controller('form-submission')
export class FormSubmissionController {
  constructor(
    private formSubmissionCreateAction: FormSubmissionCreateAction,
    private formSubmissionCountByFormIdAction: FormSubmissionCountByFormIdAction,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createForm(
    @Req() request: AppRequest,
    @Body()
    payload: FormSubmissionCreatePayload,
  ) {
    return this.formSubmissionCreateAction.execute(request, payload);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/count/:formId')
  countSubscriber(
    @Req() request: AppRequest,
    @Param('formId', TranformObjectIdPipe) formId: string,
  ) {
    return this.formSubmissionCountByFormIdAction.execute(request, formId);
  }
}
