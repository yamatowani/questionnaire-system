import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionResolver } from "src/resolvers/questions.resolver";
import { QuestionService } from "src/services/questions.service";
import { Question } from "src/entities/question.entity";
import { Option } from "src/entities/option.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Option])
  ],
  providers: [QuestionResolver, QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
