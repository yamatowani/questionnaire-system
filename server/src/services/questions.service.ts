import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { Option } from 'src/entities/option.entity';
import { NewQuestionInput } from 'src/dto/new-question.input';
import { AdminUser } from 'src/entities/admin_user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  public async getAllQuestions(): Promise<Question[]> {
    return this.questionRepository.find({ relations: ['options'] });
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
