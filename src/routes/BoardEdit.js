import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Text,
    useColorModeValue,
    Textarea,
  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { editBoard } from '../api';
import { useEffect, useState } from 'react';

export default function BoardEdit() {
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState([]);
    const {boardId} = useParams();  
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const mutation = useMutation(editBoard, {
        onSuccess: (data) => {
            navigate('/board/main', {replace: true});
            //window.location.replace("/board/main");
        }
    })
    const onSubmit = (data) => {
        console.log(data);
        mutation.mutate({variables: data, id: boardId});
    };  
    const fetchData = async () => {
        const response = await fetch(`http://localhost:8081/api/freeboard/${boardId}`);
        const json = await response.json();
        setDatas(json);
        setIsLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, []);
    //---------------게시글 등록 페이지--------------------
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
                    defaultValue={datas.title}
                    {...register("title", {required: true})}
                    type="text"
                    required
                />
              </FormControl>
              <FormControl id="photo">
                <FormLabel>사진 등록</FormLabel>
                <Input 
                    {...register("pictures")}
                    type='file'
                    multiple
                />
              </FormControl>
              <FormControl>
                <FormLabel>글 내용</FormLabel>
                <Textarea
                    defaultValue={datas.content}
                    {...register("content", {required: true})}
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
                  수정
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