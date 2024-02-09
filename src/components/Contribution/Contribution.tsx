import { FC, useRef, useState } from "react";
import styles from './Contribution.module.scss'
import { IContributionData } from "../../types/contribution.interface";
import ContributionModalWindow from "../ContributionModalWindow/ContributionModalWindow";
import { contributionQuantity } from "../../enums";

const Contribution: FC<IContributionData> = ({ date, contributions }: IContributionData) => {

    const [modalWindowData] = useState([date, contributions.toString()])
    const [currentContributionPosition, setCurrentContributionPosition] = useState<DOMRect>()

    const contributionRef = useRef<HTMLDivElement>(null)
    const [showModalWindow, setShowModalWindow] = useState(false)

    const determineContributionColor = (contributions: number | string) => {
        const stringContributions = contributions.toString()
        const numberContributions = Number(contributions)

        if (numberContributions === 0 || stringContributions === contributionQuantity.zero) {
            return styles.contribution_quantity_0
        }
        else if (numberContributions >= 1 && numberContributions <= 9 || stringContributions === contributionQuantity.oneToNine) {
            return styles.contribution_quantity_1to9
        }
        else if (numberContributions >= 10 && numberContributions <= 19 || stringContributions === contributionQuantity.tenToNineteen) {
            return styles.contribution_quantity_10to19
        }
        else if (numberContributions >= 20 && numberContributions <= 29 || stringContributions === contributionQuantity.twentyToTwentyNine) {
            return styles.contribution_quantity_20to29
        }
        else if (numberContributions >= 30 || stringContributions === contributionQuantity.thirtyPlus) {
            return styles.contribution_quantity_30more
        }
    }

    const showInfo = () => {
        contributionRef.current?.classList.toggle(styles.contribution_selected)
        showModalWindow ? setShowModalWindow(prev => prev = false) : setShowModalWindow(prev => prev = true)
        setCurrentContributionPosition(prev => prev = contributionRef.current?.getBoundingClientRect())
    }

    return (
        <div 
            ref={ contributionRef } 
            onClick={ () => showInfo() } 
            className={ [styles.contribution, determineContributionColor(contributions) ].join(' ') }
        >
            {
                showModalWindow && <ContributionModalWindow data={ modalWindowData } position={ currentContributionPosition }/> 
            }
        </div>
    )
}

export default Contribution