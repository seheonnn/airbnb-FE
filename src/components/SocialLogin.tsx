import { Box, Button, Divider, HStack, VStack, Text } from "@chakra-ui/react";
import { FaComment, FaGithub, FaGoogle, FaLine } from "react-icons/fa";

export default function SocialLogin() {
    // parameter 만듦
    const kakaoParams = {
        client_id: "c9468c078679d099dc63ec693c38a6f2",
        redirect_uri: "http://127.0.0.1:3000/social/kakao",
        response_type: "code",
    };
    const params = new URLSearchParams(kakaoParams).toString();
    console.log(params);

    // state(임의의 랜덤한 값) 값 생성. 
    function generateRandomState() {
        const length = 16; // 랜덤한 문자열의 길이
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // 사용 가능한 문자열
        let result = "";
        for (let i = 0; i < length; i++) {
          result += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return result;
      }
    const naverState = generateRandomState();      
    const naverButtonClick = () => {
        sessionStorage.setItem("nState", naverState);
      };
    const naverParams = {
        client_id: "hiwpFOk3oOJCdd3c4g45",
        response_type: "code",
        redirect_uri: "http://127.0.0.1:3000/social/naver",
        state: naverState,
      };
    const paramsN = new URLSearchParams(naverParams).toString();

    const googleParams = {
        client_id: "3059113919-q37i95okv7n48pagipjs3druguce3kl0.apps.googleusercontent.com",
        response_type: "code",
        redirect_uri: "http://127.0.0.1:3000/social/google",
        scope: "email profile"
      };
    const paramsG = new URLSearchParams(googleParams).toString();

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
                <Button as="a" href={`https://kauth.kakao.com/oauth/authorize?${params}`} w="100%" leftIcon={<FaComment />} colorScheme={"yellow"} >
                    Continue with Kakao
                </Button>
                <Button as="a" href={`https://nid.naver.com/oauth2.0/authorize?${paramsN}`} w="100%" leftIcon={<img src="https://img.shields.io/badge/NAVER-03C75A?style=flat&logo=NAVER&logoColor=FFFFFF" />} onClick={naverButtonClick} colorScheme={"green"} >
                    Continue with Naver
                </Button>
                <Button as="a" href={`https://accounts.google.com/o/oauth2/v2/auth?${paramsG}`} w="100%" leftIcon={<FaGoogle />} colorScheme={"blue"}>
                    Continue with Google
                </Button>
            </VStack>
        </Box>
    );
}