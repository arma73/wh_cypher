/**
 * Determines the recognition method for the current window.
 * @param windowHeight The height of the extension window.
 */
export const duckOpenerRecognition = (
    windowHeight: number
): "menubar" | "tab" => {
    if (window.innerHeight === windowHeight) {
        return "menubar";
    } else {
        return "tab";
    }
};
