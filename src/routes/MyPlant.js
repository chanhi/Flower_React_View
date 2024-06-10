import { Box, Flex, Skeleton, Text, useQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getData } from "../api";

export default function MyPlant() {
    const stramUrl = "http://175.123.202.85:20800/stream.mjpg";
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState([]);
    const fetchData = async () => {
      const response = await fetch("http://localhost:8081/api/udp/sensor");
      const json = await response.json();
      setDatas(json.sensorData);
      setIsLoading(false);
    }
    
    useEffect(() => {
        fetchData();
      }, []);
      console.log(datas);
    
      return (
        <>
          <Flex>
            <Box bgColor={"green.400"}>
              <img src="http://175.123.202.85:20800/stream.mjpg" />
            </Box>
            <Box width={200} height={200}>
              {isLoading ? (
                <>
                  <Skeleton height='20px' />
                </>
              ) : datas?.map((data) => (
                <Text>{data}</Text>
              ))}
            
            </Box>
          </Flex>
        </>
      )
}