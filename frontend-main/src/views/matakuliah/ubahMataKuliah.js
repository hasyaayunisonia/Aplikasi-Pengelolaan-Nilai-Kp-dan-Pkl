import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { Col, Row, Form, Input, Button, DatePicker, Select, notification, Spin, Modal } from 'antd'
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import moment from 'moment'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const UbahMataKuliah = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [form] = Form.useForm()
  const { id } = useParams()
  const [matkuls, setMatkuls] = useState({})
  let history = useHistory()
  const isDisabled = true
  const [tahunAjaranStart, setTahunAjaranStart] = useState('')
  const [tahunAjaranEnd, setTahunAjaranEnd] = useState('')
  axios.defaults.withCredentials = true

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
            console.log(res.data.data)
            const idParam = parseInt(id)
            const filteredData = res.data.data.find((item) => item.id === idParam)
            // console.log(filteredData)
            setMatkuls(filteredData)
            // console.log(matkuls)
            setData(matkuls)
            // console.log(data)
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

      getMataKuliah()
    }
  }, [])

  useEffect(() => {
    if (matkuls) {
      console.log(matkuls)
      setData(matkuls)
      console.log(data)
    }
  }, [matkuls])

  // useEffect(() => {
  //   console.log(data)
  // }, [data])
  const detailMataKuliah = (id) => {
    history.push(`/matakuliah/listmatakuliah/detailmatakuliah/${id}`)
  }

  // const prodiJurusan = [
  //   { id: 0, nama: 'D3 Teknik Informatika' },
  //   { id: 1, nama: 'D4 Teknik Informatika' },
  // ]

  // function onChangeProdi(value) {
  //   setData((pre) => {
  //     return { ...pre, prodi_id: value }
  //   })
  // }

  const [data, setData] = useState({
    prodi_id: '',
    kode: '',
    name: '',
    // tahun_ajaran_start: '',
    // tahun_ajaran_end: '',
    sks: '',
  })

  function onChangeDateStart(date, dateString) {
    date &&
      setData((pre) => {
        // return {
        //   ...pre,
        //   tahun_ajaran_start: date ? parseInt(moment(date._d).format('YYYY')) : null,
        // }
        return { ...pre, tahun_ajaran_start: moment(date._d).format('yyyy') }
      })
  }

  function onChangeDateEnd(date, dateString) {
    date &&
      setData((pre) => {
        // return { ...pre, tahun_ajaran_end: date ? parseInt(moment(date._d).format('YYYY')) : null }
        return { ...pre, tahun_ajaran_end: moment(date._d).format('yyyy') }
      })
  }

  const currentYear = moment().year() // Get the current year
  const nextYear = currentYear + 1

  const onFinish = async () => {
    try {
      console.log(data)
      // console.log(typeof data.tahun_ajaran_start, data.tahun_ajaran_start
      console.log('ini id', id)
      let prodi
      if (localStorage.getItem('id_prodi') === '0') {
        prodi = 0
      } else {
        prodi = 1
      }

      console.log(prodi)
      await axios
        .post(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form`, {
          prodi_id: prodi,
          kode: data.kode,
          name: data.name,
          tahun_ajaran_start: currentYear,
          tahun_ajaran_end: nextYear,
          sks: parseInt(data.sks),
        })
        .then((response) => {
          detailMataKuliah(id)
          notification.success({
            message: 'Data mata kuliah telah diubah',
          })
        })
    } catch (error) {
      console.error(error)
      // console.log(error)
      notification.error({
        message: 'Data mata kuliah gagal diubah!',
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
            <b>Ubah Mata Kuliah</b>
          </h5>
          {/* <div>
            <p>Matkul:</p>
            <p>{JSON.stringify(matkuls)}</p>
            <p>Data:</p>
            <p>{JSON.stringify(data)}</p>
          </div> */}
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
                    name: ['namaMataKuliah'],
                    value: data.name,
                  },
                  // {
                  //   name: ['jurusan'],
                  //   value: data.prodi_id,
                  // },
                  {
                    name: ['sks'],
                    value: data.sks,
                  },
                  // {
                  //   name: ['tahunajaranStart'],
                  //   value: parseInt(data.tahun_ajaran_start),
                  // },
                  // {
                  //   name: ['tahunAjaranEnd'],
                  //   value: parseInt(data.tahun_ajaran_end),
                  // },
                  {
                    name: ['kodemk'],
                    value: data.kode,
                  },
                ]}
              >
                <b>Kode Mata Kuliah</b>
                <Form.Item
                  name="kodemk"
                  // rules={[{ required: true, message: 'Nama mata kuliah tidak boleh kosong!' }]}
                >
                  <Input
                    style={{ minwidth: '15%', maxWidth: '30%' }}
                    onChange={(e) => {
                      setData((pre) => {
                        return { ...pre, kode: e.target.value }
                      })
                    }}
                    value={data.kode}
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
                    value={data.name}
                  />
                </Form.Item>
                {/* 
                <b>Prodi</b>
                <Form.Item name="jurusan">
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
                </Form.Item> */}

                <b>Tahun Ajaran</b>
                <Row>
                  <Col span={5}>
                    <Form.Item
                      name="tahunajaranStart"
                      rules={[
                        { required: true, message: 'Tahun ajaran mulai tidak boleh kosong!' },
                      ]}
                    >
                      <DatePicker
                        picker="year"
                        // style={{ width: '31%', minWidth: '30%' }}
                        style={{ width: '100%' }}
                        placeholder={data.tahun_ajaran_start}
                        // onChange={onChangeDateStart}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      name="tahunajaranEnd"
                      rules={[
                        { required: true, message: 'Tahun ajaran selesai tidak boleh kosong!' },
                      ]}
                    >
                      <DatePicker
                        picker="year"
                        // style={{ width: '31%', minWidth: '30%' }}
                        style={{ width: '100%' }}
                        disabled
                        placeholder={data.tahun_ajaran_end}
                        // onChange={onChangeDateEnd}
                        // defaultValue={moment().year(data.tahun_ajaran_end)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                {/* <h5>Tahun Ajaran</h5> */}

                <b>SKS</b>
                <Form.Item
                  name="sks"
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
                    value={data.sks}
                  />
                </Form.Item>
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
export default UbahMataKuliah
