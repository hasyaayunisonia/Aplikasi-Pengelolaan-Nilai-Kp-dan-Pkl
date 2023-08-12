import { Card, Tabs } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import TabKriteria from './tabKriteria';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const { TabPane } = Tabs;

const PembobotanKriteria = ({ current, setCurrent, defaultActiveTab, isDisableTab }) => {
  let history = useHistory()
  const { id } = useParams()
  const [komponen, setKomponen] = useState()
  const [komponenEAST, setKomponenEAST] = useState()
  const [komponenETST, setKomponenETST] = useState()
  const [komponenLT, setKomponenLT] = useState()
  const [komponenEASP, setKomponenEASP] = useState()
  const [komponenETSP, setKomponenETSP] = useState()
  const [komponenLP, setKomponenLP] = useState()
  const [tabKey, setTabKey] = useState(1)
  const [pilihanForm, setPilihanForm] = useState([])

  async function getDataPilihan() {
    await axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/`)
      .then((res) => {
        console.log("pilihanForm", res.data.data)
        setPilihanForm(res.data.data)
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

  useEffect(() => {
    console.log("default", defaultActiveTab)
    async function getDataCriteriaComponent() {
      await axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/form/${id}`)
        .then((res) => {
          const data = res.data.data
          setKomponenEASP(data[0])
          setKomponenEAST(data[1])
          setKomponenETSP(data[2])
          setKomponenETST(data[3])
          setKomponenLP(data[4])
          setKomponenLT(data[5])
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

    async function getDataComponent() {
      await axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/course-form/${id}`)
        .then((res) => {
          setKomponen(res.data.data)
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
    getDataComponent()
    getDataCriteriaComponent()
    getDataPilihan()
    console.log("isDisabeTab", isDisableTab)

  }, [history])


  const handleTabChange = (key) => {
    setTabKey(key)
  };

  return (
    <Card>
      <Tabs type='card' defaultActiveKey={defaultActiveTab.toString()} onChange={handleTabChange}>
        <TabPane tab="EAS Praktek" key="1" disabled={isDisableTab.EASP}>
          <TabKriteria current={current} setCurrent={setCurrent}  dataKomponen={komponenEASP} dataForm={pilihanForm}/>
        </TabPane>
        <TabPane tab="EAS Teori" key="2" disabled={isDisableTab.EAST}>
          <TabKriteria current={current} setCurrent={setCurrent} dataKomponen={komponenEAST} dataForm={pilihanForm}/>
        </TabPane>
        <TabPane tab="ETS Praktek" key="3" disabled={isDisableTab.ETSP}>
          <TabKriteria current={current} setCurrent={setCurrent} dataKomponen={komponenETSP} dataForm={pilihanForm}/>
        </TabPane>
        <TabPane tab="ETS Teori" key="4" disabled={isDisableTab.ETST}>
          <TabKriteria current={current} setCurrent={setCurrent} dataKomponen={komponenETST} dataForm={pilihanForm}/>
        </TabPane>
        <TabPane tab="Lain-lain Praktek" key="5" disabled={isDisableTab.LP}>
          <TabKriteria current={current} setCurrent={setCurrent} dataKomponen={komponenLP} dataForm={pilihanForm}/>
        </TabPane>
        <TabPane tab="Lain-lain Teori" key="6" disabled={isDisableTab.LT}>
          <TabKriteria current={current} setCurrent={setCurrent} dataKomponen={komponenLT} dataForm={pilihanForm}/>
        </TabPane>
      </Tabs>
    </Card>
  )
}

PembobotanKriteria.propTypes = {
  current: PropTypes.number.isRequired,
  setCurrent: PropTypes.func.isRequired,
  defaultActiveTab: PropTypes.number,
  isDisableTab: PropTypes.object.isRequired
};

export default PembobotanKriteria