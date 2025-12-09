import { ReactNode } from "react";

export default function FrontLayout({children}: {children: ReactNode}) {
    return <>
        <header>Header front office</header>
        <main>
            {children}
        </main>
    </>
}