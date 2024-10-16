import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from 'src/entities/survey.entity';
import { Question } from 'src/entities/question.entity';
import { Option } from 'src/entities/option.entity';
import { AdminUser } from 'src/entities/admin_user.entity';
import { Answer } from 'src/entities/answer.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SurveyService } from 'src/services/surveys.service';
import { SurveyResolver } from 'src/resolvers/surveys.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, Question, Option, AdminUser, Answer]),
    forwardRef(() => AuthModule),
  ],
  providers: [SurveyService, SurveyResolver],
  exports: [SurveyService],
})
export class SurveyModule {}
