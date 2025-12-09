import { ReactNode } from "react";

export default function BackOfficeLayout({children}: {children: ReactNode}) {
    return <>
        <header>Header Back office</header>
        <main>
            {children}
        </main>
    </>
}