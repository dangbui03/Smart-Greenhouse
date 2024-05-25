export default async function GetLast(feed: string, formData?: FormData) {
    const response = await fetch(`https://io.adafruit.com/api/v2/${process.env.NEXT_PUBLIC_ADA_USERNAME}/feeds/${feed}/data/last`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": `${process.env.NEXT_PUBLIC_ADA_ACTIVEKEY}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    });
    return response.json()
}