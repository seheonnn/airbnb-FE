import { Box, Button, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaAirbnb, FaMoon } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
    const{ isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen} = useDisclosure(); // isOpen을 true or false로 바꾸는 함수
    const{ isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen} = useDisclosure();
    return (
        <HStack justifyContent={"space-between"} py={5} px={10} borderBottomWidth={1}>
            <Box color={"red.500"}> {/*Airbnb logo는 chakra ui가 아니기 때문에 Box로 감싸서 변경. 아니면 색깔 코드로 변경해야 함*/}
                <FaAirbnb size={"48"} />                  
            </Box>
            {/* 로고와 log in 버튼 사이 간격 */}
            <HStack spacing={2}>
                <IconButton variant={"ghost"} aria-label="Toggle dark mode" icon={<FaMoon/>}/>
                <Button onClick={onLoginOpen}>Log in</Button>
                <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign up</Button>
            </HStack>
            
            {/* Modal */}
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />

        </HStack>
    ); 
}