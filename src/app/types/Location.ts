export type Location = {
    name: string
    coordinates: [{x: number, y: number}]
    crownWins: number
}

export type LocationInfo = {
    [location: string]: { x: number; y: number }[];
};