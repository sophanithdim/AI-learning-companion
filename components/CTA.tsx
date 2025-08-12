import Image from "next/image";
import Link from "next/link";

const Cta = () => {
    return (
        <section className="cta-section animate-fade-in">
            <div className="cta-badge animate-slide-up" style={{ animationDelay: '0.1s' }}>Start learning your way.</div>
            <h2 className="text-3xl font-bold animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Build and Personalize Learning Companion
            </h2>
            <p className="text-white/90 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.
            </p>
            <div className="my-2 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <Image 
                    src="images/cta-modern.svg" 
                    alt="cta" 
                    width={362} 
                    height={232} 
                    loading="lazy"
                    className="drop-shadow-lg"
                />
            </div>
            <Link href="/companions/new" className="w-full animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <button className="btn-primary w-full justify-center hover-lift group">
                    <Image 
                        src="/icons/plus.svg" 
                        alt="plus" 
                        width={14} 
                        height={14} 
                        loading="lazy"
                        className="transition-transform group-hover:rotate-90 duration-300"
                    />
                    <span>Build a New Companion</span>
                </button>
            </Link>
        </section>
    )
}
export default Cta
