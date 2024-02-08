import { FC, useState } from "react"
import Contribution from "../Contribution/Contribution"
import { useQuery } from "@tanstack/react-query";
import { DataService } from "../../services/DataService";
import styles from './ContributionGraph.module.scss'
import { contributionColorsData, monthNames, weekDays } from "../../data/data";
import { formatCurrentDate } from "../../utils";

const ContributionGraph: FC = () => {

    const [contributionArray, setContributionArray] = useState([])
    const [currentMonthsArray, setCurrentMonthsArray] = useState<string[]>([])
    
    useQuery({
        queryKey: ['contributionDates'],
        queryFn: () => DataService.getContributionDates(),
        select: ({ data }) => handleContributionData(data)
    });

    const handleContributionData = (data: Object) => {
        let temporaryDateObject: Object = {}
        const now = new Date()
        
        const temporaryMonthArray = [
            ...[
                ...monthNames.slice(now.getMonth()),
                ...monthNames.slice(0, now.getMonth())
            ].reverse()
        ]
        setCurrentMonthsArray(prev => prev = temporaryMonthArray)

        for (let i = 51 * 7 - 1; i >= 0; i--) {
            temporaryDateObject = {
                ...temporaryDateObject,
                [formatCurrentDate(now, i)]: 0
            }
        }
        
        for (const key in data) {
            //@ts-ignore
            if (temporaryDateObject.hasOwnProperty([key])) {
                temporaryDateObject = {
                    ...temporaryDateObject,
                    //@ts-ignore
                    [key]: data[key]
                }
            }
        }
        //@ts-ignore
        setContributionArray(prev => prev = [...Object.entries(temporaryDateObject)])
        console.log(temporaryDateObject)
    }

    return (
        <div className={ styles.contributionGraphWrapper }>
            <div className={ styles.monthsBar }>
                {
                    currentMonthsArray.map((item, index) => {
                        return <div key={ index } className={ styles.monthsBar__text }>{ item }</div>
                    })
                }
            </div>
            <div className={ styles.flexRow }>
                <div className={ styles.weekDaysBar }>
                    {
                        weekDays.map((item, index) => {
                            return <div key={ index } className={ styles.weekDaysBar__text }>{ item }</div>
                        })
                    }
                </div>
                <div className={ styles.contributionGraph }>

                    {
                        contributionArray.map((item, index) => {
                            return <Contribution key={ index } data={ item[0] } contributions={ item[1] }/>
                        })
                    }
                </div>
            </div>
            

            <div className={ styles.contributionGraphDesription }>
                <div className={ styles.contributionGraphDesription__text }>Больше</div>
                {
                    contributionColorsData.map((item, index) => {
                        //@ts-ignore
                        return <Contribution key={ index } data={ item[0] } contributions={ item[1] }/>
                    })
                }
                <div className={ styles.contributionGraphDesription__text }>Меньше</div>
            </div>
            
        </div>
    )
}

export default ContributionGraph