import { Avatar, Box, Button, Card, CardBody, CardHeader, Grid, Heading, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBooking, getRoom, getRoomBookings } from "../api";
import useUser from "../lib/userUser";
import { IRoomBookings, IRoomDetail } from "../types";

export default function Bookings() {
    const { roomPk } = useParams();
    const { data: bookings, isLoading: isBookingLoading } = useQuery<IRoomBookings[]>([`rooms`, roomPk, `bookings`], getRoomBookings);
    const { data: room } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
    const navigate = useNavigate();
    const toast = useToast();
    const mutation = useMutation(deleteBooking, {
        onSuccess: () => {
          toast({
            status: "success",
            title: "Successfully canceled!",
            isClosable: true, 
          });
          navigate(`/rooms/${roomPk}/bookings`)
        },
      });
    const onClick = (id:number) => {
        mutation.mutate(id)
      }
    console.log(bookings)
  
    return (
      <VStack>
        <Box>
          <VStack>
            <Heading>{room?.name}</Heading>

{/* 
                <CardHeader>
                    <HStack justifyContent={"space-between"}>
                        <Text>Booking 1</Text>
                        <Button my={5} colorScheme={"red"}>Cancel</Button>
                    </HStack>
                </CardHeader>
                <CardBody>
                    <Text>check_in: {bookings?.[0].check_in}</Text>
                    <Text>check_out: {bookings?.[0].check_out}</Text>
                    <Text>guests: {bookings?.[0].guests}</Text>
                </CardBody> */}
                
                {isBookingLoading ? (
                <Text>Loading bookings...</Text>
                ) : (<>
                {bookings?.map((booking) => (
                    !booking.canceled ?
                    <Card width={"100%"}>
                        <CardHeader>
                            <HStack justifyContent={"space-between"}>
                                <Box>
                                <Avatar>{booking.user.avatar}</Avatar>
                                <Text>{booking.user.username}</Text>
                                </Box>
                                <Button onClick={() => onClick(booking.pk)} my={5} colorScheme={"red"}>Cancel</Button>
                                </HStack>
                        </CardHeader>
                        <CardBody>
                            <Text>{booking.pk}</Text>
                            <Text>check_in: {booking.check_in}</Text>
                            <Text>check_out: {booking.check_out}</Text>
                            <Text>guests: {booking.guests}</Text>
                        </CardBody>
                    </Card> 
                    : null
                    ))}
                </>)}
          </VStack>
        </Box>
      </VStack>
    );
  }
  
