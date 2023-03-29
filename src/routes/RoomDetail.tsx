
import { Avatar, Box, Container, Grid, GridItem, Heading, HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews} from "../api";
import { IReview, IRoomDetail } from "../types";

export default function RoomDeatil() {
    const { roomPk } = useParams(); 
    // const { isLoading, data } = useQuery([`room:${roomPk}`], getRoom);
    const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
    // console.log(data);
    const {data:reviewsData, isLoading:isReviewsLoading} = useQuery<IReview[]>([`rooms`, roomPk, `reviews`], getRoomReviews)

    return (
    <Box mt={10} px={{base: 10, lg: 40}}>
        <Skeleton height={"43px"} width="50%" isLoaded={!isLoading}>
            <Heading>{data?.name}</Heading>
            <HStack>
                <FaStar />
                <Text>{data?.rating}</Text>
            </HStack>
        </Skeleton>
        <Grid rounded={"xl"} overflow={"hidden"} mt={8} gap={3} height="60vh" templateRows={"1fr 1fr"} templateColumns={"repeat(4, 1fr)"}>
            {/* {data?.photos.slice(0, 5).map((photo, index) => (        해당 방식으론 Skeleton 적용 불가*/}
            {[0, 1, 2, 3, 4].map((index) => (
            // colSpan, rowSpan으로 column과 row의 사용 개수를 정할 수 있음.
            // index = 0인 경우, 즉 첫 번째 사진은 column, row 각 2개씩 사용.
            <GridItem colSpan={index === 0 ? 2 : 1} rowSpan={index === 0 ? 2 : 1} 
            overflow={"hidden"} 
            // key={photo.pk}
            key={index}
            >
                {/* <Image objectFit={"cover"} w="100%" h="100%" src={photo.file} /> */}
                <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                {data?.photos && data.photos.length > 0 ? (
                    <Image objectFit={"cover"} w="100%" h="100%" src={data?.photos[index].file} />
                ) : null}
                </Skeleton>
            </GridItem>))}
        </Grid>
        <HStack width={"40%"} justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
                <Skeleton isLoaded={!isLoading} height={"30px"}>
                    <Heading fontSize={"2xl"}> House hosted by {data?.owner.name}</Heading>
                </Skeleton>
            <Skeleton isLoaded={!isLoading} height={"30px"}>
                <HStack justifyContent={"flex-start"} w="100%">
                    <Text>{data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}</Text>
                    <Text>•</Text>
                    <Text>{data?.rooms} room{data?.rooms === 1 ? "" : "s"}</Text>
                </HStack>
            </Skeleton>
            </VStack>
            <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
        </HStack>
        <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
                <HStack>
                    <FaStar /> <Text>{data?.rating}</Text>
                    <Text>•</Text>
                    <Text>{reviewsData?.length} review{reviewsData?.length === 1 ? "":"s" }</Text>
                </HStack>
            </Heading>
            <Container mt={16} maxW="container.lg" marginX={"none"}>
                <Grid gap={10} templateColumns={"1fr 1fr"}>
                    {reviewsData?.map((review, index) => (<VStack alignItems={"flex-start"} key={index}>
                        <HStack>
                            <Avatar name={review.user.name} src={review.user.avatar} size={"md"}/>
                            <VStack spacing={0} alignItems={"flex-start"}>
                                <Heading fontSize={"md"}>{review.user.name}</Heading>
                                <HStack spacing={1}>
                                    <FaStar size={"12px"} />
                                    <Text>{review.rating}</Text>
                                </HStack>
                            </VStack>
                        </HStack>
                        <Text>{review.payload}</Text>
                    </VStack>
                    ))}
                </Grid>
            </Container>
        </Box>
    </Box>
    );
}