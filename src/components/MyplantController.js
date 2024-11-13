import { Box, Button, Grid, HStack, Progress, Stack } from "@chakra-ui/react";
import { getActuator } from "../api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaSmile, FaLaughBeam, FaFrown } from "react-icons/fa"

export default function MyplantController(sensorData) {
    const datas = sensorData.datas.sensorData;
    const ip = sensorData.ip.ip;
    const [isOn, setisOn] = useState(false);
    const toggleHandler = () => {
        // isOn의 상태를 변경하는 메소드를 구현
        setisOn(!isOn)
      };
    const udpMutation = useMutation(getActuator, {
        onSuccess: (data) => {
            //console.log(data);
        },
        onError: (error) => {
            console.error('Error deleting comment:', error);
        },
    });
  
    const handleActuator = (type) => {
        //type별로 플래그 세워서 response 받은걸로 상태 변환 -> 버튼 온오프상태
        udpMutation.mutate({type: type, ip: ip});
    };
    return(
        <Stack w={'100%'}>
            <Grid gap={2} templateColumns={"2fr 2fr"} mt={10}>
                <Button onClick={() => handleActuator('rotater')}>회전</Button>
                <Button as={'a'} href="http://175.123.202.85:20800/screenshot">캡쳐</Button>
                <Button onClick={() => handleActuator('led')}>조명</Button>
                <Button 
                colorScheme={isOn ? "blue" : "green"}
                onClick={() => {
                    handleActuator('sprinkler');
                    toggleHandler();
                }}
                >
                    물주기
                    </Button>
            </Grid>
            {datas ? 
            <Stack>
                <HStack mt={10}>
                    <Box w={50} textAlign={'center'} bg='tomato' borderRadius={'lg'}>온도</Box>
                    <Box>: {datas[1]}</Box>
                </HStack>
                <Progress hasStripe value={datas[1]} />
                <HStack>
                    <Box w={50} textAlign={'center'} bg='tomato' borderRadius={'lg'}>습도</Box>
                    <Box>: {datas[2]}</Box>
                </HStack>
                <Progress hasStripe value={datas[2]} />
                <HStack>
                    <Box w={50} textAlign={'center'} bg='tomato' borderRadius={'lg'}>조도</Box>
                    <Stack alignItems={'center'}>
                        {datas[3] >= 0 && datas[3] < 50 ?
                        <FaFrown color="green" size={40} /> :
                            datas[3] >= 50 && datas[3] < 90 ? 
                            <FaSmile color="green" size={40} /> 
                            : <FaLaughBeam color="green" size={40} />
                        }
                    </Stack>
                </HStack>
                <HStack>
                    <Box w={50} textAlign={'center'} bg='tomato' borderRadius={'lg'}>일조량</Box>
                    <Box>: {datas[4]}/100</Box>
                </HStack>
                <Progress hasStripe value={datas[4]} />
            </Stack>
            : null}
        </Stack>
    );
}