import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { Option } from 'src/entities/option.entity';
import { Answer } from 'src/entities/answer.entity';
import { SubmitAnswerInput } from 'src/dto/input/submitAnswer';
import { Survey } from 'src/entities/survey.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  public async create(submitAnswerInput: SubmitAnswerInput): Promise<Answer[]> {
    const answers: Answer[] = [];

    await this.validateAnswers(submitAnswerInput);

    return await this.answerRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        for (const questionAnswer of submitAnswerInput.question_answers) {
          const { questionId, options } = questionAnswer;

          const relatedQuestion = await entityManager.findOne(Question, {
            where: { id: questionId },
            relations: ['survey'],
          });

          const relatedOptions = await entityManager.find(Option, {
            where: { id: In(options.map((option) => option.optionId)) },
          });

          const survey = await this.surveyRepository.findOne({
            where: { id: relatedQuestion.survey.id },
          });

          for (const selectedOption of options) {
            const { optionId, otherResponse } = selectedOption;
            const relatedOption = relatedOptions.find(
              (option) => option.id === optionId,
            );

            const createdAnswer = entityManager.create(Answer, {
              question: relatedQuestion,
              option: relatedOption,
              other_response: otherResponse || '',
            });

            const savedAnswer = await entityManager.save(createdAnswer);
            answers.push(savedAnswer);
          }

          if (survey) {
            survey.answer_count += 1;
            await entityManager.save(survey);
          }
        }
        return answers;
      },
    );
  }

  private async validateAnswers(submitAnswerInput: SubmitAnswerInput) {
    for (const questionAnswer of submitAnswerInput.question_answers) {
      const { questionId, options } = questionAnswer;

      const relatedQuestion = await this.answerRepository.manager.findOne(
        Question,
        {
          where: { id: questionId },
        },
      );

      if (options.length === 0) {
        throw new BadRequestException(
          `質問 "${relatedQuestion.question_text}" に回答してください`,
        );
      }

      const relatedOptions = await this.answerRepository.manager.find(Option, {
        where: { id: In(options.map((option) => option.optionId)) },
      });

      let otherSelected = false;

      for (const selectedOption of options) {
        const { optionId, otherResponse } = selectedOption;
        const relatedOption = relatedOptions.find(
          (option) => option.id === optionId,
        );

        if (!relatedOption) {
          throw new BadRequestException(`無効な選択肢が含まれています。`);
        }

        if (relatedOption.option_text === 'その他') {
          if (!otherResponse) {
            throw new BadRequestException(
              `質問 "${relatedQuestion.question_text}" で「その他」を選択した場合はテキストを入力してください`,
            );
          }
          otherSelected = true;
        }
      }

      if (!otherSelected) {
        for (const selectedOption of options) {
          const { otherResponse } = selectedOption;
          if (otherResponse) {
            throw new BadRequestException(
              `質問 "${relatedQuestion.question_text}" で「その他」以外を選択した場合はテキストは入力しないでください`,
            );
          }
        }
      }
    }
  }
}
