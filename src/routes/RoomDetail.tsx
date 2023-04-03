
import { Avatar, Box, Button, Container, FormControl, Grid, GridItem, Heading, HStack, Image, Input, InputGroup, InputRightAddon, Skeleton, Stack, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaAirbnb, FaStar } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { checkBooking, createBooking, getRoom, getRoomReviews} from "../api";
import { IBooking, IReview, IRoomDetail } from "../types";
import { Helmet } from "react-helmet"

import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formatDate } from "../lib/utils";
import useUser from "../lib/userUser";

export default function RoomDeatil() {
    // Room Booking
    const { register, handleSubmit } = useForm<IBooking>();
    const { user, userLoading } =  useUser();
    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation (createBooking, {
        onSuccess: () => {
            toast({
                status: "success",
                title: "Successfully booked",
                isClosable: true,
            });
            navigate("/");
        },
    });


    const { roomPk } = useParams(); 
    // const { isLoading, data } = useQuery([`room:${roomPk}`], getRoom);
    const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
    // console.log(data);
    const { data:reviewsData, isLoading:isReviewsLoading } = useQuery<IReview[]>([`rooms`, roomPk, `reviews`], getRoomReviews);
    const [ dates, setDates ] = useState<Date[]>();
    const { data: checkBookingData, isLoading:isCheckingBooking, refetch } = useQuery(["check", roomPk, dates], checkBooking, { cacheTime:0, enabled: dates !== undefined });
    // console.log(checkBookingData?.ok, isCheckingBooking)

    const onSubmit = (data: IBooking) => {
        if (dates && roomPk) {
            data["pk"] = roomPk
            data["check_in"] = formatDate(dates[0])
            data["check_out"] = formatDate(dates[1])
            mutation.mutate(data);
        }
    }
    const onBookingsClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate(`/rooms/${roomPk}/bookings`)
        window.location.reload();
    };

    // useEffect(() => {
    //     if (dates) {
    //         // api의 fetch func으로 옮김
    //         // const [firstDate, secondDate] = dates;
    //         // const [checkIn] = firstDate.toJSON().split("T");
    //         // const [checkOut] = secondDate.toJSON().split("T");
    //         // console.log(checkIn, checkOut)
    //     }
    // }, [dates]);
    console.log(data?.owner.username === user?.username);
    return (
    <Box mt={10} px={{base: 10, lg: 40}}>
        <Helmet><title>{data?data.name : "Loading..."}</title></Helmet>
        {/* Skeleton은 Box 크기에 영향 */}
        <Skeleton height={"43px"} width="100%" isLoaded={!isLoading}>   
        <HStack justifyContent={"space-between"}>
            <Stack gap={"0"}>
                <Heading>{data?.name}</Heading>
                <HStack>
                    <FaStar />
                    <Text>{data?.rating}</Text>
                </HStack>
            </Stack>
            {data?.owner.username === user?.username ? <Box>
                <Button onClick={onBookingsClick} my={5} w="100%" colorScheme={"red"}>
                    Bookings
                </Button>
            </Box> : null}
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
        <Grid gap={20} templateColumns={"2fr 1fr"} maxW="container.lg">
        <Box>
        {/* Host 정보 */}
        <HStack justifyContent={"space-between"} mt={10}>
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
                <Text>{data?.pet_friendly ? <Text>Pet friendly</Text>: <Text color={"red.500"}>Pet unfriendly</Text>}</Text>
            </Skeleton>
            </VStack>
            <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
        </HStack>
        {/* Review */}
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
        {/* Calendar */}
            <Box pt={10} as="form" onSubmit={handleSubmit(onSubmit)} border="none">
                <Calendar 
                goToRangeStartOnSelect
                // onChange={setDates}
                onChange={(value) => setDates(value as Date[] | undefined)}
                // showDoubleView 한 번에 두 달씩 보여주기
                prev2Label={null} next2Label={null} minDetail="month" maxDate={new Date(Date.now() + 60*60*24*7*4*6*1000)} minDate={new Date()} selectRange />
                <FormControl p={3} border={"1px solid gray"}>
                    <InputGroup>
                            <Input {...register("guests", { required: true })} defaultValue={1} required type="number" min={1} />
                            <InputRightAddon />
                        </InputGroup>
                </FormControl>
                <Button type="submit" disabled={!checkBookingData?.ok} isLoading={isCheckingBooking && dates !== undefined} my={5} w="100%" colorScheme={"red"}> 
                Make booking
                </Button>
                {!isCheckingBooking && !checkBookingData?.ok ? <Text color={"red.500"}>Can't book on those dates, sorry</Text>:null}
            </Box>
        </Grid>
    </Box>
    );
}