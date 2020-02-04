import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Permission } from '@libs/db/models/permission.model';

@Module({
  imports:[TypegooseModule.forFeature([Permission])],
  controllers: [PermissionController]
})
export class PermissionModule {}
