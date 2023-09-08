import { pageName, showBackButton } from "../stores";

export function setupPageDefault() {
    pageName.set("Page");
    showBackButton.set(false);
} 