import { Box, HStack, Spinner, Stack} from "@chakra-ui/react";
import MyplantController from "../components/MyplantController";
import { getIPAddress, getSensorData } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import StreamSkeleton from "../components/StreamSkeleton";

export default function MyPlant() {
    const { isLoading: isIPLoading, data: ip } = useQuery(['ip'], getIPAddress);
    const navigate = useNavigate();
    if(!isIPLoading && ip.ip == 0){
      alert("할당된 식물이 없습니다. 관리자에게 문의하세요.");
      navigate("/");
    }
    const { isLoading: isSLoading, data: sensorData } = useQuery(
      ['sensorData', ip],
      () => getSensorData(ip.ip),
      {
        enabled: !!ip, // ip가 존재할 때만 요청 실행
      }
    );
    //---------------내 식물 페이지--------------------
      return (
        <>
          <HStack p={10} minH={400}>
            <Stack w={'100%'} justifyContent="center" mr={10}>
              {isSLoading ? 
              <Stack minW={300} alignItems={'center'}>
                <Spinner 
                  size={'xl'} 
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                />
              </Stack>
              : 
              <Stack w={"100%"} minW={300}>
                <Box>
                  <img src="http://175.123.202.85:20800/stream.mjpg" alt="" />
                </Box>
              </Stack>
              } 
            </Stack>
            <Box w={'40%'} minW={200} minH={380}>
              {isSLoading ? (
                <>
                  <StreamSkeleton />
                </>
              ) : <MyplantController datas={sensorData} ip={ip} />}
            </Box>
          </HStack>
        </>
      )
}