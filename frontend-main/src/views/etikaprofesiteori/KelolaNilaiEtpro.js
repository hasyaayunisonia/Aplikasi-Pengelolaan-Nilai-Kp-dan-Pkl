import React from 'react'
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
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { LoadingOutlined, EditOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import axios from 'axios'
import FormPenilaianEtpro from './FormPenilaianEtpro'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />

const KelolaNilaiEtpro = () => {
  const [isLoading, setIsLoading] = useState(true)
  let history = useHistory()
  const [dataForm, setDataForm] = useState([])
  const [namaEtpro, setNamaEtpro] = useState('')
  const [dataSource, setDataSource] = useState([])

  axios.defaults.withCredentials = true

  async function getAllForm() {
    await axios
      .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/etpro/forms`)
      .then((res) => {
        console.log('res data', res.data.data[0].form.prodiId)
        const prodi = res.data.data[0].form.prodiId
        setIsLoading(false)
        setDataForm(res.data.data)
        if (prodi === 0) {
          setNamaEtpro('Etika Profesi')
        } else if (prodi === 1) {
          setNamaEtpro('Etika dan Aspek Legal Teknologi Informasi')
        }
        let tempDataSource = []
        for (let i = 0; i < res.data.data.length; i++) {
          const element = res.data.data[i]
          const object = {
            no: i + 1,
            idForm: element.form.id,
            nim: element.form.participant.nim,
            name: element.form.participant.name,
          }
          tempDataSource = [...tempDataSource, object]
        }
        setDataSource(tempDataSource)
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
  }

  const handleButton = (id) => {
    history.push(`/etikaProfesiTeori/form/${id}`)
  }

  const columns = [
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
      key: 'name',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: 'Aksi',
      width: '10%',
      align: 'center',
      render: (text, record, index) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            shape="round"
            style={{ backgroundColor: '#EED202', borderColor: '#EED202' }}
            onClick={() =>
              // handleButton(index)
              {
                console.log(index)
              }
            }
            //  {
            //     console.log(text.idForm)
            //   }
          />
        </>
      ),
    },
  ]

  useEffect(() => {
    getAllForm()
  }, [history])

  useEffect(() => {
    console.log('data', dataForm)
  }, [dataForm])

  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <>
      <Card title={'Penilaian ' + namaEtpro}>
        <Table
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: 'max-content' }}
          bordered
          pagination={true}
        />
      </Card>
    </>
  )
}

export default KelolaNilaiEtpro
