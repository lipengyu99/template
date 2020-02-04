import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Permission } from '@libs/db/models/permission.model';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
    model: Permission
})

@Controller('permission')
@ApiTags('权限')
export class PermissionController {
    constructor(@InjectModel(Permission) private readonly model: ModelType<Permission>) { }
    @Get('option')
    option(): any {
        return {
            option: {
                index: true,
                indexLabel: "序号",
                title: "角色权限",
                menuType: "icon",
                page: false,
                align: "center",
               
                menuAlign: "center",
                column: [
                    {
                        label: "账号",
                        prop: "name",
                        search: true,
                        regex: true,
                        rules: [{
                            required: true,
                            message: "请输入标题",
                            trigger: "blur"
                        }],
                    },
                    {
                        label: "昵称",
                        prop: "nickname",
                        search: true,
                        sortable: true,
                       
                    },
                    {
                        label: "部门",
                        prop: "department",
                        type: "select",
                        search: true,
                        rules: [{
                            required: true,
                            message: "请输入部门",
                            trigger: "blur"
                        }],
                        dicData: [
                            { value: "js", label: "锦山分公司" },
                            { value: "bj", label: "北京分公司" },
                            { value: "wh", label: "武汉分公司" },
                           
                        ]
                    },
                    {
                        label: "邮箱",
                        prop: "email",
                        search: true,
                        regex: true,
                        rules: [{
                            required: true,
                            message: "请输入邮箱",
                            trigger: "blur"
                        }],
                    },
                    {
                        label: "手机",
                        prop: "phone",
                        search: true,
                        regex: true,
                        rules: [{
                            required: true,
                            message: "请输入手机",
                            trigger: "blur"
                        }],
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
                            { value: "used", label: "使用中" },
                            { value: "ban", label: "禁用中" }
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
