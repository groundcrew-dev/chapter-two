import Lenis from "lenis"
import { initAnimations } from "./animations.js"

let lenis

function initLenis() {
    if (lenis) return lenis
    lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    const raf = time => {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return lenis
}

function initFooterReveal() {
    const main = document.querySelector("[data-main]")
    const footer = document.querySelector("[data-footer]")
    const content = document.querySelector("[data-footer-content]")
    if (!main || !footer || !content) return

    const measure = () => {
        const height = footer.offsetHeight
        const fits = height > 0 && height <= window.innerHeight
        main.style.marginBottom = fits ? `${height}px` : "0px"
        footer.classList.toggle("is-flow", !fits)
    }

    const onScroll = () => {
        const threshold = main.offsetHeight + footer.offsetHeight / 2
        content.classList.toggle("is-visible", window.scrollY + window.innerHeight >= threshold)
    }

    measure()
    onScroll()
    window.addEventListener("resize", () => {
        measure()
        onScroll()
    })
    if (lenis) lenis.on("scroll", onScroll)
    window.addEventListener("scroll", onScroll, { passive: true })
}

function initHeaderTheme() {
    const line = 40
    const run = () => {
        const header = document.querySelector("[data-header]")
        if (!header) return
        const main = document.querySelector("[data-main]")
        let light = false
        document.querySelectorAll("[data-dark]").forEach(el => {
            const rect = el.getBoundingClientRect()
            if (rect.top <= line && rect.bottom >= line) light = true
        })
        if (main && main.getBoundingClientRect().bottom <= line) light = true
        header.classList.toggle("is-light", light)
    }
    if (!initHeaderTheme.bound) {
        initHeaderTheme.bound = true
        if (lenis) lenis.on("scroll", run)
        window.addEventListener("scroll", run, { passive: true })
        window.addEventListener("resize", run)
    }
    run()
}

function initThemeToggle() {
    if (initThemeToggle.bound) return
    initThemeToggle.bound = true
    document.addEventListener("click", e => {
        const btn = e.target.closest && e.target.closest(".toggle")
        if (!btn) return
        const dark = document.documentElement.classList.toggle("theme-dark")
        try {
            localStorage.setItem("theme", dark ? "dark" : "light")
        } catch (err) {}
    })
}

function initImages() {
    document.querySelectorAll("[data-img]").forEach(img => {
        if (img.tagName === "VIDEO" || img.complete) {
            img.classList.add("loaded")
            return
        }
        img.addEventListener("load", () => img.classList.add("loaded"), { once: true })
        img.addEventListener("error", () => img.classList.add("loaded"), { once: true })
    })
}

function initFilter() {
    const bar = document.querySelector("[data-filter]")
    const grid = document.querySelector("[data-grid]")
    if (!bar || !grid) return
    const cards = Array.from(grid.children)
    const params = new URLSearchParams(window.location.search)
    let category = params.get("category")
    let status = "all"

    const apply = () => {
        cards.forEach(card => {
            const okCategory = !category || card.dataset.category === category
            const okStatus = status === "all" || card.dataset.status === status
            card.classList.toggle("hide", !(okCategory && okStatus))
        })
    }

    bar.querySelectorAll(".filter-option").forEach(btn => {
        btn.addEventListener("click", () => {
            status = btn.dataset.status
            category = null
            bar.querySelectorAll(".filter-option").forEach(b => b.classList.toggle("is-active", b === btn))
            apply()
        })
    })
    apply()
}

function initPage() {
    initFooterReveal()
    initHeaderTheme()
    initThemeToggle()
    initImages()
    initFilter()
}

initLenis()
initPage()
initAnimations(lenis)

document.addEventListener("astro:page-load", initPage)
document.addEventListener("astro:after-swap", () => window.scrollTo(0, 0))
