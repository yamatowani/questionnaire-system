import { InputType, Field } from "@nestjs/graphql";
import { Option } from "src/entities/option.entity";
import { Question } from "src/entities/question.entity";

@InputType()
export class NewAnswerInput {
  @Field(() => Option)
  option_id: number;

  @Field(() => Question)
  question_id: number;
}
