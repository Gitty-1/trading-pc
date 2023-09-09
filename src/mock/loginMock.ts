import type { MockMethod } from "vite-plugin-mock";
export default [
    {
        url: "/loginMock", // 注意，这里只能是string格式
        method: "post",

        response: () => {
            return {
                form: {
                    username: 'admin',
                    password: '123456'
                }
            };
        },
    },
] as MockMethod[]
