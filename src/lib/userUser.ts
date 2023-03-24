import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../types";

export default function useUser() { //                    해당 query 이름
    const { isLoading, data, isError } = useQuery<IUser>(["me"], getMe, {
        retry: false,
    });
    return {
        userLoading: isLoading,
        user: data,
        isLoggedIn: !isError,
    };
}