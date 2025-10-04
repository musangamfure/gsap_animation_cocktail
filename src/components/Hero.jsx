import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: " chars,words" });
    const paragraphSplit = new SplitText(".subtitle", { type: " lines" });

    heroSplit.chars.forEach((chars) => chars.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 80,
      duration: 1.8,
      ease: "expo.out",
      delay: 0.5,
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".left-leaf", { y: 200 }, 0)
      .to(".right-leaf", { y: -200 }, 0);

    const startvalue = isMobile ? "top 50%" : "top 60%";
    const endvalue = isMobile ? "120% top%" : "bottom top";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#video",
        start: startvalue,
        end: endvalue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
        ease: "none",
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">
          <span className="text-gradient">Cocktail</span>
        </h1>

        <img
          src="/images/hero-left-leaf.png"
          className="left-leaf "
          alt=" left leaf"
        />

        <img
          src="/images/hero-right-leaf.png"
          className="right-leaf"
          alt="right leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-4 hidden md:block">
              <p>Cool. Crisp. Classic</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className=" video absolute inset-0">
        <video
          src="/videos/input.mp4"
          muted
          playsInline
          preload="auto"
          ref={videoRef}
        />
      </div>
    </>
  );
};

export default Hero;
