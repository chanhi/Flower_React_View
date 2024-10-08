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
    Text,
    HStack,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import HeatMap from 'react-heatmap-grid'
import { addFriend, delFriend, getGrass, getHim, getRecentWriteBoard, getRecentWriteComment, isFriend } from '../api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Cookie from "js-cookie";
  
export default function MypageMain() {
  const xLabels = new Array(52).fill(0).map((_, i) => `${i}`);
  const yLabels = ["일", "월", "화", "수", "목", "금", "토"];
  //const test = new Array(365).fill(0);
  const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
  );

  const {userId} = useParams();
  const userCookie = Cookie.get("userInfo");
  const userInfo = userCookie ? JSON.parse(userCookie) : null;

  const { isLoading: isFLoading, data: isF } = useQuery(['isF', userId], () => isFriend(userId));
  const { isLoading: isBLoading, data: boardDatas } = useQuery(['boardDatas', userId], () => getRecentWriteBoard(userId));
  const { isLoading: isCLoading, data: commentDatas } = useQuery(['commentDatas', userId], () => getRecentWriteComment(userId));
  const { isLoading: isULoading, data: userDatas } = useQuery(['userDatas', userId], () => getHim(userId));
  const { isLoading: isGLoading, data: grassData } = useQuery(['grassData', userId], () => getGrass(userId));
  console.log(grassData);

  const addMutation = useMutation(addFriend, {
      onSuccess: () => {
          window.location.reload();  // 성공 시 페이지 새로고침
      },
      onError: (error) => {
          console.error('Error deleting comment:', error);
      },
  });

  const handleFriendAdd = () => {
    addMutation.mutate(userId);
  };

  const delMutation = useMutation(delFriend, {
      onSuccess: () => {
          window.location.reload();  // 성공 시 페이지 새로고침
      },
      onError: (error) => {
          console.error('Error deleting comment:', error);
      },
  });

  const handleFriendDel = () => {
    delMutation.mutate(userId);
  };

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
              {boardDatas?.map((data)=>(
              <Tr key={data.id}>
                <Td>{data.id}</Td>
                <Td>
                  <Link to={`/board/show/${data.id}`}>{data.title}</Link>
                  {/*아이디 기준으로 해당 게시글로 이동하도록 prop 설정해야 됨*/}
                </Td>
                <Td>
                  {userDatas.nickname}
                </Td>
                <Td isNumeric>{data.regdate}</Td>
              </Tr>
              ))}
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
                <Th>댓글</Th>
                <Th>작성자</Th>
                <Th isNumeric>날짜</Th>
              </Tr>
            </Thead>
            <Tbody>
              {commentDatas?.map((data)=>(
              <Tr key={data.id}>
                <Td>{data.id}</Td>
                <Td>
                  <Link to={`/board/show/${data.cmPostId}`}>{data.content}</Link>
                  {/*아이디 기준으로 해당 게시글로 이동하도록 prop 설정해야 됨*/}
                </Td>
                <Td>
                  {userDatas.nickname}
                </Td>
                <Td isNumeric>{data.regdate}</Td>
              </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <HStack justifyContent="end">
          {userId == userInfo.id ? 
            <Link to={`/mypage/${userId}/edit`}>
              <Button>내 정보 수정</Button>
            </Link>
          : null}
            {userId == userInfo.id ? null : 
              isF ? <Button onClick={handleFriendDel}>친구 삭제</Button> : <Button onClick={handleFriendAdd}>친구 추가</Button>
            }
        </HStack>
        <Box mt={5}>
            <HeatMap xLabels={xLabels} yLabels={yLabels} data={data} />
        </Box>
      </Box>
  )
}