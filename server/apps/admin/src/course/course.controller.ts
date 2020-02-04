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
        option: {
            index: true,
            indexLabel: "序号",
            title: "课程管理",
            menuType: "icon",
            page: false,
            align: "center",

            excelBtn: true,
            menuAlign: "center",
            column: [
                {
                    label: "标题",
                    prop: "title",
                    search: true,
                    regex: true,
                    rules: [{
                        required: true,
                        message: "请输入标题",
                        trigger: "blur"
                    }],
                },
                {
                    label: "重要性",
                    prop: "Imp",
                    type: "select",
                    search: true,
                    sortable: true,
                    dicData: [
                        { value: 1, label: "1" },
                        { value: 2, label: "2" },
                        { value: 3, label: "3" }
                    ]
                },
                {
                    label: "类型",
                    prop: "type",
                    type: "select",
                    search: true,
                    rules: [{
                        required: true,
                        message: "请输入类型",
                        trigger: "blur"
                    }],
                    dicData: [
                        { value: "CN", label: "China" },
                        { value: "US", label: "USA" },
                        { value: "JP", label: "Japan" },
                        { value: "EU", label: "Eurozone" }
                    ]
                },
                {
                    label: "日期",
                    prop: "createdAt",
                    type: "date",
                    sortable: true,

                    format: "yyyy-MM-dd hh:mm:ss",
                    //valueFormat: "yyyy-MM-dd hh:mm:ss",
                    addDisabled: true,
                    addDisplay: false,

                },
                {
                    label: "状态",
                    prop: "status",
                    slot: true,
                    type: "select",
                    dicData: [
                        { value: "published", label: "发布成功" },
                        { value: "drft", label: "草稿" }
                    ],
                    rules: [{
                        required: true,
                        message: "请输入状态",
                        trigger: "blur"
                    }],
                }
            ]
        }
    }
   }

}
