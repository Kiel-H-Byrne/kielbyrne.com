import { Text } from "@chakra-ui/react";
import Link from "next/link";
import Script from "next/script";

const LandingPageTemplate = () => {
  const onConfettiLoad = () => {
    const key = "create-next-stack-hasShownConfetti-my-app";
    const hasShownConfetti = localStorage.getItem(key);
    // if (hasShownConfetti != null) return;

    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    (function frame() {
      const timeLeft = animationEnd - Date.now();

      (window as any).confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: Math.max(200, 500 * (timeLeft / duration)),
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
        colors: [
          "#26ccff",
          "#a25afd",
          "#ff5e7e",
          "#88ff5a",
          "#fcff42",
          "#ffa62d",
          "#ff36ff",
        ],
        shapes: ["square", "circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.8, 1.2),
        drift: randomInRange(-0.1, 0.1),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();

    localStorage.setItem(key, "false");
  };

  return (
    <div>
      <Script
        src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.9.3/tsparticles.confetti.bundle.min.js"
        onLoad={onConfettiLoad}
      />
      <main>
        <Text lineHeight={2} fontFamily={"body"}>
          👋 Hey there! I'm Kiel Byrne, an IT Consultant and Web Developer based
          in the vibrant DC Metropolitan Area. Born under the meticulous Virgo
          sign on September 17th, I thrive on staying busy and engaged. When I'm
          not immersed in creating innovative solutions, you can find me
          enjoying quality time with my amazing family – happily married with
          two brilliant boys who keep me on my toes. In my quest to make a
          positive impact, I build tools that foster communities and empower
          individuals on their path to self-discovery and growth. I'm deeply
          passionate about discussing financial literacy and exploring various
          paths to financial freedom, be it through cryptocurrency, options
          trading, Forex, entrepreneurship, or real estate ventures. I'm also
          fascinated by topics like Initiative 71 & the Farm Act, emerging
          trends, and the power of group economics. When I need a break from the
          fast-paced world of technology, I indulge in YouTube videos that delve
          into metaphysics, ancient civilizations, and lifehacks. To find
          moments of tranquility and balance, I practice meditation, often
          incorporating visualization techniques or immersing myself in the
          soothing sounds of a crystal bowl. Humor plays an important role in my
          downtime, and shows like Desus & Mero and All Def Digital never fail
          to provide some much-needed comic relief. Additionally, I actively
          seek light by exploring spiritual alchemy, diving into readings that
          enlighten me on profound topics, and conducting Masonic business. If
          you want to connect and discuss exciting projects, collaborations, or
          simply share interesting ideas, feel free to connect with me on{" "}
          <Link href="https://www.linkedin.com/in/kielbyrne">LinkedIn</Link>.
          Also check out my IT Consulting company,{" "}
          <Link href="https://www.tenksolutions.com">TenK Solutions</Link>.
          Let&apos;s make a positive change in the world together! 😊
        </Text>
      </main>
    </div>
  );
};

export default LandingPageTemplate;
