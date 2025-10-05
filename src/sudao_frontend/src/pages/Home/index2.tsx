import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import { Spotlight } from "@/components/ui/spotlight";
import React, { useRef, useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sprout, CheckCircle } from "lucide-react";
import { FaHandshake, FaUsers } from 'react-icons/fa';
import h_1 from "@/assets/images/h_1.png";
import logoIc from "@/assets/images/logo_ic.png";
import Logo from '@/assets/logos/SUDAOWhite.png';
import { Link } from "react-router-dom";
import { useHasAnimated } from '@/hooks/useHasAnimated';

const Home: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const cardSectionRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLDivElement>(null)
    const { hasAnimated, setAnimationPlayed } = useHasAnimated();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [loadingButton, setLoadingButton] = useState('');

    const { scrollYProgress: cardScrollProgress } = useScroll({
        target: cardSectionRef,
        offset: ["start end", "end start"],
    })

    // Card section animations
    const cardScale = useTransform(cardScrollProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 1])
    const cardRotate = useTransform(cardScrollProgress, [0, 0.3, 0.7, 1], [2, 0, 0, -1])

    const splashDuration = 3.2;
    const animationDelay = hasAnimated ? 0 : splashDuration; 

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
                mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
            }
        };

        const heroElement = heroRef.current;
        if (heroElement) {
            heroElement.addEventListener('mousemove', handleMouseMove);
            return () => heroElement.removeEventListener('mousemove', handleMouseMove);
        }
    }, [mouseX, mouseY]);


    const faqs = [
        {
            question: "What is a DAO?",
            answer:
                "A Decentralized Autonomous Organization (DAO) is a community-led organization governed by transparent rules written in code, run collectively by a core team. Members make decisions about the future of the project through key stakeholder.",
        },
        {
            question: "Who owns and controls the DAO?",
            answer: "The DAO is owned and controlled by its members through democratic governance and voting mechanisms.",
        },
        {
            question: "How is funding and spending tracked?",
            answer:
                "All funding and spending is tracked transparently on the blockchain, ensuring complete visibility and accountability.",
        },
    ]

    // Floating shapes data
    const floatingShapes = [
        { id: 1, size: 60, x: 10, y: 20, rotation: 45, color: 'rgba(66, 142, 179, 0.1)' },
        { id: 2, size: 80, x: 85, y: 15, rotation: -30, color: 'rgba(212, 202, 109, 0.1)' },
        { id: 3, size: 40, x: 20, y: 60, rotation: 0, color: 'rgba(66, 142, 179, 0.15)' },
        { id: 4, size: 100, x: 75, y: 55, rotation: 60, color: 'rgba(212, 202, 109, 0.08)' },
        { id: 5, size: 50, x: 50, y: 40, rotation: -45, color: 'rgba(66, 142, 179, 0.12)' },
    ];

    const GridOverlay = () => {
        return (
            <>
                <style>{`
                    @keyframes gridPan {
                        from { background-position: 0 0; }
                        to { background-position: 800px 800px; }
                    }

                    #gridOverlay {
                        background-image: 
                            repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(46, 71, 255, 0.4) 30px),
                            repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(46, 71, 255, 0.4) 30px);
                        background-size: 50px 50px;
                        animation: gridPan 60s linear infinite;
                    }

                    @keyframes gridFade {
                        0% { opacity: 1; }
                        70% { opacity: 1; }
                        100% { opacity: 0; }
                    }

                    .floating-shape {
                        animation: float 6s ease-in-out infinite;
                    }

                    .floating-shape:nth-child(odd) {
                        animation-delay: -2s;
                    }

                    .floating-shape:nth-child(even) {
                        animation-delay: -4s;
                    }

                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(5deg); }
                    }
                `}</style>
                
                <div 
                    id="gridOverlay"
                    className="absolute top-0 left-0 w-full z-0 opacity-60 overflow-hidden"
                    style={{
                        height: 'calc(100vh + 400px)',
                        WebkitMask: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                        mask: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
                    }}
                ></div>
            </>
        );
    };

    const handleButtonClick = (buttonType: string) => {
        setLoadingButton(buttonType);
        setTimeout(() => setLoadingButton(''), 2000);
    };


    return (
        <div ref={containerRef} className="min-h-screen bg-black overflow-x-hidden">
            <GridOverlay />

            {/* Floating Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
                {floatingShapes.map((shape) => (
                    <motion.div
                        key={shape.id}
                        className="floating-shape absolute"
                        style={{
                            width: shape.size,
                            height: shape.size,
                            left: `${shape.x}%`,
                            top: `${shape.y}%`,
                            backgroundColor: shape.color,
                            borderRadius: shape.id % 2 === 0 ? '50%' : '20%',
                            transform: `rotate(${shape.rotation}deg)`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: animationDelay + 1 + shape.id * 0.1, duration: 0.8 }}
                    />
                ))}
            </div>



            {/* Surprise :D  */}
            {!hasAnimated && (
                <div className="fixed inset-0 px-6 text-white justify-center items-center w-full z-50 flex">
                    <motion.div
                        className="w-32 h-32 relative z-10 flex items-center mt-24 justify-center"
                        initial={{
                            x: 0,
                            y: 800,
                            opacity: 1,
                            scale: 2
                        }}
                        animate={{
                            x: [0, 0, 0, 0, "-40vw"],
                            y: ["60vh", "-10vh", "-52vh", "-52vh", "-52vh"],
                            opacity: [1, 1, 1, 1, 0],
                            scale: [2, 2, 1, 1, 1],
                        }}
                        transition={{
                            duration: 4,
                            times: [0, 0.4, 0.6, 0.8, 1],
                            ease: ["easeInOut", "easeInOut", "easeInOut", "easeInOut"],
                            delay: 0.3
                        }}
                        onAnimationComplete={setAnimationPlayed} 
                    >
                        <motion.div
                            className="flex items-center text-white"
                            initial={{
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                borderRadius: 200,
                                borderColor: "rgba(255, 255, 255, 1)", 
                                borderWidth: 1,
                                padding: '4px 24px',
                            }}
                            animate={{
                                backgroundColor: [
                                    "rgba(255, 255, 255, 0.1)",
                                    "rgba(255, 255, 255, 0.1)",
                                    "rgba(0, 0, 0, 0)",
                                    "rgba(0, 0, 0, 0)",
                                ],
                                borderRadius: [200, 200, 0, 0],
                                borderColor: [
                                    "rgba(255, 255, 255, 1)",
                                    "rgba(255, 255, 255, 1)",
                                    "rgba(0, 0, 0, 0)",
                                    "rgba(0, 0, 0, 0)",
                                ],
                                borderWidth: [1, 1, 0, 0],
                                padding: ['4px 24px', '4px 24px', '0px 0px', '0px 0px'],
                            }}
                            transition={{
                                duration: 4,
                                times: [0, 0.4, 0.6, 1],
                                ease: ["easeInOut", "easeInOut", "easeInOut", "easeInOut"],
                                delay: 0.3
                            }}
                        >
                            <div className="w-10 h-10">
                                <img src={Logo} alt="Logo" />
                            </div>
                            <span className='pl-3'>SUDAO</span>
                        </motion.div>
                    </motion.div>
                </div>
            )}

            {/* Hero Section */}
            <motion.section 
                ref={heroRef}
                className="px-6 text-white overflow-hidden w-full relative flex"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: animationDelay, duration: 0.8 }} 
                viewport={{ once: true }}
            >
                <div className="flex flex-col justify-center items-center w-full z-30 p-8 mt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: animationDelay + 0.1, duration: 0.8 }}
                        className="z-30 rounded-3xl text-sm border font-semibold p-1.5 px-6 mb-3 flex items-center border-white/30 bg-gradient-to-r from-white/20 to-white/10"
                    >
                        <img
                            src={logoIc}
                            alt="Logo Internet Computer"
                            className="w-5 h-5"
                        /> 
                        <span className="pl-2">Powered by ICP</span>
                    </motion.div>

                    {/* Hero Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: animationDelay + 0.2, duration: 0.8 }}
                        className="z-30 text-3xl md:text-6xl lg:text-7xl font-bold pb-6 w-full text-center leading-tight"
                    >
                        <div className="flex items-center justify-center pb-2 flex-wrap">
                            <div className="flex items-center">
                                From Community Energy
                                <motion.div 
                                    className="
                                        bg-white/10
                                        backdrop-blur-sm
                                        p-2 w-11 h-11 md:w-14 md:h-14 rounded-xl
                                        transform -rotate-6
                                        flex items-center justify-center
                                        shadow-xl border border-yellow-500 mx-3
                                    "
                                    whileHover={{ scale: 1.1, rotate: -12 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <FaUsers className="w-5 h-5 md:w-7 md:h-7 text-yellow-500" />
                                </motion.div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center flex-wrap">
                            <div className="flex items-center">
                                <span className="font-normal md:font-light italic text-white/80">to</span>
                                <motion.div 
                                    className="
                                        bg-white/10
                                        backdrop-blur-sm
                                        p-2 w-11 h-11 md:w-14 md:h-14 rounded-xl
                                        transform rotate-12
                                        flex items-center justify-center
                                        shadow-xl border border-blue-400 mx-3
                                    "
                                    whileHover={{ scale: 1.1, rotate: 18 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <FaHandshake className="w-5 h-5 md:w-7 md:h-7 text-blue-400" />
                                </motion.div>
                                Collective Action.
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: animationDelay + 0.3, duration: 0.8 }} 
                        className="z-30 text-lg md:text-xl text-center text-white/80 pb-8 max-w-2xl leading-relaxed"
                    >
                        Launch a transparent and community-owned organization
                        <br />
                        with Decentralized Autonomous Organizations.
                    </motion.div>

                    {/* Value Proposition Bullets */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: animationDelay + 0.4, duration: 0.8 }}
                        className="flex flex-wrap justify-center gap-6 mb-8 z-30"
                    >
                        {[
                            "No coding required",
                            "Launch in minutes", 
                            "100% transparent"
                        ].map((benefit, index) => (
                            <motion.div
                                key={benefit}
                                className="flex items-center text-sm text-white/90"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: animationDelay + 0.5 + index * 0.1 }}
                            >
                                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                {benefit}
                            </motion.div>
                        ))}
                    </motion.div>


                    {/* Enhanced CTAs */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: animationDelay + 0.7, duration: 0.8 }}
                        className="flex space-x-6 justify-center items-center"
                    >
                        <Link to={"/discover"} className="group">
                            <motion.button 
                                className="
                                    px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold 
                                    rounded-full shadow-xl relative overflow-hidden
                                    transition-all duration-300 ease-in-out 
                                    hover:from-blue-700 hover:to-blue-900 hover:shadow-2xl 
                                    flex items-center justify-center border border-white/30 shadow-blue-800/50
                                " 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleButtonClick('primary')}
                                disabled={loadingButton === 'primary'}
                            >
                                {loadingButton === 'primary' ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                ) : (
                                    <>
                                        <span>Launch Your DAO</span>
                                        <motion.span 
                                            className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            →
                                        </motion.span>
                                    </>
                                )}
                                
                                <motion.div
                                    className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                                />
                            </motion.button>
                        </Link>
                        <Link to={"/discover"}>
                            <motion.button 
                                className="
                                    px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full 
                                    border border-white/30 hover:bg-white/20 hover:border-white/50
                                    transition-all duration-300 ease-in-out hover:shadow-xl
                                " 
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleButtonClick('secondary')}
                                disabled={loadingButton === 'secondary'}
                            >
                                {loadingButton === 'secondary' ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
                                    />
                                ) : (
                                    "View Documentation"
                                )}
                            </motion.button>
                        </Link>
                    </motion.div>

                </div>
            </motion.section>

            {/* Spotlight Container - Show after DAO explanation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: animationDelay + 1.5, duration: 0.8 }}
                className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
            >
                <Spotlight
                    className="absolute -left-60"
                    style={{ top: '-20px' }}
                    fill="#428EB3"
                />
                <Spotlight
                    className="absolute -right-60"
                    style={{ top: '-20px' }}
                    fill="#d4ca6dff"
                    variant="top-right" 
                />
            </motion.div>

            {/* DAO Explanation Card - Enhanced with dramatic scaling and glow */}
            <motion.section 
                ref={cardSectionRef} 
                className="px-6 pt-5 py-2 relative z-30"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: animationDelay + 0.65, duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        style={{
                            scale: cardScale,
                            rotateX: cardRotate,
                        }}
                        className="relative"
                    >
                        <motion.div
                            style={{ boxShadow: "0 0 40px 0px rgb(56, 189, 248, 0.7)" }}
                            className="relative rounded-3xl"
                        >
                            <motion.div
                                className="absolute -inset-1 rounded-[2rem] blur-lg"
                            />
                            <div className="relative bg-white/80 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
                                <div className="grid md:grid-cols-2 gap-12 items-start">
                                    <div>
                                        <motion.div
                                            initial={{ opacity: 0, x: -50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.8, delay: animationDelay + 1 }}
                                            viewport={{ once: true }}
                                            className="flex items-start space-x-3 mb-8"
                                        >
                                            <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                                                <Sprout className="text-white" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-blue-800 leading-tight">
                                                WHERE MOVEMENTS ARE
                                                <br />
                                                OWNED TOGETHER
                                            </h2>
                                        </motion.div>

                                        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-1 h-64">
                                            {faqs.map((faq, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -30 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: animationDelay + 1.1 + index * 0.1, duration: 0.6 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <AccordionItem value={`item-${index}`} className="border-b border-slate-300 last:border-b-0">
                                                        <AccordionTrigger className="flex items-center justify-between w-full text-left py-4 hover:bg-white/50 px-2 rounded transition-all duration-300 hover:shadow-sm font-medium text-slate-800 text-sm [&[data-state=open]>svg]:rotate-180">
                                                            {faq.question}
                                                        </AccordionTrigger>
                                                        <AccordionContent className="pb-4 px-2 text-slate-600 text-sm leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                                            {faq.answer}
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </motion.div>
                                            ))}
                                        </Accordion>

                                    </div>

                                    {/* DAO Landing Page Showcase with Stacked Cards */}
                                    <motion.div
                                        className="relative group"
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: animationDelay + 1.2 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="absolute inset-0 bg-white rounded-2xl shadow-lg border border-slate-100 transform rotate-2 scale-95 transition-opacity duration-300 opacity-0 group-hover:opacity-60" />
                                        <div className="absolute inset-0 bg-white rounded-2xl shadow-md border border-slate-50 transform -rotate-1 scale-97 transition-opacity duration-300 delay-75 opacity-0 group-hover:opacity-40" />

                                        <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg overflow-hidden transform transition-transform duration-300 group-hover:rotate-1"
                                        >
                                            <div className="space-y-2 mb-4 px-6 pt-6">
                                                <h2 className="font-bold text-xl text-slate-800">
                                                    DAO as your Landing Page
                                                </h2>
                                                <p className="text-base text-slate-600 leading-relaxed">
                                                    Your DAO isn't just a tool for your community. It's your
                                                    identity and platform for people to discover your mission.
                                                </p>
                                            </div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: animationDelay + 1.3 }}
                                                viewport={{ once: true }}
                                                className="block"
                                            >
                                                <motion.img
                                                    src={h_1}
                                                    alt="DAO Landing Page Preview"
                                                    className="w-full h-auto block rounded-b-2xl"
                                                    draggable="false"
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    )
};

export default Home;