import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { Col, Row, Form, Input, Button, DatePicker, Select, notification, Spin, Modal } from 'antd'
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

  useEffect(() => {
    if (!id) {
      history.push('/')
    } else {
      const getMataKuliah = async () => {
        axios.defaults.withCredentials = true
        await axios
          .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form`)
          .then((res) => {
            setIsLoading(false)
            // console.log(res.data.data)
            // console.log('ini dari db', res.data.data[1].id)
            // console.log(typeof res.data.data[1].id)
            // console.log('ini dari param', id)
            // console.log(typeof id)
            const idParam = parseInt(id)
            const filteredData = res.data.data.find((item) => item.id === idParam)
            // console.log(filteredData)
            setMatkul(filteredData)
            console.log(matkul)
          })
          .catch(function (error) {
            if (error.toJSON().status >= 300 && error.toJSON().status <= 399) {
              history.push('/dashboard')
            } else if (error.toJSON().status >= 400 && error.toJSON().status <= 499) {
              history.push('/404')
            } else if (error.toJSON().status >= 500 && error.toJSON().status <= 599) {
              history.push('/500')
            }
          })
      }

      getMataKuliah()
    }
  }, [])

  const updateMataKuliah = () => {
    history.push(`/matakuliah/listmatakuliah/ubahmatakuliah/${id}`)
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
      <CRow>
        <CCol style={{ textAlign: 'right', paddingBottom: '15px' }}>
          <Button
            id="update"
            shape="round"
            style={{ color: 'black', background: '#FCEE21' }}
            onClick={() => updateMataKuliah()}
          >
            <FontAwesomeIcon icon={faPencil} style={{ paddingRight: '5px' }} /> Ubah Data Mata
            Kuliah
          </Button>
        </CCol>
      </CRow>
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
