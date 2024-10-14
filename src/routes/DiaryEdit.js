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
    RadioGroup,
    HStack,
    Radio,
  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { editDiary, getDiary } from '../api';
import Cookie from "js-cookie";

export default function DiaryEdit() {
    const {diaryId} = useParams();  
    const {register, handleSubmit, setValue} = useForm();
    const navigate = useNavigate();
    const userCookie = Cookie.get("userInfo");
    const userInfo = userCookie ? JSON.parse(userCookie) : null;
    const userId = userInfo.id;
    const { isLoading, data, error } = useQuery(
        ['diaryData', userId, diaryId],  // 쿼리 키
        () => getDiary(userId, diaryId)  // 쿼리 함수
    );
    const mutation = useMutation(editDiary, {
        onSuccess: (data) => {
            navigate('/diary/main', {replace: true});
            //window.location.replace("/board/main");
        }
    })
    const onSubmit = (data) => {
        console.log(data);
        mutation.mutate({variables: data, id: diaryId, userId: userId});
    };  
    
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
            {isLoading ? null :
            <Stack
              spacing={4}
              as='form'
              onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired>
                <FormLabel>제목</FormLabel>
                <Input 
                    defaultValue={data.title}
                    {...register("title", {required: true})}
                    type="text"
                    required
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>공개 범위</FormLabel>
                <RadioGroup defaultValue={data.disable ? '2' : '1'}>
                  <HStack>
                      <Radio 
                        value='1' 
                        {...register("disable", {required: true})}
                        onChange={() => setValue("disable", false)}>
                        공개
                      </Radio>
                      <Radio
                        value='2'
                        {...register("disable", {required: true})}
                        onChange={() => setValue("disable", true)}>
                      비공개
                      </Radio>
                  </HStack>
                </RadioGroup>
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
                    defaultValue={data.content}
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
            }
          </Box>
        </Stack>
        {mutation.isError ? (
            <Text>Someting wrong</Text>
        ): null}
      </Flex>
    )
}