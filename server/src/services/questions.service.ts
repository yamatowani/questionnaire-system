import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { Option } from 'src/entities/option.entity';
import { NewQuestionInput } from 'src/dto/input/new-question.input';
import { AdminUser } from 'src/entities/admin_user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Answer } from 'src/entities/answer.entity';

@Injectable()
export class QuestionService {
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
    newQuestionInput: NewQuestionInput,
    adminUserId: number,
  ): Promise<Question> {
    const { title, options } = newQuestionInput;

    const adminUser = await this.adminUserRepository.findOne({
      where: { id: adminUserId },
    });
    if (!adminUser) {
      throw new NotFoundException('Admin user not found');
    }

    const question = this.questionRepository.create({
      title,
      url: uuidv4(),
      admin_user: adminUser,
    });
    const savedQuestion = await this.questionRepository.save(question);

    const savedOptions = await Promise.all(
      options.map((option) => {
        const newOption = this.optionRepository.create({
          option_text: option.option_text,
          question: savedQuestion,
        });
        return this.optionRepository.save(newOption);
      }),
    );

    savedQuestion.options = savedOptions;

    return savedQuestion;
  }
}
