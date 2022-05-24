import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestContext } from '../../../utils/RequestContext';
import { Tags, TagsDocument } from '../tags.schema';

@Injectable()
export class TagsDeleteByIdAction {
  constructor(@InjectModel(Tags.name) private tagsModel: Model<TagsDocument>) {}

  async execute(context: RequestContext, tagsId: string): Promise<void> {
    await this.tagsModel.findByIdAndDelete(tagsId);
  }
}
