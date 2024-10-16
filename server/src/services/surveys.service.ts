import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { Option } from 'src/entities/option.entity';
import { SubmitQuestionInput } from 'src/dto/input/submitQuestion';
import { AdminUser } from 'src/entities/admin_user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Answer } from 'src/entities/answer.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  public async getAllQuestionsByAdminUserId(
    adminUserId: number,
  ): Promise<Question[]> {
    const questions = await this.questionRepository.find({
      where: { admin_user: { id: adminUserId } },
      relations: ['options', 'answers'],
    });
    return questions;
  }

  public async getQuestionWithAnswerCounts(
    adminUserId: number,
  ): Promise<any[]> {
    const questions = await this.questionRepository.find({
      where: { admin_user: { id: adminUserId } },
      relations: ['options'],
    });

    const result: any[] = await Promise.all(
      questions.map(async (question) => {
        const optionsWithCounts: any[] = await Promise.all(
          question.options.map(async (option) => {
            const count = await this.answerRepository.count({
              where: { option: { id: option.id } },
              relations: ['option', 'question'],
            });

            return {
              option_id: option.id,
              option_text: option.option_text,
              count: count,
            };
          }),
        );

        return {
          questionId: question.id,
          title: question.title,
          options: optionsWithCounts,
        };
      }),
    );

    return result;
  }

  public async getQuestionByUrl(url: string): Promise<Question> {
    return this.questionRepository.findOne({
      where: { url },
      relations: ['options'],
    });
  }

  async create(
    submitQuestionInput: SubmitQuestionInput,
    adminUserId: number,
  ): Promise<Question> {
    const { title, options } = submitQuestionInput;

    return await this.questionRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const adminUser = await entityManager.findOne(AdminUser, {
          where: { id: adminUserId },
        });
        if (!adminUser) {
          throw new NotFoundException('Admin user not found');
        }
        const question = entityManager.create(Question, {
          title,
          url: uuidv4(),
          admin_user: adminUser,
        });
        const savedQuestion = await entityManager.save(Question, question);

        const savedOptions: Option[] = [];
        for (const option of options) {
          const newOption = entityManager.create(Option, {
            option_text: option.option_text,
            question: savedQuestion,
          });
          const savedOption = await entityManager.save(Option, newOption);
          savedOptions.push(savedOption);
        }
        savedQuestion.options = savedOptions;
        return savedQuestion;
      },
    );
  }
}
