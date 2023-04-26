import style from './index.module.scss'
import { getLeftTabbarData, useActiveLeftKey } from '../../store'
const LeftTabbar = () => {
  let leftTabbarData = getLeftTabbarData()
  const [activeKey, setActiveKey] = useActiveLeftKey()
  return (
    <div className={style.row}>
      {leftTabbarData.map((item) => (
        <div
          className={`${style.item} ${activeKey === item.key && style.active}`}
          key={item.key}
          onClick={() => setActiveKey(item.key)}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
}
export default LeftTabbar
