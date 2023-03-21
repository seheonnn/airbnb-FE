import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { FaRegHeart, FaStar } from "react-icons/fa"

interface IRoomProps {
    imageUrl: string;
    name: string;
    rating: number;
    city: string;
    country: string;
    price: number;
}

export default function Room({imageUrl, name, rating, city, country, price} : IRoomProps) {
    const gray = useColorModeValue("gray.600", "gray.300")
    return (
    <VStack alignItems={"flex-start"}> {/* 사진들을 같은 크기로 배열 */}
    <Box position="relative" overflow={"hidden"} mb={3} rounded={"2xl"}> {/* 사진의 모서리를 둥글게 하는 Box */}
        <Image minH={280} src={imageUrl} />
        
        {/* 방식 1 */}
        {/* <Box cursor={"pointer"} position="absolute" top={5} right={5} color={"white"}>
            <FaRegHeart size={"20px"}/>
        </Box> */}
        
        {/* 방식 2 */}
        <Button variant={"unstyled"} position="absolute" top={0} right={0} color={"white"}>
            <FaRegHeart size={"20px"}/>
        </Button>

    </Box>
    <Box>
        <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text as="b" noOfLines={1} fontSize={"md"}>{name}</Text>
            <HStack 
            // _hover={{color:"red.100"}} 
            spacing={1} alignItems="center">
                <FaStar size={12} />
                <Text>{rating}</Text>
            </HStack>
        </Grid>
        <Text fontSize={"sm"} color={gray}>{city}, {country}</Text>
    </Box>
    <Text fontSize={"sm"} color={gray}>
        <Text as="b">${price}</Text> / night
    </Text>
    </VStack>
    );
}