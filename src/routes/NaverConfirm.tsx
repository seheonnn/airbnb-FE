import { useMutation, useQueryClient } from "@tanstack/react-query";
import { naverLogIn } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { Heading, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";

export default function NaverConfirm() {
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { search } = useLocation();
    const mutation = useMutation(naverLogIn, {
      onSuccess: () => {
        toast({
          title: "Welcome!",
          status: "success",
        });
        queryClient.refetchQueries(["me"]);
        navigate("/");
      },
    });
    const confirmLogin = async () => {
      const params = new URLSearchParams(search);
      const code = params.get("code");
      const state = params.get("state");
      const sessionState = sessionStorage.getItem("nState");
      console.log(state, sessionState)
      if (code && state === sessionState) {
        mutation.mutate({
          code,
          state,
        });
      }
    };
    useEffect(() => {
      confirmLogin();
    }, []);
    return (
      <VStack justifyContent={"center"} mt={40}>
        <Heading>Processing log in...</Heading>
        <Text>Don't go anywhere.</Text>
        <Spinner size={"lg"} />
      </VStack>
    );
  }