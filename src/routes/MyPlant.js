import { Box, Flex, Skeleton, Stack} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MyplantController from "../components/MyplantController";

export default function MyPlant() {
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState([]);
    const fetchData = async () => {
      const response = await fetch("http://localhost:8081/api/udp/sensor");
      const json = await response.json();
      setDatas(json.sensorData);
      setIsLoading(false);
    }
    console.log(datas);
    useEffect(() => {
        fetchData();
    }, []);
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
              {isLoading ? (
                <>
                  <Skeleton height='20px' />
                </>
              ) : <MyplantController datas={datas} />}
            
            </Box>
          </Flex>
        </>
      )
}