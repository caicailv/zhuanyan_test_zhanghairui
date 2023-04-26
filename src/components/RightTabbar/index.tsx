import { useState } from 'react'
import style from './index.module.scss'
import { getLeftTabbarData } from '../../store'
import PageTab from '../PageTab'
const RightTabbar = () => {
  return (
    <div className={style.row}>
      <PageTab />
    </div>
  )
}
export default RightTabbar
