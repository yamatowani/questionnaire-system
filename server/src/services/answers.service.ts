import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { Option } from 'src/entities/option.entity';
import { Answer } from 'src/entities/answer.entity';
import { NewAnswerInput } from 'src/dto/new-answer.input';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  public async getAnswerByAdminUser(adminUserId: number): Promise<Answer[]> {
    const questions = await this.questionRepository.find({
      where: { admin_user: { id: adminUserId } },
      relations: ['options'],
    });

    const questionIds = questions.map((q) => q.id);

    return this.answerRepository.find({
      relations: ['question', 'option'],
      where: { question: { id: In(questionIds) } },
    });
  }

  async create(newAnswerInput: NewAnswerInput): Promise<Answer> {
    const { option_id, question_id } = newAnswerInput;

    const question = await this.questionRepository.findOneBy({
      id: question_id,
    });
    const option = await this.optionRepository.findOneBy({ id: option_id });

    const answer = this.answerRepository.create({ option, question });
    return this.answerRepository.save(answer);
  }
}
