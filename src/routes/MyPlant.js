import { Box, Flex, Skeleton, Stack} from "@chakra-ui/react";
import MyplantController from "../components/MyplantController";
import { getIPAddress, getSensorData } from "../api";
import { useQuery } from "@tanstack/react-query";

export default function MyPlant() {
    const { isLoading: isIPLoading, data: ip } = useQuery(['ip'], getIPAddress);
    console.log(ip);
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
          <Flex p={10}>
            <Stack alignItems="center" justifyContent="center" mr={10}>
              <Box bgColor={"green.400"} w="100%">
                <img src="http://175.123.202.85:20800/stream.mjpg" alt="" />
              </Box>
            </Stack>
            <Box width={200} height={200}>
              {isSLoading ? (
                <>
                  <Skeleton height='20px' />
                </>
              ) : <MyplantController datas={sensorData} />}
            
            </Box>
          </Flex>
        </>
      )
}