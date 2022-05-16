import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type VcardDocument = Vcard & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Vcard {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  @Transform(({ value }) => value.toString())
  userId: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  title: string;

  @Prop()
  organization: string;

  @Prop()
  facebook: string;

  @Prop()
  instagram: string;

  @Prop()
  twitter: string;

  @Prop()
  linkedIn: string;

  @Prop()
  youtube: string;

  @Prop()
  snapchat: string;

  @Prop()
  soundCloud: string;

  @Prop()
  store: string;

  @Prop()
  website: string;

  @Prop()
  zipCode: string;

  @Prop()
  note: string;

  @Prop()
  url?: string;

  @Prop({ default: Date.now(), type: Date })
  createdAt: Date;

  @Prop({ default: Date.now(), type: Date })
  updatedAt: Date;
}

const VcardSchema = SchemaFactory.createForClass(Vcard);

VcardSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

export { VcardSchema };
