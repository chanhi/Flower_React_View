import { Button, Center, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BoardMain() {
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState([]);
    const fetchData = async () => {
      const response = await fetch("http://localhost:8081/api/posts");
      const json = await response.json();
      setDatas(json);
      setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);
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
                    {datas.map((data)=>(
                        <Tr>
                        <Td>{data.id}</Td>
                        <Td>
                            <Link to="/board/show">{data.title}</Link>
                            {/*아이디 기준으로 해당 게시글로 이동하도록 prop 설정해야 됨*/}
                        </Td>
                        <Td>{data.userid}</Td>
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