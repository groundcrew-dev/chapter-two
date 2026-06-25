export function cleanHtml(html) {
    if (!html) return ""
    return html
        .replace(/\s+style=("[^"]*"|'[^']*')/gi, "")
        .replace(/<\/?span\b[^>]*>/gi, "")
        .replace(/\s+(class|dir|lang|align)=("[^"]*"|'[^']*')/gi, "")
        .replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "")
        .trim()
}

export function htmlToText(html) {
    if (!html) return ""
    return html
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/\s+/g, " ")
        .trim()
}
