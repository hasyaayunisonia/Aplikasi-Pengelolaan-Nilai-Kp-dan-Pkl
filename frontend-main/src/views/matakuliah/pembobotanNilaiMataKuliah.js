import React, { useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import {
  Button,
  Form,
  Spin,
  Tabs,
  Row,
  Col,
  Input,
  notification,
  Steps,
  Typography,
  Divider,
  Select,
  Space,
} from 'antd'
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { convertToHTML } from 'draft-convert'
import { EditorState, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import DOMPurify from 'dompurify'
import htmlToDraft from 'html-to-draftjs'

import PembobotanKriteriaMataKuliah from './pembobotanKriteriaMataKuliah'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const { Step } = Steps
const { Option } = Select
const { TabPane } = Tabs

const PembobotanMataKuliah = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [form] = Form.useForm()
  const [form1] = Form.useForm()
  const [bobot, setBobot] = useState({})
  const { id } = useParams()
  let history = useHistory()
  const [loadings, setLoadings] = useState([])

  const [current, setCurrent] = useState(0)
  const [isSpinner, setIsSpinner] = useState(true)

  axios.defaults.withCredentials = true

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
  }

  axios.defaults.withCredentials = true

  const refreshData = (index) => {
    axios
      .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/course-form/${id}`)
      .then((res) => {
        setBobot({
          UasPraktek: res.data.data[0].bobot_component,
          UasTeori: res.data.data[1].bobot_component,
          UtsPraktek: res.data.data[2].bobot_component,
          UtsTeori: res.data.data[3].bobot_component,
          LainPraktek: res.data.data[4].bobot_component,
          LainTeori: res.data.data[5].bobot_component,
          idUasPraktek: res.data.data[0].id,
          idUasTeori: res.data.data[1].id,
          idUtsPraktek: res.data.data[2].id,
          idUtsTeori: res.data.data[3].id,
          idLainPraktek: res.data.data[4].id,
          idLainTeori: res.data.data[5].id,
        })
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings]
          newLoadings[index] = false
          return newLoadings
        })
      })
  }

  useEffect(() => {
    async function getDataBobot() {
      setIsLoading(false)
      setIsSpinner(false)
      await axios
        .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/course-form/${id}`)
        .then((res) => {
          setBobot({
            UasPraktek: res.data.data[0].bobot_component,
            UasTeori: res.data.data[1].bobot_component,
            UtsPraktek: res.data.data[2].bobot_component,
            UtsTeori: res.data.data[3].bobot_component,
            LainPraktek: res.data.data[4].bobot_component,
            LainTeori: res.data.data[5].bobot_component,
            idUasPraktek: res.data.data[0].id,
            idUasTeori: res.data.data[1].id,
            idUtsPraktek: res.data.data[2].id,
            idUtsTeori: res.data.data[3].id,
            idLainPraktek: res.data.data[4].id,
            idLainTeori: res.data.data[5].id,
          })
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
    // async function getMataKuliah() {
    //   await axios.get(`/api/courses/form`).then((res) => {
    //     setIsLoading(false)
    //     const idParam = parseInt(id)
    //     const filteredData = res.data.data.find((item) => item.id === idParam)
    //     // console.log('ini filtered data', filteredData)
    //     setMatkul(filteredData)
    //     // console.log('ini matkul', matkul)
    //   })
    // }

    getDataBobot()
    // getMataKuliah()
    // fetchAspekOptions()
  }, [history])

  const isKosong = (angka) => {
    return angka ? angka : 0
  }

  const countBobot = () => {
    return (
      parseInt(isKosong(bobot.UtsTeori)) +
      parseInt(isKosong(bobot.UasTeori)) +
      parseInt(isKosong(bobot.LainTeori)) +
      parseInt(isKosong(bobot.UtsPraktek)) +
      parseInt(isKosong(bobot.UasPraktek)) +
      parseInt(isKosong(bobot.LainPraktek))
    )
  }

  const onFinish = async (index) => {
    if (countBobot() === 100) {
      enterLoading(index)
      await axios
        .put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/update`, [
          {
            id: bobot.idUasPraktek,
            name: 'EAS Praktek',
            bobot_component: form.getFieldValue('uas-praktek')
              ? parseInt(form.getFieldValue('uas-praktek'))
              : 0,
            course_id: parseInt(id),
            is_average: 1,
          },
          {
            id: bobot.idUasTeori,
            name: 'EAS Teori',
            bobot_component: parseInt(form.getFieldValue('uas-teori'))
              ? parseInt(form.getFieldValue('uas-teori'))
              : 0,
            course_id: parseInt(id),
            is_average: 1,
          },
          {
            id: bobot.idUtsPraktek,
            name: 'ETS Praktek',
            bobot_component: parseInt(form.getFieldValue('uts-praktek'))
              ? parseInt(form.getFieldValue('uts-praktek'))
              : 0,
            course_id: parseInt(id),
            is_average: 1,
          },
          {
            id: bobot.idUtsTeori,
            name: 'ETS Teori',
            bobot_component: parseInt(form.getFieldValue('uts-teori'))
              ? parseInt(form.getFieldValue('uts-teori'))
              : 0,
            course_id: parseInt(id),
            is_average: 1,
          },
          {
            id: bobot.idLainPraktek,
            name: 'Lain-lain Praktek',
            bobot_component: parseInt(form.getFieldValue('lain-praktek'))
              ? parseInt(form.getFieldValue('lain-praktek'))
              : 0,
            course_id: parseInt(id),
            is_average: 1,
          },
          {
            id: bobot.idLainTeori,
            name: 'Lain-lain Teori',
            bobot_component: parseInt(form.getFieldValue('lain-teori'))
              ? parseInt(form.getFieldValue('lain-teori'))
              : 0,
            course_id: parseInt(id),
            is_average: 1,
          },
        ])
        .then((response) => {
          notification.success({
            message: 'Data bobot kriteria berhasil diubah',
          })
          refreshData(index)
        })
        .catch((error) => {
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings]
            newLoadings[index] = false
            return newLoadings
          })
          notification.error({
            message: 'Data bobot kriteria gagal diubah',
          })
        })
    } else {
      notification.error({
        message: 'Jumlah semua bobot harus 100',
      })
    }
  }

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [convertedContent, setConvertedContent] = useState(null)
  const handleEditorChange = (state) => {
    setEditorState(state)
    convertContentToHTML()
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent())
    setConvertedContent(currentContentAsHTML)
  }

  const next = (countBobot) => {
    if (countBobot === 100) {
      setCurrent(current + 1)
    } else {
      notification.error({
        message: 'Bobot komponen harus mencapai 100!',
      })
    }
  }

  const steps = [
    {
      title: 'Bobot Komponen',
      content: (
        <>
          <CCardHeader style={{ paddingLeft: '20px' }}>
            <Row align="middle">
              <Col>
                <h5>
                  <b style={{ color: '#374253' }}>Pengelolaan Bobot Komponen &nbsp;</b>
                </h5>
              </Col>
            </Row>
          </CCardHeader>
          <CCardBody style={{ paddingLeft: '20px' }}></CCardBody>
          <CRow>
            <CCol sm={12}>
              <Form
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                onFinish={() => onFinish(0)}
                autoComplete="off"
                fields={[
                  {
                    name: ['uts-teori'],
                    value: bobot.UtsTeori,
                  },
                  {
                    name: ['uas-teori'],
                    value: bobot.UasTeori,
                  },
                  {
                    name: ['lain-teori'],
                    value: bobot.LainTeori,
                  },
                  {
                    name: ['uts-praktek'],
                    value: bobot.UtsPraktek,
                  },
                  {
                    name: ['uas-praktek'],
                    value: bobot.UasPraktek,
                  },
                  {
                    name: ['lain-praktek'],
                    value: bobot.LainPraktek,
                  },
                ]}
              >
                <Row style={{ paddingLeft: '30px' }}>
                  <Col span={8} style={{ paddingRight: '30px' }}>
                    <b>ETS Teori</b>
                    <Form.Item
                      name="uts-teori"
                      rules={[{ message: 'Format bobot uts teori hanya angka!', pattern: /^\d+$/ }]}
                    >
                      <Input
                        addonAfter="%"
                        onChange={(e) => {
                          setBobot((pre) => {
                            return { ...pre, UtsTeori: e.target.value }
                          })
                        }}
                        value={bobot.UtsTeori}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8} style={{ paddingRight: '30px' }}>
                    <b>EAS Teori</b>
                    <Form.Item
                      name="uas-teori"
                      rules={[{ message: 'Format bobot uas teori hanya angka!', pattern: /^\d+$/ }]}
                    >
                      <Input
                        addonAfter="%"
                        onChange={(e) => {
                          setBobot((pre) => {
                            return { ...pre, UasTeori: e.target.value }
                          })
                        }}
                        value={bobot.UasTeori}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8} style={{ paddingRight: '30px' }}>
                    <b>Lain - Lain Teori</b>
                    <Form.Item
                      name="lain-teori"
                      rules={[
                        {
                          message: 'Format bobot lain - lain teori perusahaan hanya angka!',
                          pattern: /^\d+$/,
                        },
                      ]}
                    >
                      <Input
                        addonAfter="%"
                        onChange={(e) => {
                          setBobot((pre) => {
                            return { ...pre, LainTeori: e.target.value }
                          })
                        }}
                        value={bobot.LainTeori}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: '30px' }}>
                  <Col span={8} style={{ paddingRight: '30px' }}>
                    <b>ETS Praktek</b>
                    <Form.Item
                      name="uts-praktek"
                      rules={[
                        { message: 'Format bobot uts praktek hanya angka!', pattern: /^\d+$/ },
                      ]}
                    >
                      <Input
                        addonAfter="%"
                        onChange={(e) => {
                          setBobot((pre) => {
                            return { ...pre, UtsPraktek: e.target.value }
                          })
                        }}
                        value={bobot.UtsPraktek}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8} style={{ paddingRight: '30px' }}>
                    <b>EAS Praktek</b>
                    <Form.Item
                      name="uas-praktek"
                      rules={[
                        { message: 'Format bobot uas praktek hanya angka!', pattern: /^\d+$/ },
                      ]}
                    >
                      <Input
                        addonAfter="%"
                        onChange={(e) => {
                          setBobot((pre) => {
                            return { ...pre, UasPraktek: e.target.value }
                          })
                        }}
                        value={bobot.UasPraktek}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8} style={{ paddingRight: '30px' }}>
                    <b>Lain - Lain Praktek</b>
                    <Form.Item
                      name="lain-praktek"
                      rules={[
                        {
                          message: 'Format bobot lain - lain praktek perusahaan hanya angka!',
                          pattern: /^\d+$/,
                        },
                      ]}
                    >
                      <Input
                        addonAfter="%"
                        onChange={(e) => {
                          setBobot((pre) => {
                            return { ...pre, LainPraktek: e.target.value }
                          })
                        }}
                        value={bobot.LainPraktek}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                  {/* span nya 6 */}
                  <Col span={18} style={{ textAlign: 'left' }}>
                    Jumlah bobot komponen saat ini: {countBobot() === 0 ? 0 : countBobot()}
                    {countBobot() > 100 && (
                      <span style={{ color: 'red' }}>
                        <sup>* Jumlah bobot melebihi batas maksimum 100</sup>
                      </span>
                    )}
                    {countBobot() < 100 && (
                      <span style={{ color: 'red' }}>
                        <sup>* Jumlah bobot kurang dari 100</sup>
                      </span>
                    )}
                  </Col>
                  {/* <Col span={18} style={{ textAlign: 'right' }}>
                    <Button
                      id="button-submit"
                      size="sm"
                      shape="round"
                      loading={loadings[0]}
                      style={{
                        color: 'white',
                        background: countBobot() === 100 ? '#3399FF' : '#e9033d',
                        marginBottom: 16,
                      }}
                      disabled={countBobot() !== 100}
                      onClick={form.submit}
                      // onClick={() => handleButtonClick()}
                    >
                      Simpan
                    </Button>
                  </Col> */}
                </Row>
              </Form>
            </CCol>
          </CRow>
        </>
      ),
    },
    {
      title: 'Bobot Kriteria',
      content: (
        <>
          <PembobotanKriteriaMataKuliah />
        </>
      ),
    },
  ]

  return isSpinner ? (
    <Spin indicator={antIcon} />
  ) : isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <>
      <Steps current={current} type="navigation" className="site-navigation-steps">
        {steps.map((item) => (
          <Step title={item.title} key={item.title} />
        ))}
      </Steps>
      <CCard>
        <CCardBody>
          {steps[current].content}
          <div className="steps-action mt-2">
            {current > 0 && (
              <>
                <Button
                  type="primary"
                  style={{ margin: '0 8px' }}
                  onClick={() => {
                    setCurrent(current - 1)
                    // setPrev(true)
                    // setSave(false)
                    // form1.submit()
                  }}
                >
                  Kembali
                </Button>
                <Button
                  style={{ marginRight: '8px' }}
                  // loading={loadings[0]}
                  type="primary"
                  onClick={() => {
                    // setSave(true)
                    // form1.submit()
                  }}
                >
                  Simpan
                </Button>
              </>
            )}
            {current < steps.length - 1 && (
              <>
                {current === 0 && (
                  <Button
                    id="button-submit"
                    // size="sm"
                    // shape="round"
                    // type="primary"
                    loading={loadings[0]}
                    style={{
                      color: 'white',
                      background: countBobot() === 100 ? '#1677ff' : '#808080',
                      margin: '15px 15px 15px 30px',
                    }}
                    disabled={countBobot() !== 100}
                    onClick={form.submit}
                    // onClick={() => handleButtonClick()}
                  >
                    Simpan
                  </Button>
                )}
                <Button
                  // type="primary"
                  style={{
                    color: 'white',
                    background: '#1677ff',
                  }}
                  onClick={() => {
                    next(countBobot())
                    // setCurrent(current + 1)
                    // setSave(false)
                    // form1.submit()
                  }}
                >
                  Lanjutkan
                </Button>
              </>
            )}
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}
export default PembobotanMataKuliah
