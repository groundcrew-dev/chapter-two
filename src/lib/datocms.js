import { executeQuery } from "@datocms/cda-client"

export async function fetchData(query, variables) {
    return executeQuery(query, {
        token: import.meta.env.DATOCMS_API_TOKEN,
        variables
    })
}

export const responsiveImageFragment = `
    focalPoint { x y }
    responsiveImage(imgixParams: { auto: format, fit: crop }) {
        src
        srcSet
        width
        height
        alt
        title
        base64
        sizes
    }
`
