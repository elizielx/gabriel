import { component$ } from "@builder.io/qwik";
import { useAuthSignin } from "../routes/plugin@auth";

export default component$(() => {
    const signIn = useAuthSignin();
    return (
        <button
            class="border-2 border-black p-2"
            onClick$={() =>
                signIn.submit({
                    providerId: "discord",
                    options: { callbackUrl: "http://localhost:5173/dashboard" },
                })
            }
        >
            Sign In
        </button>
    );
});
