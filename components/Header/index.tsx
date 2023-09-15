import React, {PropsWithChildren} from 'react'
import Link from "next/link";
import {FiGithub} from "react-icons/fi";

const Header = () => {
    return (
        <header className={'flex bg-white drop-shadow-md flex-wrap items-center px-8 py-6'}>
            <nav>
                <ul className={'flex items-center text-primary gap-8'}>
                    <li>
                        <Link href={'/'}>Nepali Calendar</Link>
                    </li>
                    <li>
                        <Link href={'/date-convertor'}>Date convertor</Link>
                    </li>
                </ul>
            </nav>
            <nav className={'ml-auto'}>
                <ul className={'flex items-center text-primary gap-8'}>
                    <li>
                        <a href={'https://github.com/SurajMazar/nepali-calendar'} target={'_blank'} rel={'noreferrer'}
                           className={'flex items-center gap-2'}>
                            <span><FiGithub/> </span>
                            <span>Github</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
