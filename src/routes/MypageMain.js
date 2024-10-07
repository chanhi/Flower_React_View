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
import { Link, useParams } from 'react-router-dom';
import HeatMap from 'react-heatmap-grid'
import { isFriend } from '../api';
import { useQuery } from '@tanstack/react-query';
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
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const [isCLoading, setCIsLoading] = useState(true);
  const [commentDatas, setCommentDatas] = useState([]);
  const [isULoading, setUIsLoading] = useState(true);
  const [userDatas, setUserDatas] = useState([]);
  const userInfo = JSON.parse(Cookie.get("userInfo"));

  const { isLoading: isFLoading, data: isF } = useQuery(['isF', userId], () => isFriend(userId));
  console.log(isF);

  const fetchBoard = async () => {
    const response = await fetch(`http://localhost:8081/api/mypage/${userId}/recentfreeboard`);
    const json = await response.json();
    setDatas(json);
    setIsLoading(false);
  }

  const fetchComment = async () => {
    const response = await fetch(`http://localhost:8081/api/mypage/${userId}/recentfreeboardcomment`);
    const json = await response.json();
    setCommentDatas(json);
    setCIsLoading(false);
  }

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:8081/api/mypage/${userId}/userinfo`);
    const json = await response.json();
    setUserDatas(json);
    setUIsLoading(false);
  }

  useEffect(() => {
    fetchBoard();
    fetchComment();
    fetchUser();
  }, []);
  console.log(datas);
  console.log(commentDatas);
  console.log(userDatas);

  const fetchFriendAdd = async () => {
    const response = await fetch(`http://localhost:8081/api/friend/add/${userId}`);
  }

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
              {datas?.map((data)=>(
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
            <Link to={`/mypage/${userDatas.id}/edit`}>
                <Button>내 정보 수정</Button>
            </Link>
            <Button>내 친구</Button>
            {!isF ? <Button onClick={fetchFriendAdd}>친구 추가</Button> :null}
        </HStack>
        <Box mt={5}>
            <HeatMap xLabels={xLabels} yLabels={yLabels} data={data} />
        </Box>
      </Box>
  )
}