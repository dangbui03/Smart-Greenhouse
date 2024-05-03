"use server"
export default async function Create(feed: string, data: any, formData?: FormData) {
    const response = await fetch(`https://io.adafruit.com/api/v2/${process.env.ADA_USERNAME}/feeds/${feed}/data`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": `${process.env.ADA_ACTIVEKEY}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ "value": data })
    });
    return response.json()
}