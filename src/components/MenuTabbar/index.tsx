import style from './index.module.scss'
import { getMenuData, StateContext } from '../../store'
import { useContext,  } from 'react'
const MenuTabbar = () => {
  const { activeMenuKey, setActiveMenuKey } = useContext(StateContext)
  let menuTabbarData = getMenuData()
  return (
    <div className={style.row}>
      {menuTabbarData.map((item) => (
        <div
          className={`${style.item} ${activeMenuKey === item.key && style.active}`}
          key={item.key}
          onClick={() => setActiveMenuKey(item.key)}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
}
export default MenuTabbar
