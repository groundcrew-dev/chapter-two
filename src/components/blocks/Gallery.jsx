import React, { useState } from "react"

export const Gallery = ({ slides = [], bare = false }) => {
    const [index, setIndex] = useState(0)
    if (!slides.length) return null
    const go = i => setIndex((i + slides.length) % slides.length)
    const current = slides[index]
    const inner = (
        <div className={bare ? "w-100" : "max-800 w-100 ma"}>
            <div className={`pos-rel overflow ${bare ? "ratio-news" : "ratio-card"}`}>
                {slides.map((slide, i) => <img key={i} className={`gallery-img${i === index ? ' is-active' : ''}`} src={slide.image.responsiveImage.src} srcSet={slide.image.responsiveImage.srcSet} sizes='(max-width: 768px) 90vw, 40vw' alt={slide.image.responsiveImage.alt || ''} loading='lazy' /> )}
            </div>
            <div className='flex space-between align-center gap-20 mt20'>
                <button className='pointer flex align-center' onClick={() => go(index - 1)} aria-label='Previous slide'><span className='icon-arrow-left' /></button>
                <div className='flex align-center gap-40 m-gap-20'>
                    <span className='small nowrap'>{index + 1} &mdash; {slides.length}</span>
                    {current.caption && <span className='small op-60 nowrap'>{current.caption}</span>}
                </div>
                <button className='pointer flex align-center' onClick={() => go(index + 1)} aria-label='Next slide'><span className='icon-arrow' /></button>
            </div>
        </div>
    )
    if (bare) return inner
    return <section className='page page-y flex flex-col align-center'>{inner}</section>
}
