export const IconType = {
    DYNAMIC: "dynamic",
    REGULAR: "regular",
} as const;

export type IconType = typeof IconType[keyof typeof IconType];
