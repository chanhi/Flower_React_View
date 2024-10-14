import { Box, Button, Divider, Flex, FormControl, HStack, Input, Spinner, Stack, Text, Textarea, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDiary, getDiary } from "../api";
import { StarIcon } from "@chakra-ui/icons";
import Cookie from "js-cookie";

export default function DiaryShow() {
    const {diaryId} = useParams(); 
    const navigate = useNavigate(); 
    const userCookie = Cookie.get("userInfo");
    const userInfo = userCookie ? JSON.parse(userCookie) : null;
    const userId = userInfo.id;
    const { isLoading, data, error } = useQuery(
        ['diaryData', userId, diaryId],  // 쿼리 키
        () => getDiary(userId, diaryId)  // 쿼리 함수
    );
    console.log(data);
    
    const onDeleteButtonClick = () => {
        deleteDiary(diaryId, userId);
        //const response = await fetch(`http://localhost:8081/api/freeboard/${boardId}/delete`, {method: 'DELETE'});
        navigate('/diary/main');
    }
    //---------------게시글 상세 페이지--------------------
    return(
        <>
            <Flex
                minH={'100vh'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} w="100%" py={12} px={6}>
                    {isLoading ? null : 
                    <HStack justify="space-between" px={5}>
                        <Text fontSize={'lg'} color={'gray.600'}>
                        제목: {data.title}
                        </Text>
                        <HStack>
                            <Text>
                                작성자: {data.user.nickname}
                            </Text>:
                            <Text>
                                작성일: {data.regdate}
                            </Text>
                        </HStack>
                    </HStack>
                    }
                    
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'sm'}
                        p={8}>
                        {isLoading ? null : <Box>
                            {data.content}
                            {data.pictureBase64List ? data.pictureBase64List.map((picture)=>(
                                <img src={"data:image/jpeg;base64," + picture}/>
                            )) : null}
                        </Box>}
                    </Box>
                    {!isLoading ? 
                    <HStack justify="flex-end">
                        {userId == data.user.id ? 
                        <HStack>
                            <Link to={`/diary/edit/${diaryId}`}>
                                <Button>수정</Button>
                            </Link>
                            <Button onClick={onDeleteButtonClick}>삭제</Button>
                        </HStack> 
                        : null}
                        <Link to={`/diary/main`}>
                            <Button>목록</Button>
                        </Link>
                    </HStack>
                    :null}
                </Stack>
            </Flex>
        </>
    )
}
