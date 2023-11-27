import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useAuthSession } from "./plugin@auth";
import Login from "../components/Login";

export default component$(() => {
    const session = useAuthSession();

    return (
        <div class="container">
            <h1>Hello, world</h1>
            <br />
            {session.value?.user === undefined ? <Login /> : <a href="/dashboard">Dashboard</a>}
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
