export interface IContributionData {
    date: string,
    contributions: number | string
}

export interface IContributionModalWindowData {
    data: string[],
    position: DOMRect | undefined
}