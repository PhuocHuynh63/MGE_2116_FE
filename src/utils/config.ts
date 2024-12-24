import { z } from 'zod'

const configShema = z.object({
    NEXT_PUBLIC_API_DEV_URL: z.string(),
    NEXT_PUBLIC_API_PROD_URL: z.string(),
})

const configProject = configShema.safeParse({
    NEXT_PUBLIC_API_DEV_URL: process.env.NEXT_PUBLIC_API_DEV_URL,
    NEXT_PUBLIC_API_PROD_URL: process.env.NEXT_PUBLIC_API_PROD_URL,
})

if (!configProject.success) {
    throw new Error('The value of the environment variable is not valid')
}

const envConfig = configProject.data
export default envConfig