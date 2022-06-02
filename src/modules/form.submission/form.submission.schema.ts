/* eslint-disable max-classes-per-file */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { Transform } from 'class-transformer';
import { User } from '../user/user.schema';
import { Form } from '../form/form.schema';

export type FormSubmissionDocument = FormSubmission & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class FormSubmission {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', index: true })
  owner: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Form', index: true })
  form: Form;

  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: false })
  location?: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: false })
  metaData?: string;

  @Prop({ default: Date.now(), type: Date })
  createdAt: Date;

  @Prop({ default: Date.now(), type: Date })
  updatedAt: Date;
}

const FormSubmissionSchema = SchemaFactory.createForClass(FormSubmission);

FormSubmissionSchema.index({ email: 'text' });

export { FormSubmissionSchema };