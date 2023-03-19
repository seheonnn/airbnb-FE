import { Box, Button, HStack, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FaAirbnb, FaMoon, FaUserNinja, FaLock } from "react-icons/fa"

export default function Root(){
    const{ isOpen, onClose, onOpen} = useDisclosure(); // isOpen을 true or false로 바꾸는 함수

    return (
    <Box>
        <HStack justifyContent={"space-between"} py={5} px={10} borderBottomWidth={1}>
            <Box color={"red.500"}>
                <FaAirbnb size={"48"} />                  {/*Airbnb logo는 chakra ui가 아니기 때문에 Box로 감싸서 변경. 아니면 색깔 코드로 변경해야 함*/}
            </Box>
            {/* 로고와 log in 버튼 사이 간격 */}
            <HStack spacing={2}>
                <IconButton variant={"ghost"} aria-label="Toggle dark mode" icon={<FaMoon/>}/>
                <Button onClick={onOpen}>Log in</Button>
                <Button colorScheme={"red"}>Sign up</Button>
            </HStack>
            
            {/* Modal */}
            <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Log in</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <VStack>

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
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme={"red"} w="100%"> Log in </Button>
                    </ModalFooter>
                    {/* <ModalFooter><Button colorScheme={"red"} onClick={onClose}>Close</Button></ModalFooter> 우측 하단에 close 버튼 생김 */}
                </ModalContent>
            </Modal>

        </HStack>
        <Outlet />
    </Box>
    );
}


// body {
//     font-size:16px; 이면
// }
// 1rem == 16px가 됨
// rem은 해당 body의 font-size
// rem은 font-size에 상대적