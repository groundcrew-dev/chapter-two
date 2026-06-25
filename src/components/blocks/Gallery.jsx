import React, { useState, useEffect } from "react"

export const Gallery = ({ slides = [], bare = false }) => {
    const [index, setIndex] = useState(0)
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("gallery-change"))
    }, [index])
    if (!slides.length) return null
    const go = i => setIndex((i + slides.length) % slides.length)
    const current = slides[index]
    const inner = (
        <div className={bare ? "w-100" : "max-800 w-100 ma"}>
            <div className={`pos-rel overflow ${bare ? "ratio-news" : "ratio-card"}`}>
                {slides.map((slide, i) => <img key={i} className={`gallery-img${i === index ? ' is-active' : ''}`} src={slide.image.responsiveImage.src} srcSet={slide.image.responsiveImage.srcSet} sizes='(max-width: 768px) 90vw, 40vw' alt={slide.image.responsiveImage.alt || ''} loading='lazy' /> )}
            </div>
            <div className='flex align-center gap-20 mt20'>
                <button className='gallery-nav' onClick={() => go(index - 1)} aria-label='Previous slide'><span className='icon-chevron-left' /></button>
                <div className='flex-1 flex flex-col align-center text-center gap-8'>
                    <span className='small nowrap balance'>{index + 1} &ndash; {slides.length}</span>
                    {current.caption && <span className='small balance'>{current.caption}</span>}
                </div>
                <button className='gallery-nav' onClick={() => go(index + 1)} aria-label='Next slide'><span className='icon-chevron' /></button>
            </div>
        </div>
    )
    if (bare) return inner
    return <section className='page page-y flex flex-col align-center' data-img-section="">{inner}</section>
}
