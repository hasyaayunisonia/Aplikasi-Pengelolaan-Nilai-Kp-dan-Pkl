/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import Highlighter from 'react-highlight-words'
import { LoadingOutlined } from '@ant-design/icons'
import axios from 'axios'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { Button, Col, Row, Table, Spin, Form, Modal, Input, notification } from 'antd'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const ListKafka = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadings, setLoadings] = useState([])
  const [data, setData] = useState([])

  axios.defaults.withCredentials = true

  useEffect(() => {

    getDataIndustri()
  }, [history])

  const getDataIndustri = async () => {
    axios.defaults.withCredentials = true
    await axios
      .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/kafka/evaluation`)
      .then(function (response) {
        setData(response.data.data)
        setIsLoading(false)
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

  useEffect(() => {
    console.log('ini data ', data)
  }, [data])

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
      dataIndex: 'participant',
      align: 'center',
      render: (participant) => (
        <span>{participant.name}</span>
      )
    },
    {
      title: 'Jenis Formulir',
      dataIndex: 'numEvaluation',
      align: 'center',
      render: (numEvaluation) => (
        <span>Evaluasi {numEvaluation}</span>
      )
    },
    {
      title: 'Nilai form',
      align: 'center',
      children: [
        {
          title: 'Aspek',
          dataIndex: 'valuations',
          width: '30%',
          key: 'aspek',
          render: (valuations) => (
            <>
                {valuations.map((aspect, index) => (
                  <tr key={index}>
                    <td>{aspect.aspectName}</td>
                    <td >{aspect.value}</td>
                  </tr>
                ))}
            </>
          ),
        },
        {
          title: 'Nilai',
          dataIndex: 'valuations',
          key: 'value',
          render: (valuations) => (
            <>
                {valuations.map((aspect, index) => (
                  <tr key={index}>
                    <td >{aspect.value}</td>
                  </tr>
                ))}
            </>
          ),
        },
      ],
    },

  ]

  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <CCard>
      {/* <Table
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={data}
        rowKey="id"
        bordered
      /> */}
      <CCardHeader>
        <h4>Tabel Evaluation</h4>
      </CCardHeader>
      <div className='p-3'>
        <table className='my-table'>
          <thead>
            <tr>
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Nama</th>
              <th rowSpan={2}>Jenis Formulir</th>
              <th colSpan={2}>Nilai Form</th>
            </tr>
            <tr>
              <th>Aspek</th>
              <th>Nilai</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((d,index)=>{
                if(d.valuations.length === 0){
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{d.participant.name}</td>
                      <td>Evaluasi {d.numEvaluation}</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  );
                }else{

                  return (
                    <>
                      <tr key={index}>
                        <td rowSpan={d.valuations.length}>{index + 1}</td>
                        <td rowSpan={d.valuations.length}>{d.participant.name}</td>
                        <td rowSpan={d.valuations.length}>Evaluasi {d.numEvaluation}</td>
                        {d.valuations.map((v, index) => {
                          if (index === 0) {
                            return (
                              <>
                                <td>{v.aspectName}</td>
                                <td>{v.value}</td>
                              </>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </tr>
                      {d.valuations.slice(1).map((v, index) => {
                        return (
                          <tr key={index}>
                            <td>{v.aspectName}</td>
                            <td>{v.value}</td>
                          </tr>
                        );
                      })}
                    </>
                  );
                }
              })
            }
          </tbody>
        </table>
      </div>
    </CCard>
  )
}
export default ListKafka
