import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useAuthSession, useAuthSignout } from "../plugin@auth";
import { Form, routeLoader$ } from "@builder.io/qwik-city";
import { client } from "../../trpc-client";

export const useHealth = routeLoader$(async (requestEvent) => {
    const health = (await client.health.health.query()).status;
    if (!health) {
        return requestEvent.fail(500, {
            errorMessage: "NOT OK",
        });
    }

    return {
        health,
    };
});

export default component$(() => {
    const session = useAuthSession();
    const signOut = useAuthSignout();
    const health = useHealth();

    return (
        <>
            <div class="container">
                <h1>Dashboard</h1>
                <br />
                <p>Welcome, {session.value?.user?.name}</p>
                <br />
                <p>API is {health.value.errorMessage ? health.value.errorMessage : health.value.health}</p>
                <br />
                <Form action={signOut}>
                    <input type="hidden" name="callbackUrl" value="/" />
                    <button>Sign Out</button>
                </Form>
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: "Dashboard",
};
