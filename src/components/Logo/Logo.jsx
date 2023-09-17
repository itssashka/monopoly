import React from 'react'
import { Link } from 'react-router-dom';

const Logo = () => {
    const logoSVG = (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo_svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                    d="M19 6.34267C17.35 4.30367 14.8273 3 12 3C7.02944 3 3 7.02944 3 12C3 13.8501 3.55827 15.5699 4.51555 17M21 12C21 16.9706 16.9706 21 12 21C10.961 21 9.96308 20.8239 9.03452 20.5M12 16H13C13.6667 16 15 15.6 15 14C15 12.4 13.6667 12 13 12H11C10.3333 12 9 11.6 9 10C9 8.4 10.3333 8 11 8H12M12 16H9M12 16V18M15 8H12M12 8V6"
                    stroke="current"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>{" "}
            </g>
        </svg>
    );
  return (
    <Link to='/main' className='logo'>
        {logoSVG}
        <div className='logo_name'>Монополия онлайн</div>
    </Link>
  )
}

export default Logo