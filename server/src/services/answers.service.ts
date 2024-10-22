import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { Option } from 'src/entities/option.entity';
import { Answer } from 'src/entities/answer.entity';
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
  ) {}

  public async create(submitAnswerInput: SubmitAnswerInput): Promise<Answer[]> {
    const answers: Answer[] = [];

    return await this.answerRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        for (const questionAnswer of submitAnswerInput.question_answers) {
          const { question_id, options } = questionAnswer;

          const relatedQuestion = await entityManager.findOne(Question, {
            where: { id: question_id },
          });
          if (options.length === 0) {
            throw new BadRequestException(
              `質問 "${relatedQuestion.question_text}" に回答してください`,
            );
          }

          for (const selectedOption of options) {
            const { option_id, other_response } = selectedOption;

            const relatedOption = await entityManager.findOne(Option, {
              where: { id: option_id },
            });

            if (relatedOption.option_text === 'その他' && !other_response) {
              throw new BadRequestException(
                `質問 "${relatedQuestion.question_text}" で「その他」を選択した場合はテキストを入力してください`,
              );
            }

            if (relatedOption.option_text !== 'その他' && other_response) {
              throw new BadRequestException(
                `質問 "${relatedQuestion.question_text}" で「その他」以外を選択した場合はテキストは入力しないでください`,
              );
            }

            const createdAnswer = entityManager.create(Answer, {
              question: relatedQuestion,
              option: relatedOption,
              other_response: other_response || '',
            });

            const savedAnswer = await entityManager.save(createdAnswer);
            answers.push(savedAnswer);
          }
        }
        return answers;
      },
    );
  }
}
