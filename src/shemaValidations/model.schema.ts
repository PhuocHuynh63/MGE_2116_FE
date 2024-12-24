import { z } from "zod";

export const MgeShema = z.object({
    data: z.object({
        results: z.array(z.object({
            id: z.string(),
            name: z.string(),
            typeMge: z.string(),
            img: z.string(),
        }))
    })
})

export type IMGE = z.TypeOf<typeof MgeShema>