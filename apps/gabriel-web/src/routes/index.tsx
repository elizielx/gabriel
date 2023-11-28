import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useAuthSession } from "./plugin@auth";
import Login from "../components/Login";

export default component$(() => {
    const session = useAuthSession();

    return (
        <div class="ml-4 mt-4">
            <h1 class="text-2xl">Hello, world</h1>
            <br />
            {session.value?.user === undefined ? (
                <Login />
            ) : (
                <a class="border-2 border-black p-2" href="/dashboard">
                    Dashboard
                </a>
            )}
        </div>
    );
});

export const head: DocumentHead = {
    title: "Gabriel",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};
