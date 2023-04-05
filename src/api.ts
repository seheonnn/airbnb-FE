// const BASE_URL = "http://127.0.0.1:8000/api/v1";

// export async function getRooms() {
//     const response = await fetch(`${BASE_URL}/rooms/`);
//     const json = await response.json();
//     return json;
// }

import Cookie from "js-cookie"
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { formatDate } from "./lib/utils";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? 'http://127.0.0.1:8000/api/v1/': 'https://airbnbclone-1apl.onrender.com/api/v1/',
    withCredentials: true,
});

export const getRooms = () => 
    instance.get("rooms/").then((response) => response.data);

export const getRoom = ( {queryKey} : QueryFunctionContext ) => {
    // queryKey 는 2개로 이루어진 배열인데 첫 번째는 rooms, 두 번째는 pk 임.
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}`).then((response) => response.data);
    // return instance.get(`rooms/${queryKey[1]}`).then((response) => response.data);
};

export const getRoomReviews = ( {queryKey} : QueryFunctionContext ) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}/reviews`).then((response) => response.data);
};

export const getMe = () => 
instance.get(`users/me`).then((response) => response.data);

export const logOut = () => 
instance.post(`users/log-out`, null, {
    headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
    },
})
.then((response) => response.data);

export const githubLogIn = (code:string) => instance.post(`users/github`, 
    {code}, 
    {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    }
).then((response) => response.status);


export const kakaoLogIn = (code:string) => instance.post(`users/kakao`, 
    {code}, 
    {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    }
).then((response) => response.status);

export interface IUsernameLoginVariables{
    username: string;
    password: string;
}

export interface IUsernameLoginSuccess {
    ok: string;
}

export interface IUsernameLoginError {
    error: string;
}

export const usernameLogIn = ({username, password}:IUsernameLoginVariables) => instance.post(`users/log-in`,
{username, password}, 
    {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    }
).then((response) => response.data);
// /users/log-in에서 response로 받을 수 있는 것 ok or errors

export interface ISignUpVariables{
    name: string;
    email: string;
    username: string;
    password: string;
    currency: string;
    gender: string;
    language: string;
}

export const signUp = ({name, email, username, password, currency, gender, language} : ISignUpVariables) => instance.post(`users/`,
{name, email, username, password, currency, gender, language},
    {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    }
).then((response) => response.data);

export const getAmenities = () =>
instance.get(`rooms/amenities/`).then((response) => response.data);

export const getCategories = () =>
instance.get(`categories`).then((response) => response.data);

export interface IUploadRoomVariables {
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
};

export const uploadRoom = (variables: IUploadRoomVariables) => instance.post(`rooms/`,
variables, 
    {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    }
).then((response) => response.data); // django 에서 room 생성 후 해당 room을 반환함.

export const getUploadURL = () => instance.post(`medias/photos/get-url`,
null, 
    {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    }
).then((response) => response.data);

export interface IUploadImageVariables {
    file: FileList;
    uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVariables) => {
    const form = new FormData();
    form.append("file", file[0]);
    return axios.post(uploadURL, form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    .then((reponse) => reponse.data);
};

export interface ICreatePhotoVariables {
    description: string;
    file: string;
    roomPk: string;
}

export const createPhoto = ({ description, file, roomPk }: ICreatePhotoVariables) =>
instance.post(`rooms/${roomPk}/photos`, { description, file }, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
}
).then((response) => response.data);

type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkBooking = ( {queryKey} : QueryFunctionContext<CheckBookingQueryKey> ) => {
    const [_, roomPk, dates] = queryKey;
    if (dates) {
        const [firstDate, secondDate] = dates;
        // const [checkIn] = firstDate.toJSON().split("T"); // timezone 오류
        // const [checkOut] = secondDate.toJSON().split("T");
        const checkIn = formatDate(firstDate);
        const checkOut = formatDate(secondDate);
        console.log(checkIn, checkOut);
        return instance.get(`rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`)
        .then((response) => response.data);
    }
}

export interface IModifyRoomVariables {
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

export const modifyRoom = (variables: IModifyRoomVariables) => instance.put(`rooms/${variables.roomPk}`,
variables, 
    {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    }
).then((response) => response.data); // django 에서 room 생성 후 해당 room을 반환함.

export interface IBookingVariables {
    pk: string;
    check_in: string;
    check_out: string;
    guests: number;
}

export const createBooking = (variables: IBookingVariables) => instance.post(`rooms/${variables.pk}/bookings`, 
variables, 
    {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    }
).then((response) => response.data)

export const getMyBookings = () => 
instance.get("bookings/").then((response) => response.data);

export const deleteBooking = (bookingPk: number) => instance.post(`bookings/${bookingPk}`, null, {
    headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
    },
}).then((response) => response.status);

export const getRoomBookings = ({queryKey} : QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}/bookings`).then((response) => response.data);
};

export const wishlistToggle = (roomPk: number) => instance.put(`wishlists/1/rooms/${roomPk}`,
null, 
    {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    }
).then((response) => response.data);

export const getWishlist = () => {
    return instance.get(`wishlists/`).then((response) => response.data);
};