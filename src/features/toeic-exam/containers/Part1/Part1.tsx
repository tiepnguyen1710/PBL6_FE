// containers/Part1Container.tsx
import React, { useState } from 'react';
import { Question as QuestionType } from '../../../../types/exam';
import Content from '../../../../components/layout/Content';

const Part1Questions: QuestionType[] = [
  {
    id: 1,
    questionText: 'What is the man doing?',
    choices: [
      { id: 1, text: 'He is talking on the phone.' },
      { id: 2, text: 'He is reading a newspaper.' },
      { id: 3, text: 'He is eating lunch.' },
      { id: 4, text: 'He is typing on a computer.' },
    ],
  },
  {
    id: 2,
    questionText: 'Where is the woman standing?',
    choices: [
      { id: 1, text: 'In a park.' },
      { id: 2, text: 'At a bus stop.' },
      { id: 3, text: 'In an office.' },
      { id: 4, text: 'At a restaurant.' },
    ],
  },
];

const Part1: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>(Part1Questions);

  return (
    <Content>
      {questions.length > 0 && 
        questions.map((question, index) => {
            return (
                <div key={index}>
                  <div>{question.questionText}</div>
                  <ul>
                    {question.choices.map((choice, choiceIndex) => (
                      <li key={choiceIndex}>{choice.text}</li>
                    ))}
                  </ul>
                </div>
            );
        })
      }
      
    </Content>
  );
};

export default Part1;

