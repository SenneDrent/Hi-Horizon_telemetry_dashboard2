import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { sessionExists } from "$lib/server/authentication/session";


export const load: LayoutServerLoad = ({ cookies }) => {
    if (cookies.get("sessionid") === "1") {
        return;
    }
    else {
        throw redirect(308, "/");
    }
};