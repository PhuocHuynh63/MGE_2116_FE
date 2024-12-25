import { IUser } from "@/shemaValidations/model.schema";
import http from "@/utils/http/http";

const userService = {
    userRequest: async (data: IUser) => {
        return await http.post('user/request-point', data);
    }
}

export default userService;