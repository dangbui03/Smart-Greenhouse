type User = {
    displayName: string | null,
    email: string | null,
    photoURL: string | null,
    uid: string
}
type ControlState = {
    water: string | undefined,
    led: string | undefined,
    fan: {
        state: string | undefined,
        velocity: number | undefined,
    }
}