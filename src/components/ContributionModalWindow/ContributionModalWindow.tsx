import { FC, useEffect } from 'react'
import styles from './ContributionModalWindow.module.scss'
import { IContributionModalWindowData } from '../../types/contribution.interface'

const ContributionModalWindow: FC<IContributionModalWindowData> = ({ data }: IContributionModalWindowData) => {

    return (
        <div className={ styles.modalWindow }>{ data }</div>
    )
}

export default ContributionModalWindow