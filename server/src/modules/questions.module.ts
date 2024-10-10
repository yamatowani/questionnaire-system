import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { Option } from 'src/entities/option.entity';
import { AdminUser } from 'src/entities/admin_user.entity';
import { Answer } from 'src/entities/answer.entity';
import { QuestionService } from 'src/services/questions.service';
import { QuestionResolver } from 'src/resolvers/questions.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Option, AdminUser, Answer]),
    forwardRef(() => AuthModule),
  ],
  providers: [QuestionService, QuestionResolver],
  exports: [QuestionService],
})
export class QuestionsModule {}
