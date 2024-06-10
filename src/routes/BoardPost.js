import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Textarea,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { uploadBoard } from '../api';

export default function BoardPost() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const mutation = useMutation(uploadBoard, {
        onSuccess: (data) => {
            console.log(data);
            navigate('/board/main');
        }
    })
    const onSubmit = (data) => {
        console.log(data);
        mutation.mutate(data);
    };  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        >
        <Stack spacing={8} mx={'auto'} py={12} px={6}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            w={800}
            >
            <Stack
              spacing={4}
              as='form'
              onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired>
                <FormLabel>제목</FormLabel>
                <Input 
                    {...register("title", {required: true})}
                    type="text"
                    required
                />
              </FormControl>
              <FormControl id="photo">
                <FormLabel>사진 등록</FormLabel>
                <Input 
                    {...register("picture")}
                    type='file'
                />
              </FormControl>
              <FormControl>
                <FormLabel>글 내용</FormLabel>
                <Textarea
                    {...register("content", {required: true})}
                />
              </FormControl>
              <FormControl>
                <Input
                    value="1"
                    {...register("id")}
                />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  type='submit'
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  등록
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        
        {mutation.isError ? (
            <Text>Someting wrong</Text>
        ): null}
      </Flex>
    )
}