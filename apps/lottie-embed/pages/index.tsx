import React, { ReactNode, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import Link from 'next/link';

import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

import {
  Table,
  Th,
  Tr,
  Thead,
  Tbody,
  Td,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Button,
  ModalFooter,
  InputGroup,
  Input, ChakraProvider
} from '@chakra-ui/react';

type FileUploadProps = {
  handleChange: (value: any) => void,
  accept?: string
  multiple?: boolean
  children?: ReactNode
}

const FileUpload = (props: FileUploadProps) => {
  const { handleChange, accept, multiple, children } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick} onChange={handleChange}>
      <input
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        ref={(e) => {
          inputRef.current = e;
        }}
      />
      <>
        {children}
      </>
    </InputGroup>
  );
};

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firestore = useFirestore();

  const [color, setColor] = useColor('hex', '#121212');
  const [animation, setAnimation] = useState(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<any>();

  const animationsRef = firestore
    .collection('animations');

  const { data: animations } = useFirestoreCollectionData<any>(
    animationsRef, { initialData: [], idField: 'id' });


  const onSubmit = handleSubmit((data) => {
    animationsRef.add({
      ...data,
      animation,
      color
    });

    console.log({
      ...data,
      animation,
      color
    });

    onClose();
  });

  return (
    <ChakraProvider>
      <StyledPage>
        <h2>Tool voor embedden van van lottie files</h2>

        <Button onClick={onOpen}>Nieuwe animatie</Button>

        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Naam</Th>
              <Th>Achtergrond</Th>
              <Th isNumeric>Breedte</Th>
              <Th isNumeric>Hoogte</Th>
              <Th>Opties</Th>
            </Tr>
          </Thead>
          <Tbody>
            {animations.map((animation) => {
              return <Tr key={animation.id}>
                <Td>{animation.name}</Td>
                <Td>{animation.color?.hex}</Td>
                <Td>{animation.width}</Td>
                <Td>{animation.height}</Td>
                <Td>
                  <Link href={`/embed/${animation.id}`}>
                    <button>view</button>
                  </Link>
                </Td>
              </Tr>;
            })}
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={onSubmit}>
              <ModalHeader>Nieuwe animatie toevoegen</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isInvalid={!!errors.name} isRequired>
                  <FormLabel>{'Animatie naam'}</FormLabel>

                  <Input variant='flushed' type='text' {...register('name', { required: true })} />
                </FormControl>

                <FormControl isInvalid={!!errors.width} isRequired>
                  <FormLabel>{'Animatie breedte'}</FormLabel>

                  <Input variant='flushed' type='text' {...register('width', { required: true })} />
                </FormControl>

                <FormControl isInvalid={!!errors.width} isRequired>
                  <FormLabel>{'Animatie hoogte'}</FormLabel>

                  <Input variant='flushed'
                         type='text' {...register('height', { required: true })} />
                </FormControl>

                <FormControl>
                  <FormLabel>{'Lottie upload'}</FormLabel>

                  <FileUpload
                    accept={'application/json'}
                    multiple={false}
                    handleChange={(e) => {
                      const fileReader = new FileReader();
                      fileReader.readAsText(e.target.files[0], 'application/json');
                      fileReader.onload = e => {
                        setAnimation(e.target.result);
                      };
                    }}>
                    <Button>
                      Upload
                    </Button>
                  </FileUpload>
                </FormControl>

                <FormLabel>{'Achtergrond'}</FormLabel>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Sluit
                </Button>
                <Button variant='ghost' type={'submit'}>toevoegen</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </StyledPage>
    </ChakraProvider>
  );
}

export default Index;
