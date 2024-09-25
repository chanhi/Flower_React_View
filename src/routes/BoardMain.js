import { Button, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getBoardList } from "../api";
import BoradSkeleton from "../components/BoardSkeleton";

export default function BoardMain() {
    const {isLoading, data} = useQuery(["boardList"], getBoardList);
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
                    <Th isNumeric>날짜</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {isLoading? (
                        <>
                            <BoradSkeleton />
                        </>
                    ) : null}
                    {data?.map((data)=>(
                        <Tr>
                            <Td>{data.id}</Td>
                            <Td>
                                <Link to={`/board/show/${data.id}`}>{data.title}</Link>
                                {/*아이디 기준으로 해당 게시글로 이동하도록 prop 설정해야 됨*/}
                            </Td>
                            <Td>{data.user.name}</Td>
                            <Td isNumeric>{data.regdate}</Td>
                        </Tr>
                    ))}
                </Tbody>
                </Table>
            </TableContainer>
            
            <Link to="/board/post">
                <Button>게시글 등록</Button> 
            </Link>
        </Stack>
    )
}