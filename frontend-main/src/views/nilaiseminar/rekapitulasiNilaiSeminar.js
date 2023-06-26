import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
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
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons'
import { DownOutlined } from '@ant-design/icons'
import ButtonGroup from 'antd/es/button/button-group'
import { saveAs } from 'file-saver'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const { TabPane } = Tabs
const RekapitulasiNilaiSeminar = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [form] = Form.useForm()
  const [selectedProdi, setSelectedProdi] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [nilaipenguji1, setNilaiPenguji1] = useState([])
  const [nilaipenguji2, setNilaiPenguji2] = useState([])
  const [nilaipembimbing, setNilaiPembimbing] = useState([])
  const [nilaitotal, setNilaiTotal] = useState([])
  const [showTable, setShowTable] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [modifiedDataArray, setModifiedDataArray] = useState([])
  const [modifiedDataArray2, setModifiedDataArray2] = useState([])
  const [modifiedDataArray3, setModifiedDataArray3] = useState([])
  const [modifiedDataArray4, setModifiedDataArray4] = useState([])
  const [loading, setLoading] = useState(false)
  const [listKriteria, setListKriteria] = useState([])

  useEffect(() => {
    setTimeout(function () {
      setIsLoading(false)
    }, 100)
  }, [])

  useEffect(() => {
    console.log(showTable)
    console.log(showButton)
  }, [showTable, showButton])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    console.log('masuk pak eko', listKriteria)
  }, [listKriteria])

  const onFinish = async () => {
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
      setLoading(true)

      console.log('ini hasil input', dataSeminar)
      await axios
        .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/recapitulation`, {
          params: {
            year: dataSeminar.year,
            prodiId: dataSeminar.prodiId,
          },
          timeout: 60000, // Mengatur timeout eksekusi menjadi 60 detik (misalnya)
        })
        .then((res) => {
          // console.log(res.data)
          setNilaiPenguji1(res.data.data.nilai_penguji_1)
          setNilaiPenguji2(res.data.data.nilai_penguji_2)
          setNilaiPembimbing(res.data.data.nilai_pembimbing)
          setNilaiTotal(res.data.data.nilai_total_seminar)
          console.log('nilai penguji 1', nilaipenguji1)
          console.log('nilai penguji 2', nilaipenguji2)
          console.log('nilai pembimbing', nilaipembimbing)
          console.log('nilai total', nilaitotal)
        })
      setShowTable(true)
      setShowButton(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }

    const getKriteria = await axios.get(
      `${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/criteria`,
    )
    const filteredKriteria = getKriteria.data.data.filter((item) => item.is_selected === 1)

    // console.log('ini data kriteria', filteredKriteria)
    setListKriteria(filteredKriteria)
    console.log('ini data kriteria', listKriteria)
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
      // width: '35%',
    },
  ]

  const nilai = [
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
      title: 'Nama Kriteria',
      render: (value, item, index) => {
        return `NILAI ${index + 1}`
      },
      // width: '15%',
    },
    {
      title: 'Keterangan',
      dataIndex: 'criteria_name',
      // width: '35%',
    },
  ]

  const handleNilaipenguji1 = (data) => {
    const modifiedData = nilaipenguji1.map((item) => {
      const nilaiColumns = item.nilai.reduce((result, nilai, index) => {
        const columnKey = `nilai${index + 1}`
        return {
          ...result,
          [columnKey]: nilai.value,
        }
      }, {})

      return {
        name: item.peserta.name,
        nim: item.peserta.nim,
        ...nilaiColumns,
        nilaiTotal: item.nilaiTotal,
      }
    })

    setModifiedDataArray(modifiedData)
    console.log(modifiedDataArray)
  }

  const handleNilaipenguji2 = (data) => {
    const modifiedData = nilaipenguji2.map((item) => {
      const nilaiColumns = item.nilai.reduce((result, nilai, index) => {
        const columnKey = `nilai${index + 1}`
        return {
          ...result,
          [columnKey]: nilai.value,
        }
      }, {})

      return {
        name: item.peserta.name,
        nim: item.peserta.nim,
        ...nilaiColumns,
        nilaiTotal: item.nilaiTotal,
      }
    })

    setModifiedDataArray2(modifiedData)
    console.log(modifiedDataArray2)
  }

  const handleNilaipembimbing = (data) => {
    const modifiedData = nilaipembimbing.map((item) => {
      const nilaiColumns = item.nilai.reduce((result, nilai, index) => {
        const columnKey = `nilai${index + 1}`
        return {
          ...result,
          [columnKey]: nilai.value,
        }
      }, {})

      return {
        name: item.peserta.name,
        nim: item.peserta.nim,
        ...nilaiColumns,
        nilaiTotal: item.nilaiTotal,
      }
    })

    setModifiedDataArray3(modifiedData)
    console.log(modifiedDataArray3)
  }

  const handleNilaitotal = (data) => {
    const modifiedData = nilaitotal.map((item) => {
      return {
        name: item.participant.name,
        nim: item.participant.nim,
        nilaiTotal: item.nilaiTotal,
      }
    })

    setModifiedDataArray4(modifiedData)
    console.log(modifiedDataArray4)
  }

  useEffect(() => {
    if (nilaipenguji1.length > 0) {
      handleNilaipenguji1(nilaipenguji1)
    }

    if (nilaipenguji2.length > 0) {
      handleNilaipenguji2(nilaipenguji2)
    }

    if (nilaipembimbing.length > 0) {
      handleNilaipembimbing(nilaipembimbing)
    }

    if (nilaitotal.length > 0) {
      handleNilaitotal(nilaitotal)
    }
  }, [nilaipenguji1, nilaipenguji2, nilaipembimbing, nilaitotal])

  const dynamicNilaiColumns = [
    {
      title: 'Rekapitulasi Nilai Seminar',
      children: Object.keys(modifiedDataArray[0] || {})
        .filter((key) => key.startsWith('nilai') && key !== 'nilaiTotal')
        .map((key, index) => ({
          title: `NILAI ${index + 1}`,
          dataIndex: key,
          align: 'center',
        })),
    },
  ]

  dynamicNilaiColumns.push({
    title: 'Nilai Total',
    dataIndex: 'nilaiTotal',
    align: 'center',
  })

  const finalColumns = [...columns, ...dynamicNilaiColumns]

  columns.push({
    title: 'Nilai Total',
    dataIndex: 'nilaiTotal',
    align: 'center',
    // render: (value) => Math.round(value),
  })

  const finalColumns2 = [...columns]

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
      const prodiName = dataSeminar.prodiId === 0 ? 'D3' : 'D4'
      console.log('ini hasil input', dataSeminar)
      console.log('ini prodi', prodiName)
      notification.info({
        message: `Harap tunggu sedang memproses rekapitulasi nilai seminar`,
        // description: 'Harap tunggu sedang memproses download nilai seminar',
      })
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/generate-seminar`,
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

  var x = 1
  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <>
      <CCard className="mb-4">
        <CCardHeader style={{ paddingLeft: '20px' }}>
          <h5>
            <b>Rekapitulasi Nilai Seminar</b>
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
                autoComplete="off"
              >
                <CRow>
                  <Form.Item name="Prodi">
                    <CCol md={8}>
                      <b>Pilih Tahun Awal Ajaran </b>
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
                  <CCol xs={6} md={2}>
                    <Button
                      id="button-submit"
                      size="sm"
                      shape="square"
                      style={{ color: 'white', background: '#3399FF', marginBottom: 16 }}
                      onClick={form.submit}
                      disabled={loading}
                    >
                      Cari
                    </Button>
                  </CCol>
                </CRow>
                {loading ? (
                  <Spin size="large" />
                ) : (
                  <>
                    {' '}
                    <CRow>
                      {showButton && (
                        <CCol style={{ display: 'flex', justifyContent: 'center' }}>
                          <Button
                            id="generate"
                            size="sm"
                            shape="square"
                            style={{ color: 'white', background: '#e9033d' }}
                            onClick={handleRekapitulasi}
                          >
                            <FontAwesomeIcon icon={faFileDownload} style={{ marginRight: '8px' }} />
                            Download Rekapitulasi
                          </Button>
                        </CCol>
                      )}
                    </CRow>
                  </>
                )}

                <br></br>
              </Form>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              {/* {showTable && ( */}
              <Tabs type="card">
                {showTable && (
                  <TabPane tab="Dosen Penguji 1" key="1">
                    <Table
                      scroll={{ x: 'max-content' }}
                      columns={finalColumns}
                      dataSource={modifiedDataArray}
                      rowKey="id"
                      bordered
                    />

                    <br></br>
                    <h8>
                      <b>Keterangan :</b>
                    </h8>
                    <br></br>
                    <br></br>
                    <Table
                      scroll={{ x: 'max-content' }}
                      columns={nilai}
                      dataSource={listKriteria}
                      rowKey="id"
                      bordered
                      pagination={false}
                    />
                  </TabPane>
                )}
                {showTable && (
                  <TabPane tab="Dosen Penguji 2" key="2">
                    <Table
                      scroll={{ x: 'max-content' }}
                      columns={finalColumns}
                      dataSource={modifiedDataArray2}
                      rowKey="id"
                      bordered
                    />

                    <br></br>
                    <br></br>
                    <h8>
                      <b>Keterangan :</b>
                    </h8>
                    <br></br>
                    <br></br>
                    <Table
                      scroll={{ x: 'max-content' }}
                      columns={nilai}
                      dataSource={listKriteria}
                      rowKey="id"
                      bordered
                      pagination={false}
                    />
                  </TabPane>
                )}
                {showTable && (
                  <TabPane tab="Dosen Pembimbing" key="3">
                    <Table
                      scroll={{ x: 'max-content' }}
                      columns={finalColumns}
                      dataSource={modifiedDataArray3}
                      rowKey="id"
                      bordered
                    />

                    <br></br>
                    <h8>
                      <b>Keterangan :</b>
                    </h8>
                    <br></br>
                    <br></br>
                    <Table
                      scroll={{ x: 'max-content' }}
                      columns={nilai}
                      dataSource={listKriteria}
                      rowKey="id"
                      bordered
                      pagination={false}
                    />
                  </TabPane>
                )}

                {showTable && (
                  <TabPane tab="Total Nilai Seminar" key="4">
                    <Table
                      scroll={{ x: 'max-content' }}
                      columns={finalColumns2}
                      dataSource={modifiedDataArray4}
                      rowKey="id"
                      bordered
                    />
                  </TabPane>
                )}
              </Tabs>
              {/* )} */}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}
export default RekapitulasiNilaiSeminar
