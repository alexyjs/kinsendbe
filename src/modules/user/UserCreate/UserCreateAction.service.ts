import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserCreatePayloadDto } from './UserCreateRequest.dto';
import { User, UserDocument } from '../user.schema';
import { UsernameConflictException } from '../../../utils/exceptions/UsernameConflictException';

@Injectable()
export class UserCreateAction {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(payload: UserCreatePayloadDto): Promise<User> {
    const checkExistedUser = await this.userModel.findOne({ $or: [{ email: payload.email }] });

    if (checkExistedUser) {
      throw new UsernameConflictException('User has already conflicted');
    }

    return new this.userModel(payload).save();
  }
}
