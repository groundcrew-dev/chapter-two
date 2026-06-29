import React, { useState } from "react"

export const TeamCarousel = ({ members = [], image = null, caption = "" }) => {
    // index === -1 → the default team image/caption; 0..n → the selected member
    const [index, setIndex] = useState(image ? -1 : 0)
    if (!members.length && !image) return null

    const activeCaption =
        index === -1
            ? caption
            : members[index].caption || `${members[index].name}${members[index].role ? `, ${members[index].role}` : ""}`

    return (
        <div className='grid-2 gap-24 m-grid-1 m-gap-40'>
            <div className='flex flex-col'>
                <div className='team-main'>
                    {image && (
                        <img className={`gallery-img${index === -1 ? " is-active" : ""}`} src={image.responsiveImage.src} srcSet={image.responsiveImage.srcSet} sizes='(max-width: 768px) 90vw, 25vw' alt='' loading='lazy' />
                    )}
                    {members.map((member, i) => (
                        <img key={i} className={`gallery-img${i === index ? " is-active" : ""}`} src={member.image.responsiveImage.src} srcSet={member.image.responsiveImage.srcSet} sizes='(max-width: 768px) 90vw, 25vw' alt={member.name} loading='lazy' />
                    ))}
                </div>
                <p className='small text-center w-385 mt16 m-100 balance'>{activeCaption}</p>
            </div>
            <div className='flex flex-col'>
                <div className='flex gap-12 mta m-pt40'>
                    {members.map((member, i) => (
                        <button key={i} className={`team-thumb${i === index ? " is-active" : ""}`} onClick={() => setIndex(i)} aria-label={member.name}>
                            <div className='team-thumb__image'><img src={member.image.responsiveImage.src} srcSet={member.image.responsiveImage.srcSet} sizes='10vw' alt={member.name} loading='lazy' /></div>
                            <span className='small block mt6 balance'>{String(i + 1).padStart(2, "0")}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
