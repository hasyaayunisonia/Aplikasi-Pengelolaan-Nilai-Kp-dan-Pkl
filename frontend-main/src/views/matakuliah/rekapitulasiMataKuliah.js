import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import {
  Button,
  DatePicker,
  Select,
  Form,
  Spin,
  Tabs,
  Table,
  Dropdown,
  Space,
  notification,
} from 'antd'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons'
import { DownOutlined } from '@ant-design/icons'
import { saveAs } from 'file-saver'
import moment from 'moment'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const { TabPane } = Tabs
const RekapitulasiMataKuliah = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [form] = Form.useForm()
  const [showSelectMatkul, setShowSelectMatkul] = useState(false)
  const [selectedProdi, setSelectedProdi] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [matkul, setMatkul] = useState([])
  const [dataTabel, setDataTabel] = useState([])
  const [activeTab, setActiveTab] = useState(null)
  let history = useHistory()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(function () {
      setIsLoading(false)
    }, 100)
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    console.log('ini isi matkul ', matkul)
    if (matkul.length > 0) {
      setShowSelectMatkul(true)
    }
  }, [matkul])

  useEffect(() => {
    console.log('ini data tabel', dataTabel)
  }, [dataTabel])

  const handleTabChange = (key) => {
    setActiveTab(key)
    getDataMatkul(key)
  }

  const onFinish = async () => {
    try {
      // setMatkul(null)
      let prodi

      if (localStorage.getItem('id_prodi') === '0') {
        prodi = 0
      } else {
        prodi = 1
      }

      const dataSeminar = {
        year: selectedDate.year(),
        prodiId: prodi,
      }

      setLoading(true)
      console.log('ini hasil input', dataSeminar, 'tipenyaa ', typeof dataSeminar.prodiId)
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/recapitulation`,
        {
          params: {
            prodiId: dataSeminar.prodiId,
            year: dataSeminar.year,
          },
          timeout: 60000, // Mengatur timeout eksekusi menjadi 60 detik (misalnya)
        },
      )

      setMatkul(response.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

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
      title: 'NIM',
      dataIndex: 'nim',
      // width: '15%',
    },
    {
      title: 'Nama',
      dataIndex: 'name',
      width: '30%',
    },
    {
      title: 'Lain-lain Teori',
      // dataIndex: 'lainLainTeori',
      render: (text, record) => <>{text.lainLainTeori.total_value_component}</>,
      // width: '35%',
    },
    {
      title: 'Lain-lain Praktek',
      // dataIndex: 'lainLainTeori',
      render: (text, record) => <>{text.lainLainPraktek.total_value_component}</>,
      // width: '35%',
    },
    {
      title: 'UTS Teori',
      // dataIndex: 'lainLainTeori',
      render: (text, record) => <>{text.etsTeori.total_value_component}</>,
      // width: '35%',
    },
    {
      title: 'UTS Praktek',
      // dataIndex: 'lainLainTeori',
      render: (text, record) => <>{text.etsPraktek.total_value_component}</>,
      // width: '35%',
    },
    {
      title: 'UAS Teori',
      // dataIndex: 'lainLainTeori',
      render: (text, record) => <>{text.easTeori.total_value_component}</>,
      // width: '35%',
    },
    {
      title: 'UAS Praktek',
      // dataIndex: 'lainLainTeori',
      render: (text, record) => <>{text.easPraktek.total_value_component}</>,
      // width: '35%',
    },
    {
      title: 'Nilai Akhir',
      dataIndex: 'total',
    },
  ]

  // const items = [
  //   {
  //     key: '1',
  //     label: 'Excel',
  //     onClick: () => {
  //       console.log('masuk')
  //       handleRekapitulasi('excel')
  //     },
  //   },
  //   {
  //     key: '2',
  //     label: 'PDF',
  //     onClick: () => {
  //       handleRekapitulasi('pdf')
  //     },
  //   },
  // ]

  const getDataMatkul = (data) => {
    const modifiedData = matkul[data].participant_data
    // console.log('ini modified data', modifiedData)
    const cek = modifiedData.map((participant) => {
      const cariLainLainTeori = participant.component_data.find(
        (component) => component.name_component === 'Lain-lain Teori',
      )
      const cariLainLainPraktek = participant.component_data.find(
        (component) => component.name_component === 'Lain-lain Praktek',
      )
      const cariEtsTeori = participant.component_data.find(
        (component) => component.name_component === 'ETS Teori',
      )
      const cariEtsPraktek = participant.component_data.find(
        (component) => component.name_component === 'ETS Praktek',
      )
      const cariEasTeori = participant.component_data.find(
        (component) => component.name_component === 'EAS Teori',
      )
      const cariEasPraktek = participant.component_data.find(
        (component) => component.name_component === 'EAS Praktek',
      )

      const lainLainTeori = cariLainLainTeori
        ? {
            name_component: cariLainLainTeori.name_component,
            total_value_component: cariLainLainTeori.total_value_component,
            bobot_component: cariLainLainTeori.bobot_component,
          }
        : { name_component: 0, total_value_component: 0, bobot_component: 0 }

      const lainLainPraktek = cariLainLainPraktek
        ? {
            name_component: cariLainLainPraktek.name_component,
            total_value_component: cariLainLainPraktek.total_value_component,
            bobot_component: cariLainLainPraktek.bobot_component,
          }
        : { name_component: 0, total_value_component: 0, bobot_component: 0 }

      const etsTeori = cariEtsTeori
        ? {
            name_component: cariEtsTeori.name_component,
            total_value_component: cariEtsTeori.total_value_component,
            bobot_component: cariEtsTeori.bobot_component,
          }
        : { name_component: 0, total_value_component: 0, bobot_component: 0 }

      const etsPraktek = cariEtsPraktek
        ? {
            name_component: cariEtsPraktek.name_component,
            total_value_component: cariEtsPraktek.total_value_component,
            bobot_component: cariEtsPraktek.bobot_component,
          }
        : { name_component: 0, total_value_component: 0, bobot_component: 0 }

      const easTeori = cariEasTeori
        ? {
            name_component: cariEasTeori.name_component,
            total_value_component: cariEasTeori.total_value_component,
            bobot_component: cariEasTeori.bobot_component,
          }
        : { name_component: 0, total_value_component: 0, bobot_component: 0 }

      const easPraktek = cariEasPraktek
        ? {
            name_component: cariEasPraktek.name_component,
            total_value_component: cariEasPraktek.total_value_component,
            bobot_component: cariEasPraktek.bobot_component,
          }
        : { name_component: 0, total_value_component: 0, bobot_component: 0 }

      const total = participant.total_course || 0
      return {
        nim: participant.nim,
        name: participant.name,
        lainLainTeori: lainLainTeori,
        lainLainPraktek: lainLainPraktek,
        etsTeori: etsTeori,
        etsPraktek: etsPraktek,
        easTeori: easTeori,
        easPraktek: easPraktek,
        total: total,
      }

      // console.log('NIM:', nim)
      // console.log('Name:', name)
    })
    console.log('ini cek YAA ', cek)
    setDataTabel(cek)
    // const cek = modifiedData.map((item) => {
    //   return {
    //     nim: item.participant_data.nim,
    //   }
    // })
    // console.log('ini data ke ambil', cek)
    // setDataTabel(modifiedData)
    // console.log('ini data tabel', dataTabel)
  }

  const tabPanes = matkul.map((item, index) => (
    <TabPane tab={item.name_course} key={index.toString()}>
      {/* {console.log(index, typeof index)} */}
      {/* {getDataMatkul(index)} */}
      <Table
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={dataTabel}
        rowKey="id"
        bordered
      />
    </TabPane>
  ))

  // const handleRekapitulasi = async (fileType) => {
  //   if (fileType === 'excel') {
  //     try {
  //       const dataSeminar = {
  //         year: selectedDate.$y,
  //         prodiId: selectedProdi,
  //       }
  //       const prodiName = dataSeminar.prodiId === '0' ? 'D3' : 'D4'
  //       console.log('ini hasil input', dataSeminar)
  //       console.log('ini prodi', prodiName)
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/generate-course`,
  //         {
  //           params: {
  //             year: dataSeminar.year,
  //             prodiId: dataSeminar.prodiId,
  //           },
  //           responseType: 'blob',
  //         },
  //       )

  //       const contentDisposition = response.headers['content-disposition']
  //       const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
  //       const matches = filenameRegex.exec(contentDisposition)
  //       const filenameFromApi =
  //         matches && matches[1] ? matches[1].replace(/['"]/g, '') : 'rekapitulasi'

  //       const fileName = `${prodiName}_${filenameFromApi}`

  //       const blob = new Blob([response.data], {
  //         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //       })
  //       saveAs(blob, fileName)
  //     } catch (error) {
  //       console.error(error)
  //       notification.error({
  //         message: 'Download file excel gagal',
  //       })
  //     }
  //   } else if (fileType === 'pdf') {
  //     // Logika untuk tombol PDF
  //     // Gunakan API yang berbeda untuk menghasilkan file PDF
  //   }
  // }

  const handleRekapitulasi = async () => {
    try {
      let prodi
      if (localStorage.getItem('id_prodi') === '0') {
        prodi = 0
      } else {
        prodi = 1
      }

      const dataSeminar = {
        year: selectedDate.year(),
        prodiId: prodi,
      }

      // console.log('ini prodi', dataSeminar.prodiId)
      const prodiName = dataSeminar.prodiId === 0 ? 'D3' : 'D4'
      console.log('ini hasil input', dataSeminar)
      console.log('ini prodi', prodiName)
      notification.info({
        message: `Harap tunggu sedang memproses rekapitulasi nilai`,
        // description: 'Harap tunggu sedang memproses download nilai seminar',
      })
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/generate-course`,
        {
          params: {
            year: dataSeminar.year,
            prodiId: dataSeminar.prodiId,
          },
          responseType: 'blob',
        },
      )

      const contentDisposition = response.headers['content-disposition']
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      const matches = filenameRegex.exec(contentDisposition)
      const filenameFromApi =
        matches && matches[1] ? matches[1].replace(/['"]/g, '') : 'rekapitulasi'

      const fileName = `${prodiName}_${filenameFromApi}`

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      saveAs(blob, fileName)
    } catch (error) {
      console.error(error)
      notification.error({
        message: 'Download file excel gagal',
      })
    }
  }

  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <>
      <CCard className="mb-4">
        <CCardHeader style={{ paddingLeft: '20px' }}>
          <h5>
            <b>Rekapitulasi Nilai Mata Kuliah</b>
          </h5>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <Form
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <CRow>
                  <Form.Item name="Tahun">
                    <CCol md={8}>
                      <b>Pilih Tahun Awal Ajaran</b>
                    </CCol>
                    <CCol xs={6} md={4}>
                      <DatePicker
                        picker="year"
                        style={{ width: '100%' }}
                        placeholder="Pilih Tahun"
                        onChange={handleDateChange}
                        value={selectedDate}
                      />
                    </CCol>
                  </Form.Item>
                </CRow>
                <CRow>
                  <CCol sm={12} style={{ textAlign: 'left' }}>
                    <Button
                      id="button-submit"
                      size="sm"
                      shape="square"
                      // loading={loadings[0]}
                      style={{ color: 'white', background: '#3399FF', marginBottom: 16 }}
                      onClick={form.submit}
                      disabled={loading}
                    >
                      Tarik Nilai
                    </Button>
                  </CCol>
                </CRow>
                {loading ? (
                  <Spin size="large" />
                ) : (
                  <>
                    {showSelectMatkul && (
                      <>
                        <CRow>
                          <CCol style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                              id="generate"
                              size="sm"
                              shape="square"
                              style={{ color: 'white', background: '#e9033d' }}
                              onClick={handleRekapitulasi}
                            >
                              <FontAwesomeIcon
                                icon={faFileDownload}
                                style={{ marginRight: '8px' }}
                              />
                              Download Rekapitulasi
                            </Button>
                          </CCol>
                        </CRow>
                      </>
                    )}
                  </>
                )}
              </Form>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <Tabs type="card" onChange={handleTabChange} activeKey={activeTab}>
                {tabPanes}
              </Tabs>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}
export default RekapitulasiMataKuliah
