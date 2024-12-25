import http from "@/utils/http/http";

const mgeService = {
    getMge: (current: number, pageSize: number) => {
        return http.get(`mge/all?current=${current}&pageSize=${pageSize}`);
    },
}

export default mgeService;