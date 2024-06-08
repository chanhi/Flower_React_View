import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";

export default function LoginModal({isOpen, onClose}) {
    return(
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form">
                    <VStack>
                        <InputGroup size={"md"}>
                            <InputLeftElement
                                children={
                                    <Box color="gray.500">
                                        <FaUserNinja />
                                    </Box>
                                }
                                />
                            <Input
                                variant={"filled"}
                                placeholder="Username"
                            />
                        </InputGroup>
                        <InputGroup size="md">
                            <InputLeftElement
                                children={
                                    <Box color="gray.500">
                                        <FaLock />
                                    </Box>
                                }
                            />
                            <Input
                                variant={"filled"}
                                placeholder="Password"
                                type="password"
                            />
                        </InputGroup>
                    </VStack>
                    <Button
                        type="submit"
                        mt={4}
                        w={"100%"}
                    >
                        Log In
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}