import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaLock, FaUserNinja } from "react-icons/fa";
import { logIn } from "../api";

export default function LoginModal({isOpen, onClose}) {
    const {register, handleSubmit, reset} = useForm();
    const queryClient = useQueryClient();
    const mutation = useMutation(logIn ,{
      onSuccess: (data) => {
        onClose()
        reset();
        queryClient.invalidateQueries(["me"]);
      },
      onError: (error) => {
        onClose();
        console.log(error);
      }
    })
    const onSubmit = (data) => {
      mutation.mutate(data);
    };  
    return(
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
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
                                {...register("loginId", {required: true})}
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
                                {...register("password", {required: true})}
                            />
                        </InputGroup>
                    </VStack>
                    <Button
                        type="submit"
                        mt={4}
                        mb={4}
                        w={"100%"}
                    >
                        Log In
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}