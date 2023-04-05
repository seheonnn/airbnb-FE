import { Avatar, Box, Button, Card, CardBody, CardHeader, Grid, Heading, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBooking, getRoom, getRoomBookings } from "../api";
import { IRoomBookings, IRoomDetail } from "../types";

export default function Bookings() {
    const { roomPk } = useParams();
    const { data: bookings, isLoading: isBookingLoading } = useQuery<IRoomBookings[]>([`rooms`, roomPk, `bookings`], getRoomBookings);
    const { data: room } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
    const navigate = useNavigate();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation(deleteBooking, {
        onSuccess: () => {
          toast({
            status: "success",
            title: "Successfully canceled!",
            isClosable: true, 
          });
          queryClient.invalidateQueries([`rooms`, roomPk, `bookings`]); // data 업데이트
        },
      });
    const onClick = (id:number) => {
        mutation.mutate(id)
      }
    console.log(bookings)
  
    return (
      <VStack mt={"10"} mb={"20"}>
        <Box>
          <VStack>
            <Heading mb={"10"} width={"100%"} textAlign={"center"} >{room?.name}</Heading>          
                {isBookingLoading ? (
                <Text>Loading bookings...</Text>
                ) : (<>
                {bookings?.map((booking) => (
                    !booking.canceled ?
                    <Card margin={"10"} mb={"100"} width={"200%"}>
                        <CardHeader mb={"-0.5"}>
                            <HStack justifyContent={"space-between"}>
                                <Box>
                                <Avatar name={booking.user.name} src={booking.user.avatar} size={"md"}/>
                                <Text>{booking.user.username}</Text>
                                </Box>
                                <Button onClick={() => onClick(booking.pk)} my={5} colorScheme={"red"}>Cancel</Button>
                                </HStack>
                        </CardHeader>
                        <CardBody mt={"-5"}>
                            <Text>check_in: {booking.check_in}</Text>
                            <Text>check_out: {booking.check_out}</Text>
                            <Text>guests: {booking.guests}</Text>
                        </CardBody>
                    </Card> 
                    : null)
                  )}
                </>)}
          </VStack>
        </Box>
      </VStack>
    );
  }
  
