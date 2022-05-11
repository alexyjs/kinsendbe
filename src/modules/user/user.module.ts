import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../../shared/shared.module';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserCreateAction } from './services/UserCreateAction.service';
import { UserFindByIdAction } from './services/UserFindByIdAction.service';
import { UserResendEmailAction } from './services/UserResendEmailAction.service';
import { UserGetProfileAction } from './services/UserGetProfileAction.service';
import { UserFindByStripeCustomerUserIdAction } from './services/UserFindByStripeCustomerUserIdAction.service';
import { UserUpdateProfileAction } from './services/UserUpdateProfileAction.service';

@Module({
  controllers: [UserController],
  imports: [SharedModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserCreateAction, UserFindByIdAction, UserResendEmailAction, UserGetProfileAction,
     UserFindByStripeCustomerUserIdAction,UserUpdateProfileAction],
  exports: [UserCreateAction, UserFindByIdAction, UserFindByStripeCustomerUserIdAction],
})
export class UserModule {}
