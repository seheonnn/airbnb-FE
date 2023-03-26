import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserNinja, FaLock } from "react-icons/fa"
import { IUsernameLoginError, IUsernameLoginSuccess, IUsernameLoginVariables, usernameLogIn } from "../api";
import SocialLogin from "./SocialLogin";


interface LoginModalProps{
    isOpen:boolean;
    onClose:() => void;
}

interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose } :  LoginModalProps) {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const onChange = (event:React.SyntheticEvent<HTMLInputElement>) => {
    //     const { name, value } = event.currentTarget;
    //     if(name === "username") {
    //         setUsername(value);
    //     } else if (name === "password") {
    //         setPassword(value);
    //     };
    // };
    // // 새로고침은 안 하도록 하는 함수
    // const onSubmit = (event:React.SyntheticEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     console.log(username, password)
    // }

    const { register, watch, handleSubmit, formState: {errors}, reset } = useForm<IForm>();
    // console.log(register("lalala"))
    // console.log(watch());
    const toast = useToast()
    const queryClient = useQueryClient();
    const mutation = useMutation
    // 없어도 됨
    // <IUsernameLoginSuccess, IUsernameLoginError, IUsernameLoginVariables>
    (usernameLogIn, {
        // onMutate:() => {
        //     console.log("mutation starting");
        // },
        onSuccess: () => {
            toast({
                title: "welcome back!",
                status: "success"
            });
            onClose();
            reset()
            queryClient.refetchQueries(["me"])
        },
        // onError: (error) => {
        //     console.log("mutation has an error");
        // },
    });
    const onSubmit = ({username, password}: IForm) => {
        mutation.mutate({username, password})
    };
    // console.log(errors);
    return (
        <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Log in</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}
                    // onSubmit={onSubmit as any}
                    >
                        <VStack>

                            <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaUserNinja />
                                </Box>
                            } />
                            <Input 
                            // onChange={onChange} value={username} name="username"
                            isInvalid={Boolean(errors.username?.message)}
                            {...register("username", {required:"Please write a username"})}
                            required variant={"filled"} placeholder="Username" />
                            {/* <Text fontSize={"sm"} color="red.500">{errors.username?.message}</Text> */}
                            </InputGroup>

                            <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaLock />
                                </Box>
                            } />
                            <Input 
                            // onChange={onChange} value={password} name="password"
                            isInvalid={Boolean(errors.password?.message)}
                            {...register("password", {required:"Please write a password"})}
                            required type="password" variant={"filled"} placeholder="Password" />
                            {/* <Text fontSize={"sm"} color="red.500">{errors.password?.message}</Text> */}
                            </InputGroup>
                        </VStack>
                        {mutation.isError ? <Text color="red.500" textAlign={"center"} fontSize="sm" >
                            Username or Password are wrong
                        </Text> : null}
                        <Button isLoading={mutation.isLoading} type="submit" mt={4} colorScheme={"red"} w="100%"> Log in </Button>
                        {/* Social Login 부분 파일 분리 */}
                        <SocialLogin />

                    </ModalBody>
                    {/* <ModalFooter><Button colorScheme={"red"} onClick={onClose}>Close</Button></ModalFooter> 우측 하단에 close 버튼 생김 */}
                </ModalContent>
            </Modal>
    );
}