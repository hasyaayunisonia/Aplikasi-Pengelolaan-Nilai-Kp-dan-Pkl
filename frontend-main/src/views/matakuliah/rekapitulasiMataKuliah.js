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

  useEffect(() => {
    setTimeout(function () {
      setIsLoading(false)
    }, 100)
  }, [])

  const prodiJurusan = [
    { id: 0, nama: 'D3 Teknik Informatika' },
    { id: 1, nama: 'D4 Teknik Informatika' },
  ]

  const handleProdiChange = (value) => {
    setSelectedProdi(value)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  useEffect(() => {
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

  const handleButtonClick = async () => {
    try {
      const dataSeminar = {
        year: selectedDate.$y,
        prodiId: selectedProdi,
      }
      console.log('ini hasil input', dataSeminar, 'tipenyaa ', typeof dataSeminar.prodiId)
      await axios
        .get(`/api/courses/recapitulation`, {
          params: {
            year: dataSeminar.year,
            prodiId: dataSeminar.prodiId,
          },
        })
        .then((res) => {
          // console.log(res.data.data)
          setMatkul(res.data.data)
          console.log('matkul', matkul)
        })
    } catch (error) {
      console.error(error)
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

  const items = [
    {
      key: '1',
      label: 'Excel',
      onClick: () => {
        console.log('masuk')
        handleRekapitulasi('excel')
      },
    },
    {
      key: '2',
      label: 'PDF',
      onClick: () => {
        handleRekapitulasi('pdf')
      },
    },
  ]

  const handleRekapitulasi = async (fileType) => {
    if (fileType === 'excel') {
      try {
        const dataSeminar = {
          year: selectedDate.$y,
          prodiId: selectedProdi,
        }
        const prodiName = dataSeminar.prodiId === '0' ? 'D3' : 'D4'
        console.log('ini hasil input', dataSeminar)
        console.log('ini prodi', prodiName)
        const response = await axios.get(`/api/courses/generate-course`, {
          params: {
            year: dataSeminar.year,
            prodiId: dataSeminar.prodiId,
          },
          responseType: 'blob',
        })

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
    } else if (fileType === 'pdf') {
      // Logika untuk tombol PDF
      // Gunakan API yang berbeda untuk menghasilkan file PDF
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
                // onFinish={() => onFinish(0)}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <CRow>
                  <Form.Item name="Prodi">
                    <CCol md={8}>
                      <b>Prodi</b>
                    </CCol>
                    <CCol xs={6} md={4}>
                      <Select
                        // style={{ width: '100%' }}
                        placeholder="Pilih Prodi Jurusan"
                        onChange={handleProdiChange}
                        value={selectedProdi}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {prodiJurusan.map((item) => (
                          <Select.Option key={item.id}>{item.nama}</Select.Option>
                        ))}
                      </Select>
                    </CCol>
                  </Form.Item>
                </CRow>
                <CRow>
                  <Form.Item name="Prodi">
                    <CCol md={8}>
                      <b>Tahun</b>
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
                      onClick={handleButtonClick}
                    >
                      Tarik Nilai
                    </Button>
                  </CCol>
                </CRow>
                {showSelectMatkul && (
                  <>
                    <CRow>
                      <CCol style={{ display: 'flex', justifyContent: 'center' }}>
                        <Space size="middle">
                          <Dropdown
                            menu={{
                              items,
                            }}
                          >
                            <Button
                              id="generate"
                              size="sm"
                              shape="square"
                              style={{ color: 'white', background: '#e9033d' }}
                            >
                              <FontAwesomeIcon
                                icon={faFileDownload}
                                style={{ marginRight: '8px' }}
                              />
                              Download Rekapitulasi <DownOutlined />
                            </Button>
                          </Dropdown>
                        </Space>
                      </CCol>
                    </CRow>
                  </>
                )}
              </Form>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <Tabs type="card" onChange={handleTabChange} activeKey={activeTab}>
                {tabPanes}
                {/* <TabPane tab="MK 1" key="1"></TabPane>
                <TabPane tab="MK 2" key="2"></TabPane>
                <TabPane tab="MK 3" key="3"></TabPane>
                <TabPane tab="MK 4" key="4"></TabPane>
                <TabPane tab="MK 5" key="4"></TabPane> */}
              </Tabs>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}
export default RekapitulasiMataKuliah
