/* eslint-disable new-cap */
import { Injectable } from '@nestjs/common';
import { BackgroudJobService } from '../../../../shared/services/backgroud.job.service';
import { SmsService } from '../../../../shared/services/sms.service';
import { RequestContext } from '../../../../utils/RequestContext';
import { FormSubmission } from '../../../form.submission/form.submission.schema';
import { FormGetSubmissionResponse } from '../../../form/interfaces/form.interface';
import { FormGetSubmissionsByTagIds } from '../../../form/services/FormGetSubmissionsByTagIds';
import { UpdateDocument } from '../../update.schema';
import { UpdateBaseTriggerAction } from './UpdateBaseTriggerAction';

@Injectable()
export class UpdateTaggedTriggerAction extends UpdateBaseTriggerAction {
  constructor(
    private formGetSubmissionsByTagId: FormGetSubmissionsByTagIds,
    private backgroudJobService: BackgroudJobService,
    private smsService: SmsService,
  ) {
    super();
  }

  async execute(
    context: RequestContext,
    ownerPhoneNumber: string,
    update: UpdateDocument,
  ): Promise<void> {
    const { logger } = context;
    const { filter } = update;
    const { tagId } = filter;
    const isArray = Array.isArray(tagId);
    if (!tagId || (isArray && tagId.length === 0)) {
      logger.info('Skip  update tagged trigger. Tag should not null.');
      return;
    }
    const subscribers = await this.formGetSubmissionsByTagId.execute(
      context,
      isArray ? tagId : [tagId],
    );
    this.executeTrigger(
      context,
      ownerPhoneNumber,
      subscribers,
      update,
      this.backgroudJobService,
      this.smsService,
    );
  }
}
