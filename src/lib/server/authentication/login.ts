export function validateLogin(username:(FormDataEntryValue | null), password:(FormDataEntryValue | null)): boolean {
    if (username === "admin" && password === "test") {
        return true
    }
    else {
        return false;
    }
}