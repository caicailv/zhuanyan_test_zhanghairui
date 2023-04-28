import { useState, createContext } from 'react'
type TableDataTypes = {
  [key: string]: any
}[]
type PageListTypes = {
  title: string
  key: string
  tableData: TableDataTypes
  [key: string]: any
}[]
type menuDataTypes = {
  title: string
  key: string
  pageList?: PageListTypes
}[]
type useType = [string, (key: string) => void]
const menuData: menuDataTypes = [
  {
    title: '人力资源',
    key: 'manpowerResource',
    pageList: [
      {
        title: 'page1',
        key: 'page1',
        tableData: [],
      },
    ],
  },
  {
    title: '信息系统',
    key: 'informationSystem',
  },
  {
    title: '业务场所',
    key: 'businessPlace',
  },
  {
    title: '办公设备',
    key: 'officeEquipment',
  },
  {
    title: '单据凭证',
    key: 'invoicesVouchers',
  },
  {
    title: '第三方机构',
    key: 'tolly',
  },
]
export const getMenuData = () => menuData
type StateType = {
  activeMenuKey: string
  activePageKey: string
  setActiveMenuKey: (key: string) => void
  setActivePageKey: (key: string) => void
}
export const StateContext = createContext<StateType>(undefined!)



export const usePageList = (
  menuKey: string
): [PageListTypes, (list: PageListTypes) => void] => {
  let pageList = menuData.find((item) => item.key === menuKey)?.pageList || []
  const setPageList = (list: any[]) => {
    const menu = menuData.find((item) => item.key === menuKey)
    if (menu) {
      menu.pageList = list
    }
  }
  return [pageList, setPageList]
}

export const getTableData = (tabkey: string, pageKey: string) => [
  {
    index: 1,
    taskCode: 'T001' + tabkey + pageKey,
    role: 'Manager',
    taskName: 'Complete project proposal',
    taskContent: 'Draft and submit project proposal to stakeholders',
    preTaskCode: '',
    key: '1',
  },
  {
    index: 2,
    taskCode: 'T002',
    role: 'Developer',
    taskName: 'Implement authentication',
    taskContent: 'Create authentication system for user logins',
    preTaskCode: 'T001',
    key: '2',
  },
]
