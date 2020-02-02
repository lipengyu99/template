import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Course } from '@libs/db/models/course.model';

@Module({
  imports: [TypegooseModule.forFeature([Course])],
  controllers: [CourseController]
})
export class CourseModule { }
