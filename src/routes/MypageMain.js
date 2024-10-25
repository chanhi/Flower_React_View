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
    Stack,
    Radio,
    RadioGroup,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import HeatMap from 'react-heatmap-grid'
import { addFriend, delFriend, editDiaryStatus, getGrass, getHim, getRecentWriteBoard, getRecentWriteComment, isFriend } from '../api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Cookie from "js-cookie";
  
export default function MypageMain() {
  const xLabels = new Array(52).fill(0).map((_, i) => `${i}`);
  const yLabels = ["SUN", "MON", "TUS", "WED", "THR", "FRI", "SAT"];
  const setData = new Array(yLabels.length)
  .fill(0)
  .map(() =>new Array(xLabels.length).fill(0));

  const {userId} = useParams();
  const userCookie = Cookie.get("userInfo");
  const userInfo = userCookie ? JSON.parse(userCookie) : null;

  const { isLoading: isFLoading, data: isF } = useQuery(['isF', userId], () => isFriend(userId));
  const { isLoading: isBLoading, data: boardDatas } = useQuery(['boardDatas', userId], () => getRecentWriteBoard(userId));
  const { isLoading: isCLoading, data: commentDatas } = useQuery(['commentDatas', userId], () => getRecentWriteComment(userId));
  const { isLoading: isULoading, data: userDatas } = useQuery(['userDatas', userId], () => getHim(userId));
  const { isLoading: isGLoading, data: grassData } = useQuery(['grassData', userId], () => getGrass(userId));
  const [heatmapData, setHeatmapData] = useState(setData);

  //console.log(userDatas);
  // 날짜를 x, y 좌표로 변환하는 함수
  const getDayOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 0); // 그 해의 첫날
    const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000; 
    return Math.floor(diff / (1000 * 60 * 60 * 24)); // 연중 몇 번째 날인지 반환
  };

  // 데이터 변환 함수
  const transformData = (jsonData) => {
    const yearData = new Array(yLabels.length)
      .fill(0)
      .map(() => new Array(xLabels.length).fill(0));

    jsonData.forEach((item) => {
      const [year, month, day] = item.regdate;
      const date = new Date(year, month - 1, day); // 월은 0부터 시작하기 때문에 -1
      const dayOfYear = getDayOfYear(date);
      
      const weekIndex = Math.floor(dayOfYear / 7);  // 52주 중 몇 번째 주
      const dayIndex = date.getDay(); // 요일 인덱스 (일요일: 0, 월요일: 1, ..., 토요일: 6)

      // 해당 좌표에 count 값 넣기
      if (weekIndex < xLabels.length) {
        yearData[dayIndex][weekIndex] += item.count;  // 활동량을 더해줌
      }
    });

    return yearData;
  };

  useEffect(() => {
    if (grassData) {
      const transformedData = transformData(grassData);  // 실제로는 API로 받아온 데이터
      setHeatmapData(transformedData);
    }
  }, [grassData]);

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

  const diaryMutaion = useMutation(editDiaryStatus, {
      onSuccess: () => {
          alert('변경되었습니다!');
      },
      onError: (error) => {
          console.error('Error deleting comment:', error);
      },
  });

  const handleDiary = (value) => {
    diaryMutaion.mutate(value);
  };

  const colorSeletor = (value) => {
    if(value == 0){
      return 'rgba(0, 0, 0, 0.05)';
    } else if(value == 1){
      return 'rgb(0, 208, 78, 0.5)'
    } else {
      return 'rgb(0, 208, 78, 1)'
    }
  }

  //---------------마이페이지 메인--------------------
  return (
      <Box m={20}>
        {!isULoading ? 
        <HStack justifyContent={'space-between'}>
          <Box>
            <span style={{fontSize: '40px', verticalAlign: 'bottom'}}>{userDatas.nickname}</span>
            <span style={{fontSize: '20px', verticalAlign: 'bottom'}}> 님의 페이지</span>
          </Box>
          <Link to={`/diary/main/${userDatas.id}`}>
            <Button>일기장</Button>
          </Link>
        </HStack>
        
        : null}
        <Divider />
        <Text mt={10}>최근 쓴 게시글</Text>
        {!isBLoading && ! isULoading ? 
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
        : null}
  
        <Divider height={20} />
  
        <Text>최근 쓴 댓글</Text>
        {!isBLoading && ! isULoading ? 
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
        : null}
        <HStack marginTop={10} justifyContent="end">
          {!isULoading && userId == userInfo.id ? 
            <Stack alignItems={"flex-end"}>
              <HStack>
                <Box>
                <Text>일기장 공개 범위</Text>
                  <RadioGroup 
                    onChange={(value) => {
                      handleDiary(value);
                    }} 
                    defaultValue={`${userDatas.diaryispublic}`}>
                      <HStack>
                          <Radio value='2'>
                            전체 공개
                          </Radio>
                          <Radio value='1'>
                            친구 공개
                          </Radio>
                          <Radio value='0'>
                            비공개
                          </Radio>
                      </HStack>
                  </RadioGroup>
                </Box>
                
              </HStack>
              <Divider></Divider>
              <Link to={`/mypage/${userId}/edit`}>
                <Button>내 정보 수정</Button>
              </Link>
          </Stack>
          : null}
            {userId == userInfo.id ? null : 
              isF ? <Button onClick={handleFriendDel}>친구 삭제</Button> : <Button onClick={handleFriendAdd}>친구 추가</Button>
            }
        </HStack>
        <Box mt={5}>
          {!isGLoading ?
            <HeatMap
              xLabelsVisibility={true} 
              xLabels={xLabels} 
              yLabels={yLabels} 
              yLabelWidth={50}
              data={heatmapData} 
              height={22}
              cellStyle={(background, value, min, max, data, x, y) => ({
                background: `${colorSeletor(value)}`,
                fontSize: "11px",
              })}
            />
            : null }
        </Box>
      </Box>
  )
}