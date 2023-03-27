import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn, kakaoLogIn } from "../api";

export default function KakaoConfirm() {
    const {search} = useLocation();
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(kakaoLogIn, {
        onSuccess: () => {
            toast({
                status: "success",
                title: "Welcome!",
                position: "bottom-right",
                description: "Happy to have you back!",
            });
            queryClient.refetchQueries(["me"]);
            navigate("/");
        }
    })

    const confirmLogin = async() => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        if (code){
            // const status = await kakaoLogIn(code)
            // if (status === 200) {
            //     toast({
            //         status: "success",
            //         title: "Welcome!",
            //         position: "bottom-right",
            //         description: "Happy to have you back!",
            //     });
            //     queryClient.refetchQueries(["me"]);
            //     navigate("/");
            // }
            mutation.mutate(code)
        }
    }
    useEffect(() => {
        confirmLogin();
    }, []);
    return (
        <VStack justifyContent={"center"} mt={40}>
            <Heading>Processing log in...</Heading>
            <Text>Don't go anywhere.</Text>
            <Spinner size="lg" />
        </VStack>
    );
}