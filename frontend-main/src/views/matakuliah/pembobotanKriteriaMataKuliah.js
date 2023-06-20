import React, { useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import {
  Button,
  Form,
  Spin,
  Tabs,
  Row,
  Col,
  Input,
  notification,
  Steps,
  Typography,
  Divider,
  Select,
  Space,
  Switch,
  InputNumber,
} from 'antd'
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { convertToHTML } from 'draft-convert'
import { EditorState, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import DOMPurify from 'dompurify'
import htmlToDraft from 'html-to-draftjs'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const { Step } = Steps
const { Option } = Select
const { TabPane } = Tabs

const PembobotanKriteriaMataKuliah = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [form] = Form.useForm()
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()
  const [form3] = Form.useForm()
  const [form4] = Form.useForm()
  const [form5] = Form.useForm()
  const [bobot, setBobot] = useState({})
  const { id } = useParams()
  let history = useHistory()
  const [loadings, setLoadings] = useState([])
  const [matkul, setMatkul] = useState([])
  const [formPenilaian, setFormPenilaian] = useState([])
  const [tahapOptions, setTahapOptions] = useState([])
  const [aspekOptions, setAspekOptions] = useState([])
  const [formData, setFormData] = useState([])
  const [komponen, setKomponen] = useState({})
  const [activeTab, setActiveTab] = useState('0')
  const [dataKriteria, setDataKriteria] = useState([])
  const [number, setNumber] = useState(0)
  const [formName, setFormName] = useState('')

  const [current, setCurrent] = useState(0)
  const [isSpinner, setIsSpinner] = useState(true)

  const [formPenilaian1, setFormPenilaian1] = useState([])
  const [tahapOptions1, setTahapOptions1] = useState([])
  const [aspekOptions1, setAspekOptions1] = useState([])
  const [dataKriteria1, setDataKriteria1] = useState([])
  const [formData1, setFormData1] = useState([])
  const [komponen1, setKomponen1] = useState({})
  const [number1, setNumber1] = useState(0)
  const [formName1, setFormName1] = useState('')

  const [formPenilaian2, setFormPenilaian2] = useState([])
  const [tahapOptions2, setTahapOptions2] = useState([])
  const [aspekOptions2, setAspekOptions2] = useState([])
  const [dataKriteria2, setDataKriteria2] = useState([])
  const [formData2, setFormData2] = useState([])
  const [komponen2, setKomponen2] = useState({})
  const [number2, setNumber2] = useState(0)
  const [formName2, setFormName2] = useState('')

  const [formPenilaian3, setFormPenilaian3] = useState([])
  const [tahapOptions3, setTahapOptions3] = useState([])
  const [aspekOptions3, setAspekOptions3] = useState([])
  const [dataKriteria3, setDataKriteria3] = useState([])
  const [formData3, setFormData3] = useState([])
  const [komponen3, setKomponen3] = useState({})
  const [number3, setNumber3] = useState(0)
  const [formName3, setFormName3] = useState('')

  const [formPenilaian4, setFormPenilaian4] = useState([])
  const [tahapOptions4, setTahapOptions4] = useState([])
  const [aspekOptions4, setAspekOptions4] = useState([])
  const [dataKriteria4, setDataKriteria4] = useState([])
  const [formData4, setFormData4] = useState([])
  const [komponen4, setKomponen4] = useState({})
  const [number4, setNumber4] = useState(0)
  const [formName4, setFormName4] = useState('')

  const [formPenilaian5, setFormPenilaian5] = useState([])
  const [tahapOptions5, setTahapOptions5] = useState([])
  const [aspekOptions5, setAspekOptions5] = useState([])
  const [dataKriteria5, setDataKriteria5] = useState([])
  const [formData5, setFormData5] = useState([])
  const [komponen5, setKomponen5] = useState({})
  const [number5, setNumber5] = useState(0)
  const [formName5, setFormName5] = useState('')

  axios.defaults.withCredentials = true

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
  }

  axios.defaults.withCredentials = true

  useEffect(() => {
    async function fetchData() {
      try {
        const mataKuliahResponse = await axios.get(`/api/courses/form`)
        const formPenilaianResponse = await axios.get(
          `/api/courses/criteria/evaluation-form/${mataKuliahResponse.data.data[0].prodi_id}`,
        )
        const dataKriteriaResponse = await axios.get(`api/courses/component/criteria/form/${id}`)

        setMatkul(mataKuliahResponse.data.data.find((item) => item.id === parseInt(id)))

        //ini get Evaluasi Form Penilaian
        setFormPenilaian(formPenilaianResponse.data.data)
        setFormPenilaian1(formPenilaianResponse.data.data)
        setFormPenilaian2(formPenilaianResponse.data.data)
        setFormPenilaian3(formPenilaianResponse.data.data)
        setFormPenilaian4(formPenilaianResponse.data.data)
        setFormPenilaian5(formPenilaianResponse.data.data)

        // setDataKriteria(dataKriteriaResponse.data.data[0].criteria_data)

        //ini untuk ets teori
        let searchData = dataKriteriaResponse.data.data.find((item) => item.name === 'ETS Teori')
        const criteriaData = dataKriteriaResponse.data.data.find(
          (item) => item.name === 'ETS Teori',
        )?.criteria_data

        if (searchData) {
          searchData.criteria_data = criteriaData
        }
        setDataKriteria(searchData)

        //ini untuk ets praktek
        let searchData1 = dataKriteriaResponse.data.data.find((item) => item.name === 'ETS Praktek')
        const criteriaData1 = dataKriteriaResponse.data.data.find(
          (item) => item.name === 'ETS Praktek',
        )?.criteria_data

        if (searchData1) {
          searchData1.criteria_data = criteriaData1
        }
        setDataKriteria1(searchData1)

        //ini untuk eas teori
        let searchData2 = dataKriteriaResponse.data.data.find((item) => item.name === 'EAS Teori')
        const criteriaData2 = dataKriteriaResponse.data.data.find(
          (item) => item.name === 'EAS Teori',
        )?.criteria_data

        if (searchData2) {
          searchData2.criteria_data = criteriaData2
        }
        setDataKriteria2(searchData2)

        //ini untuk eas praktek
        let searchData3 = dataKriteriaResponse.data.data.find((item) => item.name === 'EAS Praktek')
        const criteriaData3 = dataKriteriaResponse.data.data.find(
          (item) => item.name === 'EAS Praktek',
        )?.criteria_data

        if (searchData3) {
          searchData3.criteria_data = criteriaData3
        }
        setDataKriteria3(searchData3)

        //ini untuk lain lain t
        let searchData4 = dataKriteriaResponse.data.data.find(
          (item) => item.name === 'Lain-lain Teori',
        )
        const criteriaData4 = dataKriteriaResponse.data.data.find(
          (item) => item.name === 'Lain-lain Teori',
        )?.criteria_data

        if (searchData4) {
          searchData4.criteria_data = criteriaData4
        }
        setDataKriteria4(searchData4)

        //ini untuk lain lain p
        let searchData5 = dataKriteriaResponse.data.data.find(
          (item) => item.name === 'Lain-lain Praktek',
        )
        const criteriaData5 = dataKriteriaResponse.data.data.find(
          (item) => item.name === 'Lain-lain Praktek',
        )?.criteria_data

        if (searchData5) {
          searchData5.criteria_data = criteriaData5
        }
        setDataKriteria5(searchData5)

        // let searchData
        // if (activeTab === '0') {
        //   searchData = dataKriteriaResponse.data.data.find((item) => item.name === 'ETS Teori')
        //   const criteriaData = dataKriteriaResponse.data.data.find(
        //     (item) => item.name === 'ETS Teori',
        //   )?.criteria_data

        //   if (searchData) {
        //     searchData.criteria_data = criteriaData
        //   }
        // } else if (activeTab === '1') {
        //   searchData = dataKriteriaResponse.data.data.find((item) => item.name === 'ETS Praktek')
        //   const criteriaData = dataKriteriaResponse.data.data.find(
        //     (item) => item.name === 'ETS Praktek',
        //   )?.criteria_data

        //   if (searchData) {
        //     searchData.criteria_data = criteriaData
        //   }
        // }

        setIsSpinner(false)
      } catch (error) {
        if (error.toJSON().status >= 300 && error.toJSON().status <= 399) {
          history.push('/dashboard')
        } else if (error.toJSON().status >= 400 && error.toJSON().status <= 499) {
          history.push('/404')
        } else if (error.toJSON().status >= 500 && error.toJSON().status <= 599) {
          history.push('/500')
        }
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    console.log('ini matkul', matkul)
    console.log('ini prodi matkul', matkul.prodi_id)
    console.log('ini form', formPenilaian)
    // console.log('ini data kriteria', dataKriteria)

    //maping data kriteria untuk ets t
    const cek = dataKriteria.criteria_data
    console.log('ini cek', cek)
    if (cek) {
      const mappedData = cek.map((item) => ({
        name_form: item.name_form,
        type_form: item.type_form,
        aspect_form_id: item.aspect_form_id,
        aspect_name: item.aspect_name,
        component_id: item.component_id,
        bobot_criteria: item.bobot_criteria,
        id: item.id,
      }))
      setFormData(mappedData)
    }

    //maping data kriteria untuk ets p
    const cek1 = dataKriteria1.criteria_data
    console.log('ini cek1', cek1)
    if (cek1) {
      const mappedData = cek1.map((item) => ({
        name_form: item.name_form,
        type_form: item.type_form,
        aspect_form_id: item.aspect_form_id,
        aspect_name: item.aspect_name,
        component_id: item.component_id,
        bobot_criteria: item.bobot_criteria,
        id: item.id,
      }))
      setFormData1(mappedData)
    }

    //maping data kriteria untuk eas t
    const cek2 = dataKriteria2.criteria_data
    console.log('ini cek2', cek2)
    if (cek2) {
      const mappedData = cek2.map((item) => ({
        name_form: item.name_form,
        type_form: item.type_form,
        aspect_form_id: item.aspect_form_id,
        aspect_name: item.aspect_name,
        component_id: item.component_id,
        bobot_criteria: item.bobot_criteria,
        id: item.id,
      }))
      setFormData2(mappedData)
    }

    //maping data kriteria untuk eas p
    const cek3 = dataKriteria3.criteria_data
    console.log('ini cek3', cek3)
    if (cek3) {
      const mappedData = cek3.map((item) => ({
        name_form: item.name_form,
        type_form: item.type_form,
        aspect_form_id: item.aspect_form_id,
        aspect_name: item.aspect_name,
        component_id: item.component_id,
        bobot_criteria: item.bobot_criteria,
        id: item.id,
      }))
      setFormData3(mappedData)
    }

    //maping data kriteria untuk lain-lain t
    const cek4 = dataKriteria4.criteria_data
    console.log('ini cek4', cek4)
    if (cek4) {
      const mappedData = cek4.map((item) => ({
        name_form: item.name_form,
        type_form: item.type_form,
        aspect_form_id: item.aspect_form_id,
        aspect_name: item.aspect_name,
        component_id: item.component_id,
        bobot_criteria: item.bobot_criteria,
        id: item.id,
      }))
      setFormData4(mappedData)
    }

    //maping data kriteria untuk lain-lain p
    const cek5 = dataKriteria5.criteria_data
    console.log('ini cek5', cek5)
    if (cek5) {
      const mappedData = cek5.map((item) => ({
        name_form: item.name_form,
        type_form: item.type_form,
        aspect_form_id: item.aspect_form_id,
        aspect_name: item.aspect_name,
        component_id: item.component_id,
        bobot_criteria: item.bobot_criteria,
        id: item.id,
      }))
      setFormData5(mappedData)
    }
  }, [matkul])

  useEffect(() => {
    console.log('==> Ini active tab', activeTab)
  }, [activeTab])
  useEffect(() => {
    console.log('ini tahap', tahapOptions)
  }, [tahapOptions])

  useEffect(() => {
    console.log('ini aspek', aspekOptions)
  }, [aspekOptions])

  useEffect(() => {
    console.log(komponen)
  }, [komponen])

  useEffect(() => {
    console.log('===> INI Data kriteria', dataKriteria)
  }, [dataKriteria])

  useEffect(() => {
    // console.log('ini FORM DATA', formData)
  }, [formData])

  useEffect(() => {
    // console.log('ini FORM Name', formName)
  }, [formName])

  //ETS P
  useEffect(() => {
    console.log('ini tahap', tahapOptions1)
  }, [tahapOptions1])

  useEffect(() => {
    console.log('ini aspek', aspekOptions1)
  }, [aspekOptions1])

  useEffect(() => {
    console.log('ini komponen 1', komponen1)
  }, [komponen1])

  useEffect(() => {
    // console.log('ini FORM DATA', formData)
  }, [formData1])

  useEffect(() => {
    console.log('===> INI Data kriteria', dataKriteria1)
  }, [dataKriteria1])

  useEffect(() => {
    // console.log('ini FORM Name 1', formName1)
  }, [formName1])

  //EAS T
  useEffect(() => {
    console.log('ini tahap', tahapOptions2)
  }, [tahapOptions2])

  useEffect(() => {
    console.log('ini aspek', aspekOptions2)
  }, [aspekOptions2])

  useEffect(() => {
    console.log(komponen2)
  }, [komponen2])

  useEffect(() => {
    // console.log('ini FORM DATA', formData2)
  }, [formData2])

  useEffect(() => {
    console.log('===> INI Data kriteria', dataKriteria2)
  }, [dataKriteria2])

  useEffect(() => {
    // console.log('ini FORM Name', formName2)
  }, [formName2])

  //EAS P
  useEffect(() => {
    console.log('ini tahap', tahapOptions3)
  }, [tahapOptions3])

  useEffect(() => {
    console.log('ini aspek', aspekOptions3)
  }, [aspekOptions3])

  useEffect(() => {
    console.log(komponen3)
  }, [komponen3])

  useEffect(() => {
    // console.log('ini FORM DATA', formData3)
  }, [formData3])

  useEffect(() => {
    console.log('===> INI Data kriteria', dataKriteria3)
  }, [dataKriteria3])

  useEffect(() => {
    // console.log('ini FORM Name', formName3)
  }, [formName3])

  //Lain lain T
  useEffect(() => {
    console.log('ini tahap', tahapOptions4)
  }, [tahapOptions4])

  useEffect(() => {
    console.log('ini aspek', aspekOptions4)
  }, [aspekOptions4])

  useEffect(() => {
    console.log(komponen4)
  }, [komponen4])

  useEffect(() => {
    // console.log('ini FORM DATA', formData4)
  }, [formData4])

  useEffect(() => {
    console.log('===> INI Data kriteria', dataKriteria4)
  }, [dataKriteria4])

  useEffect(() => {
    // console.log('ini FORM Name', formName4)
  }, [formName4])

  //Lain lain p
  useEffect(() => {
    console.log('ini tahap', tahapOptions5)
  }, [tahapOptions5])

  useEffect(() => {
    console.log('ini aspek', aspekOptions5)
  }, [aspekOptions5])

  useEffect(() => {
    console.log(komponen5)
  }, [komponen5])

  useEffect(() => {
    // console.log('ini FORM DATA', formData5)
  }, [formData5])

  useEffect(() => {
    console.log('===> INI Data kriteria', dataKriteria5)
  }, [dataKriteria5])

  useEffect(() => {
    // console.log('ini FORM Name', formName5)
  }, [formName5])

  const handleTabChange = async (key) => {
    setActiveTab(key)
  }

  const findActiveTab = async () => {
    try {
      await axios.get(`/api/courses/component/course-form/${id}`).then((res) => {
        const fetchedKomponen = res.data.data
        let searchData
        console.log('ini aktif tab', activeTab)
        if (activeTab === '0') {
          searchData = fetchedKomponen.find((item) => item.name === 'ETS Teori')
          setKomponen(searchData)
          console.log('==> ini komponen ETS Teori', komponen)
          return komponen
        } else if (activeTab === '1') {
          searchData = fetchedKomponen.find((item) => item.name === 'ETS Praktek')
          setKomponen1(searchData)
          console.log('==> ini komponen ETS Praktek', komponen1)
          return komponen1
        } else if (activeTab === '2') {
          searchData = fetchedKomponen.find((item) => item.name === 'EAS Teori')
          setKomponen2(searchData)
          console.log('==> ini komponen EAS Teori', komponen2)
          return komponen2
        } else if (activeTab === '3') {
          searchData = fetchedKomponen.find((item) => item.name === 'EAS Praktek')
          setKomponen3(searchData)
          console.log('==> ini komponen EAS Teori', komponen3)
          return komponen3
        } else if (activeTab === '4') {
          searchData = fetchedKomponen.find((item) => item.name === 'Lain-lain Teori')
          setKomponen4(searchData)
          console.log('==> ini komponen Lain-lain Teori', komponen4)
          return komponen4
        } else if (activeTab === '5') {
          searchData = fetchedKomponen.find((item) => item.name === 'Lain-lain Praktek')
          setKomponen5(searchData)
          console.log('==> ini komponen Lain-lain Praktek', komponen5)
          return komponen5
        }
      })

      //   return komponen
    } catch (error) {
      console.log(error)
    }
  }

  const onChange = (checked) => {
    if (checked) {
      setNumber(1) // Mengubah angka menjadi 1 jika tombol dinyalakan
    } else {
      setNumber(0) // Mengubah angka menjadi 0 jika tombol dimatikan
    }
  }

  const handleFormPenilaianChange = async (value, index) => {
    findActiveTab()
    // console.log('ini formName', value)
    // console.log('Index:', index)

    setFormName(value)
    console.log('ini formName', formName)

    const selectedForm = formPenilaian.find((item) => item.form_name === value)
    console.log('nemu Evaluasi Form Penilaian', selectedForm)

    const updatedFormData = [...formData]
    updatedFormData[index] = {
      ...updatedFormData[index],
      name_form: selectedForm.form_name,
      // type_form: selectedForm.form_type,
      component_id: dataKriteria.id,
    }
    setFormData(updatedFormData)
    console.log('INI DI TF KE FORM DATA', formData)
    try {
      // console.log('ini adalah formtype ', formType)
      // console.log('ini adalah prodiID ', matkul.prodi_id)
      await axios
        .get(`/api/courses/criteria/evaluation-form/aspect/type`, {
          params: {
            formType: value,
            prodiId: matkul.prodi_id,
          },
        })
        .then((res) => {
          setTahapOptions(res.data.data)
          console.log('ini tahap', tahapOptions)
          // res.data.data.map((item) => {
          //   return data.push(item.aspek)
          // })
          // console.log('ini data ea ', data)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleTahapChange = async (value, index) => {
    findActiveTab()
    console.log(findActiveTab())
    // setSelectedFormType(value)

    console.log('ini tahap', value)
    console.log('Index:', index)

    const selectedForm = tahapOptions.find((item) => item.name === value)

    const updatedFormData = [...formData]
    updatedFormData[index] = {
      ...updatedFormData[index],
      type_form: selectedForm.name,
    }
    setFormData(updatedFormData)
    try {
      // console.log('ini adalah formtype ', formType)
      // console.log('ini adalah prodiID ', matkul.prodi_id)
      await axios
        .get(`/api/courses/criteria/evaluation-form/aspect`, {
          params: {
            formType: value,
            formName: formName,
            prodiId: matkul.prodi_id,
          },
        })
        .then((res) => {
          setAspekOptions(res.data.data)
          console.log('ini aspek', aspekOptions)
          // res.data.data.map((item) => {
          //   return data.push(item.aspek)
          // })
          // console.log('ini data ea ', data)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAspekChange = async (value, index) => {
    findActiveTab()

    // console.log('ini aspek', value)
    // console.log('Index:', index)

    const selectedForm = aspekOptions.find((item) => item.name === value)
    // console.log('nemu aspek', selectedForm)

    if (number === 0) {
      const updatedFormData = [...formData]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm.id,
        aspect_name: value,
        bobot_criteria: 100,
        id: null,
      }
      setFormData(updatedFormData)
    } else {
      const updatedFormData = [...formData]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm.id,
        aspect_name: value,
        id: null,
      }
      setFormData(updatedFormData)
    }
  }

  const handleBobotChange = async (value, index) => {
    findActiveTab()

    // console.log('ini aspek', value)
    // console.log('Index:', index)
    const updatedFormData = [...formData]
    updatedFormData[index] = {
      ...updatedFormData[index],
      bobot_criteria: value,
    }
    setFormData(updatedFormData)
  }

  const onFinish = () => {
    findActiveTab()
    // console.log('Received values:', values)
    // console.log('ini datanya', formData)
    // setValue(values)
    console.log('criteria_data', formData)
  }

  const handleRemoveField = (fieldName, index, remove) => {
    findActiveTab()
    const updatedFormData = [...formData]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData(updatedFormData)
    remove(fieldName) // Menghapus elemen dari Form.List fields
  }

  const handleViewData = async () => {
    console.log('criteria_data', formData)
    console.log('lihat bobot ', bobot)
    findActiveTab()
    const postData = {
      id: komponen.id,
      name: komponen.name,
      criteria_data: formData,
      is_average: 1,
    }
    console.log('ini postdata ', postData)
    // console.log(typeof postData.id)

    try {
      await axios
        .put(`/api/courses/component/criteria/update`, {
          id: komponen.id,
          name: komponen.name,
          criteria_data: formData,
          is_average: 1,
        })
        .then((response) => {
          // Tangani respons setelah berhasil melakukan POST
          console.log('Berhasil melakukan POST', response.data)
          notification.success({
            message: 'Data bobot kriteria tersimpan',
          })
        })
    } catch (error) {
      console.error('Gagal melakukan POST', error)
      notification.error({
        message: 'Data bobot kriteria gagal tersimpan',
      })
    }
  }

  //INI UNTUK ETS P
  const onChange1 = (checked) => {
    if (checked) {
      setNumber1(1) // Mengubah angka menjadi 1 jika tombol dinyalakan
    } else {
      setNumber1(0) // Mengubah angka menjadi 0 jika tombol dimatikan
    }
  }

  const handleFormPenilaianChange1 = async (value, index) => {
    findActiveTab()
    // console.log('ini formName', value)
    // console.log('Index:', index)

    setFormName1(value)
    console.log('ini formName', formName1)

    const selectedForm = formPenilaian1.find((item) => item.form_name === value)
    console.log('nemu Evaluasi Form Penilaian', selectedForm)

    const updatedFormData = [...formData1]
    updatedFormData[index] = {
      ...updatedFormData[index],
      name_form: selectedForm.form_name,
      component_id: dataKriteria1.id,
    }
    setFormData1(updatedFormData)
    console.log('INI DI TF KE FORM DATA', formData1)
    try {
      await axios
        .get(`/api/courses/criteria/evaluation-form/aspect/type`, {
          params: {
            formType: value,
            prodiId: matkul.prodi_id,
          },
        })
        .then((res) => {
          setTahapOptions1(res.data.data)
          console.log('ini tahap ets p', tahapOptions1)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleTahapChange1 = async (value, index) => {
    findActiveTab()
    // console.log(findActiveTab())
    // setSelectedFormType(value)
    console.log('ini tahap', value)
    console.log('Index:', index)

    const selectedForm = tahapOptions1.find((item) => item.name === value)

    const updatedFormData = [...formData1]
    updatedFormData[index] = {
      ...updatedFormData[index],
      type_form: selectedForm.name,
    }
    setFormData1(updatedFormData)
    try {
      await axios
        .get(`/api/courses/criteria/evaluation-form/aspect`, {
          params: {
            formType: value,
            formName: formName1,
            prodiId: matkul.prodi_id,
          },
        })
        .then((res) => {
          setAspekOptions1(res.data.data)
          console.log('ini aspek ets p', aspekOptions1)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAspekChange1 = async (value, index) => {
    findActiveTab()

    // console.log('ini aspek', value)
    // console.log('Index:', index)

    const selectedForm = aspekOptions1.find((item) => item.name === value)
    // console.log('nemu aspek', selectedForm)

    if (number1 === 0) {
      const updatedFormData = [...formData1]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm.id,
        aspect_name: value,
        bobot_criteria: 100,
        id: null,
      }
      setFormData1(updatedFormData)
    } else {
      const updatedFormData = [...formData1]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm.id,
        aspect_name: value,
        id: null,
      }
      setFormData1(updatedFormData)
    }
  }

  const handleBobotChange1 = async (value, index) => {
    findActiveTab()

    // console.log('ini aspek', value)
    // console.log('Index:', index)
    const updatedFormData = [...formData1]
    updatedFormData[index] = {
      ...updatedFormData[index],
      bobot_criteria: value,
    }
    setFormData1(updatedFormData)
  }

  const onFinish1 = () => {
    findActiveTab()
    // console.log('Received values:', values)
    // console.log('ini datanya', formData)
    // setValue(values)
    console.log('criteria_data ets p', formData1)
  }

  const handleRemoveField1 = (fieldName, index, remove) => {
    findActiveTab()
    const updatedFormData = [...formData1]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData1(updatedFormData)
    remove(fieldName) // Menghapus elemen dari Form.List fields
  }

  const handleViewData1 = async () => {
    console.log('criteria_data', formData1)
    // console.log('lihat bobot ', bobot)
    findActiveTab()
    const postData = {
      id: komponen1.id,
      name: komponen1.name,
      criteria_data: formData1,
      is_average: 1,
    }
    console.log('ini postdata ets p', postData)
    // console.log(typeof postData.id)

    try {
      await axios
        .put(`/api/courses/component/criteria/update`, {
          id: komponen1.id,
          name: komponen1.name,
          criteria_data: formData1,
          is_average: 1,
        })
        .then((response) => {
          // Tangani respons setelah berhasil melakukan POST
          console.log('Berhasil melakukan POST', response.data)
          notification.success({
            message: 'Data bobot kriteria tersimpan',
          })
        })
    } catch (error) {
      console.error('Gagal melakukan POST', error)
      notification.error({
        message: 'Data bobot kriteria gagal tersimpan',
      })
    }
  }

  //INI UNTUK EAS T
  const onChange2 = (checked) => {
    if (checked) {
      setNumber2(1) // Mengubah angka menjadi 1 jika tombol dinyalakan
    } else {
      setNumber2(0) // Mengubah angka menjadi 0 jika tombol dimatikan
    }
  }
  const handleFormPenilaianChange2 = async (value, index) => {
    findActiveTab()
    // console.log('ini formName', value)
    // console.log('Index:', index)
    setFormName2(value)
    console.log('ini formName', formName2)
    const selectedForm = formPenilaian2.find((item) => item.form_name === value)
    console.log('nemu Evaluasi Form Penilaian', selectedForm)

    const updatedFormData = [...formData2]
    updatedFormData[index] = {
      ...updatedFormData[index],
      name_form: selectedForm.form_name,
      component_id: dataKriteria2.id,
    }

    setFormData2(updatedFormData)
    console.log('INI DI TF KE FORM DATA', formData2)
    try {
      await axios
        .get(`/api/courses/criteria/evaluation-form/aspect/type`, {
          params: {
            formType: value,

            prodiId: matkul.prodi_id,
          },
        })
        .then((res) => {
          setTahapOptions2(res.data.data)
          console.log('ini tahap ets p', tahapOptions2)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleTahapChange2 = async (value, index) => {
    findActiveTab()
    // console.log(findActiveTab())
    // setSelectedFormType(value)
    console.log('ini tahap', value)
    console.log('Index:', index)

    const selectedForm = tahapOptions2.find((item) => item.name === value)

    const updatedFormData = [...formData2]
    updatedFormData[index] = {
      ...updatedFormData[index],
      type_form: selectedForm.name,
    }
    setFormData2(updatedFormData)
    try {
      await axios
        .get(`/api/courses/criteria/evaluation-form/aspect`, {
          params: {
            formType: value,
            formName: formName2,
            prodiId: matkul.prodi_id,
          },
        })
        .then((res) => {
          setAspekOptions2(res.data.data)
          console.log('ini aspek ets p', aspekOptions2)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAspekChange2 = async (value, index) => {
    findActiveTab()

    // console.log('ini aspek', value)
    // console.log('Index:', index)

    const selectedForm = aspekOptions2.find((item) => item.name === value)
    // console.log('nemu aspek', selectedForm)

    if (number2 === 0) {
      const updatedFormData = [...formData2]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm.id,
        aspect_name: value,
        bobot_criteria: 100,
        id: null,
      }
      setFormData2(updatedFormData)
    } else {
      const updatedFormData = [...formData2]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm.id,
        aspect_name: value,
        id: null,
      }
      setFormData2(updatedFormData)
    }
  }

  const handleBobotChange2 = async (value, index) => {
    findActiveTab()

    // console.log('ini aspek', value)
    // console.log('Index:', index)
    const updatedFormData = [...formData2]
    updatedFormData[index] = {
      ...updatedFormData[index],
      bobot_criteria: value,
    }
    setFormData2(updatedFormData)
  }

  const onFinish2 = () => {
    findActiveTab()
    // console.log('Received values:', values)
    // console.log('ini datanya', formData)
    // setValue(values)
    console.log('criteria_data ets p', formData2)
  }

  const handleRemoveField2 = (fieldName, index, remove) => {
    findActiveTab()
    const updatedFormData = [...formData2]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData2(updatedFormData)
    remove(fieldName) // Menghapus elemen dari Form.List fields
  }

  const handleViewData2 = async () => {
    console.log('criteria_data', formData2)
    // console.log('lihat bobot ', bobot)
    findActiveTab()
    const postData = {
      id: komponen2.id,
      name: komponen2.name,
      criteria_data: formData2,
      is_average: 1,
    }
    console.log('ini postdata eas t', postData)
    // console.log(typeof postData.id)

    try {
      await axios
        .put(`/api/courses/component/criteria/update`, {
          id: komponen2.id,
          name: komponen2.name,
          criteria_data: formData2,
          is_average: 1,
        })
        .then((response) => {
          // Tangani respons setelah berhasil melakukan POST
          console.log('Berhasil melakukan POST', response.data)
          notification.success({
            message: 'Data bobot kriteria tersimpan',
          })
        })
    } catch (error) {
      console.error('Gagal melakukan POST', error)
      notification.error({
        message: 'Data bobot kriteria gagal tersimpan',
      })
    }
  }

  //INI UNTUK EAS P
  const onChange3 = (checked) => {
    if (checked) {
      setNumber3(1) // Mengubah angka menjadi 1 jika tombol dinyalakan
    } else {
      setNumber3(0) // Mengubah angka menjadi 0 jika tombol dimatikan
    }
  }
  const handleFormPenilaianChange3 = async (value, index) => {
    findActiveTab()
    // console.log('ini formName', value)
    // console.log('Index:', index)
    setFormName3(value)
    console.log('ini formName', formName3)
    const selectedForm = formPenilaian3.find((item) => item.form_name === value)
    console.log('nemu Evaluasi Form Penilaian', selectedForm)

    const updatedFormData = [...formData3]
    updatedFormData[index] = {
      ...updatedFormData[index],
      name_form: selectedForm.form_name,
      component_id: dataKriteria3.id,
    }
    setFormData3(updatedFormData)
    console.log('INI DI TF KE FORM DATA', formData3)
    try {
      await axios
        .get(`/api/courses/criteria/evaluation-form/aspect/type`, {
          params: {
            formType: value,
            prodiId: matkul.prodi_id,
          },
        })
        .then((res) => {
          setTahapOptions3(res.data.data)
          console.log('ini tahap ets p', tahapOptions3)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleTahapChange3 = async (value, index) => {
    findActiveTab()
    // console.log(findActiveTab())
    // setSelectedFormType(value)
    console.log('ini tahap', value)
    console.log('Index:', index)

    const selectedForm = tahapOptions3.find((item) => item.name === value)

    const updatedFormData = [...formData3]
    updatedFormData[index] = {
      ...updatedFormData[index],
      type_form: selectedForm.name,
    }
    setFormData3(updatedFormData)
    try {
      await axios
        .get(`/api/courses/criteria/evaluation-form/aspect`, {
          params: {
            formType: value,
            formName: formName3,
            prodiId: matkul.prodi_id,
          },
        })
        .then((res) => {
          setAspekOptions3(res.data.data)
          console.log('ini aspek ets p', aspekOptions3)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAspekChange3 = async (value, index) => {
    findActiveTab()

    // console.log('ini aspek', value)
    // console.log('Index:', index)

    const selectedForm = aspekOptions3.find((item) => item.name === value)
    // console.log('nemu aspek', selectedForm)

    if (number3 === 0) {
      const updatedFormData = [...formData3]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm.id,
        aspect_name: value,
        bobot_criteria: 100,
        id: null,
      }
      setFormData3(updatedFormData)
    } else {
      const updatedFormData = [...formData3]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm.id,
        aspect_name: value,
        id: null,
      }
      setFormData3(updatedFormData)
    }
  }

  const handleBobotChange3 = async (value, index) => {
    findActiveTab()

    // console.log('ini aspek', value)
    // console.log('Index:', index)
    const updatedFormData = [...formData3]
    updatedFormData[index] = {
      ...updatedFormData[index],
      bobot_criteria: value,
    }
    setFormData3(updatedFormData)
  }

  const onFinish3 = () => {
    findActiveTab()
    // console.log('Received values:', values)
    // console.log('ini datanya', formData)
    // setValue(values)
    console.log('criteria_data eas p', formData3)
  }

  const handleRemoveField3 = (fieldName, index, remove) => {
    findActiveTab()
    const updatedFormData = [...formData3]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData3(updatedFormData)
    remove(fieldName) // Menghapus elemen dari Form.List fields
  }

  const handleViewData3 = async () => {
    console.log('criteria_data', formData3)
    // console.log('lihat bobot ', bobot)
    findActiveTab()
    const postData = {
      id: komponen3.id,
      name: komponen3.name,
      criteria_data: formData3,
      is_average: 1,
    }
    console.log('ini postdata eas t', postData)
    // console.log(typeof postData.id)

    try {
      await axios
        .put(`/api/courses/component/criteria/update`, {
          id: komponen3.id,
          name: komponen3.name,
          criteria_data: formData3,
          is_average: 1,
        })
        .then((response) => {
          // Tangani respons setelah berhasil melakukan POST
          console.log('Berhasil melakukan POST', response.data)
          notification.success({
            message: 'Data bobot kriteria tersimpan',
          })
        })
    } catch (error) {
      console.error('Gagal melakukan POST', error)
      notification.error({
        message: 'Data bobot kriteria gagal tersimpan',
      })
    }
  }

  //INI UNTUK LAIN LAIN T
  const onChange4 = (checked) => {
    if (checked) {
      setNumber4(1) // Mengubah angka menjadi 1 jika tombol dinyalakan
    } else {
      setNumber4(0) // Mengubah angka menjadi 0 jika tombol dimatikan
    }
  }
  const handleFormPenilaianChange4 = async (value, index) => {
    findActiveTab()
    // console.log('ini formName', value)
    // console.log('Index:', index)

    setFormName4(value)
    console.log('ini formName', formName4)

    const selectedForm = formPenilaian4.find((item) => item.form_name === value)
    console.log('nemu Evaluasi Form Penilaian', selectedForm)

    const updatedFormData = [...formData4]
    updatedFormData[index] = {
      ...updatedFormData[index],
      name_form: selectedForm.form_name,
      component_id: dataKriteria4.id,
    }
    setFormData4(updatedFormData)
    console.log('INI DI TF KE FORM DATA', formData4)
    try {
      await axios
        .get(`/api/courses/criteria/evaluation-form/aspect/type`, {
          params: {
            formType: value,
            prodiId: matkul.prodi_id,
          },
        })
        .then((res) => {
          setTahapOptions4(res.data.data)
          console.log('ini tahap ets p', tahapOptions4)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleTahapChange4 = async (value, index) => {
    findActiveTab()
    // console.log(findActiveTab())
    // setSelectedFormType(value)
    console.log('ini tahap', value)
    console.log('Index:', index)

    const selectedForm = tahapOptions4.find((item) => item.name === value)

    const updatedFormData = [...formData4]
    updatedFormData[index] = {
      ...updatedFormData[index],
      type_form: selectedForm.name,
    }
    setFormData4(updatedFormData)
    try {
      await axios
        .get(`/api/courses/criteria/evaluation-form/aspect`, {
          params: {
            formType: value,
            formName: formName4,
            prodiId: matkul.prodi_id,
          },
        })
        .then((res) => {
          setAspekOptions4(res.data.data)
          console.log('ini aspek ets p', aspekOptions4)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAspekChange4 = async (value, index) => {
    findActiveTab()

    // console.log('ini aspek', value)
    // console.log('Index:', index)

    const selectedForm = aspekOptions4.find((item) => item.name === value)
    // console.log('nemu aspek', selectedForm)

    if (number4 === 0) {
      const updatedFormData = [...formData4]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm.id,
        aspect_name: value,
        bobot_criteria: 100,
        id: null,
      }
      setFormData4(updatedFormData)
    } else {
      const updatedFormData = [...formData4]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm.id,
        aspect_name: value,
        id: null,
      }
      setFormData4(updatedFormData)
    }
  }

  const handleBobotChange4 = async (value, index) => {
    findActiveTab()

    // console.log('ini aspek', value)
    // console.log('Index:', index)
    const updatedFormData = [...formData4]
    updatedFormData[index] = {
      ...updatedFormData[index],
      bobot_criteria: value,
    }
    setFormData4(updatedFormData)
  }

  const onFinish4 = () => {
    findActiveTab()
    // console.log('Received values:', values)
    // console.log('ini datanya', formData)
    // setValue(values)
    console.log('criteria_data eas p', formData4)
  }

  const handleRemoveField4 = (fieldName, index, remove) => {
    findActiveTab()
    const updatedFormData = [...formData4]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData4(updatedFormData)
    remove(fieldName) // Menghapus elemen dari Form.List fields
  }

  const handleViewData4 = async () => {
    console.log('criteria_data', formData4)
    // console.log('lihat bobot ', bobot)
    findActiveTab()
    const postData = {
      id: komponen4.id,
      name: komponen4.name,
      criteria_data: formData4,
      is_average: 1,
    }
    console.log('ini postdata eas t', postData)
    // console.log(typeof postData.id)

    try {
      await axios
        .put(`/api/courses/component/criteria/update`, {
          id: komponen4.id,
          name: komponen4.name,
          criteria_data: formData4,
          is_average: 1,
        })
        .then((response) => {
          // Tangani respons setelah berhasil melakukan POST
          console.log('Berhasil melakukan POST', response.data)
          notification.success({
            message: 'Data bobot kriteria tersimpan',
          })
        })
    } catch (error) {
      console.error('Gagal melakukan POST', error)
      notification.error({
        message: 'Data bobot kriteria gagal tersimpan',
      })
    }
  }

  //INI UNTUK LAIN LAIN P
  const onChange5 = (checked) => {
    if (checked) {
      setNumber5(1) // Mengubah angka menjadi 1 jika tombol dinyalakan
    } else {
      setNumber5(0) // Mengubah angka menjadi 0 jika tombol dimatikan
    }
  }
  const handleFormPenilaianChange5 = async (value, index) => {
    findActiveTab()
    // console.log('ini formName', value)
    // console.log('Index:', index)

    setFormName5(value)
    console.log('ini formName', formName5)

    const selectedForm = formPenilaian5.find((item) => item.form_name === value)
    console.log('nemu Evaluasi Form Penilaian', selectedForm)

    const updatedFormData = [...formData5]
    updatedFormData[index] = {
      ...updatedFormData[index],
      name_form: selectedForm.form_name,
      component_id: dataKriteria5.id,
    }
    setFormData5(updatedFormData)
    console.log('INI DI TF KE FORM DATA', formData5)
    try {
      await axios
        .get(`/api/courses/criteria/evaluation-form/aspect/type`, {
          params: {
            formType: value,
            prodiId: matkul.prodi_id,
          },
        })
        .then((res) => {
          setTahapOptions5(res.data.data)
          console.log('ini tahap ets p', tahapOptions5)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleTahapChange5 = async (value, index) => {
    findActiveTab()
    // console.log(findActiveTab())
    // setSelectedFormType(value)
    console.log('ini tahap', value)
    console.log('Index:', index)

    const selectedForm = tahapOptions5.find((item) => item.name === value)

    const updatedFormData = [...formData5]
    updatedFormData[index] = {
      ...updatedFormData[index],
      type_form: selectedForm.name,
    }
    setFormData5(updatedFormData)
    try {
      await axios
        .get(`/api/courses/criteria/evaluation-form/aspect`, {
          params: {
            formType: value,
            formName: formName5,
            prodiId: matkul.prodi_id,
          },
        })
        .then((res) => {
          setAspekOptions5(res.data.data)
          console.log('ini aspek ets p', aspekOptions5)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAspekChange5 = async (value, index) => {
    findActiveTab()

    // console.log('ini aspek', value)
    // console.log('Index:', index)

    const selectedForm = aspekOptions5.find((item) => item.name === value)
    // console.log('nemu aspek', selectedForm)

    if (number5 === 0) {
      const updatedFormData = [...formData5]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm.id,
        aspect_name: value,
        bobot_criteria: 100,
        id: null,
      }
      setFormData5(updatedFormData)
    } else {
      const updatedFormData = [...formData5]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm.id,
        aspect_name: value,
        id: null,
      }
      setFormData5(updatedFormData)
    }
  }

  const handleBobotChange5 = async (value, index) => {
    findActiveTab()

    // console.log('ini aspek', value)
    // console.log('Index:', index)
    const updatedFormData = [...formData5]
    updatedFormData[index] = {
      ...updatedFormData[index],
      bobot_criteria: value,
    }
    setFormData5(updatedFormData)
  }

  const onFinish5 = () => {
    findActiveTab()
    // console.log('Received values:', values)
    // console.log('ini datanya', formData)
    // setValue(values)
    console.log('criteria_data eas p', formData5)
  }

  const handleRemoveField5 = (fieldName, index, remove) => {
    findActiveTab()
    const updatedFormData = [...formData5]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData5(updatedFormData)
    remove(fieldName) // Menghapus elemen dari Form.List fields
  }

  const handleViewData5 = async () => {
    console.log('criteria_data', formData5)
    // console.log('lihat bobot ', bobot)
    findActiveTab()
    const postData = {
      id: komponen5.id,
      name: komponen5.name,
      criteria_data: formData5,
      is_average: 1,
    }
    console.log('ini postdata eas t', postData)
    // console.log(typeof postData.id)

    try {
      await axios
        .put(`/api/courses/component/criteria/update`, {
          id: komponen5.id,
          name: komponen5.name,
          criteria_data: formData5,
          is_average: 1,
        })
        .then((response) => {
          // Tangani respons setelah berhasil melakukan POST
          console.log('Berhasil melakukan POST', response.data)
          notification.success({
            message: 'Data bobot kriteria tersimpan',
          })
        })
    } catch (error) {
      console.error('Gagal melakukan POST', error)
      notification.error({
        message: 'Data bobot kriteria gagal tersimpan',
      })
    }
  }

  return (
    <>
      <CCardBody style={{ paddingLeft: '20px' }}>
        <Tabs
          type="card"
          // onChange={onChangeProdi}
          // defaultActiveKey={prodi}
          // onChange={setActiveTab}
          activeKey={activeTab}
          onChange={handleTabChange}
        >
          <TabPane
            tab={'ETS Teori'}
            key={'0'}
            // key={'0'} disabled={KP === 0}
          >
            <CRow>
              <CCol>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <h6>Kustomisasi Bobot</h6>
                  </div>
                  <Switch defaultChecked={number === 1} onChange={onChange} />
                  {/* <p>Angka: {number}</p> */}
                </div>
              </CCol>
              <CCol sm={12}>
                <Form
                  form={form}
                  name="dynamic_form_nest_item"
                  onFinish={onFinish}
                  // style={{
                  //   maxWidth: 600,
                  // }}
                  autoComplete="off"
                  fields={[
                    {
                      name: ['form_type'],
                      // value: formData[index]?.name_form ? formData[index].name_form : undefined,
                    },
                    {
                      name: ['tahapOptions'],
                      // value: formData[index]?.type_form ? formData[index].type_form : undefined,
                    },
                    {
                      name: ['aspekOptions'],
                      // value: formData[index]?.aspect_name ? formData[index].aspect_name : undefined,
                    },
                    {
                      name: ['bobot'],
                      // value: formData[index]?.bobot_criteria ? formData[index].bobot_criteria: undefined,
                    },
                  ]}
                >
                  <Form.List name="users">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, index) => (
                          <Space
                            key={field.key}
                            style={{
                              display: 'flex',
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...field}
                              name={[field.name, 'form_type']}
                              fieldKey={[field.fieldKey, 'form_type']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Evaluasi Form Penilaian tidak boleh kosong!',
                                },
                              ]}
                              // style={{ paddingRight: '35px' }}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Evaluasi Form Penilaian</b>
                              <Select
                                // style={{ width: '100%' }}
                                // onChange={handleFormPenilaianChange}
                                defaultValue={
                                  formData[index]?.name_form ? formData[index].name_form : undefined
                                }
                                onChange={(value) => handleFormPenilaianChange(value, index)}
                              >
                                {formPenilaian.map((item, i) => (
                                  <Select.Option key={item.form_type} value={item.form_type}>
                                    {item.form_type}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              // label="Sight"
                              name={[field.name, 'tahapOptions']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Tahap tidak boleh kosong',
                                },
                              ]}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Tahap</b>
                              <Select
                                // disabled={!form.getFieldValue('formPenilaian')}
                                // style={{
                                //   width: 130,
                                // }}
                                // onChange={handleTahapChange}
                                defaultValue={
                                  formData[index]?.type_form ? formData[index].type_form : undefined
                                }
                                onChange={(value) => handleTahapChange(value, index)}
                              >
                                {tahapOptions.map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    {item.name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              // label="Sight"
                              name={[field.name, 'aspekOptions']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Aspek tidak boleh kosong',
                                },
                              ]}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Aspek</b>
                              <Select
                                // disabled={tahapOptions === null}
                                // style={{
                                //   minWidth: '100%',
                                // }}
                                // onChange={handleTahapChange}
                                defaultValue={
                                  formData[index]?.aspect_name
                                    ? formData[index].aspect_name
                                    : undefined
                                }
                                onChange={(value) => handleAspekChange(value, index)}
                              >
                                {aspekOptions.map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    {item.name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            {number === 1 && (
                              <Form.Item
                                {...field}
                                name={[field.name, 'bobot']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Bobot tidak boleh kosong',
                                  },
                                ]}
                                validateTrigger={['onChange', 'onBlur']}
                              >
                                <b>Bobot </b>
                                <InputNumber
                                  // id={text.id}
                                  type="number"
                                  min="0"
                                  max="100"
                                  addonAfter="%"
                                  // disabled={text.is_selected === 0}
                                  // value={text.criteria_bobot}
                                  defaultValue={
                                    formData[index]?.bobot_criteria
                                      ? formData[index].bobot_criteria
                                      : undefined
                                  }
                                  onChange={(value) => handleBobotChange(value, index)}
                                />
                              </Form.Item>
                            )}

                            <MinusCircleOutlined
                              // onClick={() => remove(field.name)}
                              onClick={() => handleRemoveField(field.name, index, remove)}
                            />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            // onClick={handleAddCriteria}
                            block
                            icon={<PlusOutlined />}
                          >
                            Kriteria Penilaian
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => handleViewData()}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </CCol>
            </CRow>
          </TabPane>
          <TabPane
            tab={'ETS Praktek'}
            key={'1'}
            // key={'0'} disabled={KP === 0}
          >
            <CRow>
              <CCol>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <h6>Kustomisasi Bobot</h6>
                  </div>
                  <Switch defaultChecked={number1 === 1} onChange={onChange1} />
                  {/* <p>Angka: {number1}</p> */}
                </div>
              </CCol>
              <CCol sm={12}>
                <Form
                  name="dynamic_form_nest_item"
                  onFinish={onFinish1}
                  // style={{
                  //   maxWidth: 600,
                  // }}
                  autoComplete="off"
                >
                  <Form.List name="users">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, index) => (
                          <Space
                            key={field.key}
                            style={{
                              display: 'flex',
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...field}
                              name={[field.name, 'form_type']}
                              fieldKey={[field.fieldKey, 'form_type']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Evaluasi Form Penilaian tidak boleh kosong!',
                                },
                              ]}
                              // style={{ paddingRight: '35px' }}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Evaluasi Form Penilaian</b>
                              <Select
                                // style={{ width: '100%' }}
                                // onChange={handleFormPenilaianChange}
                                defaultValue={
                                  formData1[index]?.name_form
                                    ? formData1[index].name_form
                                    : undefined
                                }
                                onChange={(value) => handleFormPenilaianChange1(value, index)}
                              >
                                {formPenilaian1.map((item, i) => (
                                  <Select.Option key={item.form_type} value={item.form_type}>
                                    {item.form_type}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              // label="Sight"
                              name={[field.name, 'tahapOptions']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Tahap tidak boleh kosong',
                                },
                              ]}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Tahap</b>
                              <Select
                                // disabled={!form.getFieldValue('formPenilaian')}
                                // style={{
                                //   width: 130,
                                // }}
                                // onChange={handleTahapChange}
                                defaultValue={
                                  formData1[index]?.type_form
                                    ? formData1[index].type_form
                                    : undefined
                                }
                                onChange={(value) => handleTahapChange1(value, index)}
                              >
                                {tahapOptions1.map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    {item.name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              // label="Sight"
                              name={[field.name, 'aspekOptions']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Aspek tidak boleh kosong',
                                },
                              ]}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Aspek</b>
                              <Select
                                // disabled={tahapOptions === null}
                                // style={{
                                //   minWidth: '100%',
                                // }}
                                // onChange={handleTahapChange}
                                defaultValue={
                                  formData1[index]?.aspect_name
                                    ? formData1[index].aspect_name
                                    : undefined
                                }
                                onChange={(value) => handleAspekChange1(value, index)}
                              >
                                {aspekOptions1.map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    {item.name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            {number1 === 1 && (
                              <Form.Item
                                {...field}
                                name={[field.name, 'bobot']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Bobot tidak boleh kosong',
                                  },
                                ]}
                                validateTrigger={['onChange', 'onBlur']}
                              >
                                <b>Bobot </b>
                                <InputNumber
                                  // id={text.id}
                                  type="number"
                                  min="0"
                                  max="100"
                                  addonAfter="%"
                                  // disabled={text.is_selected === 0}
                                  // value={text.criteria_bobot}
                                  defaultValue={
                                    formData1[index]?.bobot_criteria
                                      ? formData1[index].bobot_criteria
                                      : undefined
                                  }
                                  onChange={(value) => handleBobotChange1(value, index)}
                                />
                              </Form.Item>
                            )}
                            <MinusCircleOutlined
                              // onClick={() => remove(field.name)}
                              onClick={() => handleRemoveField1(field.name, index, remove)}
                            />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            // onClick={handleAddCriteria}
                            block
                            icon={<PlusOutlined />}
                          >
                            Kriteria Penilaian
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => handleViewData1()}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </CCol>
            </CRow>
          </TabPane>
          <TabPane
            tab={'EAS Teori'}
            key={'2'}
            // key={'0'} disabled={KP === 0}
          >
            <CRow>
              <CCol>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <h6>Kustomisasi Bobot</h6>
                  </div>
                  <Switch defaultChecked={number2 === 1} onChange={onChange2} />
                  {/* <p>Angka: {number}</p> */}
                </div>
              </CCol>
              <CCol sm={12}>
                <Form
                  name="dynamic_form_nest_item"
                  onFinish={onFinish2}
                  // style={{
                  //   maxWidth: 600,
                  // }}
                  autoComplete="off"
                >
                  <Form.List name="users">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, index) => (
                          <Space
                            key={field.key}
                            style={{
                              display: 'flex',
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...field}
                              name={[field.name, 'form_type']}
                              fieldKey={[field.fieldKey, 'form_type']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Evaluasi Form Penilaian tidak boleh kosong!',
                                },
                              ]}
                              // style={{ paddingRight: '35px' }}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Evaluasi Form Penilaian</b>
                              <Select
                                // style={{ width: '100%' }}
                                // onChange={handleFormPenilaianChange}
                                defaultValue={
                                  formData2[index]?.name_form
                                    ? formData2[index].name_form
                                    : undefined
                                }
                                onChange={(value) => handleFormPenilaianChange2(value, index)}
                              >
                                {formPenilaian2.map((item, i) => (
                                  <Select.Option key={item.form_type} value={item.form_type}>
                                    {item.form_type}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              // label="Sight"
                              name={[field.name, 'tahapOptions']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Tahap tidak boleh kosong',
                                },
                              ]}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Tahap</b>
                              <Select
                                // disabled={!form.getFieldValue('formPenilaian')}
                                // style={{
                                //   width: 230,
                                // }}
                                // onChange={handleTahapChange}
                                defaultValue={
                                  formData2[index]?.type_form
                                    ? formData2[index].type_form
                                    : undefined
                                }
                                onChange={(value) => handleTahapChange2(value, index)}
                              >
                                {tahapOptions2.map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    {item.name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              // label="Sight"
                              name={[field.name, 'aspekOptions']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Aspek tidak boleh kosong',
                                },
                              ]}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Aspek</b>
                              <Select
                                // disabled={tahapOptions === null}
                                // style={{
                                //   minWidth: '200%',
                                // }}
                                // onChange={handleTahapChange}
                                defaultValue={
                                  formData2[index]?.aspect_name
                                    ? formData2[index].aspect_name
                                    : undefined
                                }
                                onChange={(value) => handleAspekChange2(value, index)}
                              >
                                {aspekOptions2.map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    {item.name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            {number2 === 1 && (
                              <Form.Item
                                {...field}
                                name={[field.name, 'bobot']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Bobot tidak boleh kosong',
                                  },
                                ]}
                                validateTrigger={['onChange', 'onBlur']}
                              >
                                <b>Bobot </b>
                                <InputNumber
                                  // id={text.id}
                                  type="number"
                                  min="0"
                                  max="100"
                                  addonAfter="%"
                                  // disabled={text.is_selected === 0}
                                  // value={text.criteria_bobot}
                                  defaultValue={
                                    formData2[index]?.bobot_criteria
                                      ? formData2[index].bobot_criteria
                                      : undefined
                                  }
                                  onChange={(value) => handleBobotChange2(value, index)}
                                />
                              </Form.Item>
                            )}
                            <MinusCircleOutlined
                              // onClick={() => remove(field.name)}
                              onClick={() => handleRemoveField2(field.name, index, remove)}
                            />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            // onClick={handleAddCriteria}
                            block
                            icon={<PlusOutlined />}
                          >
                            Kriteria Penilaian
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => handleViewData2()}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </CCol>
            </CRow>
          </TabPane>
          <TabPane
            tab={'EAS Praktek'}
            key={'3'}
            // key={'0'} disabled={KP === 0}
          >
            <CRow>
              <CCol>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <h6>Kustomisasi Bobot</h6>
                  </div>
                  <Switch defaultChecked={number3 === 1} onChange={onChange3} />
                  {/* <p>Angka: {number}</p> */}
                </div>
              </CCol>
              <CCol sm={12}>
                <Form
                  name="dynamic_form_nest_item"
                  onFinish={onFinish3}
                  // style={{
                  //   maxWidth: 600,
                  // }}
                  autoComplete="off"
                >
                  <Form.List name="users">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, index) => (
                          <Space
                            key={field.key}
                            style={{
                              display: 'flex',
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...field}
                              name={[field.name, 'form_type']}
                              fieldKey={[field.fieldKey, 'form_type']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Evaluasi Form Penilaian tidak boleh kosong!',
                                },
                              ]}
                              // style={{ paddingRight: '35px' }}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Evaluasi Form Penilaian</b>
                              <Select
                                // style={{ width: '100%' }}
                                // onChange={handleFormPenilaianChange}
                                defaultValue={
                                  formData3[index]?.name_form
                                    ? formData3[index].name_form
                                    : undefined
                                }
                                onChange={(value) => handleFormPenilaianChange3(value, index)}
                              >
                                {formPenilaian3.map((item, i) => (
                                  <Select.Option key={item.form_type} value={item.form_type}>
                                    {item.form_type}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              // label="Sight"
                              name={[field.name, 'tahapOptions']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Tahap tidak boleh kosong',
                                },
                              ]}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Tahap</b>
                              <Select
                                // disabled={!form.getFieldValue('formPenilaian')}
                                // style={{
                                //   width: 330,
                                // }}
                                // onChange={handleTahapChange}
                                defaultValue={
                                  formData3[index]?.type_form
                                    ? formData3[index].type_form
                                    : undefined
                                }
                                onChange={(value) => handleTahapChange3(value, index)}
                              >
                                {tahapOptions3.map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    {item.name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              // label="Sight"
                              name={[field.name, 'aspekOptions']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Aspek tidak boleh kosong',
                                },
                              ]}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Aspek</b>
                              <Select
                                // disabled={tahapOptions === null}
                                // style={{
                                //   minWidth: '300%',
                                // }}
                                // onChange={handleTahapChange}
                                defaultValue={
                                  formData3[index]?.aspect_name
                                    ? formData3[index].aspect_name
                                    : undefined
                                }
                                onChange={(value) => handleAspekChange3(value, index)}
                              >
                                {aspekOptions3.map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    {item.name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            {number3 === 1 && (
                              <Form.Item
                                {...field}
                                name={[field.name, 'bobot']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Bobot tidak boleh kosong',
                                  },
                                ]}
                                validateTrigger={['onChange', 'onBlur']}
                              >
                                <b>Bobot </b>
                                <InputNumber
                                  // id={text.id}
                                  type="number"
                                  min="0"
                                  max="100"
                                  addonAfter="%"
                                  // disabled={text.is_selected === 0}
                                  // value={text.criteria_bobot}
                                  defaultValue={
                                    formData3[index]?.bobot_criteria
                                      ? formData3[index].bobot_criteria
                                      : undefined
                                  }
                                  onChange={(value) => handleBobotChange3(value, index)}
                                />
                              </Form.Item>
                            )}
                            <MinusCircleOutlined
                              // onClick={() => remove(field.name)}
                              onClick={() => handleRemoveField3(field.name, index, remove)}
                            />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            // onClick={handleAddCriteria}
                            block
                            icon={<PlusOutlined />}
                          >
                            Kriteria Penilaian
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => handleViewData3()}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </CCol>
            </CRow>
          </TabPane>
          <TabPane
            tab={'Lain - Lain Teori'}
            key={'4'}
            // key={'0'} disabled={KP === 0}
          >
            <CRow>
              <CCol>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <h6>Kustomisasi Bobot</h6>
                  </div>
                  <Switch defaultChecked={number4 === 1} onChange={onChange4} />
                  {/* <p>Angka: {number}</p> */}
                </div>
              </CCol>
              <CCol sm={12}>
                <Form
                  name="dynamic_form_nest_item"
                  onFinish={onFinish4}
                  // style={{
                  //   maxWidth: 600,
                  // }}
                  autoComplete="off"
                >
                  <Form.List name="users">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, index) => (
                          <Space
                            key={field.key}
                            style={{
                              display: 'flex',
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...field}
                              name={[field.name, 'form_type']}
                              fieldKey={[field.fieldKey, 'form_type']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Evaluasi Form Penilaian tidak boleh kosong!',
                                },
                              ]}
                              // style={{ paddingRight: '35px' }}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Evaluasi Form Penilaian</b>
                              <Select
                                // style={{ width: '100%' }}
                                // onChange={handleFormPenilaianChange}
                                defaultValue={
                                  formData4[index]?.name_form
                                    ? formData4[index].name_form
                                    : undefined
                                }
                                onChange={(value) => handleFormPenilaianChange4(value, index)}
                              >
                                {formPenilaian4.map((item, i) => (
                                  <Select.Option key={item.form_type} value={item.form_type}>
                                    {item.form_type}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              // label="Sight"
                              name={[field.name, 'tahapOptions']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Tahap tidak boleh kosong',
                                },
                              ]}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Tahap</b>
                              <Select
                                // disabled={!form.getFieldValue('formPenilaian')}
                                // style={{
                                //   width: 440,
                                // }}
                                // onChange={handleTahapChange}
                                defaultValue={
                                  formData4[index]?.type_form
                                    ? formData4[index].type_form
                                    : undefined
                                }
                                onChange={(value) => handleTahapChange4(value, index)}
                              >
                                {tahapOptions4.map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    {item.name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              // label="Sight"
                              name={[field.name, 'aspekOptions']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Aspek tidak boleh kosong',
                                },
                              ]}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Aspek</b>
                              <Select
                                // disabled={tahapOptions === null}
                                // style={{
                                //   minWidth: '400%',
                                // }}
                                // onChange={handleTahapChange}
                                defaultValue={
                                  formData4[index]?.aspect_name
                                    ? formData4[index].aspect_name
                                    : undefined
                                }
                                onChange={(value) => handleAspekChange4(value, index)}
                              >
                                {aspekOptions4.map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    {item.name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            {number4 === 1 && (
                              <Form.Item
                                {...field}
                                name={[field.name, 'bobot']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Bobot tidak boleh kosong',
                                  },
                                ]}
                                validateTrigger={['onChange', 'onBlur']}
                              >
                                <b>Bobot </b>
                                <InputNumber
                                  // id={text.id}
                                  type="number"
                                  min="0"
                                  max="100"
                                  addonAfter="%"
                                  // disabled={text.is_selected === 0}
                                  // value={text.criteria_bobot}
                                  defaultValue={
                                    formData4[index]?.bobot_criteria
                                      ? formData4[index].bobot_criteria
                                      : undefined
                                  }
                                  onChange={(value) => handleBobotChange4(value, index)}
                                />
                              </Form.Item>
                            )}
                            <MinusCircleOutlined
                              // onClick={() => remove(field.name)}
                              onClick={() => handleRemoveField4(field.name, index, remove)}
                            />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            // onClick={handleAddCriteria}
                            block
                            icon={<PlusOutlined />}
                          >
                            Kriteria Penilaian
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => handleViewData4()}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </CCol>
            </CRow>
          </TabPane>
          <TabPane
            tab={'Lain - Lain Praktek'}
            key={'5'}
            // key={'0'} disabled={KP === 0}
          >
            <CRow>
              <CCol>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <h6>Kustomisasi Bobot</h6>
                  </div>
                  <Switch defaultChecked={number5 === 1} onChange={onChange5} />
                  {/* <p>Angka: {number}</p> */}
                </div>
              </CCol>
              <CCol sm={12}>
                <Form
                  name="dynamic_form_nest_item"
                  onFinish={onFinish5}
                  // style={{
                  //   maxWidth: 600,
                  // }}
                  autoComplete="off"
                >
                  <Form.List name="users">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, index) => (
                          <Space
                            key={field.key}
                            style={{
                              display: 'flex',
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...field}
                              name={[field.name, 'form_type']}
                              fieldKey={[field.fieldKey, 'form_type']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Evaluasi Form Penilaian tidak boleh kosong!',
                                },
                              ]}
                              // style={{ paddingRight: '35px' }}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Evaluasi Form Penilaian</b>
                              <Select
                                // style={{ width: '100%' }}
                                // onChange={handleFormPenilaianChange}
                                defaultValue={
                                  formData5[index]?.name_form
                                    ? formData5[index].name_form
                                    : undefined
                                }
                                onChange={(value) => handleFormPenilaianChange5(value, index)}
                              >
                                {formPenilaian5.map((item, i) => (
                                  <Select.Option key={item.form_type} value={item.form_type}>
                                    {item.form_type}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              // label="Sight"
                              name={[field.name, 'tahapOptions']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Tahap tidak boleh kosong',
                                },
                              ]}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Tahap</b>
                              <Select
                                // disabled={!form.getFieldValue('formPenilaian')}
                                // style={{
                                //   width: 550,
                                // }}
                                // onChange={handleTahapChange}
                                defaultValue={
                                  formData5[index]?.type_form
                                    ? formData5[index].type_form
                                    : undefined
                                }
                                onChange={(value) => handleTahapChange5(value, index)}
                              >
                                {tahapOptions5.map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    {item.name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...field}
                              // label="Sight"
                              name={[field.name, 'aspekOptions']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Aspek tidak boleh kosong',
                                },
                              ]}
                              validateTrigger={['onChange', 'onBlur']}
                            >
                              <b>Aspek</b>
                              <Select
                                // disabled={tahapOptions === null}
                                // style={{
                                //   minWidth: '500%',
                                // }}
                                // onChange={handleTahapChange}
                                defaultValue={
                                  formData5[index]?.aspect_name
                                    ? formData5[index].aspect_name
                                    : undefined
                                }
                                onChange={(value) => handleAspekChange5(value, index)}
                              >
                                {aspekOptions5.map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    {item.name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            {number5 === 1 && (
                              <Form.Item
                                {...field}
                                name={[field.name, 'bobot']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Bobot tidak boleh kosong',
                                  },
                                ]}
                                validateTrigger={['onChange', 'onBlur']}
                              >
                                <b>Bobot </b>
                                <InputNumber
                                  // id={text.id}
                                  type="number"
                                  min="0"
                                  max="100"
                                  addonAfter="%"
                                  // disabled={text.is_selected === 0}
                                  // value={text.criteria_bobot}
                                  defaultValue={
                                    formData5[index]?.bobot_criteria
                                      ? formData5[index].bobot_criteria
                                      : undefined
                                  }
                                  onChange={(value) => handleBobotChange5(value, index)}
                                />
                              </Form.Item>
                            )}
                            <MinusCircleOutlined
                              // onClick={() => remove(field.name)}
                              onClick={() => handleRemoveField5(field.name, index, remove)}
                            />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            // onClick={handleAddCriteria}
                            block
                            icon={<PlusOutlined />}
                          >
                            Kriteria Penilaian
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => handleViewData5()}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </CCol>
            </CRow>
          </TabPane>
        </Tabs>
      </CCardBody>
    </>
  )
}
export default PembobotanKriteriaMataKuliah
