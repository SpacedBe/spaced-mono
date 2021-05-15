import React from 'react';
import styled from '@emotion/styled';

import {checkInOut} from "../api/check-in-out";
import {useEffect, useState} from "react";

export async function getStaticProps(context) {
  const data = await checkInOut();

  return {
    props: { data }, // will be passed to the page component as props
  }
}

const StyledPage = styled.div`
  .page {
  }
`;

export function Index({data}) {
  const types = ['check-in', 'check-out'];

  const [currentType, setType] = useState(types[0]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = () => {
    if(questions[currentQuestionIndex + 1]) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
  }

  useEffect(() => {
    setCurrentQuestionIndex(0);

    setQuestions(data.filter((question) => {
      return question.type === currentType;
    }));
  }, [currentType]);

  const question = questions[currentQuestionIndex]?.question;

  return (
    <StyledPage style={{padding: '20px'}}>
      <ul>
        {types.map((type) => {
          return <li key={type}
                     style={{ color: type === currentType ? 'blue' : 'black' }}
                     onClick={() => {
                       setType(type)
                     }}>
            {type}
          </li>
        })}
      </ul>
      <h1 onClick={() => nextQuestion()}>
        {question}
      </h1>
    </StyledPage>
  )
}

export default Index;
