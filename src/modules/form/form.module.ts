import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../../shared/shared.module';
import { CNAMEModule } from '../cname/cname.module';
import { CustomFieldsModule } from '../custom.fields/custom.fields.module';
import { ImageModule } from '../image/image.module';
import { TagsModule } from '../tags/tags.module';
import { FormController } from './form.controller';
import { Form, FormSchema } from './form.schema';
import { FormCreateAction } from './services/FormCreateAction.service';
import { FormDeleteByIdAction } from './services/FormDeleteByIdAction.service';
import { FormGetByIdAction } from './services/FormGetByIdAction.service';
import { FormGetCNAMETitleAction } from './services/FormGetCNAMETitleAction.service';
import { FormsGetAction } from './services/FormsGetAction.service';
import { FormUpdateAction } from './services/FormUpdateAction.service ';

@Module({
  controllers: [FormController],
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }]),
    ImageModule,
    CustomFieldsModule,
    TagsModule,
    CNAMEModule,
  ],
  providers: [
    FormCreateAction,
    FormsGetAction,
    FormGetByIdAction,
    FormUpdateAction,
    FormDeleteByIdAction,
    FormGetCNAMETitleAction,
  ],
  exports: [FormGetByIdAction],
})
export class FormModule {}
