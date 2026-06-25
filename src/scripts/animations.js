import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)

CustomEase.create("rise", "M0,0 C0.16,1 0.3,1 1,1")

function revealHeading(el) {
    if (el.dataset.anim) return
    el.dataset.anim = "1"
    const split = new SplitText(el, { type: "lines,chars", linesClass: "anim-line", charsClass: "anim-char" })
    split.lines.forEach(line => {
        gsap.from(line.querySelectorAll(".anim-char"), {
            yPercent: 120,
            duration: 1.15,
            ease: "rise",
            stagger: { from: "center", each: 0.045 },
            scrollTrigger: { trigger: el, start: "top 92%", once: true }
        })
    })
    if (el.hasAttribute("data-tm") && split.lines[0]) {
        const tm = document.createElement("span")
        tm.className = "tm"
        tm.textContent = "TM"
        split.lines[0].appendChild(tm)
        gsap.set(tm, { opacity: 0 })
        gsap.to(tm, { opacity: 1, duration: 0.7, delay: 1, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } })
    }
    el.classList.add("is-ready")
}

function initHeadings() {
    document.querySelectorAll(".anim-heading").forEach(revealHeading)
}

function mediaOf(el) {
    return el.querySelector(".bg-image-main, .bg-video, img, video")
}

function initParallax(lenis) {
    const update = () => {
        const vh = window.innerHeight
        document.querySelectorAll("[data-parallax]").forEach(el => {
            const media = mediaOf(el)
            if (!media) return
            const r = el.getBoundingClientRect()
            if (r.bottom < -200 || r.top > vh + 200) return
            const prog = (r.top + r.height / 2 - vh / 2) / vh
            media.style.transform = `translate3d(0, ${(prog * -12).toFixed(2)}%, 0) scale(1.18)`
        })
    }
    if (lenis) lenis.on("scroll", update)
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    update()
}

let fadeObserver = null
const fadedSet = new WeakSet()
function initFades() {
    if (!fadeObserver) {
        fadeObserver = new IntersectionObserver(
            entries =>
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active")
                        fadeObserver.unobserve(entry.target)
                    }
                }),
            { threshold: 0.1 }
        )
    }
    document.querySelectorAll("[data-scroll]").forEach(el => {
        if (fadedSet.has(el)) return
        fadedSet.add(el)
        fadeObserver.observe(el)
    })
}

let peelObserver = null
const peeledSet = new WeakSet()
function initPeel() {
    if (!peelObserver) {
        peelObserver = new IntersectionObserver(
            entries =>
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-revealed")
                        peelObserver.unobserve(entry.target)
                    }
                }),
            { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        )
    }
    document.querySelectorAll(".bg-image-wrapper, .team-main, .team-thumb__image").forEach(w => {
        if (peeledSet.has(w) || w.closest("[data-parallax]")) return
        peeledSet.add(w)
        peelObserver.observe(w)
    })
}

export function initAnimations(lenis) {
    if (lenis) {
        lenis.on("scroll", ScrollTrigger.update)
    }

    document.addEventListener(
        "click",
        event => {
            const link = event.target?.closest?.("a")
            if (!link || !link.href) return
            let url
            try {
                url = new URL(link.href, location.href)
            } catch {
                return
            }
            if (url.origin !== location.origin) return
            if (url.pathname === location.pathname && url.search === location.search && (!url.hash || url.hash === location.hash)) event.preventDefault()
        },
        true
    )

    const root = document.documentElement
    let pendingTransition = null
    document.addEventListener("astro:before-swap", event => {
        pendingTransition = event.viewTransition
        root.classList.add("is-transitioning")
        if (event.newDocument) {
            if (root.classList.contains("theme-dark")) event.newDocument.documentElement.classList.add("theme-dark")
            const hr = event.newDocument.querySelector("[data-hero-reveal]")
            if (hr) hr.style.opacity = "0"
        }
    })
    document.addEventListener("astro:after-swap", () => {
        window.scrollTo(0, 0)
        if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    })

    initParallax(lenis)

    const enter = () => {
        initHeadings()
        const secondary = document.querySelectorAll("[data-enter]")
        secondary.forEach((el, i) => {
            if (el.dataset.entered) return
            el.dataset.entered = "1"
            const target = parseFloat(el.dataset.enter) || 1
            gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: target, y: 0, duration: 0.7, delay: 0.7 + i * 0.12, ease: "power2.out" })
        })
        const heroReveal = document.querySelector("[data-hero-reveal]")
        if (heroReveal && !heroReveal.dataset.entered) {
            heroReveal.dataset.entered = "1"
            gsap.fromTo(heroReveal, { opacity: 0 }, { opacity: 1, duration: 0.9, delay: 0.7 + secondary.length * 0.12 + 0.45, ease: "power2.out" })
        }
        gsap.delayedCall(secondary.length ? 1.4 : 0.6, () => {
            initFades()
            initPeel()
        })
        ScrollTrigger.refresh()
    }

    const finish = () => {
        root.classList.remove("is-transitioning")
        if (lenis) lenis.resize()
        enter()
    }

    enter()
    document.addEventListener("astro:page-load", () => {
        const vt = pendingTransition
        pendingTransition = null
        if (vt?.finished) vt.finished.finally(finish)
        else finish()
    })
    window.addEventListener("load", () => ScrollTrigger.refresh())
}
