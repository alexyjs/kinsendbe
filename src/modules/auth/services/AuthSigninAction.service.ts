import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { S3Service } from 'src/shared/services/s3.service';
import { ConfigService } from '../../../configs/config.service';
import { NotFoundException } from '../../../utils/exceptions/NotFoundException';
import { RequestContext } from '../../../utils/RequestContext';
import { User, UserDocument } from '../../user/user.schema';
import { AuthRefreshTokenResponseDto } from '../dtos/AuthRefreshTokenResponseDto';
import { AuthSignInResponseDto } from '../dtos/AuthSigninResponseDto';
import { AuthAccessTokenResponseDto } from '../dtos/AuthTokenResponseDto';

@Injectable()
export class AuthSignInAction {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private s3Service: S3Service,
  ) {}

  async execute(context: RequestContext): Promise<AuthSignInResponseDto> {
    const { correlationId, user } = context;
    const {
      id,
      email,
      phoneNumber,
      firstName,
      lastName,
      stripeCustomerUserId,
      isEnabledBuyPlan,
      isEnabledPayment,
    } = <UserDocument>user;
    if (!user) {
      throw new NotFoundException('User', 'Username and password are not correct');
    }
    const imageKey = id+"photo";
    const image = await this.s3Service.getFile(context, imageKey);
    const { jwtSecret, accessTokenExpiry } = this.configService;
    const payloadAccessToken: AuthAccessTokenResponseDto = {
      id,
      email,
      phoneNumber,
      firstName,
      lastName,
      sessionId: correlationId,
      stripeCustomerUserId,
      isEnabledBuyPlan,
      isEnabledPayment,
      image,
    };

    const accessToken = this.jwtService.sign(payloadAccessToken, {
      secret: jwtSecret,
      expiresIn: accessTokenExpiry,
    });

    const payloadRefreshToken: AuthRefreshTokenResponseDto = {
      id: payloadAccessToken.id,
      sessionId: correlationId,
    };

    const refreshToken = this.jwtService.sign(payloadRefreshToken, {
      secret: jwtSecret,
      expiresIn: accessTokenExpiry,
    });

    const token: AuthSignInResponseDto = {
      user: payloadAccessToken,
      accessToken,
      refreshToken,
    };
    return token;
  }
}
