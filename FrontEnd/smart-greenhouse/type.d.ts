type User = {
    displayName: string | null,
    email: string | null,
    photoURL: string | null,
    uid: string
}
type ControlState = {
    priority?: string | undefined,
    water: string | undefined,
    led: string | undefined,
    fan: {
        state: string | undefined,
        velocity: number | undefined,
    }
}

type NumberState = {
    temperature: number,
    moisture: number,
    soilmoisture: number,
    light: number,
}

type StateRecord = {
    id: string,
    data: {
        fan: any;
        fanspeed: any;
        led: any;
        light: any;
        mode: any;
        moisture: any;
        soilmoisture: any;
        temperature: any;
        water: any;
    }
};
