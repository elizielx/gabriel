import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useAuthSession, useAuthSignout } from "../plugin@auth";
import { Form, routeLoader$ } from "@builder.io/qwik-city";
import { client } from "@gabriel/trpc-client";

export const useHealth = routeLoader$(async (requestEvent) => {
    try {
        const health = (await client.health.health.query()).status;

        return {
            health: health.toUpperCase(),
        };
    } catch (error) {
        return requestEvent.fail(500, {
            errorMessage: "NOT OK",
        });
    }
});

export default component$(() => {
    const session = useAuthSession();
    const signOut = useAuthSignout();
    const health = useHealth();

    return (
        <>
            <div class="ml-4 mt-4">
                <h1 class="text-2xl">Dashboard</h1>
                <br />
                <p>Welcome, {session.value?.user?.name}</p>
                <br />
                <p>API is {health.value.errorMessage ? health.value.errorMessage : health.value.health}</p>
                <br />
                <Form action={signOut}>
                    <input type="hidden" name="callbackUrl" value="/" />
                    <button class="border-2 border-black p-2">Sign Out</button>
                </Form>
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: "Dashboard",
};
