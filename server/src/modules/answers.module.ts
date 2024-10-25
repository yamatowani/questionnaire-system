import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerResolver } from 'src/resolvers/answers.resolver';
import { AnswerService } from 'src/services/answers.service';
import { Answer } from 'src/entities/answer.entity';
import { Question } from 'src/entities/question.entity';
import { Option } from 'src/entities/option.entity';
import { AdminUser } from 'src/entities/admin_user.entity';
import { Survey } from 'src/entities/survey.entity';
import { SurveyAnswer } from 'src/entities/survey_answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Answer,
      Question,
      Option,
      AdminUser,
      Survey,
      SurveyAnswer,
    ]),
  ],
  providers: [AnswerResolver, AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
