import { IconCategory } from "./IconCategory";

export interface Icon {
    name: {
        kebab: string,
        pascal: string,
    },
    alias?: {
        name: {
            kebab: string,
            pascal: string,
        },
    };
    categories?: readonly IconCategory[];
}
