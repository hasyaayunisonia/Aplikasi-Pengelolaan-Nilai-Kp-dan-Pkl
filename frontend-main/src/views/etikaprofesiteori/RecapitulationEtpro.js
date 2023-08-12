import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { Card, Table, notification, Spin, Button } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
import { CCard, CCol, CRow, CCardHeader, CCardBody } from '@coreui/react'
import { LoadingOutlined } from '@ant-design/icons'
import { saveAs } from 'file-saver'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const RecapitulationEtpro = () => {
  let history = useHistory()
  const [showTable, setShowTable] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataRecap, setDataRecap] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [columns, setColumns] = useState([
    {
      title: 'No',
      dataIndex: 'no',
      width: '1%',
      align: 'center',
      key: 'no',
    },
    {
      title: 'NIM',
      key: 'nim',
      dataIndex: 'nim',
      align: 'center',
    },
    {
      title: 'Nama',
      key: 'nama',
      align: 'center',
      dataIndex: 'nama',
    },
  ])

  axios.defaults.withCredentials = true

  async function getRecapitulation() {
    await axios
      .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/etpro/recapitulations`)
      .then((res) => {
        console.log('recap', res.data.data)
        setDataRecap(res.data.data)
        let tempDataSource = []
        for (let i = 0; i < res.data.data.length; i++) {
          const element = res.data.data[i]
          let object = {
            no: i + 1,
            nama: element.participantDto.name,
            nim: element.participantDto.nim,
            total: element.total,
          }
          for (let j = 0; j < element.values.length; j++) {
            const item = element.values[j]
            const namaItem = 'nilai_aspek' + j
            object[namaItem] = item.value
          }
          tempDataSource = [...tempDataSource, object]
        }
        setDataSource(tempDataSource)

        const dataAspect = res.data.data[0].values
        const tempColumns = [...columns]
        for (let i = 0; i < dataAspect.length; i++) {
          const element = dataAspect[i].aspect
          const obj = {
            title: element.aspek_name,
            dataIndex: 'nilai_aspek' + i,
            key: element.aspek_name,
            align: 'center',
          }
          tempColumns[2 + i + 1] = obj
        }
        const obj = {
          title: 'Total',
          dataIndex: 'total',
          key: 'total',
          align: 'center',
        }
        tempColumns[tempColumns.length] = obj
        console.log(tempColumns)
        setColumns(tempColumns)
        setShowTable(true)
        setShowButton(true)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log('err', err)
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
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getRecapitulation()
    notification.info({
      message: `Harap tunggu sedang memuat rekapitulasi nilai etika profesi`,
    })
  }, [history])

  const handleRekapitulasi = async () => {
    try {
      notification.info({
        message: `Harap tunggu sedang memproses rekapitulasi nilai etika profesi`,
        // description: 'Harap tunggu sedang memproses download nilai seminar',
      })
      const response = await axios.get(
        `${process.env.REACT_APP_API_GATEWAY_URL}grade/etpro/generate-seminar`,
        {
          responseType: 'blob',
        },
      )

      let filenameFromApi = 'Rekapitulasi Etika Profesi' // Nama default jika tidak ada nama dari respons API

      // Coba dapatkan nama file dari header content-disposition
      const contentDisposition = response.headers['content-disposition']
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      const matches = filenameRegex.exec(contentDisposition)
      if (matches && matches[1]) {
        filenameFromApi = matches[1].replace(/['"]/g, '')
      } else {
        // Jika header content-disposition tidak ada, coba gunakan properti 'filename' dari respons API (jika ada)
        const responseData = response.data
        if (responseData && responseData.filename) {
          filenameFromApi = responseData.filename
        }
      }

      const fileName = `${filenameFromApi}.xlsx` // tambahkan ekstensi file Excel

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })

      saveAs(blob, fileName)

      notification.success({
        message: 'Pengunduhan berhasil',
      })
    } catch (error) {
      console.error(error)
      notification.error({
        message: 'Pengunduhan gagal',
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
            <b>Rekapitulasi Etika Profesi</b>
          </h5>
        </CCardHeader>
        <CCardBody>
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
          <br></br>
          <CRow>
            {showTable && (
              <CCol>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  bordered
                  scroll={{ x: 'max-content' }}
                  pagination={true}
                />
              </CCol>
            )}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default RecapitulationEtpro
