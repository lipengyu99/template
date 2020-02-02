import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'
// import { User } from '@libs/db/models/user.model';
import { Course } from '@libs/db/models/course.model';


const models = TypegooseModule.forFeature([
   Course, 
])

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://127.0.0.1:27017/nest-template', {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    }), models
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
