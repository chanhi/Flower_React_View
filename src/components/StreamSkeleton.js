import { Box, HStack, Skeleton, Stack, Td, Tr } from "@chakra-ui/react";

export default function StreamSkeleton() {
    return(
        <Stack w={200} h={400}>
            <Skeleton h={10} />
            <Skeleton h={10} />
            <Skeleton h={5} mt={5} />
            <Skeleton h={5} />
            <Skeleton h={5} />
            <Skeleton h={5} />
        </Stack>
        
    )
}