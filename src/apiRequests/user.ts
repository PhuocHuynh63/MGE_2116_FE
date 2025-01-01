import { IUserRequest } from "@/schemaValidations/model.schema";
import http from "@/utils/http/http";

const userService = {
    userRequest: async (data: IUserRequest) => {
        return await http.post('user/request-point', data);
    },
    getAllUser: async (current: number, pageSize: number) => {
        return await http.get(`user?current=${current}&pageSize=${pageSize}`);
    }
}

export default userService;