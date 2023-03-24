import { Avatar, Box, Button, HStack, IconButton, LightMode, Menu, MenuButton, MenuItem, MenuList, Stack, useColorMode, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import { logOut } from "../api";
import useUser from "../lib/userUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
    const { userLoading, isLoggedIn, user } = useUser();
    const{ isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen} = useDisclosure(); // on___ : isOpen을 true or false로 바꾸는 함수
    const{ isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen} = useDisclosure();
    const{ colorMode, toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200"); // 라이트모드일 때는 첫 번째 값, 다크모드일 때는 두 번째 값
    const Icon = useColorModeValue(FaMoon, FaSun); // 컴포넌트에 직접 적용. 대문자로 시작
    const toast = useToast();
    const queryClient = useQueryClient();
    // BE : api/v1/users/log-out POST 요청임
    const onLogOut = async() => {
        const toastId = toast({
            title: "Login out...",
            description: "sad to see you go ...",
            status: "loading",
            position:"bottom-right"
        });
        await logOut();
        queryClient.refetchQueries(["me"]) // refetch할 때 header는 user 한 번 더 확인
        toast.update(toastId, {
        status: "success",
        title: "Done!",
        description: "See you later",
    });
    };
    return (
        // <HStack justifyContent={"space-between"} py={5} px={40} direction={{ sm:"column", md: "row", }} borderBottomWidth={1}> 내용물의 배치 방향이 바뀌는 경우 HStack, VStack 사용 X 그냥 Stack 사용할 것.
        <Stack justifyContent={"space-between"} alignItems="center" py={5} px={40} direction={{ sm:"column", md: "row", }} spacing={{sm: 4, md: 0}} borderBottomWidth={1}>
            <Box color={logoColor}> {/*Airbnb logo는 chakra ui가 아니기 때문에 Box로 감싸서 변경. 아니면 색깔 코드로 변경해야 함*/}
                <FaAirbnb size={"48"} />                  
            </Box>
            {/* 로고와 log in 버튼 사이 간격 */}
            <HStack spacing={2}>
                <IconButton onClick={toggleColorMode} variant={"ghost"} aria-label="Toggle dark mode" 
                // icon={colorMode === "light" ? <FaMoon/>: <FaSun />
                icon={<Icon />}
                />
                {!userLoading ? (
                    !isLoggedIn ? (
                    <>
                    <Button onClick={onLoginOpen}>Log in</Button>
                    <LightMode> {/* 항상 라이트모드로 고정 */}
                    <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign up</Button>
                    </LightMode>
                    </>
                    ) : (
                        <Menu>
                            <MenuButton>
                            <Avatar name={user?.name} src={user?.avatar} size={"md"} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={onLogOut}> Log out</MenuItem>
                            </MenuList>
                        </Menu>
                    )
                ) : null}
            </HStack>
            
            {/* Modal */}
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />

        </Stack>
    ); 
}