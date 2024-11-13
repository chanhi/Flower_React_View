import { Box, HStack, Skeleton, Stack, Td, Tr } from "@chakra-ui/react";

export default function StreamSkeleton() {
    return(
        <Stack w={'100%'} h={400}>
            <HStack>
                <Skeleton h={10} w={'50%'} />
                <Skeleton h={10} w={'50%'}/>
            </HStack>
            <HStack>
                <Skeleton h={10} w={'50%'} />
                <Skeleton h={10} w={'50%'}/>
            </HStack>
            <Skeleton h={7} mt={5} />
            <Skeleton h={7} />
            <Skeleton h={7} />
            <Skeleton h={7} />
        </Stack>
        
    )
}