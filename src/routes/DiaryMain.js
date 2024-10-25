import { Button, Heading, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getDiariesList } from "../api";
import BoradSkeleton from "../components/BoardSkeleton";
import Cookie from "js-cookie";

export default function DiaryMain() {
    const {userId} = useParams();
    const { isLoading, data, error } = useQuery(['diaryDatas', userId], () => getDiariesList(userId));
    const userCookie = Cookie.get("userInfo");
    const userInfo = userCookie ? JSON.parse(userCookie) : null;
    
    //---------------게시글 리스트 페이지--------------------
    return(
        <Stack>
            <TableContainer>
                <Table variant='simple'>
                <Thead>
                    <Tr>
                    <Th>No.</Th>
                    <Th>제목</Th>
                    <Th>작성자</Th>
                    <Th>날짜</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {isLoading? (
                        <>
                            <BoradSkeleton />
                        </>
                    ) : null}
                    {data?.map((data)=>(
                        <Tr key={data.id}>
                            <Td>{data.id}</Td>
                            <Td>
                                <Link to={`/diary/show/${data.id}`}>{data.title}</Link>
                            </Td>
                            <Td>{data.user.nickname}</Td>
                            <Td>{data.regdate}</Td>
                        </Tr>
                    ))}
                    {error ? <Heading>권한이 없습니다</Heading> : null}
                    
                </Tbody>
                </Table>
            </TableContainer>
            {userInfo.id == userId ? 
            <Link to="/diary/post">
                <Button>일기장 등록</Button> 
            </Link>
            :null}
        </Stack>
    )
}