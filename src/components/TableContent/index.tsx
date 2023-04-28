import style from './index.module.scss'
import {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react'
import {
  Button,
  Table,
  Input,
  Form,
  FormInstance,
} from '@arco-design/web-react'
import { IconPlus } from '@arco-design/web-react/icon'
import { getTableData, StateContext } from '../../store'

const FormItem = Form.Item
const EditableContext = createContext<{ getForm?: () => FormInstance }>({})

const EditableRow = ({ children, record, className, ...rest }: any) => {
  const refForm = useRef<FormInstance>(null)

  const getForm = () => refForm.current as FormInstance

  return (
    <EditableContext.Provider
      value={{
        getForm,
      }}
    >
      <Form
        style={{ display: 'table-row' }}
        children={children}
        ref={refForm}
        wrapper="tr"
        wrapperProps={rest}
        className={`${className} editable-row`}
      />
    </EditableContext.Provider>
  )
}

const EditableCell = (props: any) => {
  const { children, className, rowData, column, onHandleSave, editing } = props
  const ref = useRef(null)
  const refInput = useRef(null)
  const { getForm } = useContext(EditableContext)
  const cellValueChangeHandler = () => {
    const form = getForm!()
    form.validate([column.dataIndex], (errors, values) => {
      if (!errors || !errors[column.dataIndex]) {
        onHandleSave && { ...rowData, ...values }
      }
    })
  }
  if (rowData.editing && column.editable) {
    return (
      <div ref={ref}>
        {rowData.editing}
        <FormItem
          style={{ marginBottom: 0 }}
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          initialValue={rowData[column.dataIndex]}
          field={column.title}
          rules={[{ required: true }]}
        >
          <Input
            ref={refInput}
            onBlur={cellValueChangeHandler}
            placeholder={`请输入${column.title}`}
          />
        </FormItem>
      </div>
    )
  }

  return (
    <div className={column.editable ? `editable-cell ${className}` : className}>
      {rowData.editing} {children}
    </div>
  )
}
const TableContent = () => {
  const { activeMenuKey, activePageKey } = useContext(StateContext)
  const tableData = getTableData(activeMenuKey, activePageKey).map((x) => ({
    ...x,
    editing: false,
  }))
  const [count, setCount] = useState(tableData.length)
  const [data, setData] = useState(tableData)
  const { getForm } = useContext(EditableContext)
  const [editKey, setEditKey] = useState('')
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
    },
    {
      title: '任务编码',
      dataIndex: 'taskCode',
      editable: true,
    },
    {
      title: '角色',
      dataIndex: 'role',
      editable: true,
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      editable: true,
    },
    {
      title: '任务内容',
      dataIndex: 'taskContent',
      editable: true,
    },
    {
      title: '前置任务编码',
      dataIndex: 'preTaskCode',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'op',
      width: 200,
      render: (_: any, record: (typeof tableData)[0]) => {
        return (
          <div className={style.edit_row}>
            {editKey !== record.key && (
              <Button
                onClick={() => editRow(record)}
                type="text"
                disabled={editKey !== ''}
              >
                编辑
              </Button>
            )}
            {editKey == record.key && (
              <Button onClick={() => handleSave(record)} type="text">
                确定
              </Button>
            )}
            <Button
              onClick={() => removeRow(record.key)}
              type="text"
              status="danger"
            >
              删除
            </Button>
          </div>
        )
      },
    },
  ]

  const handleSave = (row: (typeof tableData)[0]) => {
    console.log('row',row)
    const newData = [...data]
    const index = newData.findIndex((item) => row.key === item.key)
    newData.splice(index, 1, { ...newData[index], ...row })
    setData(newData.map((x) => ({ ...x, editing: false })))
    setEditKey('')
  }

  const removeRow = (key: string) => {
    setData(data.filter((item) => item.key !== key))
  }

  const editRow = (record: (typeof tableData)[0]) => {
    setEditKey(record.key)
    const newData = [...data].map((x) => ({
      ...x,
      editing: x.key === record.key,
    }))
    setData(newData)
  }
  const addRow = () => {
    if (editKey) return
    let last = {
      index: count + 1,
      taskCode: '',
      role: '',
      taskName: '',
      taskContent: '',
      preTaskCode: '',
      key: `${count + 1}`,
      editing: true,
    }
    setCount(count + 1)
    setData(data.concat(last))
    setEditKey(last.key)
  }

  return (
    <>
      <Table
        data={data}
        className={style.table}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        pagination={false}
        columns={columns.map((column) =>
          column.editable
            ? {
                ...column,
                onCell: () => ({
                  onHandleSave: handleSave,
                }),
              }
            : column
        )}
      />

      <Button
        className={style.addbtn}
        icon={<IconPlus />}
        type="outline"
        onClick={addRow}
      >
        Add
      </Button>
    </>
  )
}

export default TableContent
