import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa"
import { ISignUpVariables, signUp } from "../api";
import SocialLogin from "./SocialLogin";

interface SignUpModalProps{
    isOpen:boolean;
    onClose:() => void;
}

interface IForm {
    name: string;
    email: string;
    username: string;
    password: string;
    currency: string;
    gender: string;
    language: string;
}

export default function SignUpModal({ isOpen, onClose } :  SignUpModalProps) {
    const { register, handleSubmit, reset } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation(signUp, {
        onSuccess:() => {
            toast({
                title: "Welcome!",
                status: "success"
            });
            onClose();
            reset();
            queryClient.refetchQueries(["me"])
        },
        onError: () => {
            toast({
                title: "Error!",
                status: "error"
            })
            reset();
        }
    })
    const onSubmit = ({name, email, username, password, currency, gender, language}: IForm) => {
        mutation.mutate({name, email, username, password, currency, gender, language});
    };
    return (
        <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign Up</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                        <VStack>

                            <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaUserSecret />
                                </Box>
                            } />
                            <Input {...register("name", {required:true})} required variant={"filled"} placeholder="Name" />
                            </InputGroup>

                            <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaEnvelope />
                                </Box>
                            } />
                            <Input {...register("email", {required:true})} required variant={"filled"} placeholder="Email" />
                            </InputGroup>

                            <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaUserNinja />
                                </Box>
                            } />
                            <Input {...register("username", {required:true})} required variant={"filled"} placeholder="Username" />
                            </InputGroup>

                            <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaLock />
                                </Box>
                            } />
                            <Input {...register("password", {required:true})} required type={"password"} variant={"filled"} placeholder="Password" />
                            </InputGroup>
                            
                            <Select {...register("currency", {required:true})} placeholder="currency option" >
                                <option value="won">Korean won</option>
                                <option value="usd">Dollar</option>
                            </Select>

                            <Select {...register("gender", {required:true})} required placeholder="gender option" >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Select>

                            <Select {...register("language", {required:true})} required placeholder="language option" >
                                <option value="kr">Korean</option>
                                <option value="en">English</option>
                            </Select>

                        </VStack>
                        <Button isLoading={mutation.isLoading} type="submit" mt={4} colorScheme={"red"} w="100%"> Sign Up </Button>
                        {/* Social Login 부분 파일 분리 */}
                        <SocialLogin />

                    </ModalBody>
                    {/* <ModalFooter><Button colorScheme={"red"} onClick={onClose}>Close</Button></ModalFooter> 우측 하단에 close 버튼 생김 */}
                </ModalContent>
            </Modal>
    );
}