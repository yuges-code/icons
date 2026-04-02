export const IconCategory = {
    USER: "user",
    MATH: "math",
    HOME: "home",
    EDITOR: "editor",
    ACTIONS: "actions",
    DEVICES: "devices",
    SECURITY: "security",
} as const;

export type IconCategory = typeof IconCategory[keyof typeof IconCategory];
