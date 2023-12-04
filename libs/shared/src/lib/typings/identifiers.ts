import { Identifiers as SapphireIdentifiers } from "@sapphire/framework";

enum Identifiers {
    RegisteredUserOnly = "RegisteredUserOnly",
    DeveloperOnly = "DeveloperOnly",
}

export const GabrielIdentifiers = {
    ...SapphireIdentifiers,
    ...Identifiers,
} as const;
