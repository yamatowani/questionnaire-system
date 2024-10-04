import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnswerResolver } from "src/resolvers/answers.resolver";
import { AnswerService } from "src/services/answers.service";
import { Answer } from "src/entities/answer.entity";
import { Question } from "src/entities/question.entity";
import { Option } from "src/entities/option.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer, Question, Option])
  ],
  providers: [AnswerResolver, AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
