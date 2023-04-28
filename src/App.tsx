import style from './App.module.scss'
import MenuTabbar from './components/MenuTabbar'
import PageTab from './components/PageTab'

import { useState } from 'react'
import { StateContext, getMenuData } from './store'
import '@arco-design/web-react/dist/css/arco.css'
const App = () => {
  const data = getMenuData()
  const [activeMenuKey, setActiveMenuKey] = useState(data[0]?.key || '')
  const [activePageKey, setActivePageKey] = useState(data[0]?.pageList?.[0]?.key || '')

  return (
    <StateContext.Provider
      value={{
        activeMenuKey,
        activePageKey,
        setActiveMenuKey,
        setActivePageKey,
      }}
    >
      <div className={style.app}>
        <div className={style.container}>
          <div className={style.menu}>
            <MenuTabbar />
          </div>
          <div className={style.right}>
            <PageTab />
          </div>
        </div>
      </div>
    </StateContext.Provider>
  )
}

export default App
