import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { Option } from 'src/entities/option.entity';
import { Answer } from 'src/entities/answer.entity';
import { SubmitAnswerInput } from 'src/dto/input/submitAnswer';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  public async create(submitAnswerInput: SubmitAnswerInput): Promise<Answer[]> {
    const answers: Answer[] = [];

    for (const questionAnswer of submitAnswerInput.question_answers) {
      const { question_id, options } = questionAnswer;

      const relatedQuestion = await this.answerRepository.manager.findOne(
        Question,
        {
          where: { id: question_id },
        },
      );

      if (options.length === 0) {
        throw new BadRequestException(
          `質問 "${relatedQuestion.question_text}" に回答してください`,
        );
      }

      const relatedOptions = await this.answerRepository.manager.find(Option, {
        where: { id: In(options.map((option) => option.option_id)) },
      });

      let otherSelected = false;

      for (const selectedOption of options) {
        const { option_id, other_response } = selectedOption;
        const relatedOption = relatedOptions.find(
          (option) => option.id === option_id,
        );

        if (!relatedOption) {
          throw new BadRequestException(`無効な選択肢が含まれています。`);
        }

        if (relatedOption.option_text === 'その他') {
          if (!other_response) {
            throw new BadRequestException(
              `質問 "${relatedQuestion.question_text}" で「その他」を選択した場合はテキストを入力してください`,
            );
          }
          otherSelected = true;
        }
      }

      if (!otherSelected) {
        for (const selectedOption of options) {
          const { other_response } = selectedOption;
          if (other_response) {
            throw new BadRequestException(
              `質問 "${relatedQuestion.question_text}" で「その他」以外を選択した場合はテキストは入力しないでください`,
            );
          }
        }
      }
    }

    return await this.answerRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        for (const questionAnswer of submitAnswerInput.question_answers) {
          const { question_id, options } = questionAnswer;

          const relatedQuestion = await entityManager.findOne(Question, {
            where: { id: question_id },
          });

          const relatedOptions = await entityManager.find(Option, {
            where: { id: In(options.map((option) => option.option_id)) },
          });

          for (const selectedOption of options) {
            const { option_id, other_response } = selectedOption;

            const relatedOption = relatedOptions.find(
              (option) => option.id === option_id,
            );

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
