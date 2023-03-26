import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa"
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
}

export default function SignUpModal({ isOpen, onClose } :  SignUpModalProps) {
    return (
        <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign Up</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <VStack>

                            <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaUserSecret />
                                </Box>
                            } />
                            <Input variant={"filled"} placeholder="Name" />
                            </InputGroup>

                            <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaEnvelope />
                                </Box>
                            } />
                            <Input variant={"filled"} placeholder="Email" />
                            </InputGroup>

                            <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaUserNinja />
                                </Box>
                            } />
                            <Input variant={"filled"} placeholder="Username" />
                            </InputGroup>

                            <InputGroup>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaLock />
                                </Box>
                            } />
                            <Input variant={"filled"} placeholder="Password" />
                            </InputGroup>

                        </VStack>
                        <Button mt={4} colorScheme={"red"} w="100%"> Log in </Button>
                        {/* Social Login 부분 파일 분리 */}
                        <SocialLogin />

                    </ModalBody>
                    {/* <ModalFooter><Button colorScheme={"red"} onClick={onClose}>Close</Button></ModalFooter> 우측 하단에 close 버튼 생김 */}
                </ModalContent>
            </Modal>
    );
}