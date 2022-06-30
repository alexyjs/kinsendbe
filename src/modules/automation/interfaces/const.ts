/* eslint-disable @typescript-eslint/naming-convention */
export enum TRIGGER_TYPE {
  FIRST_MESSAGE = 'FIRST_MESSAGE',
  CONTACT_CREATED = 'CONTACT_CREATED',
  CONTACT_TAGGED = 'CONTACT_TAGGED',
}

export enum DURATION {
  TIME_FROM_TRIGGER = 'TIME_FROM_TRIGGER',
  UNTIL_NEXT_DAY = 'UNTIL_NEXT_DAY',
  UNTIL_NEXT_DAY_OF_WEEK = 'UNTIL_NEXT_DAY_OF_WEEK',
  UNTIL_NEXT_DAY_OF_MONTH = 'UNTIL_NEXT_DAY_OF_MONTH',
  UNTIL_DATE = 'UNTIL_DATE',
}

export enum STATUS {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
}

export enum TASK_TYPE {
  DELAY = 'DELAY',
  ACTION = 'ACTION',
}

export enum AUTOMATION_STATUS {
  ENABLE = 'ENABLE',
  DISABLE = 'DISABLE',
}
