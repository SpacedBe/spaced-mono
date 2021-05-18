import React from 'react';
import styled from '@emotion/styled';

import { checkInOut } from '../api/check-in-out';
import { useEffect, useState } from 'react';
import { Flex, Heading, Button } from '@chakra-ui/react';

export async function getStaticProps(context) {
  const data = await checkInOut();

  return {
    props: { data } // will be passed to the page component as props
  };
}

const StyledPage = styled.div`
  .page {
  }
`;

export function Index({ data }) {
  const types = ['check-in', 'check-out'];

  const [currentType, setType] = useState(types[0]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = () => {
    if (questions[currentQuestionIndex + 1]) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
  };

  useEffect(() => {
    setCurrentQuestionIndex(0);

    setQuestions(data.filter((question) => {
      return question.type === currentType;
    }));
  }, [currentType]);

  const question = questions[currentQuestionIndex]?.question;

  return (
    <Flex height="100vh" p={20} flexFlow="column" bg="gray.100">
      <Heading as="h2" size="2xl" mb={4} >Spaced check-in/out 🚀</Heading>
      <Flex>
        {types.map((type) => {
          return <Heading as="h3"
                          mr={10}
                          mb={6}
                          size="md"
                          key={type}
                          style={{
                            color: type === currentType ? 'tomato' : 'black',
                            textDecoration: type === currentType ? 'underline' : ''
                          }}
                          onClick={() => {
                            setType(type);
                          }}>
            {type}
          </Heading>;
        })}
      </Flex>
      <Flex height="50vh" direction="column" p={12} rounded={6} alignItems="center" justifyContent="center">
        <Heading>{question}</Heading>
        <Button mt={8} onClick={() => nextQuestion()} colorScheme="red" variant="solid" size="lg">
          shuffle
        </Button>
      </Flex>
    </Flex>
  );
}

export default Index;
