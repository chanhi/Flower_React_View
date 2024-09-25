import { Box, Button, Divider, Flex, FormControl, HStack, Input, Stack, Text, Textarea, useColorModeValue } from "@chakra-ui/react";
import { defaultContext, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBoard, uploadComment, uploadReComment } from "../api";
import { StarIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

export default function BorderShow() {
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState([]);
    const [isCLoading, setCIsLoading] = useState(true);
    const [commentDatas, setCommentDatas] = useState([]);
    const {boardId} = useParams(); 
    const {register, handleSubmit} = useForm({defaultValues: {"cmPostId": boardId}});
    const navigate = useNavigate(); 
    //useQuery 왜 안되냐
    //const [isLoading, datas] = useQuery([`board`,boardId] ,getBoard);
    
    const mutation = useMutation(uploadComment, {
        onSuccess: (data) => {
            //navigate('/board/main', {replace: true});
            window.location.reload()
            //오류가 너무 생김 너무 일찌 리로딩 해서 생기는 문제 같은데
        }
    })
    const onSubmit = (data) => {
        console.log(data);
        mutation.mutate(data);
    };  

    const fetchData = async () => {
      const response = await fetch(`http://localhost:8081/api/freeboard/${boardId}`);
      const json = await response.json();
      setDatas(json);
      setIsLoading(false);
    }

    const fetchComment = async () => {
        const response = await fetch(`http://localhost:8081/api/freeboardcomment/${boardId}`);
        const json = await response.json();
        setCommentDatas(json);
        setCIsLoading(false);
    }

    useEffect(() => {
        fetchData();
        fetchComment();
    }, []);

    const onLikeButtonClick = () => {
        //좋아요
    }

    const onDeleteButtonClick = () => {
        //const response = await fetch(`http://localhost:8081/api/freeboard/${boardId}/delete`, {method: 'DELETE'});
        deleteBoard(boardId);
        navigate('/board/main');
    }

    const onClickReCommentCreate = (e) => {
        let i = e.target.parentElement.children[1].hidden;
        i = !i;
        e.target.parentElement.children[1].hidden = i;
    }
    //---------------게시글 상세 페이지--------------------
    return(
        <>
            <Flex
                minH={'100vh'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} w="100%" py={12} px={6}>
                    <HStack justify="space-between" px={5}>
                        <Text fontSize={'lg'} color={'gray.600'}>
                        제목: {datas.title}
                        </Text>
                        <HStack>
                            <Text>
                                좋아요: {datas.likeCount}
                            </Text>:
                            <Text>
                                작성일: {datas.regdate}
                            </Text>
                        </HStack>
                    </HStack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'sm'}
                        p={8}>
                            {datas.content}
                            {datas.pictureBase64List ? datas.pictureBase64List.map((picture)=>(
                                <img src={"data:image/jpeg;base64," + picture}/>
                            )) : null}
                            <Stack align="center">
                                <Button 
                                    w={100} h={20}
                                    onClick={onLikeButtonClick}>
                                    <Stack align="center">
                                        <StarIcon />
                                        <Text>좋아요</Text>
                                    </Stack>
                                </Button>
                            </Stack>
                    </Box>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'sm'}
                        p={8}>
                            <Box>댓글</Box>
                            <HStack 
                                as="form" mb={7} 
                                id="commentForm" 
                                onSubmit={handleSubmit(onSubmit)}>
                                <FormControl>
                                    <Textarea 
                                        {...register("content", {required: true})}
                                        type="text"
                                        required/>
                                </FormControl>
                                <Button 
                                    type="submit"
                                    _hover={{
                                        bg: 'blue.500',
                                      }}>
                                        입력
                                </Button>
                            </HStack>
                            <Stack>
                                <Box>
                                    {commentDatas ? commentDatas.map((data) => (
                                        <Stack mb={4}>
                                            <Divider borderColor={"black"} />
                                            <Box>{data.user.loginId}</Box>
                                            <HStack justifyContent={"space-between"}>
                                                <Box>{data.content}</Box>
                                                <HStack>
                                                    <Box>{data.regdate}</Box>
                                                    <Button size="sm">수정</Button>
                                                    <Button size="sm" color={"red"}>삭제</Button>
                                                </HStack>
                                            </HStack>
                                            <Stack justifyContent={"space-between"}>
                                                <Button onClick={onClickReCommentCreate} w={20} size="sm">답글 달기</Button>
                                                <HStack 
                                                    hidden={true}
                                                    as='form'
                                                    >
                                                    <Input 
                                                        size={'sm'} 
                                                        type="text"
                                                        required/>
                                                    <Button type="submit" size="sm">확인</Button>
                                                </HStack>
                                            </Stack>
                                            {data.recomments ? data.recomments.map((rdata) => (
                                                <HStack>
                                                    <Box w={10}></Box>
                                                    <Stack my={4} w="100%">
                                                        <Divider borderColor={"black"} />
                                                        <Box>{rdata.user.loginId}</Box>
                                                        <HStack justifyContent={"space-between"}>
                                                            <Box>{rdata.content}</Box>
                                                            <HStack>
                                                                <Box>{rdata.regdate}</Box>
                                                                <Button size="sm">수정</Button>
                                                                <Button size="sm" color={"red"}>삭제</Button>
                                                            </HStack>
                                                        </HStack>
                                                        <Stack justifyContent={"space-between"}>
                                                            <Button onClick={onClickReCommentCreate} w={20} size="sm">답글 달기</Button>
                                                            <HStack hidden={true}>
                                                                <Input  size={'sm'} />
                                                                <Button size="sm">확인</Button>
                                                            </HStack>
                                                        </Stack>
                                                    </Stack>
                                                </HStack>
                                            )) : null}
                                        </Stack>
                                    )) : null}
                                </Box>
                            </Stack>
                    </Box>
                    <HStack justify="flex-end">
                        <Link to={`/board/edit/${boardId}`}>
                            <Button>수정</Button>
                        </Link>
                        <Button onClick={onDeleteButtonClick}>삭제</Button>
                    </HStack>
                </Stack>
            </Flex>
        </>
    )
}