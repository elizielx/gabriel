import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useAuthSession, useAuthSignout } from "../plugin@auth";
import { Form } from "@builder.io/qwik-city";

export default component$(() => {
    const session = useAuthSession();
    const signOut = useAuthSignout();

    return (
        <>
            <div class="container">
                <h1>Dashboard</h1>
                <br />
                <p>Welcome, {session.value?.user?.name}</p>
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
