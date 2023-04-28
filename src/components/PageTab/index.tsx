import style from './index.module.scss'
import { usePageList, StateContext } from '../../store'
import { Input, Tabs } from '@arco-design/web-react'
import { useState, useContext } from 'react'
import { randomData } from '../../utils'
import TableContent from '../TableContent'
const TabPane = Tabs.TabPane

function PageTab() {
  const { activeMenuKey, activePageKey, setActivePageKey } =
    useContext(StateContext)
  const [tabs, setTabs] = usePageList(activeMenuKey) // pageList
  const [viewPages, setViewPages] = useState(tabs)
  const handleAddTab = () => {
    const newTab = {
      title: '',
      key: randomData(),
      newFlag: true,
      tableData: [],
    }
    setViewPages([...viewPages, newTab])
  }
  const handleSubmit = (title: string) => {
    let last = viewPages[viewPages.length - 1]
    setTabs([...tabs, { ...last, title, newFlag: false }])
    setActivePageKey(last.key)
    setViewPages([...tabs, { ...last, title, newFlag: false }])
  }
  const handleDeleteTab = (key: string) => {
    const index = tabs.findIndex((x) => x.key === key)
    const newTabs = tabs.filter((x) => x.key !== key)
    const newViewPages = viewPages.filter((x) => x.key !== key)
    if (key === activePageKey && index > -1 && newTabs.length) {
      setActivePageKey(
        newTabs[index] ? newTabs[index].key : newTabs[index - 1].key
      )
    }

    if (index > -1) {
      setTabs([...newTabs])
      setViewPages([...newViewPages])
    }
  }

  return (
    <Tabs
      editable
      type="card-gutter"
      showAddButton={!viewPages.find((x) => x.newFlag)}
      className={style.tabs}
      activeTab={activePageKey}
      onAddTab={handleAddTab}
      onDeleteTab={handleDeleteTab}
      onChange={setActivePageKey}
    >
      {viewPages.map((x) => (
        <TabPane
          destroyOnHide
          key={x.key}
          title={
            <Item
              title={x.title}
              newFlag={x.newFlag}
              handleSubmit={handleSubmit}
              menuKey={activeMenuKey}
            />
          }
        >
          <TableContent />
        </TabPane>
      ))}
    </Tabs>
  )
}

export default PageTab
interface ItemProps {
  title: string
  newFlag: boolean
  menuKey: string
  handleSubmit: (title: string) => void
  // handleBlur: (title: string) => void
}
const Item = ({ title, newFlag, handleSubmit, menuKey }: ItemProps) => {
  const [value, setValue] = useState(title)
  const [status, setStatus] = useState<'error' | 'warning' | undefined>()
  const [tabs] = usePageList(menuKey)
  const onSubmit = (title: string) => {
    if (!title) return setStatus('error')
    if (tabs.find((x) => x.title === title)) return setStatus('error')
    handleSubmit(title)
  }
  return (
    <div>
      {!newFlag && title}
      {newFlag && (
        <Input
          status={status}
          value={value}
          size="mini"
          placeholder="请输入页面名称"
          onChange={(value) => setValue(value)}
          onBlur={() => onSubmit(value)}
          onPressEnter={() => onSubmit(value)}
        />
      )}
    </div>
  )
}
