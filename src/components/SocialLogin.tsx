import { Box, Button, Divider, HStack, VStack, Text } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
    return (
        <Box mb={4}>
            <HStack my={8}>
                <Divider />
                <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b" >Or</Text>
                <Divider />
            </HStack>
            
            <VStack>
                {/* chakra를 html tag로 변경 / scope에 원하는 정보를 추가적으로 요청할 수 있음*/}
                <Button as="a" href="https://github.com/login/oauth/authorize?client_id=8c7475533617f2962128&scope=read:user,user:email" 
                w="100%" leftIcon={<FaGithub />} >
                    Continue with Github
                </Button>
                <Button w="100%" leftIcon={<FaComment />} colorScheme={"yellow"} >
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    );
}