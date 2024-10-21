import { Button, Input, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getFriends } from "../api";
import BoradSkeleton from "../components/BoardSkeleton";

export default function FriendSearch() {
    const {isLoading, data} = useQuery(["friend"], getFriends);
    console.log(data);
    //친구 데이터 정리 필요
    //---------------게시글 리스트 페이지--------------------
    return(
        <Stack>
            <Input />
            <TableContainer>
                <Table variant='simple'>
                <Thead>
                    <Tr>
                    <Th>No.</Th>
                    <Th>친구</Th>
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
                                <Link to={`/mypage/${data.id}/main`}>{data.nickname}</Link>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
                </Table>
            </TableContainer>
        </Stack>
    )
}