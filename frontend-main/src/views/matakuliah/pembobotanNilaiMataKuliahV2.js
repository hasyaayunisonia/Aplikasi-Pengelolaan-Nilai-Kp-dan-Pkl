import { Card, Spin, Steps } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PembobotanKomponen from './content/pembobotanKomponen'
import PembobotanKriteria from './content/pembobotanKriteria'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const { Step } = Steps

const PembobotanNilaiMataKuliahV2 = () => {
  const [isLoading, setIsLoading] = useState(true)
  let history = useHistory()
  const { id } = useParams()
  const [dataComponent, setDataComponent] = useState()
  const [current, setCurrent] = useState(0)
  const [defaultActiveTab, setDefaultActiveTab] = useState(1)
  const [isDisableTab, setIsDisableTab] = useState({
    EAST: true,
    EASP: true,
    ETST: true,
    ETSP: true,
    LT: true,
    LP: true
  })

  // tabKriteria.js
  


  axios.defaults.withCredentials = true

  

  async function getDataComponent() {
    await axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/course-form/${id}`)
      .then((res) => {
        // console.log("isi dalam res", res)
        setDataComponent(res.data.data)
        setIsLoading(false)
        const temp = res.data.data
        for (let i = 0; i < temp.length; i++) {
          const element = temp[i];

          if (element.bobot_component > 0) {
            setDefaultActiveTab(i + 1)
            break
          }

        }
      })
      .catch((err) => {
        if (err.toJSON().status >= 300 && err.toJSON().status <= 399) {
          history.push({
            pathname: '/login',
            state: {
              session: true,
            },
          })
        } else if (err.toJSON().status >= 400 && err.toJSON().status <= 499) {
          history.push('/404')
        } else if (err.toJSON().status >= 500 && err.toJSON().status <= 599) {
          history.push('/500')
        }
      })
  }

  const handleDisableTabChange = () => {

    const tempDisable = isDisableTab

    if (dataComponent[0].bobot_component > 0) {
      // setIsDisableTab({...isDisableTab, EASP: false})
      tempDisable.EASP = false
    } else {
      // setIsDisableTab({...isDisableTab, EASP: true})
      tempDisable.EASP = true
    }

    if (dataComponent[1].bobot_component > 0) {
      // setIsDisableTab({...isDisableTab, EAST: false})
      tempDisable.EAST = false
    } else {
      // setIsDisableTab({...isDisableTab, EAST: true})
      tempDisable.EAST = true
    }

    if (dataComponent[2].bobot_component > 0) {
      // setIsDisableTab({...isDisableTab, ETSP: false})
      tempDisable.ETSP = false
    } else {
      // setIsDisableTab({...isDisableTab, ETSP: true})
      tempDisable.ETSP = true
    }

    if (dataComponent[3].bobot_component > 0) {
      console.log("lebih dari 0")
      // setIsDisableTab({...isDisableTab, ETST: false})
      tempDisable.ETST = false
    } else {
      // setIsDisableTab({...isDisableTab, ETST: true})
      tempDisable.ETST = true
    }

    if (dataComponent[4].bobot_component > 0) {
      // setIsDisableTab({...isDisableTab, LP: false})
      tempDisable.LP = false
    } else {
      // setIsDisableTab({...isDisableTab, LP: true})
      tempDisable.LP = true
    }

    if (dataComponent[5].bobot_component > 0) {
      // setIsDisableTab({...isDisableTab, LT: false})
      tempDisable.LT = false
    } else {
      // setIsDisableTab({...isDisableTab, LT: true})
      tempDisable.LT = true
    }
    setIsDisableTab(tempDisable)
  }

  useEffect(() => {
    getDataComponent()

  }, [history, current])

  useEffect(() => {
    // console.log("isi dalam data component", dataComponent)
    if (dataComponent != null) {
      console.log("change tab")
      handleDisableTabChange()
    }
  }, [dataComponent])

  useEffect(() => {
    console.log("isDisableV2", isDisableTab)
  })

  const stepsColumn = [
    {
      title: 'Step 1',
      content: (
        <>
          <PembobotanKomponen current={current} setCurrent={setCurrent} dataComponent={dataComponent} />
        </>
      )
    },
    {
      title: 'Step 2',
      content: (
        <>
          <PembobotanKriteria current={current} setCurrent={setCurrent} defaultActiveTab={defaultActiveTab} isDisableTab={isDisableTab} />
        </>
      )
    }
  ]

  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <>
      <Steps current={current} type="navigation" className="site-navigation-steps">
        {stepsColumn.map((item) => (
          <Step title={item.title} key={item.title} />
        ))}
      </Steps>
      <div style={{ marginTop: '16px' }}>
        {stepsColumn[current].content}
      </div>
    </>
  )
}

export default PembobotanNilaiMataKuliahV2