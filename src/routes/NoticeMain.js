import { Button, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAnnounceList } from "../api";
import BoradSkeleton from "../components/BoardSkeleton";
import Cookie from "js-cookie";

export default function NoticeMain() {
    const {isLoading, data} = useQuery(["noticeList"], getAnnounceList);
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
                    <Th></Th>
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
                                <Link to={`/notice/show/${data.id}`}>{data.title}</Link>
                                {/*아이디 기준으로 해당 게시글로 이동하도록 prop 설정해야 됨*/}
                            </Td>
                            <Td>{data.content}</Td>
                            
                        </Tr>
                    ))}
                </Tbody>
                </Table>
            </TableContainer>
            {userInfo.role == "ADMIN" ? 
            <Link to="/notice/post">
                <Button>공지사항 등록</Button> 
            </Link>
            : null}
        </Stack>
    )
}