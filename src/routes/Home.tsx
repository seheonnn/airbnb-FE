import { Box, Button, Grid, Heading, HStack, Image, Skeleton, SkeletonText, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";
import { getRooms } from "../api";
import { Link } from "react-router-dom";
import { IRoomList } from "../types";

// interface IPhoto {
//     pk: number;
//     file: string;
//     description: string;
// }
// // 인터페이스는 I로 시작해야 함.
// interface IRoom {
//     pk: number;
//     name: string;
//     country: string;
//     city: string;
//     price: number;
//     rating: number;
//     is_owner: boolean;
//     photos: IPhoto[];
// }

export default function Home(){
    // const [isLoading, setIsLoading] = useState(true);
    // const [rooms, setRooms] = useState<IRoom[]>([]);
    // const fetchRooms = async () => {
    //     const response = await fetch("http://127.0.0.1:8000/api/v1/rooms/");
    //     const json = await response.json();
    //     setRooms(json)
    //     setIsLoading(false)
    // }
    // // 참고 https://xiubindev.tistory.com/100
    // useEffect(() => {
    //     fetchRooms();
    // }, []);

    // useQuery가 로딩중인지 알려주고 해당 data가 준비 되었는지도 알려줌
    // const { isLoading, data } = useQuery<IRoom[]>(["rooms"], getRooms); // [] 안 내용은 fetch한 결과물을 기억하는 작업의 key로 사용 됨. unique 해야 함
    const { isLoading, data } = useQuery<IRoomList[]>(["rooms"], getRooms);
    return (
    <Grid mt={10} px={{base: 10, lg: 40}} columnGap={4} rowGap={8} 
    templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)"
    }}> 

    {isLoading ? (
    <>
    <RoomSkeleton />
    <RoomSkeleton />
    <RoomSkeleton />
    <RoomSkeleton />
    <RoomSkeleton />
    <RoomSkeleton />
    <RoomSkeleton />
    <RoomSkeleton />
    <RoomSkeleton />
    <RoomSkeleton />
    </>
    ) : null}
    {/* <Link to="/asasassa">404</Link> */}
    {/* data가 아직 준비되지 않은 경우도 있음 -> ? 붙임 */}
    {/* {rooms?.map((room) => ( */}
    {data?.map((room) => (
        <Room 
        key={room.pk}
        pk={room.pk}
        imageUrl={room.photos[0].file}
        name={room.name}
        rating={room.rating}
        city={room.city}
        country={room.country}
        price={room.price}
        />
    ))}

    </Grid>
    );
}
// 1fr : column들이 서로 같은 크기로 가능한 많은 공간을 차지하도록 함. 비율과 관련된 것. 1fr 1fr-> 같은 비율, 2fr 1fr -> 두 배