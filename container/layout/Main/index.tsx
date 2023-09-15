import React, {PropsWithChildren} from 'react'
import Header from "@/components/Header";

const MainLayout: React.FC<PropsWithChildren> = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {children} = props

    return (
        <main className={'relative'}>
            <Header/>
            <section className="p-8 bg-[#085adfbd]">
                {children}
            </section>
        </main>
    )
}

export default MainLayout
