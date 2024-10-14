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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { editMyData, getEditMyData, nicknameCheck, signUp, usernameCheck } from '../api';
import { useForm } from 'react-hook-form';

export default function MypageEdit() {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameResult, setUsernameResult] = useState();
  const [nicknameResult, setNicknameResult] = useState();
  const [checkUserName, setCheckUserName] = useState(false);
  const [checkNickName, setCheckNickName] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const {register, handleSubmit} = useForm();
  
  const { isLoading: isMLoading, data: myData } = useQuery(['myData'], getEditMyData);
  console.log(myData);
  const mutation = useMutation(editMyData ,{
    onSuccess: (data) => {
      window.location.replace("/");
    }
  })
  const onSubmit = (data) => {
    mutation.mutate(data);
  };  

  useEffect(() => {
    setIsFormValid(!checkUserName && !checkNickName);
  }, [checkUserName, checkNickName]);
  
  const onUsernameCheckBtnClick = async () => {
    const username = document.getElementById("userNameInput").value;
    const result = usernameCheck(username);
    const json = await result;
    setCheckUserName(json.isDuplicate);
    {!checkUserName ? setUsernameResult("you can use it") : setUsernameResult("you can't use it")}
  }

  const onNicknameCheckBtnClick = async () => {
    const nickname = document.getElementById("nickNameInput").value;
    const result = nicknameCheck(nickname);
    const json = await result;
    setCheckNickName(json.isDuplicate);
    {!checkNickName ? setNicknameResult("you can use it") : setNicknameResult("you can't use it")}
  }

  const handleUsernameChange = () => {
    setCheckUserName(false);
    setUsernameResult('');
  };

  const handleNicknameChange = () => {
    setCheckNickName(false);
    setNicknameResult('');
  };

    //---------------내 정보 수정 페이지--------------------
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              개인정보 수정
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            {!isMLoading ? 
            <Stack 
              spacing={4}
              as='form'
              onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <HStack>
                  <FormControl id="loginId" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input 
                      {...register("loginId", {required: true})}
                      defaultValue={myData.loginId}
                      type="text"
                      required
                      id='userNameInput'
                      onChange={handleUsernameChange}
                    />
                  </FormControl>
                  <Button onClick={onUsernameCheckBtnClick}>중복확인</Button>
                </HStack>
                <Box>{usernameResult}</Box>
              </Box>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input 
                    {...register("password", {required: true})}
                    type={showPassword ? 'text' : 'password'} 
                    required
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="passwordCheck" isRequired>
                <FormLabel>Password Check</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <HStack>
                <FormControl id="nickname" isRequired>
                  <FormLabel>Nickname</FormLabel>
                  <Input 
                    {...register("nickname", {required: true})}
                    defaultValue={myData.nickname}
                    type="text"
                    required
                    id='nickNameInput'
                    onChange={handleNicknameChange}
                  />
                </FormControl>
                <Button onClick={onNicknameCheckBtnClick}>중복확인</Button>
              </HStack>
              <Box>{nicknameResult}</Box>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input 
                  {...register("email", {required: false})}
                  defaultValue={myData.email}
                  type="email"
                />
              </FormControl>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                  {...register("name", {required: true})}
                  defaultValue={myData.name}
                  type="text"
                  required
                />
              </FormControl>
              <FormControl id="phonenumber">
                <FormLabel>Phone Number</FormLabel>
                <Input 
                  {...register("phonenumber", {required: false})}
                  defaultValue={myData.phonenumber}
                  type="text"
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
                  }}
                  isDisabled={!isFormValid}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
            : null }
          </Box>
        </Stack>
      </Flex>
    );
}