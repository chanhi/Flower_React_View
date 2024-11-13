import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Divider,
  Box,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getAnnounceRecentList, getBoardRecentList } from '../api';
import BoradSkeleton from '../components/BoardSkeleton';

export default function Home() {
  //--------------------------메인 페이지--------------------------------
  const {data: bData, isLoading: bLoading} = useQuery(["boardList"], getBoardRecentList);
  const {data: aData, isLoading: aLoading} = useQuery(["noticeList"], getAnnounceRecentList);
  console.log(aData);
  
  return (
    <Box mx={100} mt={10}>
      <TableContainer>
        <Table variant='simple'>
          <Thead borderBottomWidth={2}>
            <Tr>
              <Th w={'10%'}>No.</Th>
              <Th w={'55%'}>제목</Th>
              <Th textAlign={'center'}>작성자</Th>
              <Th textAlign={'center'}>날짜</Th>
            </Tr>
          </Thead>
          <Tbody>
          {bLoading? (
            <>
              <BoradSkeleton />
            </>
          ) : null}
          {bData?.map((data)=>(
            <Tr key={data.id}>
              <Td>{data.id}</Td>
              <Td>
                <Link to={`/board/show/${data.id}`}>{data.title}</Link>
              </Td>
              <Td>
                <Link to={`/mypage/${data.user.id}/main`}>
                  {data.user.nickname}
                </Link>
              </Td>
              <Td textAlign={'center'}>{data.regdate}</Td>
            </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Divider height={20} />

      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th w={'10%'}>No.</Th>
              <Th w={'55%'}>제목</Th>
              <Th>내용</Th>
            </Tr>
          </Thead>
          <Tbody>
            {aLoading? (
              <>
                <BoradSkeleton />
              </>
            ) : null}
            {aData?.map((data)=>(
            <Tr key={data.id}>
              <Td>{data.id}</Td>
              <Td>
                <Link to={`/notice/show/${data.id}`}>{data.title}</Link>
              </Td>
              <Td>{data.content.length > 20 ? `${data.content.slice(0, 20)}...` : data.content}</Td>
            </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}