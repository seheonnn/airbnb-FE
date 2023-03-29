import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";

interface IRoomProps {
    imageUrl: string;
    name: string;
    rating: number;
    city: string;
    country: string;
    price: number;
    pk: number;
    isOwner: boolean;
}

export default function Room({pk, imageUrl, name, rating, city, country, price, isOwner} : IRoomProps) {
    const gray = useColorModeValue("gray.600", "gray.300")
    const navigate = useNavigate();
    const onCagmeraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate(`/rooms/${pk}/photos`)
    }
    return (
        <Link to={`/rooms/${pk}`}>
            <VStack alignItems={"flex-start"}> {/* 사진들을 같은 크기로 배열 */}
            <Box position="relative" overflow={"hidden"} mb={3} rounded={"2xl"}> {/* 사진의 모서리를 둥글게 하는 Box */}
            {imageUrl ? (<Image objectFit={"cover"} minH={280} src={imageUrl} />) : (<Box minH="280px" h="100%" w="100%" p={10} bg="green.400" />)}
        
            {/* 방식 1 */}
            {/* <Box cursor={"pointer"} position="absolute" top={5} right={5} color={"white"}>
            <FaRegHeart size={"20px"}/>
            </Box> */}
        
            {/* 방식 2 */}
            <Button onClick={onCagmeraClick} variant={"unstyled"} position="absolute" top={0} right={0} color={"white"}>
                {isOwner ? <FaCamera size={"20px"}/> : <FaRegHeart size={"20px"}/> }
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
        </Link>
    );
}