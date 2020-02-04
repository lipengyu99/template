import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
@modelOptions({
    schemaOptions: { timestamps: true }
})
export class Permission {
    @ApiProperty({ description: '账号' })
    @prop()
    name: string
    @ApiProperty({ description: '昵称' })
    @prop()
    nickname: string
    @ApiProperty({ description: '部门' })
    @prop()
    department: string
    @ApiProperty({ description: '邮箱' })
    @prop()
    email: string
    @ApiProperty({ description: '手机' })
    @prop()
    phone: string
    @ApiProperty({ description: '状态' })
    @prop()
    status: string
    


}