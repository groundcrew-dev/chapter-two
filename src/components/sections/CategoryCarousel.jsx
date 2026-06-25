import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper/modules"
import "swiper/css"
import "swiper/css/free-mode"

export const CategoryCarousel = ({ categories = [], counts = {} }) => {
    if (!categories.length) return null
    return (
        <Swiper
            className='category-swiper'
            modules={[FreeMode]}
            slidesPerView='auto'
            freeMode
            grabCursor
            spaceBetween={16}
            slidesOffsetBefore={20}
            slidesOffsetAfter={20}
            breakpoints={{ 769: { spaceBetween: 23, slidesOffsetBefore: 60, slidesOffsetAfter: 60 } }}>
            {categories.map((category, i) => {
                const ri = category.image.responsiveImage
                return (
                    <SwiperSlide key={category.id} className={`category-slide${i === 0 ? " is-wide" : ""}`}>
                        <a href={`/projects?category=${category.slug}`} className='flex flex-col gap-16'>
                            <div className='pos-rel h-447 overflow'>
                                <div className='bg-image-wrapper' style={{ "--blur": `url(${ri.base64})` }}>
                                    <img className='bg-image-main' src={ri.src} srcSet={ri.srcSet} sizes='(max-width: 768px) 80vw, 40vw' width={ri.width} height={ri.height} alt={ri.alt || category.title} loading='lazy' data-img />
                                </div>
                            </div>
                            <h3 className='h3'>{category.title}<sup className='count'>({counts[category.id] ?? 0})</sup></h3>
                            <div className='flex space-between align-end gap-20'>
                                <p className='small op-60'>{category.shortDescription}</p>
                                <span className='arrow-box dark'><span className='icon-arrow-diagonal'></span></span>
                            </div>
                            <div className='divider'></div>
                        </a>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}
