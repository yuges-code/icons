import { Icon } from "./Icon";

export const Icons = (<const>[
    {
        "name": {
            "kebab": "seal-check",
            "pascal": "SealCheck"
        }
    },
    {
        "name": {
            "kebab": "seal",
            "pascal": "Seal"
        }
    },
    {
        "name": {
            "kebab": "magnifier-minus",
            "pascal": "MagnifierMinus"
        }
    },
    {
        "name": {
            "kebab": "magnifier-plus",
            "pascal": "MagnifierPlus"
        }
    },
    {
        "name": {
            "kebab": "magnifier",
            "pascal": "Magnifier"
        }
    },
    {
        "name": {
            "kebab": "check",
            "pascal": "Check"
        }
    },
    {
        "name": {
            "kebab": "minus",
            "pascal": "Minus"
        }
    },
    {
        "name": {
            "kebab": "plus",
            "pascal": "Plus"
        }
    },
    {
        "name": {
            "kebab": "human",
            "pascal": "Human"
        }
    },
    {
        "name": {
            "kebab": "user",
            "pascal": "User"
        }
    },
    {
        "name": {
            "kebab": "home-door",
            "pascal": "HomeDoor"
        }
    },
    {
        "name": {
            "kebab": "home",
            "pascal": "Home"
        }
    },
    {
        "name": {
            "kebab": "house",
            "pascal": "House"
        }
    },
    {
        "name": {
            "kebab": "list",
            "pascal": "List"
        }
    },
    {
        "name": {
            "kebab": "menu",
            "pascal": "Menu"
        }
    }
]) satisfies readonly Icon[];

export type Icons = (typeof Icons)[number];
