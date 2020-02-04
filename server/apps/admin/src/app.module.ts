import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { DbModule } from '@libs/db';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [CourseModule,DbModule, PermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
