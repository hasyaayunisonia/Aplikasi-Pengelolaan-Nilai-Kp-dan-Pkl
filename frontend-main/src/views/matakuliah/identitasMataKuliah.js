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

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const IdentitasMataKuliah = () => {
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
  }, [])

  useEffect(() => {
    // console.log('ini data eas p ', dataEasPraktek)
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
        {
          title: 'Bobot',
          dataIndex: 'bobot_criteria',
          render: (value, item) => {
            if (item.is_average === 1) {
              return null // Mengembalikan null jika is_average adalah 1, sehingga kolom tidak ditampilkan
            }
            return value // Menampilkan nilai bobot_criteria jika is_average bukan 1
          },
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
        {
          title: 'Bobot',
          dataIndex: 'bobot_criteria',
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
          <Table
            scroll={{ x: 'max-content' }}
            columns={columns3}
            dataSource={dataEtsTeori}
            rowKey="id"
            bordered
          />
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody style={{ paddingLeft: '20px' }}>
          <h8>
            <b>Tabel Komponen Kriteria Penilaian ETS Praktek</b>
          </h8>
          <Table
            scroll={{ x: 'max-content' }}
            columns={columns4}
            dataSource={dataEtsPraktek}
            rowKey="id"
            bordered
          />
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody style={{ paddingLeft: '20px' }}>
          <h8>
            <b>Tabel Komponen Kriteria Penilaian EAS Teori</b>
          </h8>
          <Table
            scroll={{ x: 'max-content' }}
            columns={columns2}
            dataSource={dataEasTeori}
            rowKey="id"
            bordered
          />
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody style={{ paddingLeft: '20px' }}>
          <h8>
            <b>Tabel Komponen Kriteria Penilaian EAS Praktek</b>
          </h8>
          <Table
            scroll={{ x: 'max-content' }}
            columns={columns}
            dataSource={dataEasPraktek}
            rowKey="id"
            bordered
          />
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody style={{ paddingLeft: '20px' }}>
          <h8>
            <b>Tabel Komponen Kriteria Penilaian Lain-Lain Teori</b>
          </h8>
          <Table
            scroll={{ x: 'max-content' }}
            columns={columns5}
            dataSource={dataLainLainTeori}
            rowKey="id"
            bordered
          />
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody style={{ paddingLeft: '20px' }}>
          <h8>
            <b>Tabel Komponen Kriteria Penilaian Lain-Lain Praktek</b>
          </h8>
          <Table
            scroll={{ x: 'max-content' }}
            columns={columns6}
            dataSource={dataLainLainPraktek}
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
export default IdentitasMataKuliah
