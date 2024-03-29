/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '../../../configs/config.service';
import { StripeService } from '../../../shared/services/stripe.service';
import { RequestContext } from '../../../utils/RequestContext';

@Injectable()
export class SubscriptionGetListAction {
  constructor(
    private readonly stripeService: StripeService,

    private configService: ConfigService,
  ) {}

  async execute(
    context: RequestContext,
  ): Promise<Stripe.Response<Stripe.ApiList<Stripe.Subscription>>> {
    const subscriptions = await this.stripeService.getSubscriptionsList(context);
    return subscriptions;
  }
}
