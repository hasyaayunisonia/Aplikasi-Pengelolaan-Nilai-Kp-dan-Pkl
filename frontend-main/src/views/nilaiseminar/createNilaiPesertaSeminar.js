/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import {
  Button,
  Col,
  Row,
  Form,
  Table,
  Input,
  Spin,
  Tabs,
  Select,
  DatePicker,
  notification,
} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { LoadingOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const { TabPane } = Tabs
const { TextArea } = Input
const CreateNilaiPesertaSeminar = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [peserta, setPeserta] = useState([])
  const [dosenpenguji, setDosenPenguji] = useState([])
  const [dosenpembimbing, setDosenPembimbing] = useState([])
  const [listKriteria, setKriteria] = useState([])
  const [formData, setFormData] = useState([])

  const [examinerType1, setExaminerType1] = useState({})
  const [examinerType2, setExaminerType2] = useState({})
  const [examinerType3, setExaminerType3] = useState({})

  const [selectedDosen, setSelectedDosen] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [comment, setComment] = useState('')
  const [inputValues, setInputValues] = useState({})

  const [selectedDosen2, setSelectedDosen2] = useState(null)
  const [selectedDate2, setSelectedDate2] = useState(null)
  const [comment2, setComment2] = useState('')
  const [inputValues2, setInputValues2] = useState({})

  const [selectedDosen3, setSelectedDosen3] = useState(null)
  const [selectedDate3, setSelectedDate3] = useState(null)
  const [comment3, setComment3] = useState('')
  const [inputValues3, setInputValues3] = useState({})

  const [form] = Form.useForm()
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()
  const history = useHistory()

  axios.defaults.withCredentials = true

  useEffect(() => {
    if (!id) {
      history.push('/')
    } else {
      const getPesertaSeminar = async () => {
        axios.defaults.withCredentials = true
        await axios
          .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/form/participant/${id}`)
          .then((res) => {
            setIsLoading(false)
            setPeserta(res.data.data)
            // console.log(res.data.data)
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
      const getlistKriteria = async () => {
        axios.defaults.withCredentials = true
        await axios
          .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/criteria`)
          .then((res) => {
            setIsLoading(false)
            setKriteria(res.data.data.filter((row) => row.is_selected === 1))
          })
      }
      const getlistDosenPenguji = async () => {
        axios.defaults.withCredentials = true
        await axios
          .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/examiner`)
          .then((res) => {
            setIsLoading(false)
            setDosenPenguji(res.data.data.penguji)
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
      const getlistDosenPembimbing = async () => {
        axios.defaults.withCredentials = true
        await axios
          .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/examiner`)
          .then((res) => {
            setIsLoading(false)
            setDosenPembimbing(res.data.data.pembimbing)
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

      const getIdForm = async () => {
        try {
          axios.defaults.withCredentials = true
          const response = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/form/participant/${id}`,
          )
          const dataForm = response.data.data.data_form
          setFormData(dataForm)
          // console.log(formData)

          const foundForm1 = dataForm.find((form) => form.examiner_type === 1)
          if (foundForm1) {
            setExaminerType1(foundForm1)
          }

          const foundForm2 = dataForm.find((form) => form.examiner_type === 2)
          if (foundForm2) {
            setExaminerType2(foundForm2)
          }

          const foundForm3 = dataForm.find((form) => form.examiner_type === 3)
          if (foundForm3) {
            setExaminerType3(foundForm3)
          }
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
      getIdForm()

      getPesertaSeminar()
      getlistKriteria()
      getlistDosenPenguji()
      getlistDosenPembimbing()
    }
  }, [])

  useEffect(() => {
    console.log(formData)
    console.log(examinerType1)
    console.log(examinerType2)
    console.log(examinerType3)
  }, [formData])

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      width: '8%',
      align: 'center',
      render: (value, item, index) => {
        return index + 1
      },
    },
    {
      title: 'List Kriteria Seminar',
      dataIndex: 'criteria_name',
    },
    {
      title: 'Nilai',
      align: 'center',
      width: '15%',
      render: (text, record) => (
        <>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Input
                id={text.id}
                type="number"
                min="0"
                max="100"
                style={{ width: '60%', height: '90%' }}
                onChange={(e) => handleInputChange(e, record)}
              />
            </Col>
          </Row>
        </>
      ),
    },
  ]

  const columns2 = [
    {
      title: 'No',
      dataIndex: 'no',
      width: '8%',
      align: 'center',
      render: (value, item, index) => {
        return index + 1
      },
    },
    {
      title: 'List Kriteria Seminar',
      dataIndex: 'criteria_name',
    },
    {
      title: 'Nilai',
      align: 'center',
      width: '15%',
      render: (text, record) => (
        <>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Input
                id={text.id}
                type="number"
                min="0"
                max="100"
                style={{ width: '60%', height: '90%' }}
                onChange={(e) => handleInputChange2(e, record)}
              />
            </Col>
          </Row>
        </>
      ),
    },
  ]

  const columns3 = [
    {
      title: 'No',
      dataIndex: 'no',
      width: '8%',
      align: 'center',
      render: (value, item, index) => {
        return index + 1
      },
    },
    {
      title: 'List Kriteria Seminar',
      dataIndex: 'criteria_name',
    },
    {
      title: 'Nilai',
      align: 'center',
      width: '15%',
      render: (text, record) => (
        <>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Input
                id={text.id}
                type="number"
                min="0"
                max="100"
                style={{ width: '60%', height: '90%' }}
                onChange={(e) => handleInputChange3(e, record)}
              />
            </Col>
          </Row>
        </>
      ),
    },
  ]

  const handleDosenChange = (value) => {
    setSelectedDosen(value)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleInputChange = async (e, record) => {
    const { id, value } = e.target
    setInputValues((prevState) => ({
      ...prevState,
      [id]: {
        value: Number(value),
        seminar_criteria_id: record.id,
        seminar_form_id: examinerType1.id,
      },
    }))
  }

  const handleButtonClick = async () => {
    // console.log(inputValues)
    try {
      const dataSeminar = {
        participant_id: peserta.nim,
        date_seminar: selectedDate.toISOString(),
        examiner_id: selectedDosen,
        examiner_type: examinerType1.examiner_type,
        comment: comment,
      }
      // console.log('ini hasil input', dataSeminar)
      await axios
        .put(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/form/${examinerType1.id}`,
          dataSeminar,
        )
        .then((response) => {
          console.log('Data berhasil diperbarui:', response.data)
        })

      const DataNilaiSeminar = [inputValues]
      // console.log(DataNilaiSeminar)
      const newDataNilaiSeminar = Object.values(DataNilaiSeminar[0])
      // console.log(newDataNilaiSeminar)
      await axios
        .put(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/form/${examinerType1.id}/values`,
          newDataNilaiSeminar,
        )
        .then((response) => {
          console.log('Data berhasil diperbarui:', response.data)
        })
      notification.success({
        message: 'Nilai seminar berhasil tersimpan',
      })
    } catch (error) {
      console.error(error)
      notification.error({
        message: 'Nilai seminar gagal tersimpan!',
      })
    }
  }

  const handleDosenChange2 = (value) => {
    setSelectedDosen2(value)
  }

  const handleDateChange2 = (date) => {
    setSelectedDate2(date)
  }

  const handleCommentChange2 = (event) => {
    setComment2(event.target.value)
  }

  const handleButtonClick2 = async () => {
    try {
      console.log(inputValues2)
      const dataSeminar = {
        participant_id: peserta.nim,
        date_seminar: selectedDate,
        examiner_id: selectedDosen2,
        examiner_type: examinerType2.examiner_type,
        comment: comment2,
      }
      console.log('ini hasil 1', dataSeminar)

      await axios
        .put(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/form/${examinerType2.id}`,
          dataSeminar,
        )
        .then((response) => {
          console.log('Data berhasil diperbarui:', response.data)
        })

      const DataNilaiSeminar = [inputValues2]
      const newDataNilaiSeminar = Object.values(DataNilaiSeminar[0])
      console.log('ini hasil nilai', newDataNilaiSeminar)
      await axios
        .put(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/form/${examinerType2.id}/values`,
          newDataNilaiSeminar,
        )
        .then((response) => {
          console.log('Data berhasil diperbarui:', response.data)
        })
      notification.success({
        message: 'Nilai seminar berhasil tersimpan',
      })
    } catch (error) {
      console.error(error)
      notification.error({
        message: 'Nilai seminar gagal tersimpan!',
      })
    }
  }

  const handleInputChange2 = async (e, record) => {
    const { id, value } = e.target
    setInputValues2((prevState) => ({
      ...prevState,
      [id]: {
        value: Number(value),
        seminar_criteria_id: record.id,
        seminar_form_id: examinerType2.id,
      },
    }))
    console.log(inputValues2)
  }

  const handleDosenChange3 = (value) => {
    setSelectedDosen3(value)
  }

  const handleDateChange3 = (date) => {
    setSelectedDate3(date)
  }

  const handleCommentChange3 = (event) => {
    setComment3(event.target.value)
  }

  const handleInputChange3 = async (e, record) => {
    const { id, value } = e.target
    setInputValues3((prevState) => ({
      ...prevState,
      [id]: {
        value: Number(value),
        seminar_criteria_id: record.id,
        seminar_form_id: examinerType3.id,
      },
    }))
    console.log(inputValues3)
  }

  const handleButtonClick3 = async () => {
    try {
      console.log(inputValues3)
      const dataSeminar = {
        participant_id: peserta.nim,
        date_seminar: selectedDate,
        examiner_id: selectedDosen3,
        examiner_type: examinerType3.examiner_type,
        comment: comment3,
      }
      console.log('ini hasil 1', dataSeminar)

      await axios
        .put(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/form/${examinerType3.id}`,
          dataSeminar,
        )
        .then((response) => {
          console.log('Data berhasil diperbarui:', response.data)
        })

      const DataNilaiSeminar = [inputValues3]
      const newDataNilaiSeminar = Object.values(DataNilaiSeminar[0])
      console.log('ini hasil nilai', newDataNilaiSeminar)
      await axios
        .put(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/form/${examinerType3.id}/values`,
          newDataNilaiSeminar,
        )
        .then((response) => {
          console.log('Data berhasil diperbarui:', response.data)
        })
      notification.success({
        message: 'Nilai seminar berhasil tersimpan',
      })
    } catch (error) {
      console.error(error)
      notification.error({
        message: 'Nilai seminar gagal tersimpan!',
      })
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
              <Tabs type="card">
                <TabPane tab="Dosen Penguji 1" key="1">
                  <Form form={form} name="basic" wrapperCol={{ span: 24 }} autoComplete="off">
                    <CRow>
                      <CCol sm={12}>
                        <table>
                          <tr>
                            <td>
                              <h8>Nama Peserta KP/PKL</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <h8>{peserta.name}</h8>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h8>NIM</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <h8>{peserta.nim}</h8>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h8>Nama Dosen</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <Select
                                style={{ width: '100%' }}
                                placeholder="Pilih Dosen Penguji 1"
                                onChange={handleDosenChange}
                                value={selectedDosen}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                {dosenpenguji.map((item, i) => (
                                  <Select.Option key={i} value={item.id}>
                                    {item.username}
                                  </Select.Option>
                                ))}
                              </Select>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h8>Tanggal Seminar</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <DatePicker
                                format="DD/MM/YYYY"
                                style={{ width: '100%' }}
                                onChange={handleDateChange}
                                placeholder="Pilih Tanggal"
                                value={selectedDate}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h8>Komentar</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <TextArea
                                maxLength={225}
                                autoSize={{ minRows: 4, maxRows: 10 }}
                                value={comment}
                                onChange={handleCommentChange}
                              >
                                {' '}
                              </TextArea>
                            </td>
                          </tr>
                        </table>
                        <br></br>
                        <h6 style={{ color: '#374253', textAlign: 'center' }}>
                          <b>Tambah Nilai Seminar</b>
                        </h6>
                        <br></br>
                        <Table
                          scroll={{ x: 'max-content' }}
                          columns={columns}
                          dataSource={listKriteria}
                          rowKey="id"
                          bordered
                          pagination={false}
                        />
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol sm={12}>
                        <Button
                          id="button-submit"
                          size="sm"
                          shape="square"
                          style={{
                            color: 'white',
                            background: '#3399FF',
                            marginBottom: 16,
                            float: 'right',
                          }}
                          onClick={() => handleButtonClick()}
                        >
                          Simpan
                        </Button>
                      </CCol>
                    </CRow>
                  </Form>
                </TabPane>
                <TabPane tab="Dosen Penguji 2" key="2">
                  <Form form={form1} name="basic" wrapperCol={{ span: 24 }} autoComplete="off">
                    <CRow>
                      <CCol sm={12}>
                        <table>
                          <tr>
                            <td>
                              <h8>Nama Peserta KP/PKL</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <h8>{peserta.name}</h8>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h8>NIM</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <h8>{peserta.nim}</h8>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h8>Nama Dosen</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <Select
                                style={{ width: '100%' }}
                                placeholder="Pilih Dosen Penguji 2"
                                onChange={handleDosenChange2}
                                value={selectedDosen2}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                {dosenpenguji.map((item, i) => (
                                  <Select.Option key={i} value={item.id}>
                                    {item.username}
                                  </Select.Option>
                                ))}
                              </Select>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h8>Tanggal Seminar</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <DatePicker
                                format="DD/MM/YYYY"
                                style={{ width: '100%' }}
                                // onChange={handleDateChange2}
                                placeholder="Pilih Tanggal"
                                value={selectedDate ? selectedDate : undefined}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h8>Komentar</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <TextArea
                                maxLength={225}
                                autoSize={{ minRows: 4, maxRows: 10 }}
                                value={comment2}
                                onChange={handleCommentChange2}
                              >
                                {' '}
                              </TextArea>
                            </td>
                          </tr>
                        </table>
                        <br></br>
                        <h6 style={{ color: '#374253', textAlign: 'center' }}>
                          <b>Tambah Nilai Seminar</b>
                        </h6>
                        <br></br>
                        <Table
                          scroll={{ x: 'max-content' }}
                          columns={columns2}
                          dataSource={listKriteria}
                          rowKey="id"
                          bordered
                          pagination={false}
                        />
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol sm={12}>
                        <Button
                          id="button-submit"
                          size="sm"
                          shape="square"
                          style={{
                            color: 'white',
                            background: '#3399FF',
                            marginBottom: 16,
                            float: 'right',
                          }}
                          onClick={() => handleButtonClick2()}
                        >
                          Simpan
                        </Button>
                      </CCol>
                    </CRow>
                  </Form>
                </TabPane>
                <TabPane tab="Dosen Pembimbing" key="3">
                  <Form form={form2} name="basic" wrapperCol={{ span: 24 }} autoComplete="off">
                    <CRow>
                      <CCol sm={12}>
                        <table>
                          <tr>
                            <td>
                              <h8>Nama Peserta KP/PKL</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <h8>{peserta.name}</h8>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h8>NIM</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <h8>{peserta.nim}</h8>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h8>Nama Dosen</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <Select
                                style={{ width: '100%' }}
                                placeholder="Pilih Dosen Pembimbing"
                                onChange={handleDosenChange3}
                                value={selectedDosen3}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                {dosenpembimbing.map((item, i) => (
                                  <Select.Option key={i} value={item.id}>
                                    {item.username}
                                  </Select.Option>
                                ))}
                              </Select>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h8>Tanggal Seminar</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <DatePicker
                                format="DD/MM/YYYY"
                                style={{ width: '100%' }}
                                // onChange={handleDateChange3}
                                value={selectedDate ? selectedDate : undefined}
                                placeholder="Pilih Tanggal"
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h8>Komentar</h8>
                            </td>
                            <td>
                              <h8> : </h8>
                            </td>
                            <td>
                              <TextArea
                                maxLength={225}
                                autoSize={{ minRows: 4, maxRows: 10 }}
                                value={comment3}
                                onChange={handleCommentChange3}
                              >
                                {' '}
                              </TextArea>
                            </td>
                          </tr>
                        </table>
                        <br></br>
                        <h6 style={{ color: '#374253', textAlign: 'center' }}>
                          <b>Tambah Nilai Seminar</b>
                        </h6>
                        <br></br>
                        <Table
                          scroll={{ x: 'max-content' }}
                          columns={columns3}
                          dataSource={listKriteria}
                          rowKey="id"
                          bordered
                          pagination={false}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol sm={12}>
                        <Button
                          id="button-submit"
                          size="sm"
                          shape="square"
                          style={{
                            color: 'white',
                            background: '#3399FF',
                            marginBottom: 16,
                            float: 'right',
                          }}
                          onClick={() => handleButtonClick3()}
                        >
                          Simpan
                        </Button>
                      </CCol>
                    </CRow>
                  </Form>
                </TabPane>
              </Tabs>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}
export default CreateNilaiPesertaSeminar
