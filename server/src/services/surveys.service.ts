import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, IsNull, Not, Repository } from 'typeorm';
import { Survey } from 'src/entities/survey.entity';
import { Question } from 'src/entities/question.entity';
import { Option } from 'src/entities/option.entity';
import { SubmitSurveyInput } from 'src/dto/input/submitSurvey';
import { AdminUser } from 'src/entities/admin_user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Answer } from 'src/entities/answer.entity';
import {
  SurveyResult,
  Questions,
  AnswerCounts,
} from 'src/dto/output/surveyResult';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  public async surveys(adminUserId: number): Promise<Survey[]> {
    const surveys = await this.surveyRepository.find({
      where: { admin_user: { id: adminUserId } },
      relations: ['questions', 'questions.options'],
    });
    return surveys;
  }

  public async surveyResult(url: string): Promise<SurveyResult> {
    const survey = await this.surveyRepository.findOne({
      where: { url },
      relations: ['questions', 'questions.options'],
    });
  
    if (!survey) {
      throw new NotFoundException('Survey not found');
    }
  
    const questions: Questions[] = await Promise.all(
      survey.questions.map(async (question) => {
        const options: AnswerCounts[] = await Promise.all(
          question.options.map(async (option) => {
            const count = await this.answerRepository.count({
              where: { option: { id: option.id } },
            });
  
            return {
              option_id: option.id,
              optionText: option.option_text,
              count: count,
            };
          }),
        );
  
        // その他の回答を取得するロジックを追加
        const otherResponses = await this.answerRepository.find({
          where: { question: { id: question.id }, option: { id: null } }, // null のオプションを持つ回答を取得
        });
  
        return {
          questionId: question.id,
          questionText: question.question_text,
          questionResults: options,
          otherCount: otherResponses.length, // その他の回答数をカウント
          otherResponses: otherResponses.map(response => response.other_response), // その他の回答を配列として返す
        };
      }),
    );
  
    return {
      surveyId: survey.id,
      title: survey.title,
      questions: questions,
    };
  }
  

  public async surveyByUrl(url: string): Promise<Survey> {
    return this.surveyRepository.findOne({
      where: { url },
      relations: ['questions', 'questions.options'],
    });
  }

  async create(
    submitSurveyInput: SubmitSurveyInput,
    adminUserId: number,
  ): Promise<Survey> {
    return await this.surveyRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const adminUser = await entityManager.findOne(AdminUser, {
          where: { id: adminUserId },
        });
        if (!adminUser) {
          throw new NotFoundException('Admin user not found');
        }

        const survey = entityManager.create(Survey, {
          title: submitSurveyInput.title,
          url: uuidv4(),
          admin_user: adminUser,
        });
        const savedSurvey = await entityManager.save(Survey, survey);

        for (const question of submitSurveyInput.questions) {
          const newQuestion = entityManager.create(Question, {
            question_text: question.question_text,
            has_multiple_options: question.has_multiple_options,
            allows_other: question.allows_other,
            survey: savedSurvey,
          });
          const savedQuestion = await entityManager.save(Question, newQuestion);

          for (const option of question.options) {
            const newOption = entityManager.create(Option, {
              option_text: option.option_text,
              question: savedQuestion,
            });

            await entityManager.save(Option, newOption);
          }
        }
        return savedSurvey;
      },
    );
  }
}
