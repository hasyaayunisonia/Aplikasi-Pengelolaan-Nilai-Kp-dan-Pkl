/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import Highlighter from 'react-highlight-words'
import { LoadingOutlined } from '@ant-design/icons'
import axios from 'axios'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { Button, Col, Row, Table, Spin, Form, Modal, Input, notification } from 'antd'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const ListNilaiIndustri = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadings, setLoadings] = useState([])
  const [data, setData] = useState([])

  axios.defaults.withCredentials = true

  useEffect(() => {
    const getDataIndustri = async () => {
      axios.defaults.withCredentials = true
      await axios
        .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/evaluation/`)
        .then(function (response) {
          setData(response.data.data)
          setIsLoading(false)
          console.log('ini data ', data)
        })
        .catch(function (error) {
          if (error.toJSON().status >= 300 && error.toJSON().status <= 399) {
            history.push({
              pathname: '/login',
              state: {
                session: true,
              },
            })
          } else if (error.toJSON().status >= 400 && error.toJSON().status <= 499) {
            history.push('/404')
          } else if (error.toJSON().status >= 500 && error.toJSON().status <= 599) {
            history.push('/500')
          }
        })
    }
    getDataIndustri()
  }, [history])

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      width: '5%',
      align: 'center',
      render: (value, item, index) => {
        return index + 1
      },
    },
    {
      title: 'Nama Mahasiswa',
      // dataIndex: 'name',
    },
    {
      title: 'Jenis Formulir',
      // dataIndex: 'name',
    },
    {
      title: 'List Evaluasi Form',
      // dataIndex: 'action',
      align: 'center',
      width: '20%',
      // dataIndex: 'participants',
      // render: (text) => (
      //   <>
      //     <Row>
      //       {text.map((text, index) => (
      //         <Col span={24} style={{ textAlign: 'left' }} key={index}>
      //           <a className="black-link" onClick={() => pesertaSeminar(text.id)}>
      //             {text.name}
      //           </a>
      //         </Col>
      //       ))}
      //     </Row>
      //   </>
      // ),
    },
  ]

  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <CCard>
      <p>cek</p>
    </CCard>
  )
}
export default ListNilaiIndustri
