import { FC, useRef, useState } from "react";
import styles from './Contribution.module.scss'
import { IContributionData } from "../../types/contribution.interface";
import ContributionModalWindow from "../ContributionModalWindow/ContributionModalWindow";

const Contribution: FC<IContributionData> = ({ data, contributions }: IContributionData) => {

    const [contributionData] = useState(data)

    const contributionRef = useRef<HTMLDivElement>(null)
    const [showModalWindow, setShowModalWindow] = useState(false)

    const determineContributionColor = (contributionQuantity: number) => {
        if (contributionQuantity === 0) {
            // console.log(2323)
            return styles.contribution_quantity_0
        }
        else if (contributionQuantity >= 1 && contributionQuantity <= 9) {
            return styles.contribution_quantity_1to9
        }
        else if (contributionQuantity >= 10 && contributionQuantity <= 19) {
            return styles.contribution_quantity_10to19
        }
        else if (contributionQuantity >= 20 && contributionQuantity <= 29) {
            return styles.contribution_quantity_20to29
        }
        else if (contributionQuantity >= 30) {
            return styles.contribution_quantity_30more
        }
    }

    const showInfo = () => {
        contributionRef.current?.classList.toggle(styles.contribution_selected)
        showModalWindow ? setShowModalWindow(prev => prev = false) : setShowModalWindow(prev => prev = true)
    }

    return (
        <div 
            ref={ contributionRef } 
            onClick={ () => showInfo() } 
            className={ [styles.contribution, determineContributionColor(contributions) ].join(' ') }
        >
            {
                showModalWindow && <ContributionModalWindow data={ contributionData }/> 
            }
        </div>
    )
}

export default Contribution