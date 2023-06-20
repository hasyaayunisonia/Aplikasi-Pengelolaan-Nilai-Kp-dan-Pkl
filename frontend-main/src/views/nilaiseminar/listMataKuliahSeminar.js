/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import 'antd/dist/reset.css'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Row, Table, Modal, Spin, Input } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />

const ListMataKuliahSeminar = () => {
  const [isLoading, setIsLoading] = useState(true)
  // const [loadings, setLoadings] = useState([]);
  const [isModallistKriteriaVisible, setIsModalListKriteriaVisible] = useState(false)

  const history = useNavigate()

  useEffect(() => {
    setTimeout(function () {
      setIsLoading(false)
    }, 100)
  }, [])

  const cek = () => {
    history('/nilaiseminar/kelolakriteria/formulirkriteriaseminar')
  }

  var daftarMatkul = [
    { id: 1, nama: 'Kerja Praktik', jurusan: 'D3', tahunajaran: '2020/2021', last: 'Panitia 1' },
    {
      id: 2,
      nama: 'Praktik Kerja Lapangan',
      jurusan: 'D4',
      tahunajaran: '2020/2021',
      last: 'Panitia 2',
    },
    {
      id: 3,
      nama: 'Praktik Kerja Lapangan 2',
      jurusan: 'D4',
      tahunajaran: '2020/2021',
      last: 'Panitia 3',
    },
  ]

  var listKriteria = [
    { id: 1, nama: 'Mengenali Perusahaan', bobot: 100 },
    { id: 1, nama: 'Mengenali Perusahaan', bobot: 100 },
    { id: 1, nama: 'Mengenali Perusahaan', bobot: 100 },
    { id: 1, nama: 'Mengenali Perusahaan', bobot: 100 },
    { id: 1, nama: 'Mengenali Perusahaan', bobot: 100 },
    { id: 1, nama: 'Mengenali Perusahaan', bobot: 100 },
    { id: 1, nama: 'Mengenali Perusahaan', bobot: 100 },
    { id: 1, nama: 'Mengenali Perusahaan', bobot: 100 },
    { id: 1, nama: 'Mengenali Perusahaan', bobot: 100 },
    { id: 1, nama: 'Mengenali Perusahaan', bobot: 100 },
    { id: 1, nama: 'Mengenali Perusahaan', bobot: 100 },
    { id: 1, nama: 'Mengenali Perusahaan', bobot: 100 },
    { id: 1, nama: 'Mengenali Perusahaan', bobot: 100 },
  ]

  const columns = [
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
      title: 'Nama Mata Kuliah',
      dataIndex: 'matkul_name',
      // ...getColumnSearchProps('company_name', 'nama perusahaan'),
      // width: '35%',
      render: (text, record) => (
        <>
          <Row>
            <Col>Kerja Praktik</Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Jurusan',
      dataIndex: 'jurusan',
      // width: '15%',
      align: 'center',
      render: (text, record) => (
        <>
          <Row align="middle">
            <Col>D3</Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Tahun Ajaran',
      dataIndex: 'tahunajaran',
      // width: '15%',
      align: 'center',
      render: (text, record) => (
        <>
          <Row align="middle">
            <Col>2020/2021</Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Terakhir diubah oleh',
      dataIndex: 'terakhir diubah oleh',
      // width: '15%',
      align: 'center',
      render: (text, record) => (
        <>
          <Row align="middle">
            <Col>Panitia 1</Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Aksi',
      dataIndex: 'action',
      align: 'center',
      render: (text, record) => (
        <>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Button
                id="detail"
                size="small"
                shape="square"
                style={{ color: 'fffff', background: '#00BFFF' }}
                onClick={cek}
                // href="/nilaiseminar/formulirkriteriaseminar"
              >
                <FontAwesomeIcon icon={faPlus} style={{ align: 'center' }} />
              </Button>
              <Button
                id="detail"
                size="small"
                shape="square"
                style={{ color: 'black', background: '#FBB03B' }}
                onClick={() => {
                  showModalListKriteria()
                }}
              >
                <FontAwesomeIcon icon={faEye} style={{ align: 'center' }} />
              </Button>
            </Col>
          </Row>
        </>
      ),
    },
  ]

  const columnsList = [
    {
      title: 'No',
      dataIndex: 'no',
      width: '13%',
      align: 'center',
      render: (value, item, index) => {
        return index + 1
      },
    },
    {
      title: 'List Kriteria Seminar',
      dataIndex: 'matkul_name',
      // ...getColumnSearchProps('company_name', 'nama perusahaan'),
      align: 'left',
      render: (text, record) => (
        <>
          <Row>
            <Col>Mengenali Perusahaan</Col>
          </Row>
        </>
      ),
    },
    {
      title: 'Bobot',
      dataIndex: 'jurusan',
      width: '21%',
      align: 'center',
      render: (text, record) => (
        <>
          <Row align="middle">
            <Col>
              <Input
                readOnly={true}
                addonAfter="%"
                value="100"
                // onChange={e => {
                //     setBobot(pre => {
                //         return { ...pre, bobotMinat: e.target.value }
                //     })
                // }} value={bobot.bobotMinat}
              />
            </Col>
          </Row>
        </>
      ),
    },
  ]

  const showModalListKriteria = () => {
    setIsModalListKriteriaVisible(true)
  }

  const handleCancelListKriteria = () => {
    setIsModalListKriteriaVisible(false)
  }

  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {/* <CCol sm={12} style={{ textAlign: "right" }}>
                                            <Button
                                                id="create-matkul"
                                                size="sm"
                                                shape="round"
                                                style={{ color: "white", background: "#339900", marginBottom: 16 }}
                                                // onClick={createPerusahaan}
                                            >
                                                Tambah Mata Kuliah
                                            </Button>
                                        </CCol> */}
            <CCol sm={12}>
              <h6>Kelola Kriteria Seminar </h6>
              <Table
                scroll={{ x: 'max-content' }}
                columns={columns}
                dataSource={daftarMatkul.map((arrydata = { daftarMatkul }, item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.nama}</td>
                      <td>{item.jurusan}</td>
                      <td>{item.tahunajaran}</td>
                      <td>{item.last}</td>
                    </tr>
                  )
                })}
                bordered
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <Modal
        // bodyStyle={{ overflowY: 'scroll' }}
        title="List Kriteria Seminar"
        // visible={getEditModal(item.name)}
        visible={isModallistKriteriaVisible}
        // onCancel={() => handleCancelEdit(item.name)}
        onCancel={handleCancelListKriteria}
        width={600}
        zIndex={9999999}
        footer={[]}
      >
        <Table
          columns={columnsList}
          dataSource={listKriteria.map((arrydata = { listKriteria }, item) => {
            return (
              <tr key={item.id}>
                <td>{item.nama}</td>
              </tr>
            )
          })}
          bordered
        />
      </Modal>
    </>
  )
}
export default ListMataKuliahSeminar
