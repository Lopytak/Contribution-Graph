import { FC, useEffect, useRef } from 'react'
import styles from './ContributionModalWindow.module.scss'
import { IContributionModalWindowData } from '../../types/contribution.interface'
import { formatContributionDate } from '../../utils'

const ContributionModalWindow: FC<IContributionModalWindowData> = ({ data, position }: IContributionModalWindowData) => {
    const modalWindowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (modalWindowRef.current && position) {
            modalWindowRef.current.style.top = 
                (position.top - modalWindowRef.current.offsetHeight - position.width / 2).toString() + 'px'
            modalWindowRef.current.style.left = 
                (position.left + (position.width - +modalWindowRef.current.offsetWidth) / 2).toString() + 'px'
        }
    }, [position])

    return (
        <div ref={ modalWindowRef } className={ styles.modalWindow }>
            <div className={ styles.modalWindow__contributions }>{ data[1] + ' contributions'}</div>
            <div className={ styles.modalWindow__date }>{ formatContributionDate(data[0]) }</div>
        </div>
    )
}

export default ContributionModalWindow