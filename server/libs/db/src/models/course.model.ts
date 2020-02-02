import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
@modelOptions({
    schemaOptions:{timestamps:true}
})
export class Course {
    @ApiProperty({ description:'标题'})
    @prop()
   title:string

    @ApiProperty({ description:'重要性'})
   @prop()
   Imp:string
    @ApiProperty({ description:'类型'})
   @prop()
   type:string
    @ApiProperty({ description:'状态'})
   @prop()
   status:string


}