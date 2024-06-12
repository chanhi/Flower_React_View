import { Box, Button, Center, Grid, HStack, Progress, Stack, Text } from "@chakra-ui/react";
import { getActuator } from "../api";
import { useState } from "react";

export default function MyplantController(sensorData) {
    const datas = sensorData.datas;
    const [isOn, setisOn] = useState(false);
    const toggleHandler = () => {
        // isOn의 상태를 변경하는 메소드를 구현
        setisOn(!isOn)
      };
    const onClickButton = (type) => {
        getActuator(type);
    }
    return(
        <Stack>
            <Grid gap={2} templateColumns={"2fr 2fr"} mt={10}>
                <Button onClick={() => onClickButton('rotater')}>회전</Button>
                <Button as={'a'} href="http://175.123.202.85:20800/screenshot">캡쳐</Button>
                <Button onClick={() => onClickButton('led')}>조명</Button>
                <Button 
                colorScheme={isOn ? "blue" : "green"}
                onClick={() => {
                    onClickButton('sprinkler');
                    toggleHandler();
                }}
                >
                    물주기
                    </Button>
            </Grid>
            <HStack mt={10}>
                <Box w={50} textAlign={'center'} bg='tomato' borderRadius={'lg'}>온도</Box>
                <Box>: {datas[1]}</Box>
                <Progress value={datas[1]} />
            </HStack>
            <HStack>
                <Box w={50} textAlign={'center'} bg='tomato' borderRadius={'lg'}>습도</Box>
                <Box>: {datas[2]}</Box>
                <Progress value={datas[2]} />
            </HStack>
            <HStack>
                <Box w={50} textAlign={'center'} bg='tomato' borderRadius={'lg'}>조도</Box>
                <Box>: {datas[3]}%</Box>
                <Progress value={datas[3]} />
            </HStack>
            <HStack>
                <Box w={50} textAlign={'center'} bg='tomato' borderRadius={'lg'}>일조량</Box>
                <Box>: {datas[4]}/100</Box>
                <Progress value={datas[4]} />
            </HStack>
        </Stack>
    );
}