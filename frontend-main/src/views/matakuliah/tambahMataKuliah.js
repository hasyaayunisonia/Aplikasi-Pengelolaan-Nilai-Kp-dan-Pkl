/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrashCan, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Row, Table, Spin, Form, Modal, Input, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />

const TambahMataKuliah = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadings, setLoadings] = useState([])
  const { id } = useParams()
  const [data, setData] = useState([])
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false)
  // const [matkulName, setMatkulName] = useState('')
  // const [choose, setChoose] = useState([])
  const [choose, setChoose] = useState([])
  const [form] = Form.useForm()
  const [form1] = Form.useForm()
  const history = useHistory()
  axios.defaults.withCredentials = true

  useEffect(() => {
    console.log('masuk')
  }, [])

  return <p> Nambah matkul</p>
}
export default TambahMataKuliah
