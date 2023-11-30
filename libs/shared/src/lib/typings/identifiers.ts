import { Identifiers as SapphireIdentifiers } from "@sapphire/framework";

enum Identifiers {
    RegisteredUserOnly = "RegisteredUserOnly",
}

export const GabrielIdentifiers = {
    ...SapphireIdentifiers,
    ...Identifiers,
} as const;
