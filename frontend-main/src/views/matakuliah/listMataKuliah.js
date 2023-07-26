/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrashCan, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Row, Table, Spin, Form, Modal, Input, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useHistory, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import routes from 'src/routes.js'
const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />

const ListMataKuliah = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadings, setLoadings] = useState([])
  const { id } = useParams()
  const [data, setData] = useState([])
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false)
  // const [matkulName, setMatkulName] = useState('')
  // const [choose, setChoose] = useState([])
  const [choose, setChoose] = useState([])
  const [form] = Form.useForm()
  const [form1] = Form.useForm()
  const [final, setFinal] = useState({})
  let history = useHistory()
  axios.defaults.withCredentials = true

  useEffect(() => {
    const getData = async () => {
      try {
        axios.defaults.withCredentials = true
        const response = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form`,
        )

        const finalResponse = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form/finalization`,
        )

        setData(response.data.data)
        console.log('ini data ', data)

        const finalData = finalResponse.data.data
        setFinal(finalData)
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
    getData()
  }, [history, id])

  useEffect(() => {
    console.log('ini isi final', final)
  }, [final])

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
  }

  const refreshData = (index) => {
    axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form`).then((result) => {
      setData(result.data.data)
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        return newLoadings
      })
    })
  }

  const tambahmatakuliah = () => {
    console.log('cek')
    // console.log('Objek history:', history)
    // history.push('/dashboard')
    const route = routes.find((route) => route.name === 'Tambah Mata Kuliah').path
    // console.log(route)
    // history.push(route)
    // console.log(history.push(`/matakuliah/listmatakuliah/tambahmatakuliah`))
    history.push(`/matakuliah/listmatakuliah/tambahmatakuliah`)
  }

  const detailMataKuliah = (id) => {
    history.push(`/matakuliah/listmatakuliah/detailmatakuliah/${id}`)
  }

  const showModalDelete = (record) => {
    setIsModalDeleteVisible(true)
    setChoose(record)
  }

  const handleCancelDelete = () => {
    setIsModalDeleteVisible(false)
    form1.resetFields()
  }

  // const handleInputBlur = () => {
  //   setChoose({ name: '' })
  // }

  // const handleInputChange = (e) => {
  //   setChoose((prev) => ({ ...prev, name: e.target.value }))
  // }

  const handleOkDelete = async (index) => {
    enterLoading(index)
    console.log(choose)
    axios
      .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form`)
      .then((response) => {
        const filteredData = response.data.data.filter(
          (item) => item.id === choose.id && item.name === choose.name,
        )

        if (filteredData.length === 0) {
          console.log('kosong')
          console.log(filteredData)
          notification.error({
            message: 'Nama mata kuliah tidak sesuai!',
          })
        } else {
          console.log('ada')
          console.log(filteredData)
          console.log(filteredData[0].id)
          axios
            .delete(
              `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form/delete/${filteredData[0].id}`,
            )
            .then((response) => {
              refreshData(index)
              form1.resetFields()
              notification.success({
                message: 'Mata kuliah berhasil dihapus',
              })
              setIsModalDeleteVisible(false)
            })
            .catch((error) => {
              setIsModalDeleteVisible(false)
              setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings]
                newLoadings[index] = false
                return newLoadings
              })
              notification.error({
                message: 'Mata kuliah gagal dihapus!',
              })
            })
        }
      })
      .catch((error) => {
        console.error(error)
        console.log('gagal')
        notification.error({
          message: 'Tidak dapat menghapus mata kuliah!',
        })
      })
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
      title: 'Nama Mata Kuliah',
      // width: '20%',
      dataIndex: 'name',
    },
    {
      title: 'Prodi',
      width: '18%',
      align: 'center',
      dataIndex: 'prodi_id',
      render: (text) => (text === 1 ? 'D4 Teknik Informatika' : 'D3 Teknik Informatika'),
    },
    {
      title: 'Tahun Ajaran',
      width: '10%',
      align: 'center',
      render: (text, record) => (
        <span>{`${record.tahun_ajaran_start} - ${record.tahun_ajaran_end}`}</span>
      ),
    },
    {
      title: 'Aksi',
      dataIndex: 'action',
      align: 'center',
      width: '13%',
      render: (text, record) => (
        <>
          <Row>
            {localStorage.getItem('id_role') === '0' && (
              <>
                <Col span={24} style={{ textAlign: 'center' }}>
                  <Button
                    id="button-eye"
                    size="small"
                    shape="square"
                    style={{ backgroundColor: '#FBB03B' }}
                    onClick={() => detailMataKuliah(record.id)}
                  >
                    <FontAwesomeIcon icon={faEye} style={{ color: 'white' }} />
                  </Button>
                </Col>
              </>
            )}
            {localStorage.getItem('id_role') === '3' && (
              <>
                <Col span={12} style={{ textAlign: 'center' }}>
                  <Button
                    id="button-eye"
                    size="small"
                    shape="square"
                    style={{ backgroundColor: '#FBB03B' }}
                    onClick={() => detailMataKuliah(record.id)}
                  >
                    <FontAwesomeIcon icon={faEye} style={{ color: 'white' }} />
                  </Button>
                </Col>

                <Col span={12} style={{ textAlign: 'center' }}>
                  <Button
                    id="button-trash"
                    size="small"
                    shape="square"
                    style={{ backgroundColor: '#FF0000' }}
                    onClick={() => showModalDelete(record, `delete-${record.id}`)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: 'white' }} />
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </>
      ),
    },
  ]

  // const idRole = localStorage.getItem('id_role')

  // if (idRole === '3') {
  //   columns.push({
  //     title: 'Aksi',
  //     dataIndex: 'action',
  //     align: 'center',
  //     width: '13%',
  //     render: (text, record) => (
  //       <>
  //         <Row>
  //           <Col span={12} style={{ textAlign: 'center' }}>
  //             <Button
  //               id="button-eye"
  //               size="small"
  //               shape="square"
  //               style={{ backgroundColor: '#FBB03B' }}
  //               onClick={() => detailMataKuliah(record.id)}
  //             >
  //               <FontAwesomeIcon icon={faEye} style={{ color: 'white' }} />
  //             </Button>
  //           </Col>
  //           <Col span={12} style={{ textAlign: 'center' }}>
  //             <Button
  //               id="button-trash"
  //               size="small"
  //               shape="square"
  //               style={{ backgroundColor: '#FF0000' }}
  //               onClick={() => showModalDelete(record, `delete-${record.id}`)}
  //             >
  //               <FontAwesomeIcon icon={faTrashCan} style={{ color: 'white' }} />
  //             </Button>
  //           </Col>
  //         </Row>
  //       </>
  //     ),
  //   })
  // }

  const showModalFinalisasi = () => {
    if (final.isFinalization === 0) {
      Modal.confirm({
        title: (
          <div style={{ fontSize: '15px' }}>
            Apakah anda yakin akan melakukan finalisasi seluruh mata kuliah?
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
    } else {
      Modal.confirm({
        title: 'Anda telah melakukan finalisasi!',
        // (
        //   <div style={{ fontSize: '15px' }}>
        //     <div>Anda telah melakukan finalisasi!</div>
        //     <div> Tidak dapat mengubah data mata kuliah</div>
        //   </div>
        // ),
        content: (
          <div style={{ fontSize: '15px' }}>
            {/* <div>Tidak dapat mengubah data mata kuliah</div> */}
            <div>Apakah anda ingin membatalkan finalisasi?</div>
          </div>
        ),
        zIndex: 9999999,
        okText: 'Ya',
        cancelText: 'Batal',
        cancelButtonProps: {
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
  }

  const handleOkFinalisasi = async () => {
    if (final.isFinalization === 0) {
      try {
        // console.log('ini berhasil karena nilai final adalah', final.isFinalization)
        await axios
          .post(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form/finalization`)
          .then((response) => {
            notification.success({
              message: 'Finalisasi mata kuliah berhasil',
            })
          })
        const finalResponse = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form/finalization`,
        )
        const finalData = finalResponse.data.data
        // console.log('ini hasil final', finalData)
        setFinal(finalData)
        console.log('ini hasil final akhir ', final)
      } catch {
        notification.error({
          message: 'Gagal finalisasi mata kuliah',
        })
      }
    } else {
      // console.log('hasil dari final adalah', final)
      try {
        // console.log('ini berhasil karena nilai final adalah', final.isFinalization)
        await axios
          .post(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form/finalization/cancel`)
          .then((response) => {
            notification.success({
              message: 'Finalisasi mata kuliah dibatalkan',
            })
          })
        const finalResponse = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form/finalization`,
        )
        const finalData = finalResponse.data.data
        // console.log('ini hasil final', finalData)
        setFinal(finalData)
        console.log('ini hasil final akhir ', final)
      } catch {
        notification.error({
          message: 'Gagal membatalkan finalisasi mata kuliah',
        })
      }
    }
  }

  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h6>Tabel Daftar Mata Kuliah</h6>
              <br></br>
            </CCol>
          </CRow>
          {localStorage.getItem('id_role') === '3' ? (
            <>
              <CRow>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="px-4"
                      id="createKriteria"
                      style={{
                        backgroundColor: final.isFinalization === 0 ? '#321FDB' : '#FF0000',
                        // borderColor: '#321FDB',
                      }}
                      onClick={showModalFinalisasi}
                    >
                      {final.isFinalization === 0
                        ? 'Finalisasi Mata Kuliah'
                        : 'Batalkan Finalisasi Mata Kuliah'}
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="px-4"
                      id="createKriteria"
                      style={{ backgroundColor: '#339900', borderColor: '#339900' }}
                      onClick={() => tambahmatakuliah()}
                    >
                      Daftar Mata Kuliah
                    </Button>
                  </div>
                </div>
              </CRow>
            </>
          ) : (
            ''
          )}
          <br></br>
          <Table
            scroll={{ x: 'max-content' }}
            columns={columns}
            dataSource={data}
            rowKey="id"
            bordered
          />
        </CCardBody>
      </CCard>

      <Modal
        title="Konfirmasi Hapus Mata Kuliah"
        visible={isModalDeleteVisible}
        onOk={form1.submit}
        onCancel={handleCancelDelete}
        width={600}
        zIndex={9999999}
        footer={[
          <Button key="back" onClick={handleCancelDelete}>
            Batal
          </Button>,
          <Button
            // loading={loadings[1]}
            key="submit"
            type="primary"
            style={{ backgroundColor: '#FF0000' }}
            onClick={form1.submit}
          >
            Hapus
          </Button>,
        ]}
      >
        <Form
          form={form1}
          name="basic"
          wrapperCol={{ span: 24 }}
          onFinish={() => handleOkDelete(0)}
          autoComplete="off"
        >
          <br></br>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{ color: 'red', marginRight: '8px' }}
            />
            <h7 style={{ marginBottom: 0 }}>
              Tuliskan nama mata kuliah yang akan dihapus. Pastikan penulisan nama mata kuliah yang
              ditulis sesuai!
            </h7>
          </div>
          <Form.Item
            name="namaMataKuliah"
            rules={[{ required: true, message: 'Nama mata kuliah tidak boleh kosong!' }]}
          >
            <Input
              onChange={
                (e) =>
                  setChoose((prev) => {
                    return { ...prev, name: e.target.value }
                  })
                // setMatkulName(e.target.value)
              }
              // onBlur={() => setChoose({ name: '' })}
              // onChange={handleInputChange}
              // onBlur={handleInputBlur}
              // value={choose.name}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default ListMataKuliah
