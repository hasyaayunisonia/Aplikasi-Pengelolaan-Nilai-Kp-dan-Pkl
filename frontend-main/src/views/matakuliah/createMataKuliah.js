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
  message,
} from 'antd'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const CreateMataKuliah = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [form] = Form.useForm()
  const [tahunAjaranStart, setTahunAjaranStart] = useState('')
  const [tahunAjaranEnd, setTahunAjaranEnd] = useState('')
  let history = useHistory()

  const currentYear = moment().year() // Get the current year
  const nextYear = currentYear + 1
  const [selectedYear, setSelectedYear] = useState(null)

  axios.defaults.withCredentials = true

  useEffect(() => {
    console.log('masuk')
    setTimeout(function () {
      setIsLoading(false)
    }, 100)
  }, [])

  // useEffect(() => {
  //   console.log('ini awal efek', tahunAjaranStart)
  // }, [tahunAjaranStart])

  // useEffect(() => {
  //   console.log('ini akhir efek', tahunAjaranEnd)
  // }, [tahunAjaranEnd])

  const prodiJurusan = [
    { id: 0, nama: 'D3 Teknik Informatika' },
    { id: 1, nama: 'D4 Teknik Informatika' },
  ]

  const [data, setData] = useState({
    prodi_id: '',
    kode: '',
    name: '',
    // tahun_ajaran_start: null,
    // tahun_ajaran_end: null,
    sks: '',
  })

  const listmatakuliah = () => {
    history.push('/matakuliah/listmatakuliah')
  }

  function onChangeProdi(value) {
    setData((pre) => {
      return { ...pre, prodi_id: value }
    })
  }

  function onChangeDateStart(date, dateString) {
    date && setTahunAjaranStart(moment(date).year())
  }

  function onChangeDateEnd(date, dateString) {
    date && setTahunAjaranEnd(moment(date).year())
  }

  const handleButtonClick = async () => {
    try {
      console.log(data)
      console.log('ini awal', currentYear, typeof currentYear)
      console.log('ini akhir', nextYear)
      await axios
        .post(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form`, {
          prodi_id: data.prodi_id,
          kode: data.kode,
          name: data.name,
          // tahun_ajaran_start: parseInt(data.tahun_ajaran_start),
          // tahun_ajaran_end: parseInt(data.tahun_ajaran_end),
          tahun_ajaran_start: currentYear,
          tahun_ajaran_end: nextYear,
          sks: parseInt(data.sks),
        })
        .then((response) => {
          listmatakuliah()
          notification.success({
            message: 'Mata kuliah baru telah ditambahkan',
          })
        })
    } catch (error) {
      console.error(error)
      notification.error({
        message: 'Mata kuliah tidak dapat ditambahkan!',
      })
    }
  }

  const onFinish = async () => {
    try {
      console.log(data)
      console.log('ini awal', currentYear, typeof currentYear)
      console.log('ini akhir', nextYear)
      await axios
        .post(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form`, {
          prodi_id: data.prodi_id,
          kode: data.kode,
          name: data.name,
          // tahun_ajaran_start: parseInt(data.tahun_ajaran_start),
          // tahun_ajaran_end: parseInt(data.tahun_ajaran_end),
          tahun_ajaran_start: currentYear,
          tahun_ajaran_end: nextYear,
          sks: parseInt(data.sks),
        })
        .then((response) => {
          listmatakuliah()
          notification.success({
            message: 'Mata kuliah baru telah ditambahkan',
          })
        })
    } catch (error) {
      console.error(error)
      notification.error({
        message: 'Mata kuliah tidak dapat ditambahkan!',
      })
    }
  }

  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <>
      <CCard>
        <CCardHeader style={{ paddingLeft: '20px' }}>
          <h5>
            <b>Tambah Mata Kuliah</b>
          </h5>
        </CCardHeader>
        <CCardBody style={{ paddingLeft: '20px' }}>
          <CRow>
            <CCol sm={12}>
              <Form
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                fields={[
                  {
                    name: 'kodemk',
                    value: data.kode,
                  },
                  {
                    name: 'namaMataKuliah',
                    value: data.name,
                  },
                  {
                    name: 'Jurusan',
                    value: data.prodi_id,
                  },
                  {
                    name: 'SKS',
                    value: data.sks,
                  },
                ]}
              >
                <b>Kode Mata Kuliah</b>
                <Form.Item
                  name="kodemk"
                  rules={[{ required: true, message: 'Kode MK tidak boleh kosong!' }]}
                >
                  <Input
                    style={{ width: '15%' }}
                    onChange={(e) => {
                      setData((pre) => {
                        return { ...pre, kode: e.target.value }
                      })
                    }}
                  />
                </Form.Item>
                <b>Nama Mata Kuliah</b>
                <Form.Item
                  name="namaMataKuliah"
                  rules={[{ required: true, message: 'Nama mata kuliah tidak boleh kosong!' }]}
                >
                  <Input
                    style={{ width: '60%' }}
                    onChange={(e) => {
                      setData((pre) => {
                        return { ...pre, name: e.target.value }
                      })
                    }}
                  />
                </Form.Item>
                <b>Jurusan</b>
                <Form.Item
                  name="Jurusan"
                  rules={[{ required: true, message: 'Jurusan tidak boleh kosong!' }]}
                >
                  <Select
                    style={{ width: '30%' }}
                    placeholder="Pilih jurusan"
                    onChange={onChangeProdi}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {prodiJurusan.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.nama}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <b>SKS</b>
                <Form.Item
                  name="SKS"
                  rules={[{ required: true, message: 'SKS tidak boleh kosong!' }]}
                >
                  <Input
                    style={{ width: '10%' }}
                    type="number"
                    min="0"
                    onChange={(e) => {
                      setData((pre) => {
                        return { ...pre, sks: e.target.value }
                      })
                    }}
                  />
                </Form.Item>

                <b>Tahun Ajaran</b>
                <Row>
                  <Col span={5}>
                    <Form.Item name="tahunajaranStart">
                      <DatePicker
                        picker="year"
                        // style={{ width: '31%', minWidth: '30%' }}
                        style={{ width: '100%' }}
                        placeholder={currentYear}
                        disabled
                        defaultValue={moment(currentYear, 'YYYY')}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item name="tahunajaranEnd">
                      <DatePicker
                        picker="year"
                        // style={{ width: '31%', minWidth: '30%' }}
                        style={{ width: '100%' }}
                        placeholder={nextYear}
                        disabled
                        defaultValue={moment(nextYear, 'YYYY')}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* <Form.Item
                  name="tahunajaran"
                  rules={[{ required: true, message: 'Tahun ajaran tidak boleh kosong!' }]}
                >
                  <DatePicker
                    picker="year"
                    style={{ width: '31%', minWidth: '30%' }}
                    placeholder="Pilih tahun mulai"
                    // onChange={onChangeDateStart}
                    onChange={setTahunAjaranStart}
                  />
                  <DatePicker
                    picker="year"
                    style={{ width: '31%', minWidth: '30%' }}
                    placeholder="Pilih tahun selesai"
                    // onChange={onChangeDateEnd}
                    onChange={setTahunAjaranEnd}
                  />
                </Form.Item> */}
              </Form>
            </CCol>
            <CCol sm={12} style={{ textAlign: 'right' }}>
              {' '}
              <Button
                id="button-submit"
                size="sm"
                shape="square"
                style={{
                  color: 'white',
                  background: '#3399FF',
                  marginBottom: 16,
                }}
                // onClick={() => handleButtonClick()}
                onClick={form.submit}
              >
                Simpan
              </Button>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}
export default CreateMataKuliah
