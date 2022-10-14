/* eslint-disable @typescript-eslint/naming-convention */
export enum STATUS {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
  'DELETED' = 'DELETED',
  'VERIFIED' = 'VERIFIED',
  'ATTACHED' = 'ATTACHED',
  'DEFAULT' = 'DEFAULT',
}

export enum SIGNIN_PROVIDER {
  PASSWORD = 'PASSWORD',
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
}

export enum CUSTOM_FIELDS_TYPE {
  CHECKBOXES = 'CHECKBOXES',
  SINGLE_LINE_TEXT = 'SINGLE_LINE_TEXT',
  PARAGRAPH_TEXT = 'PARAGRAPH_TEXT',
  RADIO = 'RADIO',
  SELECT = 'SELECT',
}
export enum TYPE_MESSAGE {
  MMS = 'MMS',
  MESSAGE_DOMESTIC = 'MESSAGE_DOMESTIC',
  MESSAGE_INTERNATIONAL = 'MESSAGE_INTERNATIONAL',
  MESSAGE_UPDATE_DOMESTIC = 'MESSAGE_UPDATE_DOMESTIC',
  MESSAGE_UPDATE_INTERNATIONAL = 'MESSAGE_UPDATE_INTERNATIONAL',
}

export enum TYPE_PAYMENT {
  MESSAGE = 'MESSAGE',
  MESSAGE_UPDATE = 'MESSAGE_UPDATE',
  PLAN_SUBSCRIPTION = 'PLAN_SUBSCRIPTION',
  PAYMENT_MONTHLY = 'PAYMENT_MONTHLY',
}

export enum PAYMENT_PROGRESS {
  SCHEDULED = 'SCHEDULED',
  DONE = 'DONE',
}

export const REGION_DOMESTIC = 'US';

export const TTL = 60;

export const BILLING_CYCLE_ANCHOR = 30;

export const PRICE_PER_MESSAGE_DOMESTIC = 0.01;

export const PRICE_PER_MESSAGE_INTERNATIONAL = 0.16;

export const PRICE_BASE_PLAN = 19.99;

export const PRICE_ATTACH_CHARGE = 5;

export const NUMBER_DAY_TRIGGER_CHARGE = 30;

export const RATE_CENT_USD = 100;

// 500 cent
export const MINIMUM_PRICE = 500;

export enum PAYMENT_MONTHLY_STATUS {
  PAID = 'paid',
  PENDING = 'pending',
}

export const PRICE_PER_PHONE_NUMBER = 1;
