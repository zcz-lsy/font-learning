import pageInit from "../src/components/pageInit.js";
import cursorInit from "../src/components/cursorEffect.js"

pageInit();
cursorInit();


gsap.registerPlugin(ScrollTrigger)

const sections = gsap.utils.toArray('.block')

let allWidth = 0

sections.forEach(item => {
  allWidth += item.getBoundingClientRect().width
})

gsap.to('.scroll-content', {
  x: - allWidth + document.querySelector('.scroll-content').offsetWidth,
  // offsetWidth clientWidth
  ease: 'none',
  // 将动画与页面的滚动行为关联起来
  scrollTrigger: {
    trigger: '.scroll-content',
    start: "top, top",
    pin: true,
    scrub: 1,
    end: () => '+=' + (allWidth - document.querySelector('.scroll-content').offsetWidth),
    markers: true,
    // end: () => "+=" + document.querySelector('.scroll-content').offsetWidth,
  }
})

gsap.to('.font-graphy', {
  x: -200,
  ease: 'none',
  scrollTrigger: {
    trigger: '.scroll-content',
    scrub: 1,
    start: document.querySelector('.project-cards-block').getBoundingClientRect().width - innerWidth + 800,
    end: '+=' + innerWidth,
    markers: true,

  }
})

const cbTrigger = ScrollTrigger.create({
    trigger: "body",
    end: () => "bottom " + `${innerHeight} / 10`,
    onLeave: () => {
        document.body.classList.toggle("black");
    },
    onEnterBack: () => {
        document.body.classList.toggle("black");
    }
})