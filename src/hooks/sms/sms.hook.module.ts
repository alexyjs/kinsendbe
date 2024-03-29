import { Module } from '@nestjs/common';
import { AutomationModule } from '../../modules/automation/automation.module';
import { FirstContactModule } from '../../modules/first-contact/first-contact.module';
import { FormSubmissionModule } from '../../modules/form.submission/form.submission.module';
import { KeywordResponseModule } from '../../modules/keyword-response/keyword-response.module';
import { MessageModule } from '../../modules/messages/message.module';
import { SmsLogModel } from '../../modules/sms.log/sms.log.module';
import { UpdateModule } from '../../modules/update/update.module';
import { UserModule } from '../../modules/user/user.module';
import { SharedModule } from '../../shared/shared.module';
import { SmsReceiveHookAction } from './services/SmsReceiveHookAction.service';
import { SmsStatusCallbackHookAction } from './services/SmsStatusCallbackHookAction.service';
import { SmsHookController } from './sms.hook.controller';

@Module({
  controllers: [SmsHookController],
  imports: [
    SharedModule,
    SmsLogModel,
    AutomationModule,
    UserModule,
    UpdateModule,
    FormSubmissionModule,
    MessageModule,
    FirstContactModule,
    KeywordResponseModule,
  ],
  providers: [SmsReceiveHookAction, SmsStatusCallbackHookAction],
  exports: [],
})
export class SmsHookModule {}
