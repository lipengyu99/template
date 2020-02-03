import { Controller, Get } from '@nestjs/common';
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
   @Get('option')
   option():any{
    return{
        columns: {
            item: [
                {
                   
                    id: "1",
                    label: "ID",
                    width: "210px",
                    sortable: true,
                    prop: "_id"
                },
                {
                    id: "2",
                    label: "创建时间",
                    sortable: true,
                    width: "200px",
                    prop: "createdAt"
                },
                {
                    id: "3",
                    label: "标题",
                    sortable: false,
                    width: "150px",
                    prop: "title"
                },
                {
                    id: "4",
                    label: "重要性",
                    sortable: true,
                    width: "150px",
                    prop: "Imp"
                },
                {
                    id: "5",
                   
                    label: "类型",
                    sortable: true,
                    width: "150px",
                    prop: "type"
                },

            ]
        }
    }
   }

}
