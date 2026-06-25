import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper/modules"
import { htmlToText } from "@/lib/html"
import "swiper/css"
import "swiper/css/free-mode"

const Card = ({ category, count }) => {
    const ri = category.image.responsiveImage
    return (
        <a href={`/projects?category=${category.slug}`} className='card flex flex-col gap-20 h-100' data-scroll>
            <div className='pos-rel category-card__img overflow'>
                <div className='bg-image-wrapper' style={{ "--blur": `url(${ri.base64})` }}>
                    <img className='bg-image-main' src={ri.src} srcSet={ri.srcSet} sizes='(max-width: 768px) 90vw, 40vw' width={ri.width} height={ri.height} alt={ri.alt || category.title} loading='lazy' data-img />
                </div>
            </div>
            <h3 className='h3'>{category.title}<sup className='count balance'>({count})</sup></h3>
            <div className='flex space-between align-end gap-20 mta'>
                <p className='small balance'>{htmlToText(category.shortDescription)}</p>
                <span className='arrow-box dark'><span className='icon-arrow-diagonal'></span></span>
            </div>
            <div className='divider'></div>
        </a>
    )
}

export const CategoryCarousel = ({ categories = [], counts = {} }) => {
    if (!categories.length) return null
    return (
        <>
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
                {categories.map((category, i) => (
                    <SwiperSlide key={category.id} className={`category-slide${i === 0 ? " is-wide" : ""}`}>
                        <Card category={category} count={counts[category.id] ?? 0} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='category-stack'>
                {categories.map(category => <Card key={category.id} category={category} count={counts[category.id] ?? 0} />)}
            </div>
        </>
    )
}
