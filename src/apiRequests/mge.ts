import http from "@/utils/http/http";

const mgeApiRequest = {
    getMge: (current: number, pageSize: number) => {
        return http.get(`mge/all?current=${current}&pageSize=${pageSize}`);
    },
}

export default mgeApiRequest;