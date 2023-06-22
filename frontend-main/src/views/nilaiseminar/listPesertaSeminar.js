/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Row, Table, Tooltip, Spin, Tabs, Modal, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />

const ListPesertaSeminar = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadings, setLoadings] = useState([])
  const [data, setData] = useState([])
  const [final, setFinal] = useState({})
  let history = useHistory()
  axios.defaults.withCredentials = true

  const pesertaSeminar = (id) => {
    history.push(`/nilaiseminar/penilaianseminar/tambahnilaipeserta/${id}`)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        axios.defaults.withCredentials = true

        const seminarResponse = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/company`,
        )
        const finalResponse = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/form/finalization`,
        )

        const seminarData = seminarResponse.data.data.map((row) => ({
          name: row.name,
          id: row.id,
          participants: row.participants.map((participant) => ({
            id: participant.id,
            name: participant.name,
          })),
        }))

        const finalData = finalResponse.data.data

        setData(seminarData)
        setFinal(finalData)
        console.log('ini data', data)
        console.log('ini final', final)
        setIsLoading(false)
      } catch (error) {
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
      }
    }

    fetchData()
  }, [history])

  const showModalFinalisasi = () => {
    Modal.confirm({
      title: (
        <div style={{ fontSize: '15px' }}>
          Apakah anda yakin akan melakukan finalisasi nilai seminar untuk seluruh peserta?
        </div>
      ),
      zIndex: 9999999,
      okText: 'Ya',
      cancelText: 'Batal',
      okButtonProps: {
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
        className: 'custom-button',
      },
      onOk: () => {
        handleOkFinalisasi()
      },
    })
  }

  const handleOkFinalisasi = async () => {
    if (final.isFinalization === 0) {
      console.log('ini berhasil karena nilai final adalah', final.isFinalization)
      await axios
        .post(`${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/form/finalization`)
        .then((response) => {
          notification.success({
            message: 'Finalisasi nilai seminar berhasil',
          })
        })
      const finalResponse = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/form/finalization`,
      )
      const finalData = finalResponse.data.data
      setFinal(finalData).catch((error) => {
        notification.error({
          message: 'Finalisasi nilai seminar gagal',
        })
      })
    } else {
      console.log('ini gagal, hasil dari final adalah', final)
      Modal.error({
        title: (
          <div style={{ fontSize: '15px' }}>
            <div>Anda telah melakukan finalisasi!</div>
            <div> Tidak dapat mengubah data nilai seminar</div>
          </div>
        ),
        zIndex: 9999999,
        // okText: 'Ya',
        // cancelText: 'Batal',
        // okButtonProps: {
        //   style: {
        //     backgroundColor: 'red',
        //     color: 'white',
        //   },
        //   className: 'custom-button',
        // },
        // onOk: () => {
        //   handleOkFinalisasi()
        // },
      })
    }
  }

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
      title: 'Nama Perusahaan',
      dataIndex: 'name',
    },
    {
      title: 'Nama Mahasiswa',
      dataIndex: 'action',
      align: 'center',
      width: '20%',
      dataIndex: 'participants',
      render: (text) => (
        <>
          <Row>
            {text.map((text, index) => (
              <Col span={24} style={{ textAlign: 'left' }} key={index}>
                {/* {console.log('ini partisipan', text.name)}
                {console.log('ini id partisipan', text.id)} */}
                <a className="black-link" onClick={() => pesertaSeminar(text.id)}>
                  {text.name}
                </a>
              </Col>
            ))}
          </Row>
        </>
      ),
    },
  ]
  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <h6>Daftar Perusahaan</h6>
            <CCol style={{ textAlign: 'right', paddingBottom: '15px' }}>
              <Button
                type="primary"
                htmlType="submit"
                className="px-4"
                id="createKriteria"
                style={{ backgroundColor: '#321FDB', borderColor: '321FDB' }}
                onClick={showModalFinalisasi}
              >
                Finalisasi Nilai Seminar
              </Button>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={12}>
              <Table scroll={{ x: 'max-content' }} columns={columns} dataSource={data} bordered />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}
export default ListPesertaSeminar
