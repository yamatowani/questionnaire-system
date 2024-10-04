import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AdminUsersModule } from './modules/admin_users.module';
import { AdminUser } from './entities/admin_user.entity';
import { Question } from './entities/question.entity';
import { Option } from './entities/option.entity';
import { Answer } from './entities/answer.entity';
import { QuestionModule } from './modules/questions.module';
import { AnswerModule } from './modules/answers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'sample',
      password: 'sample',
      database: 'sample',
      entities: [AdminUser, Question, Option, Answer],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AdminUsersModule,
    QuestionModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
