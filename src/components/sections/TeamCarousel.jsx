import React, { useState } from "react"

export const TeamCarousel = ({ members = [] }) => {
    const [index, setIndex] = useState(0)
    if (!members.length) return null
    const active = members[index]
    const caption = index === 0 && members.length > 1 ? `Pictured: ${members[0].name}, ${members[0].role} (left) & ${members[1].name}, ${members[1].role} (right)` : `Pictured: ${active.name}${active.role ? `, ${active.role}` : ""}`
    return (
        <div className='grid-2 gap-24 m-grid-1 m-gap-40'>
            <div className='flex flex-col'>
                <div className='team-main'>
                    {members.map((member, i) => <img key={i} className={`gallery-img${i === index ? ' is-active' : ''}`} src={member.image.responsiveImage.src} srcSet={member.image.responsiveImage.srcSet} sizes='(max-width: 768px) 90vw, 25vw' alt={member.name} loading='lazy' /> )}
                </div>
                <p className='small op-60 text-center w-385 mt16 m-100'>{caption}</p>
            </div>
            <div className='flex flex-col'>
                <div className='flex gap-12 mta m-pt40'>
                    {members.map((member, i) => (
                        <button key={i} className={`team-thumb${i === index ? ' is-active' : ''}`} onClick={() => setIndex(i)} aria-label={member.name}>
                            <div className='team-thumb__image'><img src={member.image.responsiveImage.src} srcSet={member.image.responsiveImage.srcSet} sizes='10vw' alt={member.name} loading='lazy' /></div>
                            <span className='small op-50 block mt6'>{String(i + 1).padStart(2, "0")}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
