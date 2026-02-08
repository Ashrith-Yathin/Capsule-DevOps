import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaDribbble } from "react-icons/fa";

import MarqueeText from '../Marquee/MarqueeText';

const Footer = () => {
    return (
        <section className='w-screen h-auto px-6 py-10'>
            {/* Removed "Ready to modernize" text */}
            <div>
                <MarqueeText />
            </div>

            <div className='flex justify-between items-center text-2xl mt-14'>
                <h3 className='text-[#b1a696]'>Explore the power of Generative UI<br />
                    with Tambo and React.<br />
                    <br />
                    Build interfaces that adapt<br />
                    to human intent.
                </h3>

                <div className='flex flex-col justify-center items-end'>
                    <a href="#" className='text-[#f2ede5] text-2xl'>Overview</a>
                    <a href="#" className='text-[#f2ede5] text-2xl'>Generative UI</a>
                    <a href="#" className='text-[#f2ede5] text-2xl'>Tambo SDK</a>
                    <a href="#" className='text-[#f2ede5] text-2xl'>Contact</a>
                </div>
            </div>

            <div className="w-full flex justify-end items-center mt-20">
                <div>
                    <p className="text-[0.8rem] text-[#b1a696] text-right">
                        DevOps Control Room—AI-powered<br />
                        observability for modern teams.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer;