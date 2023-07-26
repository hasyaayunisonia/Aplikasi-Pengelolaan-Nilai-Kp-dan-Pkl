import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import {
  Col,
  Row,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  notification,
  Spin,
  Modal,
  Table,
} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const IdentitasMataKuliah = (props) => {
  let history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false)
  const [form1] = Form.useForm()
  const { id } = useParams()
  const [matkul, setMatkul] = useState([])
  const [matkulName, setMatkulName] = useState('')
  const [dataEasPraktek, setDataEasPraktek] = useState({})
  const [dataEasTeori, setDataEasTeori] = useState({})
  const [dataEtsTeori, setDataEtsTeori] = useState({})
  const [dataEtsPraktek, setDataEtsPraktek] = useState({})
  const [dataLainLainTeori, setDataLainLainTeori] = useState({})
  const [dataLainLainPraktek, setDataLainLainPraktek] = useState({})
  const [bobot, setBobot] = useState({})
  const [avg, setAvg] = useState({})
  const { namaProp } = props

  useEffect(() => {
    if (!id) {
      console.log('keluar')
      history.push('/')
    } else {
      const getMataKuliah = async () => {
        axios.defaults.withCredentials = true
        try {
          const detailMatkul = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form`,
          )
          const filteredData = detailMatkul.data.data.find((item) => item.id === parseInt(id))
          setMatkul(filteredData)
          console.log(matkul)

          //set bobot komponen
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/course-form/${id}`,
          )

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
          })

          console.log('ini bobot ', bobot)

          const average = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/form/${id}`,
          )
          setAvg({
            UasPraktek_avg: average.data.data[0].is_average,
            UasTeori_avg: average.data.data[1].is_average,
            UtsPraktek_avg: average.data.data[2].is_average,
            UtsTeori_avg: average.data.data[3].is_average,
            LainPraktek_avg: average.data.data[4].is_average,
            LainTeori_avg: average.data.data[5].is_average,
          })
          //ETS T
          const komponenEtsTeori = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/form/${id}`,
          )

          const filteredDataEtsTeori = komponenEtsTeori.data.data.find(
            (item) => item.name === 'ETS Teori',
          )

          setDataEtsTeori(filteredDataEtsTeori.criteria_data)

          //ETS P
          const komponenEtsPraktek = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/form/${id}`,
          )

          const filteredDataEtsPraktek = komponenEtsPraktek.data.data.find(
            (item) => item.name === 'ETS Praktek',
          )

          setDataEtsPraktek(filteredDataEtsPraktek.criteria_data)

          //EAS T
          const komponenEasTeori = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/form/${id}`,
          )

          const filteredDataEasTeori = komponenEasTeori.data.data.find(
            (item) => item.name === 'EAS Teori',
          )

          setDataEasTeori(filteredDataEasTeori.criteria_data)

          //EAS P
          const komponenEasPraktek = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/form/${id}`,
          )

          const filteredDataEasPraktek = komponenEasPraktek.data.data.find(
            (item) => item.name === 'EAS Praktek',
          )

          setDataEasPraktek(filteredDataEasPraktek.criteria_data)

          //Lain Lain T
          const komponenLainLainTeori = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/form/${id}`,
          )

          const filteredDataLainLainTeori = komponenLainLainTeori.data.data.find(
            (item) => item.name === 'Lain-lain Teori',
          )

          setDataLainLainTeori(filteredDataLainLainTeori.criteria_data)

          //Lain Lain P
          const komponenLainLainPraktek = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/form/${id}`,
          )

          const filteredDataLainLainPraktek = komponenLainLainPraktek.data.data.find(
            (item) => item.name === 'Lain-lain Praktek',
          )

          setDataLainLainPraktek(filteredDataLainLainPraktek.criteria_data)

          setIsLoading(false)
          console.log(id)
        } catch (error) {
          if (error.response) {
            const status = error.response.status
            if (status >= 300 && status <= 399) {
              history.push({
                pathname: '/login',
                state: {
                  session: true,
                },
              })
            } else if (status >= 400 && status <= 499) {
              history.push('/404')
            } else if (status >= 500 && status <= 599) {
              history.push('/500')
            }
          }
        }
      }

      getMataKuliah()
    }
  }, [id])

  useEffect(() => {
    console.log('ini data eas p ', dataEasPraktek)
  }, [dataEasPraktek])

  useEffect(() => {
    // console.log('ini data eas t ', dataEasTeori)
  }, [dataEasTeori])

  useEffect(() => {
    // console.log('ini data ets t ', dataEtsTeori)
  }, [dataEtsTeori])

  useEffect(() => {
    // console.log('ini data ets p ', dataEtsPraktek)
  }, [dataEtsPraktek])

  useEffect(() => {
    // console.log('ini data ets p ', dataLainLainTeori)
  }, [dataLainLainTeori])

  useEffect(() => {
    // console.log('ini data ets p ', dataLainLainPraktek)
  }, [dataLainLainPraktek])

  useEffect(() => {
    console.log('ini data bobot ', bobot)
  }, [bobot])

  useEffect(() => {
    console.log('ini data average ', avg)
  }, [avg])

  const columns = [
    {
      title: 'Komponen Kriteria Penilaian EAS Praktek',
      children: [
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
          title: 'Evaluasi Form Penilaian',
          dataIndex: 'name_form',
        },
        {
          title: 'Evaluasi Penilaian',
          dataIndex: 'type_form',
        },
        {
          title: 'Aspek Penilaian',
          dataIndex: 'aspect_name',
        },
      ],
    },
  ]

  const columns_avg = [
    {
      title: 'Komponen Kriteria Penilaian EAS Praktek',
      children: [
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
          title: 'Evaluasi Form Penilaian',
          dataIndex: 'name_form',
        },
        {
          title: 'Evaluasi Penilaian',
          dataIndex: 'type_form',
        },
        {
          title: 'Aspek Penilaian',
          dataIndex: 'aspect_name',
        },
        {
          title: 'Bobot',
          dataIndex: 'bobot_criteria',
        },
      ],
    },
  ]

  const columns2 = [
    {
      title: 'Komponen Kriteria Penilaian EAS Teori',
      children: [
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
          title: 'Evaluasi Form Penilaian',
          dataIndex: 'name_form',
        },
        {
          title: 'Evaluasi Penilaian',
          dataIndex: 'type_form',
        },
        {
          title: 'Aspek Penilaian',
          dataIndex: 'aspect_name',
        },
      ],
    },
  ]

  const columns2_avg = [
    {
      title: 'Komponen Kriteria Penilaian EAS Teori',
      children: [
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
          title: 'Evaluasi Form Penilaian',
          dataIndex: 'name_form',
        },
        {
          title: 'Evaluasi Penilaian',
          dataIndex: 'type_form',
        },
        {
          title: 'Aspek Penilaian',
          dataIndex: 'aspect_name',
        },
        {
          title: 'Bobot',
          dataIndex: 'bobot_criteria',
        },
      ],
    },
  ]

  const columns3 = [
    {
      title: 'Komponen Kriteria Penilaian ETS Teori',
      children: [
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
          title: 'Evaluasi Form Penilaian',
          dataIndex: 'name_form',
        },
        {
          title: 'Evaluasi Penilaian',
          dataIndex: 'type_form',
        },
        {
          title: 'Aspek Penilaian',
          dataIndex: 'aspect_name',
        },
      ],
    },
  ]

  const columns3_avg = [
    {
      title: 'Komponen Kriteria Penilaian ETS Teori',
      children: [
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
          title: 'Evaluasi Form Penilaian',
          dataIndex: 'name_form',
        },
        {
          title: 'Evaluasi Penilaian',
          dataIndex: 'type_form',
        },
        {
          title: 'Aspek Penilaian',
          dataIndex: 'aspect_name',
        },
        {
          title: 'Bobot',
          dataIndex: 'bobot_criteria',
        },
      ],
    },
  ]
  // if (dataEtsTeori.some((item) => item.is_selected === 0)) {
  //   // Kolom "Bobot" akan ditampilkan jika tidak ada item dengan is_selected = 1
  //   columns3[0].children.push({
  //     title: 'Bobot',
  //     dataIndex: 'bobot_criteria',
  //   })
  // }
  const columns4 = [
    {
      title: 'Komponen Kriteria Penilaian ETS Praktek',
      children: [
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
          title: 'Evaluasi Form Penilaian',
          dataIndex: 'name_form',
        },
        {
          title: 'Evaluasi Penilaian',
          dataIndex: 'type_form',
        },
        {
          title: 'Aspek Penilaian',
          dataIndex: 'aspect_name',
        },
      ],
    },
  ]
  const columns4_avg = [
    {
      title: 'Komponen Kriteria Penilaian ETS Praktek',
      children: [
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
          title: 'Evaluasi Form Penilaian',
          dataIndex: 'name_form',
        },
        {
          title: 'Evaluasi Penilaian',
          dataIndex: 'type_form',
        },
        {
          title: 'Aspek Penilaian',
          dataIndex: 'aspect_name',
        },
        {
          title: 'Bobot',
          dataIndex: 'bobot_criteria',
        },
      ],
    },
  ]

  const columns5 = [
    {
      title: 'Komponen Kriteria Penilaian Lain-Lain Teori',
      children: [
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
          title: 'Evaluasi Form Penilaian',
          dataIndex: 'name_form',
        },
        {
          title: 'Evaluasi Penilaian',
          dataIndex: 'type_form',
        },
        {
          title: 'Aspek Penilaian',
          dataIndex: 'aspect_name',
        },
      ],
    },
  ]

  const columns5_avg = [
    {
      title: 'Komponen Kriteria Penilaian Lain-Lain Teori',
      children: [
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
          title: 'Evaluasi Form Penilaian',
          dataIndex: 'name_form',
        },
        {
          title: 'Evaluasi Penilaian',
          dataIndex: 'type_form',
        },
        {
          title: 'Aspek Penilaian',
          dataIndex: 'aspect_name',
        },
        {
          title: 'Bobot',
          dataIndex: 'bobot_criteria',
        },
      ],
    },
  ]

  const columns6_avg = [
    {
      title: 'Komponen Kriteria Penilaian Lain-Lain Praktek',
      children: [
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
          title: 'Evaluasi Form Penilaian',
          dataIndex: 'name_form',
        },
        {
          title: 'Evaluasi Penilaian',
          dataIndex: 'type_form',
        },
        {
          title: 'Aspek Penilaian',
          dataIndex: 'aspect_name',
        },
      ],
    },
  ]

  const columns6 = [
    {
      title: 'Komponen Kriteria Penilaian Lain-Lain Praktek',
      children: [
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
          title: 'Evaluasi Form Penilaian',
          dataIndex: 'name_form',
        },
        {
          title: 'Evaluasi Penilaian',
          dataIndex: 'type_form',
        },
        {
          title: 'Aspek Penilaian',
          dataIndex: 'aspect_name',
        },
        {
          title: 'Bobot',
          dataIndex: 'bobot_criteria',
        },
      ],
    },
  ]

  const updateMataKuliah = (id) => {
    console.log('ini id ', id)
    history.push(`/mataKuliah/listMatakuliah/ubahMatakuliah/${id}`)
  }

  const listmatakuliah = () => {
    history.push(`/matakuliah/listmatakuliah`)
  }

  const showModalDelete = () => {
    setIsModalDeleteVisible(true)
  }

  const handleCancelDelete = () => {
    setIsModalDeleteVisible(false)
  }

  const handleOkDelete = () => {
    // console.log('ada')
    // console.log(matkulName)
    // console.log(typeof matkulName)
    // console.log(matkul.id)
    // console.log(typeof matkul.id)
    axios.get('${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form').then((response) => {
      const filteredData = response.data.data.filter(
        (item) => item.id === matkul.id && item.name === matkulName,
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
        // console.log(filteredData[0].id)
        axios
          .delete(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form/delete/${filteredData[0].id}`,
          )
          .then((response) => {
            // refreshData(index)
            notification.success({
              message: 'Mata kuliah berhasil dihapus',
            })
            setIsModalDeleteVisible(false)
          })
        listmatakuliah().catch((error) => {
          setIsModalDeleteVisible(false)
          notification.error({
            message: 'Mata kuliah gagal dihapus!',
          })
        })
      }
    })
  }

  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <>
      {localStorage.getItem('id_role') === '3' && (
        <>
          <CRow>
            <CCol style={{ textAlign: 'right', paddingBottom: '15px' }}>
              <Button
                id="update"
                shape="round"
                style={{ color: 'black', background: '#FCEE21' }}
                onClick={() => updateMataKuliah(id)}
              >
                <FontAwesomeIcon icon={faPencil} style={{ paddingRight: '5px' }} /> Ubah Data Mata
                Kuliah
              </Button>
            </CCol>
          </CRow>
        </>
      )}

      <CCard className="mb-4">
        <CCardHeader style={{ paddingLeft: '20px' }}>
          <h5>
            <b style={{ color: '#374253' }}>Detail Mata Kuliah</b>
          </h5>
        </CCardHeader>
        <CCardBody style={{ paddingLeft: '20px' }}>
          <CRow>
            <CCol sm={6}>
              <CRow>
                <CCol sm={12} style={{ paddingTop: '10px' }}>
                  <b>Kode Mata Kuliah</b>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={12}>
                  <h6>{matkul.kode}</h6>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={12} style={{ paddingTop: '10px' }}>
                  <b>Nama Mata Kuliah</b>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={12}>
                  <h6>{matkul.name}</h6>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={12} style={{ paddingTop: '10px' }}>
                  <b>Jurusan</b>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={12}>
                  <h6>
                    {matkul.prodi_id === 0 ? 'D3 Teknik Informatika' : 'D4 Teknik Informatika'}
                  </h6>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={12} style={{ paddingTop: '10px' }}>
                  <b>Tahun Ajaran</b>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={12}>
                  <h6>
                    <span>
                      {matkul.tahun_ajaran_start} - {matkul.tahun_ajaran_end}
                    </span>
                  </h6>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={12} style={{ paddingTop: '10px' }}>
                  <b>SKS</b>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={12}>
                  <h6>{matkul.sks}</h6>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          {localStorage.getItem('id_role') === '3' && (
            <>
              <CRow>
                <CCol style={{ textAlign: 'right', paddingBottom: '15px' }}>
                  <Button
                    id="hapus"
                    shape="round"
                    style={{ color: 'white', background: '#FF0000' }}
                    onClick={() => {
                      showModalDelete()
                    }}
                  >
                    Hapus
                  </Button>
                </CCol>
              </CRow>
            </>
          )}
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody style={{ paddingLeft: '20px' }}>
          <h8>
            <b>Tabel Komponen Kriteria Penilaian ETS Teori</b>
          </h8>
          <br></br>
          <h10>Bobot Komponen ETS Teori : {bobot.UtsTeori ? bobot.UtsTeori : '0'}%</h10>
          <br></br>
          {avg.UtsTeori_avg === 0 ? (
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns3}
              dataSource={dataEtsTeori}
              rowKey="id"
              bordered
              pagination={false}
            />
          ) : (
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns3_avg}
              dataSource={dataEtsTeori}
              rowKey="id"
              bordered
              pagination={false}
            />
          )}
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody style={{ paddingLeft: '20px' }}>
          <h8>
            <b>Tabel Komponen Kriteria Penilaian ETS Praktek</b>
          </h8>
          <br></br>
          <h10>Bobot Komponen ETS Praktek : {bobot.UtsPraktek ? bobot.UtsPraktek : '0'}%</h10>
          <br></br>
          {avg.UtsPraktek_avg === 0 ? (
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns4}
              dataSource={dataEtsPraktek}
              rowKey="id"
              bordered
              pagination={false}
            />
          ) : (
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns4_avg}
              dataSource={dataEtsPraktek}
              rowKey="id"
              bordered
              pagination={false}
            />
          )}
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody style={{ paddingLeft: '20px' }}>
          <h8>
            <b>Tabel Komponen Kriteria Penilaian EAS Teori</b>
          </h8>
          <br></br>
          <h10>Bobot Komponen EAS Teori : {bobot.UasTeori ? bobot.UasTeori : '0'}%</h10>
          <br></br>
          {avg.UasTeori_avg === 0 ? (
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns2}
              dataSource={dataEasTeori}
              rowKey="id"
              bordered
              pagination={false}
            />
          ) : (
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns2_avg}
              dataSource={dataEasTeori}
              rowKey="id"
              bordered
              pagination={false}
            />
          )}
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody style={{ paddingLeft: '20px' }}>
          <h8>
            <b>Tabel Komponen Kriteria Penilaian EAS Praktek</b>
          </h8>
          <br></br>
          <h10>Bobot Komponen EAS Praktek : {bobot.UasPraktek ? bobot.UasPraktek : '0'}%</h10>
          <br></br>
          {avg.UasPraktek_avg === 0 ? (
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns}
              dataSource={dataEasPraktek}
              rowKey="id"
              bordered
              pagination={false}
            />
          ) : (
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns_avg}
              dataSource={dataEasPraktek}
              rowKey="id"
              bordered
              pagination={false}
            />
          )}
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody style={{ paddingLeft: '20px' }}>
          <h8>
            <b>Tabel Komponen Kriteria Penilaian Lain-Lain Teori</b>
          </h8>
          <br></br>
          <h10>Bobot Komponen Lain-Lain Teori : {bobot.LainTeori ? bobot.LainTeori : '0'}%</h10>
          <br></br>
          {avg.LainTeori_avg === 0 ? (
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns5}
              dataSource={dataLainLainTeori}
              rowKey="id"
              bordered
              pagination={false}
            />
          ) : (
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns5_avg}
              dataSource={dataLainLainTeori}
              rowKey="id"
              bordered
              pagination={false}
            />
          )}
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody style={{ paddingLeft: '20px' }}>
          <h8>
            <b>Tabel Komponen Kriteria Penilaian Lain-Lain Praktek</b>
          </h8>
          <br></br>
          <h10>
            Bobot Komponen Lain-Lain Praktek : {bobot.LainPraktek ? bobot.LainPraktek : '0'}%
          </h10>
          <br></br>
          {avg.LainPraktek_avg === 0 ? (
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns6_avg}
              dataSource={dataLainLainPraktek}
              rowKey="id"
              bordered
              pagination={false}
            />
          ) : (
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns6}
              dataSource={dataLainLainPraktek}
              rowKey="id"
              bordered
              pagination={false}
            />
          )}
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
          onFinish={() => handleOkDelete()}
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
            <Input onChange={(e) => setMatkulName(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

IdentitasMataKuliah.propTypes = {
  namaProp: PropTypes.string.isRequired,
  // Other prop validations
}
export default IdentitasMataKuliah
