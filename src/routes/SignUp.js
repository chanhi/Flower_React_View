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
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { signUp, usernameCheck, nicknameCheck } from '../api';
  
  export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [usernameResult, setUsernameResult] = useState();
    const [nicknameResult, setNicknameResult] = useState();
    const [checkUserName, setCheckUserName] = useState(true);
    const [checkNickName, setCheckNickName] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);
    const {register, handleSubmit} = useForm();
    //const navigate = useNavigate();
    const mutation = useMutation(signUp ,{
      onSuccess: (data) => {
        //navigate('/', {replace: true});
        window.location.replace("/");
      }
    })
    const onSubmit = (data) => {
      mutation.mutate(data);
    };  
    
    const onUsernameCheckBtnClick = async () => {
      const username = document.getElementById("userNameInput").value;
      const result = usernameCheck(username);
      const json = await result;
      setCheckUserName(json.isDuplicate);
      setUsernameResult(json.isDuplicate ? "you can't use it" : "you can use it");
    }

    const onNicknameCheckBtnClick = async () => {
      const nickname = document.getElementById("nickNameInput").value;
      const result = nicknameCheck(nickname);
      const json = await result;
      setCheckNickName(json.isDuplicate);
      setNicknameResult(json.isDuplicate ? "you can't use it" : "you can use it");
    }

    const handleUsernameChange = () => {
      setCheckUserName(true);
      setUsernameResult();
      setIsFormValid(false);
    };
  
    const handleNicknameChange = () => {
      setCheckNickName(true);
      setNicknameResult();
      setIsFormValid(false);
    };

    useEffect(() => {
      setIsFormValid(!checkUserName && !checkNickName);
    }, [checkUserName, checkNickName]);

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
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
                  type="email"
                />
              </FormControl>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                  {...register("name", {required: true})}
                  type="text"
                  required
                />
              </FormControl>
              <FormControl id="phonenumber">
                <FormLabel>Phone Number</FormLabel>
                <Input 
                  {...register("phonenumber", {required: false})}
                  type="text"
                />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isDisabled={!isFormValid}
                  loadingText="Submitting"
                  type='submit'
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }