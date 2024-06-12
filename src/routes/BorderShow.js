import { Box, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function BorderShow() {
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState([]);
    const fetchData = async () => {
      const response = await fetch("http://localhost:8081/api/posts");
      const json = await response.json();
      setDatas(json[0]);
      setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);
    //---------------게시글 상세 페이지--------------------
    return(
        <>
            <Flex
                minH={'100vh'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} w="100%" py={12} px={6}>
                    <Stack>
                        <Text fontSize={'lg'} color={'gray.600'}>
                        제목: {datas.title}
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'sm'}
                        p={8}>
                            {datas.content}
                            <img src={"data:image/jpeg;base64," + datas.pictureBase64}/>
                    </Box>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'sm'}
                        p={8}>
                            <Box>댓글</Box>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}