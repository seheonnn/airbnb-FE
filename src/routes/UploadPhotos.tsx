import { Box, Button, Container, FormControl, Heading, Input, useToast, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createPhoto, getUploadURL, uploadImage } from "../api";
import useHostOnlyPageHook from "../Hook/useHostOnlyPageHook";
import useProtectedPageHook from "../Hook/useProtectedPageHook";

interface IForm {
    file: FileList;
}

interface IUploadURLResponse {
    id: string;
    uploadURL: string;
}

export default function UploadPhotos() {
    const { register, handleSubmit, watch, reset } = useForm<IForm>();
    const { roomPk } = useParams();
    const toast = useToast();
    const createPhotoMutation = useMutation(createPhoto, {
        onSuccess: () => {
            toast({
                status: "success",
                title: "Image uploaded!",
                isClosable: true,
                description: "Feel free to upload more images.",
            });
            reset();
        },
    });
    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({result}: any) => {
            if (roomPk) {
                createPhotoMutation.mutate({
                    description: "I love react",
                    file: `http://127.0.0.1:8000/user-uploads/${result.id}`,
                    roomPk,
                });
            }
        },
    });
    const uploadURLMutation = useMutation(getUploadURL, {
        onSuccess: (data: IUploadURLResponse) => {
            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: watch("file"),
            });
        },
    });
    useHostOnlyPageHook();
    useProtectedPageHook();
    const onSubmit = () => {
        uploadURLMutation.mutate();
    };
    return (<Box pb={40} mt={10} px={{base: 10, lg: 40,}}>
        <Container>
            <Heading textAlign={"center"}>Upload a Photo</Heading>
            <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={5} mt={10}>
                <FormControl>
                    <Input {...register("file")} type="file" accept="image/*" />
                </FormControl>
                <Button isLoading={
                    createPhotoMutation.isLoading || uploadImageMutation.isLoading || uploadURLMutation.isLoading
                } type="submit" w="full" colorScheme={"red"}>
                    Upload photos
                </Button>
            </VStack>
        </Container>
    </Box>);
}