import { Box, Button, Flex, Image, Skeleton, Stack, Text, VStack, useQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getData } from "../api";

export default function MyPlant() {
    const stramUrl = "http://175.123.202.85:20800/stream.mjpg";
    const [datas, setDatas] = useState();
    const { isLoading, data } = useQuery(["datas"], getData);
    
    useEffect(() => {
        fetch("http://localhost:8081/api/udp/sensor")
          .then((response) => response.json())
          .then((json) => {setDatas(json);})
      }, [])
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
              ) : null}
            {datas?.sensorData.map((data)=>(
              <li>{data}</li>
            ))}
            </Box>
          </Flex>
        </>
      )
}