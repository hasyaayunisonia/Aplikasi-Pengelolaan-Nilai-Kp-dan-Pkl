import React, { useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { CCard, CCardBody, CCol, CRow, CCardHeader } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  Col,
  Row,
  Table,
  Modal,
  Input,
  Form,
  notification,
  Spin,
  Checkbox,
  message,
} from 'antd'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const KelolaKriteriaSeminar = () => {
  const [loadings, setLoadings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalcreateVisible, setIsModalCreateVisible] = useState(false)
  const [isModalEditVisible, setIsModalEditVisible] = useState(false)
  const [listKriteria, setKriteria] = useState([])
  const [criteriaName, setCriteriaName] = useState('')
  const [choose, setChoose] = useState([])
  const [form] = Form.useForm()
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()
  const history = useHistory()
  const totalRef = useRef(0)

  useEffect(() => {
    async function getlistKriteria() {
      axios.defaults.withCredentials = true
      await axios
        .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/criteria`)
        .then((res) => {
          setKriteria(res.data.data)
          setIsLoading(false)
        })

        //   console.log(listKriteria)
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

    getlistKriteria()
  }, [history])

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
  }

  const refreshData = (index) => {
    axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/criteria`).then((result) => {
      setKriteria(
        result.data.data,
        // .map((row) => ({
        //   name: row.criteria_name,
        //   id: row.id,
        // })),
      )
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        return newLoadings
      })
    })
  }

  const showModalCreate = () => {
    setIsModalCreateVisible(true)
  }

  const handleCancelCreate = () => {
    setIsModalCreateVisible(false)
  }

  const handleOkCreate = async (index) => {
    enterLoading(index)
    await axios
      .post(`${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/criteria`, {
        criteria_name: criteriaName,
      })
      .then((response) => {
        refreshData(index)
        notification.success({
          message: 'Kriteria seminar telah ditambahkan',
        })
        setCriteriaName('')
        setIsModalCreateVisible(false)
        form1.resetFields()
      })
      .catch((error) => {
        setIsModalCreateVisible(false)
        setCriteriaName('')
        form1.resetFields()
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings]
          newLoadings[index] = false
          return newLoadings
        })
        notification.error({
          message: 'Kriteria tidak dapat ditambahkan!',
        })
      })
  }

  const showModalEdit = (record) => {
    // console.log(record)
    setIsModalEditVisible(true)
    setChoose(record)

    // dataEdit = record
    // console.log(dataEdit)
  }

  const handleCancelEdit = () => {
    setIsModalEditVisible(false)
  }

  const handleOkEdit = async (index) => {
    enterLoading(index)
    await axios
      .put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/criteria/update/${choose.id}`, {
        criteria_name: choose.criteria_name,
      })
      .then((response) => {
        refreshData(index)
        notification.success({
          message: 'Kriteria seminar berhasil diubah',
        })
        setIsModalEditVisible(false)
      })
      .catch((error) => {
        setIsModalEditVisible(false)
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings]
          newLoadings[index] = false
          return newLoadings
        })
        notification.error({
          message: 'Kriteria seminar gagal tersimpan!',
        })
      })
  }

  const showModalDelete = (record, index) => {
    Modal.confirm({
      title: 'Konfirmasi hapus kriteria seminar',
      zIndex: 9999999,
      okText: 'Ya',
      cancelText: 'Batal',
      okButtonProps: {
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
        className: 'custom-button',
      },
      onOk: () => {
        handleOkDelete(record, index)
      },
    })
  }

  const handleOkDelete = async (record, index) => {
    enterLoading(index)
    await axios
      .delete(`${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/criteria/delete/${record.id}`)
      .then((response) => {
        refreshData(index)
        notification.success({
          message: 'Kriteria seminar berhasil dihapus',
        })
      })
      .catch((error) => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings]
          newLoadings[index] = false
          return newLoadings
        })
        notification.error({
          message: 'Kriteria seminar gagal dihapus!',
        })
      })
  }

  const handleCheckboxChange = async (e, record) => {
    const isChecked = e.target.checked
    // Lakukan pembaruan pada data di sini jika diperlukan
    // Misalnya menggunakan Axios atau fetch untuk mengirim perubahan ke database
    console.log(isChecked, record)

    const updatedRecord = {
      ...record,
      is_selected: isChecked ? 1 : 0,
      criteria_bobot: isChecked ? record.criteria_bobot : 0,
    }

    try {
      // Kirim permintaan PUT menggunakan Axios
      // console.log(updatedRecord)
      // await axios.put(`/api/seminar/criteria/update/${record.id}`, updatedRecord)

      // Perbarui data di state setelah berhasil mengirim perubahan ke server
      setKriteria((prevData) => {
        return prevData.map((item) => {
          if (item.id === record.id) {
            return updatedRecord
          }
          return item
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = async (e, record) => {
    const { value } = e.target
    const updatedData = listKriteria.map((item) => {
      if (item.id === record.id) {
        return { ...item, criteria_bobot: value }
      }
      return item
    })
    setKriteria(updatedData)
  }

  const handleButtonClick = async () => {
    const newData = listKriteria.map((item) => {
      return {
        id: item.id,
        criteria_bobot: item.criteria_bobot,
        is_selected: item.is_selected,
      }
    })
    console.log(newData)
    try {
      await newData.map((item) => {
        axios.put(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/seminar/criteria/update/${item.id}`,
          {
            criteria_bobot: item.criteria_bobot,
            is_selected: item.is_selected,
          },
        )
      })
      notification.success({
        message: 'Bobot kriteria berhasil tersimpan',
      })
    } catch (error) {
      console.error(error)
      notification.error({
        message: 'Bobot kriteria gagal tersimpan!',
      })
    }
  }

  const calculateTotal = () => {
    let sum = 0
    listKriteria.forEach((item) => {
      const bobot = parseFloat(item.criteria_bobot) || 0
      sum += bobot
    })
    totalRef.current = sum
    console.log(totalRef.current)
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      width: '1%',
      align: 'center',
      render: (value, item, index) => {
        return index + 1
      },
    },
    {
      title: 'List Kriteria Seminar',
      width: '20%',
      dataIndex: 'criteria_name',
    },
    {
      title: 'Pilih Kriteria',
      align: 'center',
      dataIndex: 'is_selected',
      key: 'is_selected',
      width: '1%',
      render: (text, record) => (
        <>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Checkbox
                defaultChecked={text === 1}
                onChange={(e) => handleCheckboxChange(e, record)}
              />
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Tentukan Bobot',
      align: 'center',
      width: '1%',
      render: (text, record) => (
        <>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Input
                id={text.id}
                type="number"
                min="0"
                max="100"
                addonAfter="%"
                disabled={text.is_selected === 0}
                value={text.criteria_bobot}
                onChange={(e) => handleInputChange(e, record)}
              />
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Aksi',
      width: '3%',
      align: 'center',
      render: (text, record) => (
        <>
          <Row>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Button
                id="button-pencil"
                htmlType="submit"
                shape="circle"
                style={{ backgroundColor: '#FBB03B', borderColor: '#FBB03B' }}
                onClick={() => {
                  showModalEdit(record)
                }}
              >
                <FontAwesomeIcon icon={faPencil} style={{ color: 'black' }} />
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Button
                id="button-trash"
                htmlType="submit"
                shape="circle"
                style={{ backgroundColor: '#e9033d', borderColor: '#e9033d' }}
                onClick={() => {
                  showModalDelete(record, `delete- {record.id}`)
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} style={{ color: 'black' }} />
              </Button>
            </Col>
          </Row>
        </>
      ),
    },
  ]

  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <>
      <CCard className="mb-4">
        <CCardHeader style={{ paddingLeft: '20px' }}>
          <h5>
            <b>Tentukan Kriteria-Kriteria Seminar</b>
          </h5>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol style={{ textAlign: 'right', paddingBottom: '15px' }}>
              <Button
                type="primary"
                htmlType="submit"
                className="px-4"
                id="createKriteria"
                style={{ backgroundColor: '#339900', borderColor: '#339900' }}
                onClick={showModalCreate}
              >
                Tambah Kriteria
              </Button>
            </CCol>
          </CRow>
          <Form form={form} name="basic" wrapperCol={{ span: 24 }} autoComplete="off">
            <Table
              scroll={{ x: 'max-content' }}
              columns={columns}
              dataSource={listKriteria}
              rowKey="id"
              bordered
              pagination={false}
            />
          </Form>
          <CRow>
            {calculateTotal()}
            <CCol sm={12} style={{ textAlign: 'left' }}>
              Jumlah bobot saat ini : {totalRef.current}{' '}
              {totalRef.current > 100 && (
                <span style={{ color: 'red', fontSize: '100%' }}>
                  <sup>* Jumlah bobot melebihi batas maksimum 100</sup>
                </span>
              )}
              {totalRef.current < 100 && (
                <span style={{ color: 'red', fontSize: '100%' }}>
                  <sup>* Jumlah bobot kurang dari 100</sup>
                </span>
              )}
            </CCol>
            <CCol sm={12} style={{ textAlign: 'right' }}>
              {totalRef.current > 100 && (
                <Button
                  id="button-submit"
                  size="sm"
                  shape="square"
                  // className="disabled-button"
                  disabled
                  style={{ color: 'white', background: '#FF0000', marginBottom: 16 }}
                  // onClick={() => handleButtonClick()}
                >
                  Simpan
                </Button>
              )}
              {totalRef.current < 100 && (
                <Button
                  id="button-submit"
                  size="sm"
                  shape="square"
                  // className="disabled-button"
                  disabled
                  style={{ color: 'white', background: '#FF0000', marginBottom: 16 }}
                  // onClick={() => handleButtonClick()}
                >
                  Simpan
                </Button>
              )}
              {totalRef.current == 100 && (
                <Button
                  id="button-submit"
                  size="sm"
                  shape="square"
                  style={{ color: 'white', background: '#3399FF', marginBottom: 16 }}
                  onClick={() => handleButtonClick()}
                >
                  Simpan
                </Button>
              )}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <Modal
        title="Tambah Kriteria"
        visible={isModalcreateVisible}
        onOk={form1.submit}
        onCancel={handleCancelCreate}
        width={600}
        zIndex={9999999}
        footer={[
          <Button key="back" onClick={handleCancelCreate}>
            Batal
          </Button>,
          <Button loading={loadings[1]} key="submit" type="primary" onClick={form1.submit}>
            Simpan
          </Button>,
        ]}
      >
        <Form
          form={form1}
          name="basic"
          wrapperCol={{ span: 24 }}
          onFinish={() => handleOkCreate(1)}
          autoComplete="off"
        >
          <b>
            Masukkan Kriteria Seminar<span style={{ color: 'red' }}> *</span>
          </b>
          <Form.Item
            name="namaKriteria"
            rules={[{ required: true, message: 'Kriteria tidak boleh kosong!' }]}
          >
            <Input onChange={(e) => setCriteriaName(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Ubah Kriteria"
        // visible={getEditModal(item.name)}
        visible={isModalEditVisible}
        onOk={form2.submit}
        // onCancel={() => handleCancelEdit(item.name)}
        onCancel={handleCancelEdit}
        width={600}
        zIndex={9999999}
        footer={[
          <Button key="back" onClick={handleCancelEdit}>
            Batal
          </Button>,
          <Button loading={loadings[0]} key="submit" type="primary" onClick={form2.submit}>
            Simpan
          </Button>,
        ]}
      >
        <Form
          form={form2}
          name="basic"
          wrapperCol={{ span: 24 }}
          onFinish={() => handleOkEdit(0)}
          autoComplete="off"
          fields={[
            {
              name: ['namaKriteriaEdit'],
              value: choose.criteria_name,
            },
          ]}
        >
          <b>
            Masukkan Perubahan Kriteria
            {/* <span style={{ color: "red" }}> *</span> */}
          </b>
          <Form.Item
            name="namaKriteriaEdit"
            rules={[{ required: true, message: `Nama Kriteria Seminar tidak boleh kosong!` }]}
          >
            <Input
              onChange={(e) => {
                setChoose((prev) => {
                  return { ...prev, criteria_name: e.target.value }
                })
              }}
              value={choose.criteria_name}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default KelolaKriteriaSeminar
