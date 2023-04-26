import { useState } from 'react'
type TableDataTypes = {
  [key: string]: any
}[]
type PageListTypes = {
  title: string
  key: string
  tableData: TableDataTypes
  [key: string]: any
}[]
type globalDataTypes = {
  title: string
  key: string
  pageList?: PageListTypes
}[]
const globalData: globalDataTypes = [
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
export const getLeftTabbarData = () => globalData

export const useActiveLeftKey = () => {
  const data = getLeftTabbarData()
  return useState(data[0].key)
}
export const useActivePageKey = () => {
  const [leftKey] = useActiveLeftKey()
  const pageList =
    globalData.find((item) => item.key === leftKey)?.pageList || []
  return useState(pageList[0]?.key)
}
// (): [never[], (list: any[]) => void]
export const usePageList = (): [
  PageListTypes,
  (list: PageListTypes) => void
] => {
  const [leftKey] = useActiveLeftKey()
  let pageList = globalData.find((item) => item.key === leftKey)?.pageList || []
  const setPageList = (list: any[]) => {
    const data = getLeftTabbarData()
    const left = data.find((item) => item.key === leftKey)
    if (left) {
      left.pageList = list
    }
  }
  return [pageList, setPageList]
}
// export const getTableData = (pageKey: string) => {
//   // const [leftKey] = useActiveLeftKey()

//   const pageList = getPageList()
//   const page = pageList.find((item) => item.key === pageKey)
//   return page?.tableData || []
// }

// export const setPageList = (leftKey: string, pageList: any[]) => {}

// export const setTableData = (
//   leftKey: string,
//   pageKey: string,
//   tableData: any[]
// ) => {
//   const pageList = getPageList(leftKey)
//   const page = pageList.find((item) => item.key === pageKey)
//   if (page) {
//     // page.tableData = tableData
//   }
// }

export const getTableData = () => [
  {
    index: 1,
    taskCode: 'T001',
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
