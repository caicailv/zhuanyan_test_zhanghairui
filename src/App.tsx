import style from './App.module.scss'
import LeftTabbar from './components/LeftTabbar'
import RightTabbar from './components/RightTabbar'
import "@arco-design/web-react/dist/css/arco.css";
function App() {
  return (
    <div className={style.app}>
      <div className={style.container}>
        <div className={style.left}>                
          <LeftTabbar />
        </div>
        <div className={style.right}>
          <RightTabbar />
        </div>
      </div>
    </div>
  )
}

export default App
