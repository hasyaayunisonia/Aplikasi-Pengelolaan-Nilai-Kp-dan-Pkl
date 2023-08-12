import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  Col,
  Row,
  Table,
  Spin,
  Card,
  InputNumber,
  Divider,
  notification,
  Input,
  Modal,
  Form,
} from 'antd'
import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import axios from 'axios'
import useModal from 'antd/lib/modal/useModal'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />

const KelolaAspek = () => {
  const [isLoading, setIsLoading] = useState(true)
  let history = useHistory()
  const [dataAspect, setDataAspect] = useState([])
  const [updated, setUpdated] = useState(false)
  const [namaEtpro, setNamaEtpro] = useState('')

  const [modalEdit, setModalEdit] = useModal()
  const [modalDelete, setModalDelete] = useModal()
  const [modalAdd, setModalAdd] = useModal()

  const [jumlahBobot, setJumlahBobot] = useState(0)

  // axios.defaults.withCredentials = true

  async function getAllAspect() {
    axios.defaults.withCredentials = true
    await axios
      .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/etpro/aspects`)
      .then((res) => {
        console.log('res', res.data.data)
        let data = []
        let jumlah = 0
        let prodiId
        for (let i = 0; i < res.data.data.length; i++) {
          const element = res.data.data[i]
          console.log('element', element)
          const item = {
            aspek_bobot: element.aspek_bobot,
            aspek_name: element.aspek_name,
            id: element.id,
            is_deleted: element.is_deleted,
            prodi_id: element.prodi_id,
          }
          data = [...data, item]
          jumlah = jumlah + item.aspek_bobot
          prodiId = item.prodi_id
        }
        setDataAspect(data)
        setIsLoading(false)
        setJumlahBobot(jumlah)
        if (prodiId === 0) {
          setNamaEtpro('Etika Profesi')
        } else if (prodiId === 1) {
          setNamaEtpro('Etika dan Aspek Legal Teknologi Informasi')
        }
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

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      width: '1%',
      align: 'center',
      key: 'id',
      render: (value, item, index) => {
        return index + 1
      },
    },
    {
      title: 'Aspek Penilaian',
      key: 'aspek_name',
      width: '30%',
      dataIndex: 'aspek_name',
      align: 'center',
      render: (text, record) => {
        const capitalizedText = text.replace(/\b\w/g, (char) => char.toUpperCase())
        return (
          <>
            <div style={{ textAlign: 'left', paddingLeft: '1%' }}>{capitalizedText}</div>
          </>
        )
      },
    },
    {
      title: 'Tentukan Bobot',
      key: 'aspek_bobot',
      align: 'center',
      width: '1%',
      dataIndex: 'aspek_bobot',
      render: (text, record, index) => {
        return (
          <>
            <InputNumber
              defaultValue={text}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
              onChange={(value) => onChangeBobot(record, value, index)}
            />
          </>
        )
      },
    },
    {
      title: 'Aksi',
      width: '10%',
      align: 'center',
      render: (text, record, index) => (
        <>
          <Row>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Button
                id="button-pencil"
                htmlType="submit"
                shape="circle"
                style={{ backgroundColor: '#FBB03B', borderColor: '#FBB03B' }}
                onClick={() => {
                  showModalEdit(record, index)
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
                  showModalDelete(record, index)
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

  const showModalEdit = (record, index) => {
    modalEdit.confirm({
      title: 'Update Nama Aspek Peniliaian Etika Profesi Teori',
      content: (
        <>
          <Input placeholder={record.aspek_name} />
        </>
      ),
      okText: 'Simpan',
      cancelText: 'Batal',
      onOk() {
        const input = document.querySelector('.ant-modal-content input')
        if (input) {
          onChangeAspekName(record, input.value, index)
        }
      },
      onCancel() {
        console.log('cancel')
      },
    })
  }

  const showModalDelete = (record, index) => {
    modalDelete.confirm({
      title: 'Konfirmasi hapus Aspek Penilaian',
      okButtonProps: {
        type: 'primary',
        danger: true,
      },
      okText: 'Hapus',
      cancelText: 'Batal',
      onOk() {
        onDeleteAspek(record, index)
      },
    })
  }

  const showModalAdd = () => {
    modalAdd.confirm({
      title: 'Form Tambah Aspek Penilaian Baru',
      content: (
        <>
          <Divider />
          <Form>
            <Form.Item label="Nama Aspek">
              <Input placeholder="Masukan nama aspek baru" />
            </Form.Item>
          </Form>
        </>
      ),
      cancelText: 'Batal',
      okText: 'Simpan',
      onOk() {
        const input = document.querySelector('.ant-modal-content input')
        if (input) {
          onAddAspek(input.value)
        }
      },
    })
  }

  async function onAddAspek(input) {
    const newData = {
      aspek_bobot: 0,
      aspek_name: input,
      is_deleted: 0,
    }
    await axios
      .post(`${process.env.REACT_APP_API_GATEWAY_URL}grade/etpro/aspects`, newData)
      .then((res) => {
        getAllAspect()
        notification.success({
          message: 'Berhasil Menambahkan Aspek Baru!',
        })
      })
      .catch((err) => {
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
  }

  async function onDeleteAspek(record, index) {
    const prevData = [...dataAspect]
    record.is_deleted = 1
    prevData[index] = record
    await axios
      .put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/etpro/aspects`, prevData)
      .then((res) => {
        const afterDelete = prevData.filter((item, i) => i !== index)
        setDataAspect(afterDelete)
      })
      .catch((err) => {
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
  }

  const onChangeAspekName = (record, newValue, index) => {
    const prevData = [...dataAspect]
    record.aspek_name = newValue
    prevData[index] = record

    setDataAspect(prevData)
    setUpdated(true)
  }

  const onChangeBobot = (record, newValue, index) => {
    const prevData = [...dataAspect]
    record.aspek_bobot = newValue
    prevData[index] = record
    setDataAspect(prevData)
    setUpdated(true)
    let jumlah = 0

    for (let i = 0; i < prevData.length; i++) {
      const element = prevData[i]
      jumlah = jumlah + element.aspek_bobot
    }
    setJumlahBobot(jumlah)
  }

  async function onClickSimpanButton() {
    await axios
      .put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/etpro/aspects`, dataAspect)
      .then((res) => {
        notification.success({
          message: 'Berhasil memperbarui data!',
        })
        setUpdated(false)
      })
      .catch((err) => {
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
  }

  useEffect(() => {
    getAllAspect()

    console.log('gagal 1')
  }, [history])

  useEffect(() => {
    console.log('dataAspek', dataAspect)
    console.log('gagal 2')
  }, [dataAspect])

  useEffect(() => {
    console.log('Jumlah bobot', jumlahBobot)
    console.log('gagal 3')
  }, [jumlahBobot])

  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <>
      <Card title={'Aspek Penilaian ' + namaEtpro + ' Teori'}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2%' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModalAdd}>
            Tambah Aspek
          </Button>
        </div>

        <Table
          dataSource={dataAspect}
          columns={columns}
          scroll={{ x: 'max-content' }}
          bordered
          pagination={false}
        />

        {updated && jumlahBobot > 100 && (
          <span style={{ color: 'red', marginTop: '1%' }}>
            <sup>* Jumlah bobot melebihi batas maksimum 100%</sup>
          </span>
        )}
        {updated && jumlahBobot < 100 && (
          <span style={{ color: 'red', marginTop: '1%' }}>
            <sup>* Jumlah bobot kurang dari 100%</sup>
          </span>
        )}
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="primary"
            disabled={!updated || !(jumlahBobot === 100)}
            onClick={onClickSimpanButton}
          >
            Simpan
          </Button>
        </div>
      </Card>
      {setModalEdit}
      {setModalDelete}
      {setModalAdd}
    </>
  )
}

export default KelolaAspek
