import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { Option } from 'src/entities/option.entity';
import { Answer } from 'src/entities/answer.entity';
import { OptionAnswer } from 'src/entities/optionAnswer.entity';
import { SubmitAnswerInput } from 'src/dto/input/submitAnswer';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(OptionAnswer)
    private readonly optionAnswerRepository: Repository<OptionAnswer>,
  ) {}

  // public async getAnswersByAdminUser(adminUserId: number): Promise<Answer[]> {
  //   const relatedQuestions = await this.questionRepository.find({
  //     where: { admin_user: { id: adminUserId } },
  //     relations: ['options'],
  //   });

  //   const questionIds = relatedQuestions.map((question) => question.id);

  //   return this.answerRepository.find({
  //     relations: ['question', 'option'],
  //     where: { question: { id: In(questionIds) } },
  //   });
  // }

  public async create(submitAnswerInput: SubmitAnswerInput): Promise<Answer[]> {
    const answers: Answer[] = [];
    for (const questionAnswer of submitAnswerInput.question_answers) {
      const { question_id, options } = questionAnswer;

      const relatedQuestion = await this.questionRepository.findOneBy({
        id: question_id,
      });

      for (const selectedOption of options) {
        const { option_id, other_response } = selectedOption;

        const relatedOption = await this.optionRepository.findOneBy({
          id: option_id,
        });

        const createdAnswer = this.answerRepository.create({
          option: relatedOption,
          question: relatedQuestion,
          other_response,
        });

        const savedAnswer = await this.answerRepository.save(createdAnswer);

        answers.push(savedAnswer);

        const optionAnswer = this.optionAnswerRepository.create({
          answer: savedAnswer,
          option: relatedOption,
        });
        await this.optionAnswerRepository.save(optionAnswer);
      }
    }

    return answers;
  }
}
