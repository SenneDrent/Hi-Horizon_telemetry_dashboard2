import { writable } from "svelte/store";

export const pageName = writable("page");
export const showBackButton = writable(false);