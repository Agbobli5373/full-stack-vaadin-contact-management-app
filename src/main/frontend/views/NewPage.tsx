import type {ViewConfig} from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
    menu: {
        title: "New page",
        icon: "new"
    }
};
export default function NewPage() {
    return (
        <>
            <h1>New Page</h1>
            <p>This is a new page.</p>
        </>
    );
}