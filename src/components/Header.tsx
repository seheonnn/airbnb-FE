import { Box, Button, HStack, IconButton, LightMode, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
    const{ isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen} = useDisclosure(); // on___ : isOpen을 true or false로 바꾸는 함수
    const{ isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen} = useDisclosure();
    const{ colorMode, toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200"); // 라이트모드일 때는 첫 번째 값, 다크모드일 때는 두 번째 값
    const Icon = useColorModeValue(FaMoon, FaSun); // 컴포넌트에 직접 적용
    return (
        <HStack justifyContent={"space-between"} py={5} px={10} borderBottomWidth={1}>
            <Box color={logoColor}> {/*Airbnb logo는 chakra ui가 아니기 때문에 Box로 감싸서 변경. 아니면 색깔 코드로 변경해야 함*/}
                <FaAirbnb size={"48"} />                  
            </Box>
            {/* 로고와 log in 버튼 사이 간격 */}
            <HStack spacing={2}>
                <IconButton onClick={toggleColorMode} variant={"ghost"} aria-label="Toggle dark mode" 
                // icon={colorMode === "light" ? <FaMoon/>: <FaSun />
                icon={<Icon />}
                />
                <Button onClick={onLoginOpen}>Log in</Button>
                <LightMode> {/* 항상 라이트모드로 고정 */}
                <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign up</Button>
                </LightMode>
            </HStack>
            
            {/* Modal */}
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />

        </HStack>
    ); 
}