import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Divider,
  Box,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <Box>
      
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
      <Link to="/board/post">
        <Button>게시글 등록</Button> 
      </Link>

      <Divider height={20} />

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
    </Box>
  )
}