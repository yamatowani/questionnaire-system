import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { Option } from 'src/entities/option.entity';
import { NewQuestionInput } from 'src/dto/new-question.input';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  public async getAllQuestions(): Promise<Question[]> {
    return this.questionRepository.find({ relations: ['options'] })
  }

  async create(newQuestionInput: NewQuestionInput): Promise<Question> {
    const { title, url, options } = newQuestionInput;

    const question      = this.questionRepository.create({ title, url })
    const savedQuestion = await this.questionRepository.save(question)

    const savedOptions = await Promise.all(
      options.map(option => {
        const newOption = this.optionRepository.create({
          option_text: option.option_text,
          question: savedQuestion,
        })
        return this.optionRepository.save(newOption)
      })
    )
    savedQuestion.options = savedOptions;

    return savedQuestion
  }
}
