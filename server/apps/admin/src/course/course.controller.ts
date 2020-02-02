import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Course } from '@libs/db/models/course.model';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
@Crud({
    model:Course
})
@Controller('course')
@ApiTags('课程视频')
export class CourseController {
   constructor(@InjectModel(Course) private readonly model:ModelType<Course>){}
}
