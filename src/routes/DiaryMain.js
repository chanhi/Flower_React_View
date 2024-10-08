import { Button, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getDiariesList } from "../api";
import BoradSkeleton from "../components/BoardSkeleton";
import Cookie from "js-cookie";

export default function DiaryMain() {
    const userCookie = Cookie.get("userInfo");
    const userInfo = userCookie ? JSON.parse(userCookie) : null;
    const { isLoading, data } = useQuery(['diaryData', userInfo.id], () => getDiariesList(userInfo.id));
    
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
                </Tbody>
                </Table>
            </TableContainer>
            
            <Link to="/diary/post">
                <Button>일기장 등록</Button> 
            </Link>
        </Stack>
    )
}