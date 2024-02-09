import { fullMonthNames, weekDayNames } from "./data/data"

export function formatCurrentDate(now: Date, i: number) {
    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)

    let parsedMonth: string = (currentDate.getMonth() + 1).toString()
    let parsedDay: string = currentDate.getDate().toString()

    if (parsedMonth.length === 1) {
        parsedMonth = '0' + parsedMonth
    }

    if (parsedDay.length === 1) {
        parsedDay = '0' + parsedDay
    }
    
    const parsedCurrentDate: string = 
        currentDate.getFullYear() + '-' 
        + parsedMonth + '-' 
        + parsedDay

    return parsedCurrentDate
}

export function formatContributionDate(contributionDate: string) {
    if (contributionDate === '') return ''
    const contributionDateObject = new Date(contributionDate)
    const parsedContributionDate =
        weekDayNames[contributionDateObject.getDay()] + ', '
        + fullMonthNames[contributionDateObject.getMonth()] + ' '
        + contributionDateObject.getDate() + ', '
        + contributionDateObject.getFullYear()
    return parsedContributionDate
}