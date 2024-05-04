"use server"
export default async function GetFeed(feed: string, formData?: FormData) {
    const response = await fetch(`https://io.adafruit.com/api/v2/${process.env.ADA_USERNAME}/feeds/${feed}/data?limit=5`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": `${process.env.ADA_ACTIVEKEY}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    });
    return response.json()
}