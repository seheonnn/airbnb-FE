import { Box, Button, Grid, GridItem, Text, useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { deleteBooking, getMyBookings } from "../api";
import { IRoomBookings } from "../types";

export default function MyBookings() {
  const { data } = useQuery<IRoomBookings[]>(["bookings"], getMyBookings);
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteBooking, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Successfully canceled!",
        isClosable: true, 
      });
      queryClient.refetchQueries(["bookings"]);
    },
  });
  const onClick = (id:number) => {
    mutation.mutate(id)
  }
  // console.log(data)
    return (
        <Box
      mt={10}
      px={{
        base: 10,
        lg: 80,
      }}
    >
      <Text display={"block"} mb={8} as={"b"} fontSize={40}>
        My Bookings
      </Text>
      <Grid
        templateColumns={"5fr 2fr 2fr 2fr 2fr 2fr"}
        gap={3}
        w={"100%"}
        bgColor="gray.200"
        alignItems={"center"}
        justifyItems="center"
        borderTop={"1px solid gray"}
        borderBottom={"1px solid rgb(190,190,190)"}
        py={4}
        mb={2}
      >
        <GridItem as={"b"}>Room Name</GridItem>
        <GridItem as={"b"}>Price</GridItem>
        <GridItem as={"b"}>Guests</GridItem>
        <GridItem as={"b"}>Check In</GridItem>
        <GridItem as={"b"}>Check Out</GridItem>
        <GridItem as={"b"}>Canceled</GridItem>
      </Grid>
      {/* skeleton */}
      {data?.map((booking) => (
        !booking.canceled && booking.kind === "room" ? <Grid
        key={booking.pk}
        templateColumns={"5fr 2fr 2fr 2fr 2fr 2fr"}
        gap={3}
        w={"100%"}
        bgColor="white.200"
        alignItems={"center"}
        justifyItems="center"
        borderTop={"1px solid rgb(190,190,190)"}
        borderBottom={"1px solid rgb(190,190,190)"}
        py={3}
        mb={1}
      >
        <GridItem fontWeight={"400"} noOfLines={1}>
          <Link to={"/"}>
            <Text noOfLines={1} _hover={{ color: "red.500" }}>
              {booking.room?.name}
            </Text>
          </Link>
        </GridItem>
        <GridItem fontWeight={"400"}>₩{booking.room?.price} / 박</GridItem>
        <GridItem fontWeight={"400"}>{booking?.guests}명</GridItem>
        <GridItem fontWeight={"400"}>{booking?.check_in}</GridItem>
        <GridItem fontWeight={"400"}>{booking?.check_out}</GridItem>
        
          <GridItem
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            color={"blue.500"}
            fontWeight={"400"}
          >
            <Button
              onClick={() => onClick(booking.pk)}
              color={"red.500"}
            >
              Cancel
            </Button>
          </GridItem>
      </Grid> : null
      ))}
    </Box>
    );
};