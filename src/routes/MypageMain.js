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
    Text,
    HStack,
  } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import HeatMap from 'react-heatmap-grid'
  
  
  export default function MypageMain() {
    const xLabels = new Array(52).fill(0).map((_, i) => `${i}`);
    const yLabels = ["일", "뭘", "화", "수", "목", "금", "토"];
    const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
        new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
    );
    //---------------마이페이지 메인--------------------
    return (
      <Box m={20}>
        <Text mt={10}>내가 쓴 게시글</Text>
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
  
        <Divider height={20} />
  
        <Text>내가 쓴 댓글</Text>
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
            <Link to="/mypage/edit">
                <Button>내 정보 수정</Button>
            </Link>
            <Button>내 친구</Button>
        </HStack>
        <Box mt={5}>
            <HeatMap xLabels={xLabels} yLabels={yLabels} data={data} />
        </Box>
      </Box>
    )
  }