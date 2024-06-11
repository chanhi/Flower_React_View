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
  Button,
  HStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <Box m={10}>
      
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
            <Tr>
              <Td>00001</Td>
              <Td>게시글 제목1</Td>
              <Td>ㅁㅁㅁ</Td>
              <Td isNumeric>2024-06-13</Td>
            </Tr>
            <Tr>
              <Td>00001</Td>
              <Td>게시글 제목1</Td>
              <Td>ㅁㅁㅁ</Td>
              <Td isNumeric>2024-06-13</Td>
            </Tr>
            <Tr>
              <Td>00001</Td>
              <Td>게시글 제목1</Td>
              <Td>ㅁㅁㅁ</Td>
              <Td isNumeric>2024-06-13</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack justifyContent="end">
        <Link to="/board/post">
          <Button>게시글 등록</Button> 
        </Link>
      </HStack>

      <Divider height={20} />

      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>게시글</Th>
              <Th>작성자</Th>
              <Th isNumeric>날짜</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>00001</Td>
              <Td>게시글 제목1</Td>
              <Td>ㅁㅁㅁ</Td>
              <Td isNumeric>2024-06-13</Td>
            </Tr>
            <Tr>
              <Td>00001</Td>
              <Td>게시글 제목1</Td>
              <Td>ㅁㅁㅁ</Td>
              <Td isNumeric>2024-06-13</Td>
            </Tr>
            <Tr>
              <Td>00001</Td>
              <Td>게시글 제목1</Td>
              <Td>ㅁㅁㅁ</Td>
              <Td isNumeric>2024-06-13</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}