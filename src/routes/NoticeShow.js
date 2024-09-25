import { Box, Button, Divider, Flex, HStack, Input, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteNotice } from "../api";

export default function NoticeShow() {
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState([]);
    const {noticeId} = useParams(); 
    const navigate = useNavigate(); 
    //useQuery 왜 안되냐
    //const [isLoading, datas] = useQuery([`board`,boardId] ,getBoard);
    
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8081/api/announces/${noticeId}`);
      const json = await response.json();
      setDatas(json);
      setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onDeleteButtonClick = () => {
        deleteNotice(noticeId);
        navigate('/notice/main');
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
                    </Box>
                    <HStack justify="flex-end">
                        <Link to={`/notice/edit/${noticeId}`}>
                            <Button>수정</Button>
                        </Link>
                        <Button onClick={onDeleteButtonClick}>삭제</Button>
                    </HStack>
                </Stack>
            </Flex>
        </>
    )
}