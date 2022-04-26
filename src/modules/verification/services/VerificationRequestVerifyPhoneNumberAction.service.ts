/* eslint-disable unicorn/import-style */
/* eslint-disable unicorn/prefer-node-protocol */
/* eslint-disable new-cap */
/* eslint-disable unicorn/prefer-module */
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import omit from 'lodash';
import * as mongoose from 'mongoose';
import { RequestContext } from 'src/utils/RequestContext';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/modules/user/user.schema';
import { UserConfirmationTokenDto } from 'src/modules/user/dtos/UserConfirmationToken.dto';
import { NotFoundException } from 'src/utils/exceptions/NotFoundException';
import { STATUS } from 'src/domain/const';
import { IllegalStateException } from 'src/utils/exceptions/IllegalStateException';
import { ConfigService } from '../../../configs/config.service';
import { SmsService } from '../../../shared/services/sms.service';
import { VerificationRequestPhoneNumberDto } from '../dtos/VerificationRequestPhoneNumber.dto';
import { BadRequestException } from '../../../utils/exceptions/BadRequestException';

@Injectable()
export class VerificationRequestVerifyPhoneNumberAction {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
    private configService: ConfigService,
    private smsService: SmsService,
  ) {}

  async execute(
    context: RequestContext,
    payload: VerificationRequestPhoneNumberDto,
  ): Promise<User | null> {
    try {
      const checkExistedUser = await this.userModel.findOne({
        $or: [{ phoneNumber: payload.phoneNumber }],
      });

      if (!checkExistedUser) {
        throw new NotFoundException('User', 'User not found');
      }
      const { id, phoneNumber } = checkExistedUser;

      if (phoneNumber.status === STATUS.VERIFIED) {
        throw new BadRequestException('User phone number already confirmed');
      }
      const { code, phone } = phoneNumber;
      const smsPhone = `+${code}${phone}`;
      this.smsService.initiatePhoneNumberVerification(context, smsPhone);
      return checkExistedUser;
    } catch (error) {
      context.logger.error(error);
      throw new IllegalStateException('User verified not successful');
    }
  }
}