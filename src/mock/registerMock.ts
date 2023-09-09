import type { MockMethod } from "vite-plugin-mock";
export default [
    {
        url: "/registerMock", // 注意，这里只能是string格式
        method: "post",

        response: () => {
            // console.log(option)
            
            return {
                a: 1
            };
        },
    },
] as MockMethod[]
