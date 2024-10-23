import { Skeleton, Td, Tr } from "@chakra-ui/react";

export default function BoradSkeleton() {
    return(
        <Tr>
            <Td>
                <Skeleton height="20px" /> 
            </Td>
            <Td>
                <Skeleton height="20px" /> 
            </Td>
            <Td>
                <Skeleton height="20px" /> 
            </Td>
            <Td>
                <Skeleton height="20px" /> 
            </Td>
        </Tr>
    )
}