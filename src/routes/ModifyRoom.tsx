import { Box, Button, Checkbox, Container, FormControl, FormHelperText, FormLabel, Grid, Heading, Input, InputGroup, InputLeftAddon, InputLeftElement, Select, Text, Textarea, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaBed, FaMoneyBill, FaToilet } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getAmenities, getCategories, getRoom, modifyRoom } from "../api";
import useHostOnlyPageHook from "../Hook/useHostOnlyPageHook";
import useProtectedPageHook from "../Hook/useProtectedPageHook";
import { IAmenity, ICategory } from "../types";

export interface IForm {
    name: string;
    country: string;
    city: string;
    price: number;
    rooms: number;
    toilets: number;
    description: string;
    address: string;
    pet_friendly: boolean;
    kind: string;
    amenities: number[];
    category: number;
    roomPk: string;
};


export default function ModifyRoom() {
    useProtectedPageHook(); // hook 방식
    useHostOnlyPageHook();
    const { roomPk } = useParams();
    const { register, handleSubmit, watch } = useForm<IForm>();
    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation(modifyRoom, {
        onSuccess: (data: IForm) => {
            toast({
              status: "success",
              title: "Room successfully modified!",
              position: "bottom-right"
            });
            console.log(data.roomPk, roomPk)
            navigate(`/rooms/${roomPk}`);
        },
      });
      
    const { data: roomInfo, isLoading: isRoomInfoLoading } = useQuery<IForm>(["roomInfo", roomPk], getRoom);
    const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<IAmenity[]>(["amenities"], getAmenities);
    const { data: categories, isLoading: isCategoriesLoading } = useQuery<ICategory[]>(["categories"], getCategories);
    const onSubmit = (data: IForm) => {
        if(roomPk){
            data["roomPk"] = roomPk
            mutation.mutate(data)
        }
    };
    return (
        <Box mb={20}>
            <Container>
                <Heading textAlign={"center"}>Modify Room</Heading>
                <VStack spacing={10} as="form" onSubmit={handleSubmit(onSubmit)} mt={5}>

                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input defaultValue={roomInfo?.name} {...register("name")} required type="text" />
                        <FormHelperText>Write the name of your room.</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Country</FormLabel>
                        <Input defaultValue={roomInfo?.country} {...register("country")} required type="text" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>City</FormLabel>
                        <Input defaultValue={roomInfo?.city} {...register("city")} required type="text" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input defaultValue={roomInfo?.address} {...register("address")} required type="text" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Price</FormLabel>
                        <InputGroup>
                        <InputLeftAddon children={<FaMoneyBill />} />
                        <Input  defaultValue={roomInfo?.price} {...register("price")} type="number" min={0} />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Rooms</FormLabel>
                        <InputGroup>
                        <InputLeftAddon children={<FaBed />} />
                        <Input  defaultValue={roomInfo?.rooms} {...register("rooms")} type="number" min={0} />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Toilets</FormLabel>
                        <InputGroup>
                        <InputLeftAddon children={<FaToilet />} />
                        <Input  defaultValue={roomInfo?.toilets} {...register("toilets")} type="number" min={0} />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea  defaultValue={roomInfo?.description} {...register("description")} />
                    </FormControl>

                    <FormControl>
                    <Checkbox  defaultChecked={roomInfo?.pet_friendly} {...register("pet_friendly")}>Pet friendly?</Checkbox>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Kind of Room</FormLabel>
                        <Select defaultValue={roomInfo?.kind} {...register("kind")} placeholder="Choose a kind">
                            <option value="entire_place">Entire Place</option>
                            <option value="private_room">Private Room</option>
                            <option value="shared_room">Shared Room</option>
                        </Select>
                        <FormHelperText>What kind of room are you renting?</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Category</FormLabel>
                        <Select  defaultValue={roomInfo?.category} {...register("category")} placeholder="Choose a category">
                            {categories?.map((category) => (<option key={category.pk} value={category.pk}>{category.name}</option>))}
                        </Select>
                        <FormHelperText>What category describes your room?</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Amenities</FormLabel>
                        <Grid templateColumns={"1fr 1fr"} gap={5}>
                        {amenities?.map((amenity) => (
                        <Box key={amenity.pk}>
                            <Checkbox defaultChecked={roomInfo?.amenities?.includes(amenity.pk)} value={amenity.pk} {...register("amenities")}>{amenity.name}</Checkbox>
                            <FormHelperText>{amenity.description}</FormHelperText>
                        </Box>
                        ))}
                        </Grid>
                    </FormControl>
                    {mutation.isError ? <Text color="red.500">Something went wrong</Text>:null}
                    <Button type="submit" isLoading={mutation.isLoading} colorScheme={"red"} size="lg" w="100%">Modify Room</Button>

                </VStack>
            </Container>
        </Box>
    );
}