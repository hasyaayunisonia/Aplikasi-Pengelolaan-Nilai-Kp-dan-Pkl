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
import PropTypes from 'prop-types'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const { Step } = Steps
const { Option } = Select
const { TabPane } = Tabs

const PembobotanKriteriaMataKuliah = ({ current, setCurrent }) => {
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
  const [bobotKomponen, setBobotKomponen] = useState({})
  const [formPenilaian, setFormPenilaian] = useState([])
  const [tahapOptions, setTahapOptions] = useState([])
  const [aspekOptions, setAspekOptions] = useState([])
  const [formData, setFormData] = useState([])
  const [komponen, setKomponen] = useState({})
  const [activeTab, setActiveTab] = useState('0')
  const [dataKriteria, setDataKriteria] = useState([])
  const [number, setNumber] = useState(0)
  const [formName, setFormName] = useState('')
  const [formDataAwal, setFormDataAwal] = useState([])
  const [tahapOptionsBaru, setTahapOptionsBaru] = useState([])
  const [aspekOptionsBaru, setAspekOptionsBaru] = useState([])

  // const [current, setCurrent] = useState(0)
  const [isSpinner, setIsSpinner] = useState(true)

  const [formPenilaian1, setFormPenilaian1] = useState([])
  const [tahapOptions1, setTahapOptions1] = useState([])
  const [aspekOptions1, setAspekOptions1] = useState([])
  const [dataKriteria1, setDataKriteria1] = useState([])
  const [formData1, setFormData1] = useState([])
  const [komponen1, setKomponen1] = useState({})
  const [number1, setNumber1] = useState(0)
  const [formName1, setFormName1] = useState('')
  const [formDataAwal1, setFormDataAwal1] = useState([])
  const [tahapOptionsBaru1, setTahapOptionsBaru1] = useState([])
  const [aspekOptionsBaru1, setAspekOptionsBaru1] = useState([])

  const [formPenilaian2, setFormPenilaian2] = useState([])
  const [tahapOptions2, setTahapOptions2] = useState([])
  const [aspekOptions2, setAspekOptions2] = useState([])
  const [dataKriteria2, setDataKriteria2] = useState([])
  const [formData2, setFormData2] = useState([])
  const [komponen2, setKomponen2] = useState({})
  const [number2, setNumber2] = useState(0)
  const [formName2, setFormName2] = useState('')
  const [formDataAwal2, setFormDataAwal2] = useState([])
  const [tahapOptionsBaru2, setTahapOptionsBaru2] = useState([])
  const [aspekOptionsBaru2, setAspekOptionsBaru2] = useState([])

  const [formPenilaian3, setFormPenilaian3] = useState([])
  const [tahapOptions3, setTahapOptions3] = useState([])
  const [aspekOptions3, setAspekOptions3] = useState([])
  const [dataKriteria3, setDataKriteria3] = useState([])
  const [formData3, setFormData3] = useState([])
  const [komponen3, setKomponen3] = useState({})
  const [number3, setNumber3] = useState(0)
  const [formName3, setFormName3] = useState('')
  const [formDataAwal3, setFormDataAwal3] = useState([])
  const [tahapOptionsBaru3, setTahapOptionsBaru3] = useState([])
  const [aspekOptionsBaru3, setAspekOptionsBaru3] = useState([])

  const [formPenilaian4, setFormPenilaian4] = useState([])
  const [tahapOptions4, setTahapOptions4] = useState([])
  const [aspekOptions4, setAspekOptions4] = useState([])
  const [dataKriteria4, setDataKriteria4] = useState([])
  const [formData4, setFormData4] = useState([])
  const [komponen4, setKomponen4] = useState({})
  const [number4, setNumber4] = useState(0)
  const [formName4, setFormName4] = useState('')
  const [formDataAwal4, setFormDataAwal4] = useState([])
  const [tahapOptionsBaru4, setTahapOptionsBaru4] = useState([])
  const [aspekOptionsBaru4, setAspekOptionsBaru4] = useState([])

  const [formPenilaian5, setFormPenilaian5] = useState([])
  const [tahapOptions5, setTahapOptions5] = useState([])
  const [aspekOptions5, setAspekOptions5] = useState([])
  const [dataKriteria5, setDataKriteria5] = useState([])
  const [formData5, setFormData5] = useState([])
  const [komponen5, setKomponen5] = useState({})
  const [number5, setNumber5] = useState(0)
  const [formName5, setFormName5] = useState('')
  const [formDataAwal5, setFormDataAwal5] = useState([])
  const [tahapOptionsBaru5, setTahapOptionsBaru5] = useState([])
  const [aspekOptionsBaru5, setAspekOptionsBaru5] = useState([])

  axios.defaults.withCredentials = true

  const [refresh, setRefresh] = useState(false)

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
  }

  const refreshLoading = () => {
    setRefresh(true)
  }

  axios.defaults.withCredentials = true

  useEffect(() => {
    async function fetchData() {
      try {
        const mataKuliahResponse = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/form`,
        )
        const formPenilaianResponse = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/${mataKuliahResponse.data.data[0].prodi_id}`,
        )
        const dataKriteriaResponse = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/form/${id}`,
        )

        setMatkul(mataKuliahResponse.data.data.find((item) => item.id === parseInt(id)))

        //ini untuk tab komponen penilaian
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/course-form/${id}`,
        )

        setBobotKomponen({
          UasPraktek: res.data.data[0].bobot_component,
          UasTeori: res.data.data[1].bobot_component,
          UtsPraktek: res.data.data[2].bobot_component,
          UtsTeori: res.data.data[3].bobot_component,
          LainPraktek: res.data.data[4].bobot_component,
          LainTeori: res.data.data[5].bobot_component,
          idUasPraktek: res.data.data[0].id,
          idUasTeori: res.data.data[1].id,
          idUtsPraktek: res.data.data[2].id,
          idUtsTeori: res.data.data[3].id,
          idLainPraktek: res.data.data[4].id,
        })

        console.log('ini bobot komponen', bobotKomponen)

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
        setIsLoading(false)
      } catch (error) {
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
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    console.log('ini matkul', matkul)
    console.log('ini prodi matkul', matkul.prodi_id)
    console.log('ini form', formPenilaian)
    // console.log('ini data kriteria', dataKriteria)
  }, [matkul])

  useEffect(() => {
    console.log('==> Ini active tab', activeTab)
  }, [activeTab])

  useEffect(() => {
    console.log('==> Ini  bobot komponen', bobotKomponen)
  }, [bobotKomponen])

  useEffect(() => {
    console.log('ini tahap', tahapOptions)
  }, [tahapOptions])

  useEffect(() => {
    console.log('ini aspek', aspekOptions)
  }, [aspekOptions])

  useEffect(() => {
    console.log('ini tahap baru', tahapOptionsBaru)
  }, [tahapOptionsBaru])

  useEffect(() => {
    console.log('ini aspek baru', aspekOptionsBaru)
  }, [aspekOptionsBaru])

  useEffect(() => {
    console.log(komponen)
  }, [komponen])

  useEffect(() => {
    console.log('===> INI Data kriteria', dataKriteria)
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
      setFormDataAwal(mappedData)
    }
  }, [dataKriteria])

  useEffect(() => {
    console.log('ini FORM DATA', formData)

    const fetchData = async () => {
      const tahapPromises = formData.map(async (data) => {
        if (data.name_form) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
            {
              params: {
                formType: data.name_form,
                prodiId: matkul.prodi_id,
              },
            },
          )
          return res.data.data
        }
        return null
      })

      console.log('ini masuk ke use effect')

      // const aspekPromises = formData.map(async (data) => {
      //   // Menambahkan kondisi jika formData.aspect_form_id sudah ada
      //   if (data.aspect_form_id) {
      //     const res = await axios.get(
      //       `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
      //       {
      //         params: {
      //           formType: data.type_form,
      //           formName: data.name_form,
      //           prodiId: matkul.prodi_id,
      //         },
      //       },
      //     )
      //     return res.data.data
      //   }
      //   return null
      // })

      const aspekPromises = formData.map(async (data) => {
        // Menambahkan kondisi jika formData.aspect_form_id sudah ada
        if (data.aspect_form_id) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
            {
              params: {
                formType: data.type_form,
                formName: data.name_form,
                prodiId: matkul.prodi_id,
              },
            },
          )
          return res.data.data
        }
        return null
      })

      // const tahapData = await Promise.all(tahapPromises)
      // const aspekData = await Promise.all(aspekPromises)
      const tahapData = await Promise.all(tahapPromises)
      const filteredTahapData = tahapData.filter((data) => data !== null)
      if (formData.length <= formDataAwal.length) {
        const aspekData = await Promise.all(aspekPromises)
        const filteredAspekData = aspekData.filter((data) => data !== null)
        setAspekOptions(filteredAspekData)
      }

      setTahapOptions(filteredTahapData)

      console.log('ini aspekOptions di use effect', aspekOptions)
    }

    fetchData()
  }, [formData])

  useEffect(() => {
    // Tindakan yang harus dilakukan ketika aspekOptions berubah
    console.log('aspekOptions berubah:', aspekOptions)
  }, [aspekOptions])

  useEffect(() => {
    console.log('ini FORM DATA Awal', formDataAwal)
  }, [formDataAwal])

  useEffect(() => {
    // console.log('ini FORM Name', formName)
  }, [formName])

  //ETS Praktek
  useEffect(() => {
    console.log('ini tahap 1', tahapOptions1)
  }, [tahapOptions1])

  useEffect(() => {
    console.log('ini aspek 1', aspekOptions1)
  }, [aspekOptions1])

  useEffect(() => {
    console.log('ini tahap baru 1', tahapOptionsBaru1)
  }, [tahapOptionsBaru1])

  useEffect(() => {
    console.log('ini aspek baru 1', aspekOptionsBaru1)
  }, [aspekOptionsBaru1])

  useEffect(() => {
    console.log('ini FORM Name 1', formName1)
  }, [formName1])

  useEffect(() => {
    console.log('===> INI Data kriteria 1', dataKriteria1)
    //maping data kriteria untuk ets t
    const cek = dataKriteria1.criteria_data
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
      setFormData1(mappedData)
      setFormDataAwal1(mappedData)
    }
  }, [dataKriteria1])

  useEffect(() => {
    console.log(komponen1)
  }, [komponen1])

  useEffect(() => {
    console.log('ini FORM DATA 1', formData1)

    const fetchData = async () => {
      const tahapPromises = formData1.map(async (data) => {
        if (data.name_form) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
            {
              params: {
                formType: data.name_form,
                prodiId: matkul.prodi_id,
              },
            },
          )
          return res.data.data
        }
        return null
      })

      // console.log('ini masuk ke use effect')

      const aspekPromises = formData1.map(async (data) => {
        // Menambahkan kondisi jika formData.aspect_form_id sudah ada
        if (data.aspect_form_id) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
            {
              params: {
                formType: data.type_form,
                formName: data.name_form,
                prodiId: matkul.prodi_id,
              },
            },
          )
          return res.data.data
        }
        return null
      })

      const tahapData = await Promise.all(tahapPromises)
      const filteredTahapData = tahapData.filter((data) => data !== null)
      if (formData1.length <= formDataAwal1.length) {
        const aspekData = await Promise.all(aspekPromises)
        const filteredAspekData = aspekData.filter((data) => data !== null)
        setAspekOptions1(filteredAspekData)
      }

      setTahapOptions1(filteredTahapData)

      console.log('ini aspekOptions di use effect 1', aspekOptions1)
    }

    fetchData()
  }, [formData1])

  //UAS TEORI
  useEffect(() => {
    console.log('ini tahap 2', tahapOptions2)
  }, [tahapOptions2])

  useEffect(() => {
    console.log('ini aspek 2 options', aspekOptions2)
  }, [aspekOptions2])

  useEffect(() => {
    console.log('ini tahap baru 2', tahapOptionsBaru2)
  }, [tahapOptionsBaru2])

  useEffect(() => {
    console.log('ini aspek baru 2', aspekOptionsBaru2)
  }, [aspekOptionsBaru2])

  useEffect(() => {
    // console.log('ini FORM Name 2', formName)
  }, [formName2])

  useEffect(() => {
    console.log('===> INI Data kriteria 2', dataKriteria2)
    //maping data kriteria untuk ets t
    const cek = dataKriteria2.criteria_data
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
      setFormData2(mappedData)
      setFormDataAwal2(mappedData)
    }
  }, [dataKriteria2])

  useEffect(() => {
    console.log(komponen2)
  }, [komponen2])

  useEffect(() => {
    console.log('ini FORM DATA 2', formData2)

    const fetchData = async () => {
      const tahapPromises = formData2.map(async (data) => {
        if (data.name_form) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
            {
              params: {
                formType: data.name_form,
                prodiId: matkul.prodi_id,
              },
            },
          )
          return res.data.data
        }
        return null
      })

      console.log('ini masuk ke use effect')

      const aspekPromises = formData2.map(async (data) => {
        // Menambahkan kondisi jika formData.aspect_form_id sudah ada
        if (data.aspect_form_id) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
            {
              params: {
                formType: data.type_form,
                formName: data.name_form,
                prodiId: matkul.prodi_id,
              },
            },
          )
          return res.data.data
        }
        return null
      })

      const tahapData = await Promise.all(tahapPromises)
      const filteredTahapData = tahapData.filter((data) => data !== null)
      if (formData2.length <= formDataAwal2.length) {
        const aspekData = await Promise.all(aspekPromises)
        const filteredAspekData = aspekData.filter((data) => data !== null)
        setAspekOptions2(filteredAspekData)
      }

      setTahapOptions2(filteredTahapData)

      console.log('ini aspekOptions di use effect 2', aspekOptions2)
    }

    fetchData()
  }, [formData2])

  //Uas Praktek

  useEffect(() => {
    console.log('ini tahap 3', tahapOptions3)
  }, [tahapOptions3])

  useEffect(() => {
    console.log('ini aspek 3', aspekOptions3)
  }, [aspekOptions3])

  useEffect(() => {
    console.log('ini tahap baru 3', tahapOptionsBaru3)
  }, [tahapOptionsBaru3])

  useEffect(() => {
    console.log('ini aspek baru 3', aspekOptionsBaru3)
  }, [aspekOptionsBaru3])

  useEffect(() => {
    // console.log('ini FORM Name 3', formName)
  }, [formName3])

  useEffect(() => {
    console.log('===> INI Data kriteria 3', dataKriteria3)
    //maping data kriteria untuk ets t
    const cek = dataKriteria3.criteria_data
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
      setFormData3(mappedData)
      setFormDataAwal3(mappedData)
    }
  }, [dataKriteria3])

  useEffect(() => {
    console.log(komponen3)
  }, [komponen3])

  useEffect(() => {
    console.log('ini FORM DATA 3', formData3)

    const fetchData = async () => {
      const tahapPromises = formData3.map(async (data) => {
        if (data.name_form) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
            {
              params: {
                formType: data.name_form,
                prodiId: matkul.prodi_id,
              },
            },
          )
          return res.data.data
        }
        return null
      })

      console.log('ini masuk ke use effect')

      const aspekPromises = formData3.map(async (data) => {
        // Menambahkan kondisi jika formData.aspect_form_id sudah ada
        if (data.aspect_form_id) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
            {
              params: {
                formType: data.type_form,
                formName: data.name_form,
                prodiId: matkul.prodi_id,
              },
            },
          )
          return res.data.data
        }
        return null
      })

      const tahapData = await Promise.all(tahapPromises)
      const filteredTahapData = tahapData.filter((data) => data !== null)
      if (formData3.length <= formDataAwal3.length) {
        const aspekData = await Promise.all(aspekPromises)
        const filteredAspekData = aspekData.filter((data) => data !== null)
        setAspekOptions3(filteredAspekData)
      }

      setTahapOptions3(filteredTahapData)

      console.log('ini aspekOptions di use effect 3', aspekOptions3)
    }

    fetchData()
  }, [formData3])

  //Lain lain teori

  useEffect(() => {
    console.log('ini tahap 4', tahapOptions4)
  }, [tahapOptions4])

  useEffect(() => {
    console.log('ini aspek 4', aspekOptions4)
  }, [aspekOptions4])

  useEffect(() => {
    console.log('ini tahap baru 4', tahapOptionsBaru4)
  }, [tahapOptionsBaru4])

  useEffect(() => {
    console.log('ini aspek baru 4', aspekOptionsBaru4)
  }, [aspekOptionsBaru4])

  useEffect(() => {
    // console.log('ini FORM Name 4', formName)
  }, [formName4])

  useEffect(() => {
    console.log('===> INI Data kriteria 4', dataKriteria4)
    //maping data kriteria untuk ets t
    const cek = dataKriteria4.criteria_data
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
      setFormData4(mappedData)
      setFormDataAwal4(mappedData)
    }
  }, [dataKriteria4])

  useEffect(() => {
    console.log(komponen4)
  }, [komponen4])

  useEffect(() => {
    console.log('ini FORM DATA 4', formData4)

    const fetchData = async () => {
      const tahapPromises = formData4.map(async (data) => {
        if (data.name_form) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
            {
              params: {
                formType: data.name_form,
                prodiId: matkul.prodi_id,
              },
            },
          )
          return res.data.data
        }
        return null
      })

      console.log('ini masuk ke use effect')

      const aspekPromises = formData4.map(async (data) => {
        // Menambahkan kondisi jika formData.aspect_form_id sudah ada
        if (data.aspect_form_id) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
            {
              params: {
                formType: data.type_form,
                formName: data.name_form,
                prodiId: matkul.prodi_id,
              },
            },
          )
          return res.data.data
        }
        return null
      })

      const tahapData = await Promise.all(tahapPromises)
      const filteredTahapData = tahapData.filter((data) => data !== null)
      if (formData4.length <= formDataAwal4.length) {
        const aspekData = await Promise.all(aspekPromises)
        const filteredAspekData = aspekData.filter((data) => data !== null)
        setAspekOptions4(filteredAspekData)
      }

      setTahapOptions4(filteredTahapData)

      console.log('ini aspekOptions di use effect 4', aspekOptions4)
    }

    fetchData()
  }, [formData4])

  //Lain lain praktek

  useEffect(() => {
    console.log('ini tahap 5', tahapOptions5)
  }, [tahapOptions5])

  useEffect(() => {
    console.log('ini aspek 5', aspekOptions5)
  }, [aspekOptions5])

  useEffect(() => {
    console.log('ini tahap baru 5', tahapOptionsBaru5)
  }, [tahapOptionsBaru5])

  useEffect(() => {
    console.log('ini aspek baru 5', aspekOptionsBaru5)
  }, [aspekOptionsBaru5])

  useEffect(() => {
    // console.log('ini FORM Name 5', formName)
  }, [formName5])

  useEffect(() => {
    console.log('===> INI Data kriteria 5', dataKriteria5)
    //maping data kriteria untuk ets t
    const cek = dataKriteria5.criteria_data
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
      setFormData5(mappedData)
      setFormDataAwal5(mappedData)
    }
  }, [dataKriteria5])

  useEffect(() => {
    console.log(komponen5)
  }, [komponen5])

  useEffect(() => {
    console.log('ini FORM DATA 5', formData5)

    const fetchData = async () => {
      const tahapPromises = formData5.map(async (data) => {
        if (data.name_form) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
            {
              params: {
                formType: data.name_form,
                prodiId: matkul.prodi_id,
              },
            },
          )
          return res.data.data
        }
        return null
      })

      console.log('ini masuk ke use effect')

      const aspekPromises = formData5.map(async (data) => {
        // Menambahkan kondisi jika formData.aspect_form_id sudah ada
        if (data.aspect_form_id) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
            {
              params: {
                formType: data.type_form,
                formName: data.name_form,
                prodiId: matkul.prodi_id,
              },
            },
          )
          return res.data.data
        }
        return null
      })

      const tahapData = await Promise.all(tahapPromises)
      const filteredTahapData = tahapData.filter((data) => data !== null)
      if (formData5.length <= formDataAwal5.length) {
        const aspekData = await Promise.all(aspekPromises)
        const filteredAspekData = aspekData.filter((data) => data !== null)
        setAspekOptions5(filteredAspekData)
      }

      setTahapOptions5(filteredTahapData)

      console.log('ini aspekOptions di use effect 5', aspekOptions5)
    }

    fetchData()
  }, [formData5])

  const handleTabChange = async (key) => {
    setActiveTab(key)
  }

  const findActiveTab = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/course-form/${id}`)
        .then((res) => {
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
            // console.log('==> ini komponen ETS Praktek', komponen1)
            return komponen1
          } else if (activeTab === '2') {
            searchData = fetchedKomponen.find((item) => item.name === 'EAS Teori')
            setKomponen2(searchData)
            // console.log('==> ini komponen EAS Teori', komponen2)
            return komponen2
          } else if (activeTab === '3') {
            searchData = fetchedKomponen.find((item) => item.name === 'EAS Praktek')
            setKomponen3(searchData)
            // console.log('==> ini komponen EAS Teori', komponen3)
            return komponen3
          } else if (activeTab === '4') {
            searchData = fetchedKomponen.find((item) => item.name === 'Lain-lain Teori')
            setKomponen4(searchData)
            // console.log('==> ini komponen Lain-lain Teori', komponen4)
            return komponen4
          } else if (activeTab === '5') {
            searchData = fetchedKomponen.find((item) => item.name === 'Lain-lain Praktek')
            setKomponen5(searchData)
            // console.log('==> ini komponen Lain-lain Praktek', komponen5)
            return komponen5
          }
        })

      //   return komponen
    } catch (error) {
      console.log(error)
    }
  }

  const getNextAvailableTab = (currentTab) => {
    const tabCount = 5 // Jumlah total tab
    let nextTab = parseInt(currentTab, 10) + 1 // Menggunakan parseInt untuk mengubah string menjadi angka

    while (nextTab < tabCount) {
      // Periksa apakah tab berikutnya tersedia, jika iya, kembalikan tab tersebut
      if (nextTab === '0' && bobotKomponen.UtsTeori !== 0) {
        return nextTab.toString() // Menggunakan toString untuk mengubah angka menjadi string
      } else if (nextTab === '1' && bobotKomponen.UtsPraktek !== 0) {
        return nextTab.toString()
      } else if (nextTab === '2' && bobotKomponen.UasTeori !== 0) {
        return nextTab.toString()
      } else if (nextTab === '3' && bobotKomponen.UasPraktek !== 0) {
        return nextTab.toString()
      } else if (nextTab === '4' && bobotKomponen.Tugas !== 0) {
        return nextTab.toString()
      }

      nextTab++ // Pindah ke tab berikutnya
    }

    // Jika tidak ada tab berikutnya yang tersedia, kembalikan tab awal
    return '0'
  }
  //UTS Teori
  const onChange = (checked) => {
    if (checked) {
      setNumber(1) // Mengubah angka menjadi 1 jika tombol dinyalakan
    } else {
      setNumber(0) // Mengubah angka menjadi 0 jika tombol dimatikan
    }
  }

  const handleFormPenilaianChange = async (value, index) => {
    findActiveTab()
    console.log('ini index', index)
    console.log('ini formdata  length', formData.length)
    setFormName(value)

    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData]
      const selectedForm = formPenilaian.find((item) => item.form_name === value)

      updatedFormData[index] = {
        ...updatedFormData[index],
        name_form: selectedForm.form_name,
        component_id: dataKriteria.id,
      }

      return updatedFormData
    })

    console.log('ini form data untuk form penilaian  ', formData)
    if (index < formData.length) {
      try {
        // if (index < formData.length) {
        console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('di form penilaian -> ', index, ' kurang dari ', formData.length)
    }
  }

  const handleFormPenilaianChangeBaru = async (value, index) => {
    findActiveTab()
    console.log('ini panjang form data awal di form penilaian  ', formDataAwal.length)
    console.log('ini index', index)
    console.log('ini formdata length', formData.length)
    setFormName(value)

    console.log('ini form data untuk form penilaian ', formData)
    if (index < formDataAwal.length) {
      console.log('ini index ', index, ' kurang dari ini formDataAwal  ', formDataAwal.length)
      setFormData((prevFormData) => {
        const updatedFormData = [...prevFormData]
        const selectedForm = formPenilaian.find((item) => item.form_name === value)

        updatedFormData[index] = {
          ...updatedFormData[index],
          name_form: selectedForm.form_name,
          component_id: dataKriteria.id,
        }

        return updatedFormData
      })
      try {
        // if (index < formData.length) {
        console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('ini index ', index, ' lebih dari ini formDataAwal  ', formDataAwal.length)
      setFormData((prevFormData) => {
        const updatedFormData = [...prevFormData]

        updatedFormData[index] = {
          ...updatedFormData[index],
          name_form: value,
          component_id: dataKriteria.id,
        }

        return updatedFormData
      })
      try {
        // console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        // console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleTahapChange = async (value, index) => {
    findActiveTab()

    console.log('ini panjang form data awal di tahap', formDataAwal.length)
    if (index < formDataAwal.length) {
      const selectedForm = tahapOptions[index]
        ? tahapOptions[index].find((item) => item.name === value)
        : null

      const updatedFormData = [...formData]
      updatedFormData[index] = {
        ...updatedFormData[index],
        type_form: selectedForm ? selectedForm.name : null,
      }
      setFormData(updatedFormData)

      // console.log('ini form data untuk tahap ', formData)
      const combinedData = [...formDataAwal, ...formData]
      const existingData = combinedData.filter(
        (data) =>
          data.aspek_name === formData[index].aspek_name &&
          data.type_form === formData[index].type_form,
      )
      console.log('ini existing data ', existingData)
    } else {
      console.log('ditahap -> ', index, ' kurang dari ', formDataAwal.length)
      console.log('ini tahap', value)
      console.log('Index:', index)
      // const selectedForm = tahapOptions[index].find((item) => item.name === value)
      // console.log('ini selectedForm', selectedForm)
      const updatedFormData = [...formData]
      updatedFormData[index] = {
        ...updatedFormData[index],
        type_form: value,
      }
      setFormData(updatedFormData)
      console.log('ini form data untuk tahap di yang else', formData)

      // console.log('ini form data awal panjangnya', formDataAwal.length)
      console.log('ini form data Awal', formDataAwal)
      // const cek = formDataAwal
      const existingDataAwal = formData.map((data) => ({
        aspek_name: data.aspect_name,
        type_form: data.type_form,
      }))
      console.log('ini existing', existingDataAwal)
      const existingData = formData.filter(
        (data) =>
          data.aspek_name === formData[index].aspek_name &&
          data.type_form === formData[index].type_form,
      )
      const mergedExistingData = existingDataAwal.concat(existingData)
      console.log('ini mergedExistingData ', mergedExistingData)
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
          {
            params: {
              formType: value,
              formName: formName,
              prodiId: matkul.prodi_id,
            },
          },
        )

        const resData = response.data.data // Menampung data dari respons API dalam variabel resData
        console.log('ini resdata ', resData)

        // const ambilHasil = mergedExistingData.find((data) =>
        //   resData.some((res) => res.name === data.aspek_name && data.type_form === value),
        // )
        const newData = resData
          .filter(
            (res) =>
              !mergedExistingData.some(
                (data) =>
                  // data.aspect_form_id === res.id &&
                  data.aspek_name === res.name && data.type_form === value,
              ),
          )
          .map((res) => ({
            id: parseInt(res.id),
            name: res.name,
            type_form: value,
          }))

        if (newData.length > 0) {
          console.log('Data tidak ditemukan, menambahkan data baru', newData)
          mergedExistingData.push(...newData)
        } else {
          console.log('Tidak ada data baru yang perlu ditambahkan')
        }

        setAspekOptions((prevAspekOptions) => {
          const updatedAspekOptions = [...prevAspekOptions]
          updatedAspekOptions[index] = newData
          return updatedAspekOptions
        })
        // })
        // console.log('ini aspek di tahap  ', aspekOptions)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleAspekChange = async (value, index) => {
    findActiveTab()
    // if (index < formDataAwal.length) {
    const selectedForm = aspekOptions[index]
      ? aspekOptions[index].find((item) => item.name === value)
      : null

    console.log('ini hasil dari selected form aspek ', selectedForm)
    if (number === 0) {
      const updatedFormData = [...formData]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm ? selectedForm.id : null,
        aspect_name: value,
        bobot_criteria: 100,
        id: null,
      }
      setFormData(updatedFormData)
    } else {
      const updatedFormData = [...formData]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm ? selectedForm.id : null,
        aspect_name: value,
        id: null,
      }
      setFormData(updatedFormData)
    }
  }

  const handleBobotChange = async (value, index) => {
    findActiveTab()
    const sanitizedValue = value.replace(/[^0-9]/g, '')
    const parsedValue = parseInt(sanitizedValue)
    const clampedValue = Math.min(Math.max(parsedValue, 0), 100)

    if (isNaN(parsedValue) || clampedValue !== parsedValue) {
      // Tampilkan pesan kesalahan jika nilai tidak valid
      console.log('Input tidak valid. Masukkan angka antara 0 hingga 100.')
      notification.warning({
        message: 'Bobot harus diantara angka 0 hingga 100!',
      })
      const updatedFormData = [...formData]
      updatedFormData[index] = {
        ...updatedFormData[index],
        bobot_criteria: 0,
      }
      setFormData(updatedFormData)
    } else {
      const updatedFormData = [...formData]
      updatedFormData[index] = {
        ...updatedFormData[index],
        bobot_criteria: clampedValue,
      }
      setFormData(updatedFormData)
    }
  }

  const onFinish = () => {
    findActiveTab()
    // console.log('Received values:', values)
    // console.log('ini datanya', formData)
    // setValue(values)
    console.log('criteria_data', formData)
  }

  const handleRemoveFieldAwal = (index) => {
    findActiveTab()

    const updatedFormDataAwal = [...formDataAwal1]
    updatedFormDataAwal.splice(index, 1) // Menghapus elemen dari array formDataAwal
    setFormDataAwal(updatedFormDataAwal)
    console.log('ini formData Awal ', formDataAwal, ' ini length ', formDataAwal.length)

    const updatedFormData = [...formData]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData(updatedFormData)
    console.log('ini formData  di atas', formData)
  }

  const handleRemoveField = (fieldName, index, remove) => {
    findActiveTab()
    const updatedFormData = [...formData1]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData(updatedFormData)
    console.log('ini formDataAwal  * ', formDataAwal, ' ini length ', formDataAwal.length)
    console.log('ini formData  * ', formData)
    remove(fieldName) // Menghapus elemen dari Form.List fields
  }

  const handleViewData = async () => {
    console.log('criteria_data', formData)
    console.log('lihat bobot ', bobot)
    findActiveTab()

    // Cek apakah ada bobot yang kosong atau nol
    const hasEmptyBobot = formData.some((data) => !data.bobot_criteria || data.bobot_criteria === 0)

    if (number === 1 && hasEmptyBobot) {
      console.log('Periksa kelengkapan kriteria penilaian!')
      notification.warning({
        message: 'Periksa kelengkapan kriteria penilaian!',
      })
      return // Menghentikan eksekusi fungsi jika ada bobot yang kosong atau nol
    }

    const postData = {
      id: komponen.id,
      name: komponen.name,
      criteria_data: formData,
      is_average: number,
    }
    console.log('ini postdata eas t', postData)
    // console.log(typeof postData.id)

    try {
      // enterLoading(0) // Menonaktifkan loading state pada tombol
      await axios
        .put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/update`, {
          id: komponen.id,
          name: komponen.name,
          criteria_data: formData,
          is_average: number,
        })
        .then((response) => {
          // Tangani respons setelah berhasil melakukan POST
          console.log('Berhasil melakukan POST', response.data)
          notification.success({
            message: 'Kriteria berhasil tersimpan',
          })
        })
    } catch (error) {
      console.error('Gagal melakukan POST', error)
      notification.error({
        message: 'Kriteria gagal tersimpan',
      })
    }
  }

  //UTS Praktek
  const onChange1 = (checked) => {
    if (checked) {
      setNumber1(1) // Mengubah angka menjadi 1 jika tombol dinyalakan
    } else {
      setNumber1(0) // Mengubah angka menjadi 0 jika tombol dimatikan
    }
  }

  const handleFormPenilaianChange1 = async (value, index) => {
    findActiveTab()
    console.log('ini index', index)
    console.log('ini formdata 1 length', formData1.length)
    setFormName1(value)

    setFormData1((prevFormData) => {
      const updatedFormData = [...prevFormData]
      const selectedForm = formPenilaian1.find((item) => item.form_name === value)

      updatedFormData[index] = {
        ...updatedFormData[index],
        name_form: selectedForm.form_name,
        component_id: dataKriteria1.id,
      }

      return updatedFormData
    })

    console.log('ini form data untuk form penilaian 1 ', formData1)
    if (index < formData1.length) {
      try {
        // if (index < formData.length) {
        console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions1((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('di form penilaian -> ', index, ' kurang dari ', formData.length)
    }
  }

  const handleFormPenilaianChangeBaru1 = async (value, index) => {
    findActiveTab()
    console.log('ini panjang form data awal di form penilaian 1 ', formDataAwal1.length)
    console.log('ini index', index)
    console.log('ini formdata length', formData1.length)
    setFormName1(value)

    console.log('ini form data untuk form penilaian 1', formData1)
    if (index < formDataAwal1.length) {
      console.log('ini index ', index, ' kurang dari ini formDataAwal 1 ', formDataAwal1.length)
      setFormData1((prevFormData) => {
        const updatedFormData = [...prevFormData]
        const selectedForm = formPenilaian1.find((item) => item.form_name === value)

        updatedFormData[index] = {
          ...updatedFormData[index],
          name_form: selectedForm.form_name,
          component_id: dataKriteria1.id,
        }

        return updatedFormData
      })
      try {
        // if (index < formData.length) {
        console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions1((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('ini index ', index, ' lebih dari ini formDataAwal 1 ', formDataAwal1.length)
      setFormData1((prevFormData) => {
        const updatedFormData = [...prevFormData]

        updatedFormData[index] = {
          ...updatedFormData[index],
          name_form: value,
          component_id: dataKriteria1.id,
        }

        return updatedFormData
      })
      try {
        // console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        // console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions1((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleTahapChange1 = async (value, index) => {
    findActiveTab()

    console.log('ini panjang form data awal di tahap', formDataAwal1.length)
    if (index < formDataAwal1.length) {
      const selectedForm = tahapOptions1[index]
        ? tahapOptions1[index].find((item) => item.name === value)
        : null

      const updatedFormData = [...formData1]
      updatedFormData[index] = {
        ...updatedFormData[index],
        type_form: selectedForm ? selectedForm.name : null,
      }
      setFormData1(updatedFormData)

      // console.log('ini form data untuk tahap ', formData)
      const combinedData = [...formDataAwal1, ...formData1]
      const existingData = combinedData.filter(
        (data) =>
          data.aspek_name === formData1[index].aspek_name &&
          data.type_form === formData1[index].type_form,
      )
      console.log('ini existing data ', existingData)
      // try {
      //   await axios
      //     .get(
      //       `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
      //       {
      //         params: {
      //           formType: value,
      //           formName: formName1,
      //           prodiId: matkul.prodi_id,
      //         },
      //       },
      //     )
      //     .then((res) => {
      //       setAspekOptions1((prevAspekOptions) => {
      //         const updatedAspekOptions = [...prevAspekOptions]
      //         updatedAspekOptions[index] = res.data.data
      //         return updatedAspekOptions
      //       })
      //     })
      // } catch (error) {
      //   console.log(error)
      // }
    } else {
      console.log('ditahap -> ', index, ' kurang dari ', formDataAwal1.length)
      console.log('ini tahap', value)
      console.log('Index:', index)
      // const selectedForm = tahapOptions[index].find((item) => item.name === value)
      // console.log('ini selectedForm', selectedForm)
      const updatedFormData = [...formData1]
      updatedFormData[index] = {
        ...updatedFormData[index],
        type_form: value,
      }
      setFormData1(updatedFormData)
      console.log('ini form data untuk tahap di yang else', formData1)

      // console.log('ini form data awal panjangnya', formDataAwal.length)
      console.log('ini form data Awal', formDataAwal1)
      // const cek = formDataAwal1
      const existingDataAwal = formData1.map((data) => ({
        aspek_name: data.aspect_name,
        type_form: data.type_form,
      }))
      console.log('ini existing', existingDataAwal)
      const existingData = formData1.filter(
        (data) =>
          data.aspek_name === formData1[index].aspek_name &&
          data.type_form === formData1[index].type_form,
      )
      const mergedExistingData = existingDataAwal.concat(existingData)
      console.log('ini mergedExistingData ', mergedExistingData)
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
          {
            params: {
              formType: value,
              formName: formName1,
              prodiId: matkul.prodi_id,
            },
          },
        )

        const resData = response.data.data // Menampung data dari respons API dalam variabel resData
        console.log('ini resdata ', resData)

        // const ambilHasil = mergedExistingData.find((data) =>
        //   resData.some((res) => res.name === data.aspek_name && data.type_form === value),
        // )
        const newData = resData
          .filter(
            (res) =>
              !mergedExistingData.some(
                (data) =>
                  // data.aspect_form_id === res.id &&
                  data.aspek_name === res.name && data.type_form === value,
              ),
          )
          .map((res) => ({
            id: parseInt(res.id),
            name: res.name,
            type_form: value,
          }))

        if (newData.length > 0) {
          console.log('Data tidak ditemukan, menambahkan data baru', newData)
          mergedExistingData.push(...newData)
        } else {
          console.log('Tidak ada data baru yang perlu ditambahkan')
        }

        setAspekOptions1((prevAspekOptions) => {
          const updatedAspekOptions = [...prevAspekOptions]
          updatedAspekOptions[index] = newData
          return updatedAspekOptions
        })
        // })
        // console.log('ini aspek di tahap 1 ', aspekOptions1)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleAspekChange1 = async (value, index) => {
    findActiveTab()
    // if (index < formDataAwal.length) {
    const selectedForm = aspekOptions1[index]
      ? aspekOptions1[index].find((item) => item.name === value)
      : null

    console.log('ini hasil dari selected form aspek ', selectedForm)
    if (number1 === 0) {
      const updatedFormData = [...formData1]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm ? selectedForm.id : null,
        aspect_name: value,
        bobot_criteria: 100,
        id: null,
      }
      setFormData1(updatedFormData)
    } else {
      const updatedFormData = [...formData1]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm ? selectedForm.id : null,
        aspect_name: value,
        id: null,
      }
      setFormData1(updatedFormData)
    }
  }

  const handleBobotChange1 = async (value, index) => {
    findActiveTab()
    const sanitizedValue = value.replace(/[^0-9]/g, '')
    const parsedValue = parseInt(sanitizedValue)
    const clampedValue = Math.min(Math.max(parsedValue, 0), 100)

    if (isNaN(parsedValue) || clampedValue !== parsedValue) {
      // Tampilkan pesan kesalahan jika nilai tidak valid
      console.log('Input tidak valid. Masukkan angka antara 0 hingga 100.')
      notification.warning({
        message: 'Bobot harus diantara angka 0 hingga 100!',
      })
      const updatedFormData = [...formData1]
      updatedFormData[index] = {
        ...updatedFormData[index],
        bobot_criteria: 0,
      }
      setFormData1(updatedFormData)
    } else {
      const updatedFormData = [...formData1]
      updatedFormData[index] = {
        ...updatedFormData[index],
        bobot_criteria: clampedValue,
      }
      setFormData1(updatedFormData)
    }
  }

  const onFinish1 = () => {
    findActiveTab()
    // console.log('Received values:', values)
    // console.log('ini datanya', formData)
    // setValue(values)
    console.log('criteria_data', formData1)
  }

  const handleRemoveFieldAwal1 = (index) => {
    findActiveTab()

    const updatedFormDataAwal = [...formDataAwal1]
    updatedFormDataAwal.splice(index, 1) // Menghapus elemen dari array formDataAwal
    setFormDataAwal1(updatedFormDataAwal)
    console.log('ini formData Awal 1', formDataAwal1, ' ini length ', formDataAwal1.length)

    const updatedFormData = [...formData1]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData1(updatedFormData)
    console.log('ini formData 1 di atas', formData1)
  }

  const handleRemoveField1 = (fieldName, index, remove) => {
    findActiveTab()
    const updatedFormData = [...formData1]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData1(updatedFormData)
    console.log('ini formDataAwal 1 * ', formDataAwal1, ' ini length ', formDataAwal1.length)
    console.log('ini formData 1 * ', formData1)
    remove(fieldName) // Menghapus elemen dari Form.List fields
  }

  const handleViewData1 = async () => {
    console.log('criteria_data', formData1)
    console.log('lihat bobot ', bobot)
    findActiveTab()

    // Cek apakah ada bobot yang kosong atau nol
    const hasEmptyBobot = formData1.some(
      (data) => !data.bobot_criteria || data.bobot_criteria === 0,
    )

    if (number1 === 1 && hasEmptyBobot) {
      console.log('Periksa kelengkapan kriteria penilaian!')
      notification.warning({
        message: 'Periksa kelengkapan kriteria penilaian!',
      })
      return // Menghentikan eksekusi fungsi jika ada bobot yang kosong atau nol
    }

    const postData = {
      id: komponen1.id,
      name: komponen1.name,
      criteria_data: formData1,
      is_average: number1,
    }
    console.log('ini postdata ets', postData)
    // console.log(typeof postData.id)

    try {
      // enterLoading(0) // Menonaktifkan loading state pada tombol
      await axios
        .put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/update`, {
          id: komponen1.id,
          name: komponen1.name,
          criteria_data: formData1,
          is_average: number1,
        })
        .then((response) => {
          // Tangani respons setelah berhasil melakukan POST
          console.log('Berhasil melakukan POST', response.data)
          notification.success({
            message: 'Kriteria berhasil tersimpan',
          })
        })
    } catch (error) {
      console.error('Gagal melakukan POST', error)
      notification.error({
        message: 'Kriteria gagal tersimpan',
      })
    }
  }

  //UAS Teori
  const onChange2 = (checked) => {
    if (checked) {
      setNumber2(1) // Mengubah angka menjadi 1 jika tombol dinyalakan
    } else {
      setNumber2(0) // Mengubah angka menjadi 0 jika tombol dimatikan
    }
  }

  const handleFormPenilaianChange2 = async (value, index) => {
    findActiveTab()
    console.log('ini index', index)
    console.log('ini formdata 2 length', formData2.length)
    setFormName2(value)

    setFormData2((prevFormData) => {
      const updatedFormData = [...prevFormData]
      const selectedForm = formPenilaian2.find((item) => item.form_name === value)

      updatedFormData[index] = {
        ...updatedFormData[index],
        name_form: selectedForm.form_name,
        component_id: dataKriteria2.id,
      }

      return updatedFormData
    })

    console.log('ini form data untuk form penilaian 2 ', formData2)
    if (index < formData2.length) {
      try {
        // if (index < formData.length) {
        console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions2((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('di form penilaian -> ', index, ' kurang dari ', formData.length)
    }
  }

  const handleFormPenilaianChangeBaru2 = async (value, index) => {
    findActiveTab()
    console.log('ini panjang form data awal di form penilaian 2 ', formDataAwal2.length)
    console.log('ini index', index)
    console.log('ini formdata length', formData2.length)
    setFormName2(value)

    console.log('ini form data untuk form penilaian 2', formData2)
    if (index < formDataAwal2.length) {
      console.log('ini index ', index, ' kurang dari ini formDataAwal 2 ', formDataAwal2.length)
      setFormData2((prevFormData) => {
        const updatedFormData = [...prevFormData]
        const selectedForm = formPenilaian2.find((item) => item.form_name === value)

        updatedFormData[index] = {
          ...updatedFormData[index],
          name_form: selectedForm.form_name,
          component_id: dataKriteria2.id,
        }

        return updatedFormData
      })
      try {
        // if (index < formData.length) {
        console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions2((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('ini index ', index, ' lebih dari ini formDataAwal 2 ', formDataAwal2.length)
      setFormData2((prevFormData) => {
        const updatedFormData = [...prevFormData]

        updatedFormData[index] = {
          ...updatedFormData[index],
          name_form: value,
          component_id: dataKriteria2.id,
        }

        return updatedFormData
      })
      try {
        // console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        // console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions2((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleTahapChange2 = async (value, index) => {
    findActiveTab()

    console.log('ini panjang form data awal di tahap', formDataAwal2.length)
    if (index < formDataAwal2.length) {
      const selectedForm = tahapOptions2[index]
        ? tahapOptions2[index].find((item) => item.name === value)
        : null

      const updatedFormData = [...formData2]
      updatedFormData[index] = {
        ...updatedFormData[index],
        type_form: selectedForm ? selectedForm.name : null,
      }
      setFormData2(updatedFormData)

      // console.log('ini form data untuk tahap ', formData)
      const combinedData = [...formDataAwal2, ...formData2]
      const existingData = combinedData.filter(
        (data) =>
          data.aspek_name === formData2[index].aspek_name &&
          data.type_form === formData2[index].type_form,
      )
      console.log('ini existing data ', existingData)
    } else {
      console.log('ditahap -> ', index, ' kurang dari ', formDataAwal2.length)
      console.log('ini tahap', value)
      console.log('Index:', index)
      // const selectedForm = tahapOptions[index].find((item) => item.name === value)
      // console.log('ini selectedForm', selectedForm)
      const updatedFormData = [...formData2]
      updatedFormData[index] = {
        ...updatedFormData[index],
        type_form: value,
      }
      setFormData2(updatedFormData)
      console.log('ini form data untuk tahap di yang else', formData2)

      // console.log('ini form data awal panjangnya', formDataAwal.length)
      console.log('ini form data Awal', formDataAwal2)
      // const cek = formDataAwal2
      const existingDataAwal = formData2.map((data) => ({
        aspek_name: data.aspect_name,
        type_form: data.type_form,
      }))
      console.log('ini existing', existingDataAwal)
      const existingData = formData2.filter(
        (data) =>
          data.aspek_name === formData2[index].aspek_name &&
          data.type_form === formData2[index].type_form,
      )
      const mergedExistingData = existingDataAwal.concat(existingData)
      console.log('ini mergedExistingData ', mergedExistingData)
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
          {
            params: {
              formType: value,
              formName: formName2,
              prodiId: matkul.prodi_id,
            },
          },
        )

        const resData = response.data.data // Menampung data dari respons API dalam variabel resData
        console.log('ini resdata ', resData)

        // const ambilHasil = mergedExistingData.find((data) =>
        //   resData.some((res) => res.name === data.aspek_name && data.type_form === value),
        // )
        const newData = resData
          .filter(
            (res) =>
              !mergedExistingData.some(
                (data) =>
                  // data.aspect_form_id === res.id &&
                  data.aspek_name === res.name && data.type_form === value,
              ),
          )
          .map((res) => ({
            id: parseInt(res.id),
            name: res.name,
            type_form: value,
          }))

        if (newData.length > 0) {
          console.log('Data tidak ditemukan, menambahkan data baru', newData)
          mergedExistingData.push(...newData)
        } else {
          console.log('Tidak ada data baru yang perlu ditambahkan')
        }

        setAspekOptions2((prevAspekOptions) => {
          const updatedAspekOptions = [...prevAspekOptions]
          updatedAspekOptions[index] = newData
          return updatedAspekOptions
        })
        // })
        console.log('ini aspek di tahap 2 ', aspekOptions2)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleAspekChange2 = async (value, index) => {
    findActiveTab()
    // if (index < formDataAwal.length) {
    const selectedForm = aspekOptions2[index]
      ? aspekOptions2[index].find((item) => item.name === value)
      : null

    console.log('ini hasil dari selected form aspek ', selectedForm)
    if (number2 === 0) {
      const updatedFormData = [...formData2]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm ? selectedForm.id : null,
        aspect_name: value,
        bobot_criteria: 100,
        id: null,
      }
      setFormData2(updatedFormData)
    } else {
      const updatedFormData = [...formData2]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm ? selectedForm.id : null,
        aspect_name: value,
        id: null,
      }
      setFormData2(updatedFormData)
    }
  }

  const handleBobotChange2 = async (value, index) => {
    findActiveTab()
    const sanitizedValue = value.replace(/[^0-9]/g, '')
    const parsedValue = parseInt(sanitizedValue)
    const clampedValue = Math.min(Math.max(parsedValue, 0), 100)

    if (isNaN(parsedValue) || clampedValue !== parsedValue) {
      // Tampilkan pesan kesalahan jika nilai tidak valid
      console.log('Input tidak valid. Masukkan angka antara 0 hingga 100.')
      notification.warning({
        message: 'Bobot harus diantara angka 0 hingga 100!',
      })
      const updatedFormData = [...formData2]
      updatedFormData[index] = {
        ...updatedFormData[index],
        bobot_criteria: 0,
      }
      setFormData2(updatedFormData)
    } else {
      const updatedFormData = [...formData2]
      updatedFormData[index] = {
        ...updatedFormData[index],
        bobot_criteria: clampedValue,
      }
      setFormData2(updatedFormData)
    }
  }

  const onFinish2 = () => {
    findActiveTab()
    // console.log('Received values:', values)
    // console.log('ini datanya', formData)
    // setValue(values)
    console.log('criteria_data', formData2)
  }

  const handleRemoveFieldAwal2 = (index) => {
    findActiveTab()

    const updatedFormDataAwal = [...formDataAwal1]
    updatedFormDataAwal.splice(index, 1) // Menghapus elemen dari array formDataAwal
    setFormDataAwal2(updatedFormDataAwal)
    console.log('ini formData Awal 2', formDataAwal2, ' ini length ', formDataAwal2.length)

    const updatedFormData = [...formData2]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData2(updatedFormData)
    console.log('ini formData 2 di atas', formData2)
  }

  const handleRemoveField2 = (fieldName, index, remove) => {
    findActiveTab()
    const updatedFormData = [...formData1]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData2(updatedFormData)
    console.log('ini formDataAwal 2 * ', formDataAwal2, ' ini length ', formDataAwal2.length)
    console.log('ini formData 2 * ', formData2)
    remove(fieldName) // Menghapus elemen dari Form.List fields
  }

  const handleViewData2 = async () => {
    console.log('criteria_data', formData2)
    console.log('lihat bobot ', bobot)
    findActiveTab()

    // Cek apakah ada bobot yang kosong atau nol
    const hasEmptyBobot = formData2.some(
      (data) => !data.bobot_criteria || data.bobot_criteria === 0,
    )

    if (number2 === 1 && hasEmptyBobot) {
      console.log('Periksa kelengkapan kriteria penilaian!')
      notification.warning({
        message: 'Periksa kelengkapan kriteria penilaian!',
      })
      return // Menghentikan eksekusi fungsi jika ada bobot yang kosong atau nol
    }

    const postData = {
      id: komponen2.id,
      name: komponen2.name,
      criteria_data: formData2,
      is_average: number2,
    }
    console.log('ini postdata eas t', postData)
    // console.log(typeof postData.id)

    try {
      // enterLoading(0) // Menonaktifkan loading state pada tombol
      await axios
        .put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/update`, {
          id: komponen2.id,
          name: komponen2.name,
          criteria_data: formData2,
          is_average: number2,
        })
        .then((response) => {
          // Tangani respons setelah berhasil melakukan POST
          console.log('Berhasil melakukan POST', response.data)
          notification.success({
            message: 'Kriteria berhasil tersimpan',
          })
        })
    } catch (error) {
      console.error('Gagal melakukan POST', error)
      notification.error({
        message: 'Kriteria gagal tersimpan',
      })
    }
  }

  //UAS Praktek
  const onChange3 = (checked) => {
    if (checked) {
      setNumber3(1) // Mengubah angka menjadi 1 jika tombol dinyalakan
    } else {
      setNumber3(0) // Mengubah angka menjadi 0 jika tombol dimatikan
    }
  }

  const handleFormPenilaianChange3 = async (value, index) => {
    findActiveTab()
    console.log('ini index', index)
    console.log('ini formdata 3 length', formData3.length)
    setFormName3(value)

    setFormData3((prevFormData) => {
      const updatedFormData = [...prevFormData]
      const selectedForm = formPenilaian3.find((item) => item.form_name === value)

      updatedFormData[index] = {
        ...updatedFormData[index],
        name_form: selectedForm.form_name,
        component_id: dataKriteria3.id,
      }

      return updatedFormData
    })

    console.log('ini form data untuk form penilaian 3 ', formData3)
    if (index < formData3.length) {
      try {
        // if (index < formData.length) {
        console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions3((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('di form penilaian -> ', index, ' kurang dari ', formData.length)
    }
  }

  const handleFormPenilaianChangeBaru3 = async (value, index) => {
    findActiveTab()
    console.log('ini panjang form data awal di form penilaian 3 ', formDataAwal3.length)
    console.log('ini index', index)
    console.log('ini formdata length', formData3.length)
    setFormName3(value)

    console.log('ini form data untuk form penilaian 3', formData3)
    if (index < formDataAwal3.length) {
      console.log('ini index ', index, ' kurang dari ini formDataAwal 3 ', formDataAwal3.length)
      setFormData3((prevFormData) => {
        const updatedFormData = [...prevFormData]
        const selectedForm = formPenilaian3.find((item) => item.form_name === value)

        updatedFormData[index] = {
          ...updatedFormData[index],
          name_form: selectedForm.form_name,
          component_id: dataKriteria3.id,
        }

        return updatedFormData
      })
      try {
        // if (index < formData.length) {
        console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions3((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('ini index ', index, ' lebih dari ini formDataAwal 3 ', formDataAwal3.length)
      setFormData3((prevFormData) => {
        const updatedFormData = [...prevFormData]

        updatedFormData[index] = {
          ...updatedFormData[index],
          name_form: value,
          component_id: dataKriteria3.id,
        }

        return updatedFormData
      })
      try {
        // console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        // console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions3((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleTahapChange3 = async (value, index) => {
    findActiveTab()

    console.log('ini panjang form data awal di tahap', formDataAwal3.length)
    if (index < formDataAwal3.length) {
      const selectedForm = tahapOptions3[index]
        ? tahapOptions3[index].find((item) => item.name === value)
        : null

      const updatedFormData = [...formData3]
      updatedFormData[index] = {
        ...updatedFormData[index],
        type_form: selectedForm ? selectedForm.name : null,
      }
      setFormData3(updatedFormData)

      // console.log('ini form data untuk tahap ', formData)
      const combinedData = [...formDataAwal3, ...formData3]
      const existingData = combinedData.filter(
        (data) =>
          data.aspek_name === formData3[index].aspek_name &&
          data.type_form === formData3[index].type_form,
      )
      console.log('ini existing data ', existingData)
    } else {
      console.log('ditahap -> ', index, ' kurang dari ', formDataAwal3.length)
      console.log('ini tahap', value)
      console.log('Index:', index)
      // const selectedForm = tahapOptions[index].find((item) => item.name === value)
      // console.log('ini selectedForm', selectedForm)
      const updatedFormData = [...formData3]
      updatedFormData[index] = {
        ...updatedFormData[index],
        type_form: value,
      }
      setFormData3(updatedFormData)
      console.log('ini form data untuk tahap di yang else', formData3)

      // console.log('ini form data awal panjangnya', formDataAwal.length)
      console.log('ini form data Awal', formDataAwal3)
      // const cek = formDataAwal3
      const existingDataAwal = formData3.map((data) => ({
        aspek_name: data.aspect_name,
        type_form: data.type_form,
      }))
      console.log('ini existing', existingDataAwal)
      const existingData = formData3.filter(
        (data) =>
          data.aspek_name === formData3[index].aspek_name &&
          data.type_form === formData3[index].type_form,
      )
      const mergedExistingData = existingDataAwal.concat(existingData)
      console.log('ini mergedExistingData ', mergedExistingData)
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
          {
            params: {
              formType: value,
              formName: formName3,
              prodiId: matkul.prodi_id,
            },
          },
        )

        const resData = response.data.data // Menampung data dari respons API dalam variabel resData
        console.log('ini resdata ', resData)

        // const ambilHasil = mergedExistingData.find((data) =>
        //   resData.some((res) => res.name === data.aspek_name && data.type_form === value),
        // )
        const newData = resData
          .filter(
            (res) =>
              !mergedExistingData.some(
                (data) =>
                  // data.aspect_form_id === res.id &&
                  data.aspek_name === res.name && data.type_form === value,
              ),
          )
          .map((res) => ({
            id: parseInt(res.id),
            name: res.name,
            type_form: value,
          }))

        if (newData.length > 0) {
          console.log('Data tidak ditemukan, menambahkan data baru', newData)
          mergedExistingData.push(...newData)
        } else {
          console.log('Tidak ada data baru yang perlu ditambahkan')
        }

        setAspekOptions3((prevAspekOptions) => {
          const updatedAspekOptions = [...prevAspekOptions]
          updatedAspekOptions[index] = newData
          return updatedAspekOptions
        })
        // })
        // console.log('ini aspek di tahap 3 ', aspekOptions3)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleAspekChange3 = async (value, index) => {
    findActiveTab()
    // if (index < formDataAwal.length) {
    const selectedForm = aspekOptions3[index]
      ? aspekOptions3[index].find((item) => item.name === value)
      : null

    console.log('ini hasil dari selected form aspek ', selectedForm)
    if (number3 === 0) {
      const updatedFormData = [...formData3]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm ? selectedForm.id : null,
        aspect_name: value,
        bobot_criteria: 100,
        id: null,
      }
      setFormData3(updatedFormData)
    } else {
      const updatedFormData = [...formData3]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm ? selectedForm.id : null,
        aspect_name: value,
        id: null,
      }
      setFormData3(updatedFormData)
    }
  }

  const handleBobotChange3 = async (value, index) => {
    findActiveTab()
    const sanitizedValue = value.replace(/[^0-9]/g, '')
    const parsedValue = parseInt(sanitizedValue)
    const clampedValue = Math.min(Math.max(parsedValue, 0), 100)

    if (isNaN(parsedValue) || clampedValue !== parsedValue) {
      // Tampilkan pesan kesalahan jika nilai tidak valid
      console.log('Input tidak valid. Masukkan angka antara 0 hingga 100.')
      notification.warning({
        message: 'Bobot harus diantara angka 0 hingga 100!',
      })
      const updatedFormData = [...formData3]
      updatedFormData[index] = {
        ...updatedFormData[index],
        bobot_criteria: 0,
      }
      setFormData3(updatedFormData)
    } else {
      const updatedFormData = [...formData3]
      updatedFormData[index] = {
        ...updatedFormData[index],
        bobot_criteria: clampedValue,
      }
      setFormData3(updatedFormData)
    }
  }

  const onFinish3 = () => {
    findActiveTab()
    // console.log('Received values:', values)
    // console.log('ini datanya', formData)
    // setValue(values)
    console.log('criteria_data', formData3)
  }

  const handleRemoveFieldAwal3 = (index) => {
    findActiveTab()

    const updatedFormDataAwal = [...formDataAwal1]
    updatedFormDataAwal.splice(index, 1) // Menghapus elemen dari array formDataAwal
    setFormDataAwal3(updatedFormDataAwal)
    console.log('ini formData Awal 3', formDataAwal3, ' ini length ', formDataAwal3.length)

    const updatedFormData = [...formData3]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData3(updatedFormData)
    console.log('ini formData 3 di atas', formData3)
  }

  const handleRemoveField3 = (fieldName, index, remove) => {
    findActiveTab()
    const updatedFormData = [...formData1]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData3(updatedFormData)
    console.log('ini formDataAwal 3 * ', formDataAwal3, ' ini length ', formDataAwal3.length)
    console.log('ini formData 3 * ', formData3)
    remove(fieldName) // Menghapus elemen dari Form.List fields
  }

  const handleViewData3 = async () => {
    console.log('criteria_data', formData3)
    console.log('lihat bobot ', bobot)
    findActiveTab()

    // Cek apakah ada bobot yang kosong atau nol
    const hasEmptyBobot = formData3.some(
      (data) => !data.bobot_criteria || data.bobot_criteria === 0,
    )

    if (number3 === 1 && hasEmptyBobot) {
      console.log('Periksa kelengkapan kriteria penilaian!')
      notification.warning({
        message: 'Periksa kelengkapan kriteria penilaian!',
      })
      return // Menghentikan eksekusi fungsi jika ada bobot yang kosong atau nol
    }

    const postData = {
      id: komponen3.id,
      name: komponen3.name,
      criteria_data: formData3,
      is_average: number3,
    }
    console.log('ini postdata eas t', postData)
    // console.log(typeof postData.id)

    try {
      // enterLoading(0) // Menonaktifkan loading state pada tombol
      await axios
        .put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/update`, {
          id: komponen3.id,
          name: komponen3.name,
          criteria_data: formData3,
          is_average: number3,
        })
        .then((response) => {
          // Tangani respons setelah berhasil melakukan POST
          console.log('Berhasil melakukan POST', response.data)
          notification.success({
            message: 'Kriteria berhasil tersimpan',
          })
        })
    } catch (error) {
      console.error('Gagal melakukan POST', error)
      notification.error({
        message: 'Kriteria gagal tersimpan',
      })
    }
  }

  //Lain lain teori
  const onChange4 = (checked) => {
    if (checked) {
      setNumber4(1) // Mengubah angka menjadi 1 jika tombol dinyalakan
    } else {
      setNumber4(0) // Mengubah angka menjadi 0 jika tombol dimatikan
    }
  }

  const handleFormPenilaianChange4 = async (value, index) => {
    findActiveTab()
    console.log('ini index', index)
    console.log('ini formdata 4 length', formData4.length)
    setFormName4(value)

    setFormData4((prevFormData) => {
      const updatedFormData = [...prevFormData]
      const selectedForm = formPenilaian4.find((item) => item.form_name === value)

      updatedFormData[index] = {
        ...updatedFormData[index],
        name_form: selectedForm.form_name,
        component_id: dataKriteria4.id,
      }

      return updatedFormData
    })

    console.log('ini form data untuk form penilaian 4 ', formData4)
    if (index < formData4.length) {
      try {
        // if (index < formData.length) {
        console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions4((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('di form penilaian -> ', index, ' kurang dari ', formData.length)
    }
  }

  const handleFormPenilaianChangeBaru4 = async (value, index) => {
    findActiveTab()
    console.log('ini panjang form data awal di form penilaian 4 ', formDataAwal4.length)
    console.log('ini index', index)
    console.log('ini formdata length', formData4.length)
    setFormName4(value)

    console.log('ini form data untuk form penilaian 4', formData4)
    if (index < formDataAwal4.length) {
      console.log('ini index ', index, ' kurang dari ini formDataAwal 4 ', formDataAwal4.length)
      setFormData4((prevFormData) => {
        const updatedFormData = [...prevFormData]
        const selectedForm = formPenilaian4.find((item) => item.form_name === value)

        updatedFormData[index] = {
          ...updatedFormData[index],
          name_form: selectedForm.form_name,
          component_id: dataKriteria4.id,
        }

        return updatedFormData
      })
      try {
        // if (index < formData.length) {
        console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions4((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('ini index ', index, ' lebih dari ini formDataAwal 4 ', formDataAwal4.length)
      setFormData4((prevFormData) => {
        const updatedFormData = [...prevFormData]

        updatedFormData[index] = {
          ...updatedFormData[index],
          name_form: value,
          component_id: dataKriteria4.id,
        }

        return updatedFormData
      })
      try {
        // console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        // console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions4((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleTahapChange4 = async (value, index) => {
    findActiveTab()

    console.log('ini panjang form data awal di tahap', formDataAwal4.length)
    if (index < formDataAwal4.length) {
      const selectedForm = tahapOptions4[index]
        ? tahapOptions4[index].find((item) => item.name === value)
        : null

      const updatedFormData = [...formData4]
      updatedFormData[index] = {
        ...updatedFormData[index],
        type_form: selectedForm ? selectedForm.name : null,
      }
      setFormData4(updatedFormData)

      // console.log('ini form data untuk tahap ', formData)
      const combinedData = [...formDataAwal4, ...formData4]
      const existingData = combinedData.filter(
        (data) =>
          data.aspek_name === formData4[index].aspek_name &&
          data.type_form === formData4[index].type_form,
      )
      console.log('ini existing data ', existingData)
    } else {
      console.log('ditahap -> ', index, ' kurang dari ', formDataAwal4.length)
      console.log('ini tahap', value)
      console.log('Index:', index)
      // const selectedForm = tahapOptions[index].find((item) => item.name === value)
      // console.log('ini selectedForm', selectedForm)
      const updatedFormData = [...formData4]
      updatedFormData[index] = {
        ...updatedFormData[index],
        type_form: value,
      }
      setFormData4(updatedFormData)
      console.log('ini form data untuk tahap di yang else', formData4)

      // console.log('ini form data awal panjangnya', formDataAwal.length)
      console.log('ini form data Awal', formDataAwal4)
      // const cek = formDataAwal4
      const existingDataAwal = formData4.map((data) => ({
        aspek_name: data.aspect_name,
        type_form: data.type_form,
      }))
      console.log('ini existing', existingDataAwal)
      const existingData = formData4.filter(
        (data) =>
          data.aspek_name === formData4[index].aspek_name &&
          data.type_form === formData4[index].type_form,
      )
      const mergedExistingData = existingDataAwal.concat(existingData)
      console.log('ini mergedExistingData ', mergedExistingData)
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
          {
            params: {
              formType: value,
              formName: formName4,
              prodiId: matkul.prodi_id,
            },
          },
        )

        const resData = response.data.data // Menampung data dari respons API dalam variabel resData
        console.log('ini resdata ', resData)

        // const ambilHasil = mergedExistingData.find((data) =>
        //   resData.some((res) => res.name === data.aspek_name && data.type_form === value),
        // )
        const newData = resData
          .filter(
            (res) =>
              !mergedExistingData.some(
                (data) =>
                  // data.aspect_form_id === res.id &&
                  data.aspek_name === res.name && data.type_form === value,
              ),
          )
          .map((res) => ({
            id: parseInt(res.id),
            name: res.name,
            type_form: value,
          }))

        if (newData.length > 0) {
          console.log('Data tidak ditemukan, menambahkan data baru', newData)
          mergedExistingData.push(...newData)
        } else {
          console.log('Tidak ada data baru yang perlu ditambahkan')
        }

        setAspekOptions4((prevAspekOptions) => {
          const updatedAspekOptions = [...prevAspekOptions]
          updatedAspekOptions[index] = newData
          return updatedAspekOptions
        })
        // })
        // console.log('ini aspek di tahap 4 ', aspekOptions4)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleAspekChange4 = async (value, index) => {
    findActiveTab()
    // if (index < formDataAwal.length) {
    const selectedForm = aspekOptions4[index]
      ? aspekOptions4[index].find((item) => item.name === value)
      : null

    console.log('ini hasil dari selected form aspek ', selectedForm)
    if (number4 === 0) {
      const updatedFormData = [...formData4]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm ? selectedForm.id : null,
        aspect_name: value,
        bobot_criteria: 100,
        id: null,
      }
      setFormData4(updatedFormData)
    } else {
      const updatedFormData = [...formData4]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm ? selectedForm.id : null,
        aspect_name: value,
        id: null,
      }
      setFormData4(updatedFormData)
    }
  }

  const handleBobotChange4 = async (value, index) => {
    findActiveTab()
    const sanitizedValue = value.replace(/[^0-9]/g, '')
    const parsedValue = parseInt(sanitizedValue)
    const clampedValue = Math.min(Math.max(parsedValue, 0), 100)

    if (isNaN(parsedValue) || clampedValue !== parsedValue) {
      // Tampilkan pesan kesalahan jika nilai tidak valid
      console.log('Input tidak valid. Masukkan angka antara 0 hingga 100.')
      notification.warning({
        message: 'Bobot harus diantara angka 0 hingga 100!',
      })
      const updatedFormData = [...formData4]
      updatedFormData[index] = {
        ...updatedFormData[index],
        bobot_criteria: 0,
      }
      setFormData4(updatedFormData)
    } else {
      const updatedFormData = [...formData4]
      updatedFormData[index] = {
        ...updatedFormData[index],
        bobot_criteria: clampedValue,
      }
      setFormData4(updatedFormData)
    }
  }

  const onFinish4 = () => {
    findActiveTab()
    // console.log('Received values:', values)
    // console.log('ini datanya', formData)
    // setValue(values)
    console.log('criteria_data', formData4)
  }

  const handleRemoveFieldAwal4 = (index) => {
    findActiveTab()

    const updatedFormDataAwal = [...formDataAwal1]
    updatedFormDataAwal.splice(index, 1) // Menghapus elemen dari array formDataAwal
    setFormDataAwal4(updatedFormDataAwal)
    console.log('ini formData Awal 4', formDataAwal4, ' ini length ', formDataAwal4.length)

    const updatedFormData = [...formData4]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData4(updatedFormData)
    console.log('ini formData 4 di atas', formData4)
  }

  const handleRemoveField4 = (fieldName, index, remove) => {
    findActiveTab()
    const updatedFormData = [...formData1]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData4(updatedFormData)
    console.log('ini formDataAwal 4 * ', formDataAwal4, ' ini length ', formDataAwal4.length)
    console.log('ini formData 4 * ', formData4)
    remove(fieldName) // Menghapus elemen dari Form.List fields
  }

  const handleViewData4 = async () => {
    console.log('criteria_data', formData4)
    console.log('lihat bobot ', bobot)
    findActiveTab()

    // Cek apakah ada bobot yang kosong atau nol
    const hasEmptyBobot = formData4.some(
      (data) => !data.bobot_criteria || data.bobot_criteria === 0,
    )

    if (number4 === 1 && hasEmptyBobot) {
      console.log('Periksa kelengkapan kriteria penilaian!')
      notification.warning({
        message: 'Periksa kelengkapan kriteria penilaian!',
      })
      return // Menghentikan eksekusi fungsi jika ada bobot yang kosong atau nol
    }

    const postData = {
      id: komponen4.id,
      name: komponen4.name,
      criteria_data: formData4,
      is_average: number4,
    }
    console.log('ini postdata eas t', postData)
    // console.log(typeof postData.id)

    try {
      // enterLoading(0) // Menonaktifkan loading state pada tombol
      await axios
        .put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/update`, {
          id: komponen4.id,
          name: komponen4.name,
          criteria_data: formData4,
          is_average: number4,
        })
        .then((response) => {
          // Tangani respons setelah berhasil melakukan POST
          console.log('Berhasil melakukan POST', response.data)
          notification.success({
            message: 'Kriteria berhasil tersimpan',
          })
        })
    } catch (error) {
      console.error('Gagal melakukan POST', error)
      notification.error({
        message: 'Kriteria gagal tersimpan',
      })
    }
  }

  //Lain lain Praktek
  const onChange5 = (checked) => {
    if (checked) {
      setNumber5(1) // Mengubah angka menjadi 1 jika tombol dinyalakan
    } else {
      setNumber5(0) // Mengubah angka menjadi 0 jika tombol dimatikan
    }
  }

  const handleFormPenilaianChange5 = async (value, index) => {
    findActiveTab()
    console.log('ini index', index)
    console.log('ini formdata 5 length', formData5.length)
    setFormName5(value)

    setFormData5((prevFormData) => {
      const updatedFormData = [...prevFormData]
      const selectedForm = formPenilaian5.find((item) => item.form_name === value)

      updatedFormData[index] = {
        ...updatedFormData[index],
        name_form: selectedForm.form_name,
        component_id: dataKriteria5.id,
      }

      return updatedFormData
    })

    console.log('ini form data untuk form penilaian 5 ', formData5)
    if (index < formData5.length) {
      try {
        // if (index < formData.length) {
        console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions5((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('di form penilaian -> ', index, ' kurang dari ', formData.length)
    }
  }

  const handleFormPenilaianChangeBaru5 = async (value, index) => {
    findActiveTab()
    console.log('ini panjang form data awal di form penilaian 5 ', formDataAwal5.length)
    console.log('ini index', index)
    console.log('ini formdata length', formData5.length)
    setFormName5(value)

    console.log('ini form data untuk form penilaian 5', formData5)
    if (index < formDataAwal5.length) {
      console.log('ini index ', index, ' kurang dari ini formDataAwal 5 ', formDataAwal5.length)
      setFormData5((prevFormData) => {
        const updatedFormData = [...prevFormData]
        const selectedForm = formPenilaian5.find((item) => item.form_name === value)

        updatedFormData[index] = {
          ...updatedFormData[index],
          name_form: selectedForm.form_name,
          component_id: dataKriteria5.id,
        }

        return updatedFormData
      })
      try {
        // if (index < formData.length) {
        console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions5((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('ini index ', index, ' lebih dari ini formDataAwal 5 ', formDataAwal5.length)
      setFormData5((prevFormData) => {
        const updatedFormData = [...prevFormData]

        updatedFormData[index] = {
          ...updatedFormData[index],
          name_form: value,
          component_id: dataKriteria5.id,
        }

        return updatedFormData
      })
      try {
        // console.log('ini api nge get aspek')
        const res = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type`,
          {
            params: {
              formType: value,
              prodiId: matkul.prodi_id,
            },
          },
        )

        // console.log('ini hasil nya dari respon', res.data.data)
        setTahapOptions5((prevTahapOptions) => {
          const updatedTahapOptions = [...prevTahapOptions]
          updatedTahapOptions[index] = res.data.data
          return updatedTahapOptions
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleTahapChange5 = async (value, index) => {
    findActiveTab()

    console.log('ini panjang form data awal di tahap', formDataAwal5.length)
    if (index < formDataAwal5.length) {
      const selectedForm = tahapOptions5[index]
        ? tahapOptions5[index].find((item) => item.name === value)
        : null

      const updatedFormData = [...formData5]
      updatedFormData[index] = {
        ...updatedFormData[index],
        type_form: selectedForm ? selectedForm.name : null,
      }
      setFormData5(updatedFormData)

      // console.log('ini form data untuk tahap ', formData)
      const combinedData = [...formDataAwal5, ...formData5]
      const existingData = combinedData.filter(
        (data) =>
          data.aspek_name === formData5[index].aspek_name &&
          data.type_form === formData5[index].type_form,
      )
      console.log('ini existing data ', existingData)
    } else {
      console.log('ditahap -> ', index, ' kurang dari ', formDataAwal5.length)
      console.log('ini tahap', value)
      console.log('Index:', index)
      // const selectedForm = tahapOptions[index].find((item) => item.name === value)
      // console.log('ini selectedForm', selectedForm)
      const updatedFormData = [...formData5]
      updatedFormData[index] = {
        ...updatedFormData[index],
        type_form: value,
      }
      setFormData5(updatedFormData)
      console.log('ini form data untuk tahap di yang else', formData5)

      // console.log('ini form data awal panjangnya', formDataAwal.length)
      console.log('ini form data Awal', formDataAwal5)
      // const cek = formDataAwal5
      const existingDataAwal = formData5.map((data) => ({
        aspek_name: data.aspect_name,
        type_form: data.type_form,
      }))
      console.log('ini existing', existingDataAwal)
      const existingData = formData5.filter(
        (data) =>
          data.aspek_name === formData5[index].aspek_name &&
          data.type_form === formData5[index].type_form,
      )
      const mergedExistingData = existingDataAwal.concat(existingData)
      console.log('ini mergedExistingData ', mergedExistingData)
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect`,
          {
            params: {
              formType: value,
              formName: formName5,
              prodiId: matkul.prodi_id,
            },
          },
        )

        const resData = response.data.data // Menampung data dari respons API dalam variabel resData
        console.log('ini resdata ', resData)

        // const ambilHasil = mergedExistingData.find((data) =>
        //   resData.some((res) => res.name === data.aspek_name && data.type_form === value),
        // )
        const newData = resData
          .filter(
            (res) =>
              !mergedExistingData.some(
                (data) =>
                  // data.aspect_form_id === res.id &&
                  data.aspek_name === res.name && data.type_form === value,
              ),
          )
          .map((res) => ({
            id: parseInt(res.id),
            name: res.name,
            type_form: value,
          }))

        if (newData.length > 0) {
          console.log('Data tidak ditemukan, menambahkan data baru', newData)
          mergedExistingData.push(...newData)
        } else {
          console.log('Tidak ada data baru yang perlu ditambahkan')
        }

        setAspekOptions5((prevAspekOptions) => {
          const updatedAspekOptions = [...prevAspekOptions]
          updatedAspekOptions[index] = newData
          return updatedAspekOptions
        })
        // })
        // console.log('ini aspek di tahap 5 ', aspekOptions5)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleAspekChange5 = async (value, index) => {
    findActiveTab()
    // if (index < formDataAwal.length) {
    const selectedForm = aspekOptions5[index]
      ? aspekOptions5[index].find((item) => item.name === value)
      : null

    console.log('ini hasil dari selected form aspek ', selectedForm)
    if (number5 === 0) {
      const updatedFormData = [...formData5]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm ? selectedForm.id : null,
        aspect_name: value,
        bobot_criteria: 100,
        id: null,
      }
      setFormData5(updatedFormData)
    } else {
      const updatedFormData = [...formData5]
      updatedFormData[index] = {
        ...updatedFormData[index],
        aspect_form_id: selectedForm ? selectedForm.id : null,
        aspect_name: value,
        id: null,
      }
      setFormData5(updatedFormData)
    }
  }

  const handleBobotChange5 = async (value, index) => {
    findActiveTab()
    const sanitizedValue = value.replace(/[^0-9]/g, '')
    const parsedValue = parseInt(sanitizedValue)
    const clampedValue = Math.min(Math.max(parsedValue, 0), 100)

    if (isNaN(parsedValue) || clampedValue !== parsedValue) {
      // Tampilkan pesan kesalahan jika nilai tidak valid
      console.log('Input tidak valid. Masukkan angka antara 0 hingga 100.')
      notification.warning({
        message: 'Bobot harus diantara angka 0 hingga 100!',
      })
      const updatedFormData = [...formData5]
      updatedFormData[index] = {
        ...updatedFormData[index],
        bobot_criteria: 0,
      }
      setFormData5(updatedFormData)
    } else {
      const updatedFormData = [...formData5]
      updatedFormData[index] = {
        ...updatedFormData[index],
        bobot_criteria: clampedValue,
      }
      setFormData5(updatedFormData)
    }
  }

  const onFinish5 = () => {
    findActiveTab()
    // console.log('Received values:', values)
    // console.log('ini datanya', formData)
    // setValue(values)
    console.log('criteria_data', formData5)
  }

  const handleRemoveFieldAwal5 = (index) => {
    findActiveTab()

    const updatedFormDataAwal = [...formDataAwal1]
    updatedFormDataAwal.splice(index, 1) // Menghapus elemen dari array formDataAwal
    setFormDataAwal5(updatedFormDataAwal)
    console.log('ini formData Awal 5', formDataAwal5, ' ini length ', formDataAwal5.length)

    const updatedFormData = [...formData5]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData5(updatedFormData)
    console.log('ini formData 5 di atas', formData5)
  }

  const handleRemoveField5 = (fieldName, index, remove) => {
    findActiveTab()
    const updatedFormData = [...formData1]
    updatedFormData.splice(index, 1) // Menghapus elemen dari array formData
    setFormData5(updatedFormData)
    console.log('ini formDataAwal 5 * ', formDataAwal5, ' ini length ', formDataAwal5.length)
    console.log('ini formData 5 * ', formData5)
    remove(fieldName) // Menghapus elemen dari Form.List fields
  }

  const handleViewData5 = async () => {
    console.log('criteria_data', formData5)
    console.log('lihat bobot ', bobot)
    findActiveTab()

    // Cek apakah ada bobot yang kosong atau nol
    const hasEmptyBobot = formData5.some(
      (data) => !data.bobot_criteria || data.bobot_criteria === 0,
    )

    if (number5 === 1 && hasEmptyBobot) {
      console.log('Periksa kelengkapan kriteria penilaian!')
      notification.warning({
        message: 'Periksa kelengkapan kriteria penilaian!',
      })
      return // Menghentikan eksekusi fungsi jika ada bobot yang kosong atau nol
    }

    const postData = {
      id: komponen5.id,
      name: komponen5.name,
      criteria_data: formData5,
      is_average: number5,
    }
    console.log('ini postdata eas t', postData)
    // console.log(typeof postData.id)

    try {
      // enterLoading(0) // Menonaktifkan loading state pada tombol
      await axios
        .put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/update`, {
          id: komponen5.id,
          name: komponen5.name,
          criteria_data: formData5,
          is_average: number5,
        })
        .then((response) => {
          // Tangani respons setelah berhasil melakukan POST
          console.log('Berhasil melakukan POST', response.data)
          notification.success({
            message: 'Kriteria berhasil tersimpan',
          })
        })
    } catch (error) {
      console.error('Gagal melakukan POST', error)
      notification.error({
        message: 'Kriteria gagal tersimpan',
      })
    }
  }

  return isLoading ? (
    <Spin indicator={antIcon} />
  ) : (
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
            disabled={bobotKomponen.UtsTeori === 0}
            // key={'0'} disabled={KP === 0}
          >
            <CCol>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ marginBottom: '10px' }}>
                  <h6>Kustomisasi Bobot</h6>
                </div>
                <Switch defaultChecked={number === 1} onChange={onChange} />
                {/* <p>Angka: {number1}</p> */}
              </div>
            </CCol>
            <CCol sm={12}>
              <Form
                form={form1}
                name="dynamic_form_nest_item"
                onFinish={onFinish1}
                // style={{
                //   width: '100%',
                // }}
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                fields={[
                  {
                    name: ['selectData'],
                  },
                  {
                    name: ['evaluasi-penilaian'],
                  },
                  {
                    name: ['form_type'],
                  },
                  {
                    name: ['tahapOptions'],
                  },
                  {
                    name: ['aspekOptions'],
                  },
                  {
                    name: ['bobot'],
                  },
                ]}
              >
                {formDataAwal.map((data, index) => (
                  <>
                    <Form.Item
                      key={index}
                      rules={[
                        {
                          required: true,
                          message: 'Evaluasi Form Penilaian tidak boleh kosong!',
                        },
                      ]}
                      validateTrigger={['onChange', 'onBlur']}
                      style={{ paddingRight: '35px' }}
                    >
                      <Row align="middle" gutter={8}>
                        <Col span={22}>
                          <b>Evaluasi Formulir Penilaian</b>
                          <Select
                            style={{ width: '100%' }}
                            value={
                              formData[index]?.name_form ? formData[index].name_form : undefined
                            }
                            onChange={(value) => handleFormPenilaianChange(value, index)}
                          >
                            {formPenilaian.map((item) => (
                              <Select.Option key={item.form_type} value={item.form_type}>
                                {item.form_type}
                              </Select.Option>
                            ))}
                          </Select>
                        </Col>

                        <Col span={22}>
                          <br></br>
                          <b>Evaluasi Penilaian</b>

                          <Select
                            style={{ width: '100%' }}
                            value={
                              formData[index]?.type_form ? formData[index].type_form : undefined
                            }
                            onChange={(value) => handleTahapChange(value, index)}
                          >
                            {tahapOptions[index] &&
                              tahapOptions[index].map((item, i) => (
                                <Select.Option key={item.name} value={item.name}>
                                  <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                    {item.name}
                                  </div>
                                </Select.Option>
                              ))}
                          </Select>
                        </Col>

                        <Col span={22}>
                          <br></br>
                          <b>Aspek</b>
                          <Select
                            style={{ width: '100%' }}
                            value={
                              formData[index]?.aspect_name
                                ? formData[index].aspect_name
                                : undefined
                            }
                            onChange={(value) => handleAspekChange(value, index)}
                          >
                            {aspekOptions[index] &&
                              aspekOptions[index].map((item, i) => (
                                <Select.Option key={item.name} value={item.name}>
                                  <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                    {' '}
                                    {item.name}
                                  </div>
                                </Select.Option>
                              ))}
                          </Select>
                        </Col>
                        <Col span={22}>
                          {number === 1 && (
                            <>
                              <br></br>
                              <b>Bobot </b>
                              <Input
                                // id={text.id}
                                style={{ width: '100%' }}
                                type="number"
                                min={0}
                                max={100}
                                addonAfter="%"
                                defaultValue={
                                  formData[index]?.bobot_criteria !== undefined
                                    ? formData[index].bobot_criteria.toString()
                                    : ''
                                }
                                onChange={(e) => handleBobotChange(e.target.value, index)}
                              />
                            </>
                          )}
                        </Col>
                      </Row>
                    </Form.Item>
                    <Col span={22} style={{ textAlign: 'right' }}>
                      <MinusCircleOutlined
                        style={{ color: 'red' }}
                        onClick={() => handleRemoveFieldAwal(index)}
                      />
                    </Col>
                  </>
                ))}

                <br></br>
                <Form.List name="users">
                  {(fields, { add, remove }) => (
                    <>
                      <div>
                        {fields.map((field, index) => (
                          <div key={field.key}>
                            <Row>
                              <Col span={22}>
                                <b>Evaluasi Formulir Penilaian</b>
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
                                  validateTrigger={['onChange', 'onBlur']}
                                  // style={{ width: '100%' }}
                                  style={{ paddingRight: '35px' }}
                                >
                                  <Select
                                    // style={{ width: '100%', height: '50px' }}
                                    style={{ width: '100%' }}
                                    onChange={(value) =>
                                      handleFormPenilaianChangeBaru(
                                        value,
                                        field.fieldKey + formDataAwal.length,
                                      )
                                    }
                                  >
                                    {formPenilaian.map((item, i) => (
                                      <Select.Option key={item.form_type} value={item.form_type}>
                                        {item.form_type}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col span={22}>
                                <b>Evaluasi Penilaian</b>
                                <Form.Item
                                  {...field}
                                  name={[field.name, 'tahapOptions']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Evaluasi penilaian tidak boleh kosong',
                                    },
                                  ]}
                                  validateTrigger={['onChange', 'onBlur']}
                                  style={{ paddingRight: '35px' }}
                                >
                                  <Select
                                    style={{ width: '100%' }}
                                    onChange={(value) =>
                                      handleTahapChange(
                                        value,
                                        formDataAwal.length + field.fieldKey,
                                      )
                                    }
                                  >
                                    {/* {console.log(
                                        'ini key + formDataAwal',
                                        field.fieldKey + formDataAwal.length,
                                      )} */}

                                    {tahapOptions[formDataAwal.length + index] &&
                                      tahapOptions[formDataAwal.length + index].map((item, i) => (
                                        <Select.Option key={item.name} value={item.name}>
                                          <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                            {item.name}
                                          </div>
                                        </Select.Option>
                                      ))}
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col span={22}>
                                <b>Aspek</b>
                                <Form.Item
                                  {...field}
                                  name={[field.name, 'aspekOptions']}
                                  fieldKey={[field.fieldKey, 'aspekOptions']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Aspek tidak boleh kosong',
                                    },
                                  ]}
                                  validateTrigger={['onChange', 'onBlur']}
                                  style={{ paddingRight: '35px' }}
                                >
                                  <Select
                                    style={{ width: '100%' }}
                                    onChange={(value) =>
                                      handleAspekChange(
                                        value,
                                        field.fieldKey + formDataAwal.length,
                                      )
                                    }
                                  >
                                    {aspekOptions[index + formDataAwal.length] &&
                                      aspekOptions[index + formDataAwal.length].map((item, i) => (
                                        <Select.Option key={item.name} value={item.name}>
                                          <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                            {item.name}
                                          </div>
                                        </Select.Option>
                                      ))}
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col span={22}>
                                {number === 1 && (
                                  <>
                                    <b>Bobot </b>
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
                                      <Input
                                        // id={text.id}
                                        style={{ width: '90%' }}
                                        type="number"
                                        min={0}
                                        max={100}
                                        addonAfter="%"
                                        // disabled={text.is_selected === 0}
                                        // value={text.criteria_bobot}

                                        onChange={(e) =>
                                          handleBobotChange(
                                            e.target.value,
                                            formDataAwal.length + index,
                                          )
                                        }
                                      />
                                    </Form.Item>
                                  </>
                                )}
                              </Col>
                            </Row>
                            <Col span={22} style={{ textAlign: 'right' }}>
                              {' '}
                              <MinusCircleOutlined
                                style={{ color: 'red' }}
                                // onClick={() => remove(field.name)}
                                onClick={() =>
                                  handleRemoveField(
                                    field.name,
                                    formDataAwal.length + index,
                                    remove,
                                  )
                                }
                              />
                            </Col>
                          </div>
                        ))}
                      </div>
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
                <Form.Item
                  style={{
                    display: 'flex',
                    justifyContent: current > 0 ? 'space-between' : 'flex-end',
                  }}
                >
                  {current > 0 && (
                    <Button
                      // type="primary"
                      style={{
                        background: '#808080',
                        color: 'white',
                        marginRight: '8px',
                      }}
                      onClick={() => {
                        setCurrent(current - 1)
                        // Logika untuk tombol "Kembali"
                      }}
                    >
                      Kembali
                    </Button>
                  )}
                  {/* {activeTab === 1 && ( */}
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loadings[0]}
                    onClick={() => handleViewData5()}
                  >
                    Simpan
                  </Button>
                  {/* )} */}
                </Form.Item>
              </Form>
            </CCol>
          </TabPane>
          <TabPane
            tab={'ETS Praktek'}
            key={'1'}
            disabled={bobotKomponen.UtsPraktek === 0}
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
                  form={form1}
                  name="dynamic_form_nest_item"
                  onFinish={onFinish1}
                  // style={{
                  //   width: '100%',
                  // }}
                  wrapperCol={{ span: 24 }}
                  autoComplete="off"
                  fields={[
                    {
                      name: ['selectData'],
                      // value: formData.map((item) => ({
                      //   defaultValue: item.defaultValue,
                      // })),
                    },
                    {
                      name: ['evaluasi-penilaian'],
                      // value: formData[index]?.name_form ? formData[index].name_form : undefined,
                    },
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
                  {formDataAwal1.map((data, index) => (
                    <>
                      <Form.Item
                        key={index}
                        rules={[
                          {
                            required: true,
                            message: 'Evaluasi Form Penilaian tidak boleh kosong!',
                          },
                        ]}
                        validateTrigger={['onChange', 'onBlur']}
                        style={{ paddingRight: '35px' }}
                      >
                        <Row align="middle" gutter={8}>
                          <Col span={22}>
                            <b>Evaluasi Formulir Penilaian</b>
                            <Select
                              style={{ width: '100%' }}
                              value={
                                formData1[index]?.name_form ? formData1[index].name_form : undefined
                              }
                              onChange={(value) => handleFormPenilaianChange1(value, index)}
                            >
                              {formPenilaian1.map((item) => (
                                <Select.Option key={item.form_type} value={item.form_type}>
                                  {item.form_type}
                                </Select.Option>
                              ))}
                            </Select>
                          </Col>

                          <Col span={22}>
                            <br></br>
                            <b>Evaluasi Penilaian</b>

                            <Select
                              style={{ width: '100%' }}
                              value={
                                formData1[index]?.type_form ? formData1[index].type_form : undefined
                              }
                              onChange={(value) => handleTahapChange1(value, index)}
                            >
                              {tahapOptions1[index] &&
                                tahapOptions1[index].map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                      {item.name}
                                    </div>
                                  </Select.Option>
                                ))}
                            </Select>
                          </Col>

                          <Col span={22}>
                            <br></br>
                            <b>Aspek</b>
                            <Select
                              style={{ width: '100%' }}
                              value={
                                formData1[index]?.aspect_name
                                  ? formData1[index].aspect_name
                                  : undefined
                              }
                              onChange={(value) => handleAspekChange1(value, index)}
                            >
                              {aspekOptions1[index] &&
                                aspekOptions1[index].map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                      {' '}
                                      {item.name}
                                    </div>
                                  </Select.Option>
                                ))}
                            </Select>
                          </Col>
                          <Col span={22}>
                            {number1 === 1 && (
                              <>
                                <br></br>
                                <b>Bobot </b>
                                <Input
                                  // id={text.id}
                                  style={{ width: '100%' }}
                                  type="number"
                                  min={0}
                                  max={100}
                                  addonAfter="%"
                                  defaultValue={
                                    formData1[index]?.bobot_criteria !== undefined
                                      ? formData1[index].bobot_criteria.toString()
                                      : ''
                                  }
                                  onChange={(e) => handleBobotChange1(e.target.value, index)}
                                />
                              </>
                            )}
                          </Col>
                        </Row>
                      </Form.Item>
                      <Col span={22} style={{ textAlign: 'right' }}>
                        <MinusCircleOutlined
                          style={{ color: 'red' }}
                          onClick={() => handleRemoveFieldAwal1(index)}
                        />
                      </Col>
                    </>
                  ))}

                  <br></br>
                  <Form.List name="users">
                    {(fields, { add, remove }) => (
                      <>
                        <div>
                          {fields.map((field, index) => (
                            <div key={field.key}>
                              <Row>
                                <Col span={22}>
                                  <b>Evaluasi Formulir Penilaian</b>
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
                                    validateTrigger={['onChange', 'onBlur']}
                                    // style={{ width: '100%' }}
                                    style={{ paddingRight: '35px' }}
                                  >
                                    <Select
                                      // style={{ width: '100%', height: '40px' }}
                                      style={{ width: '100%' }}
                                      onChange={(value) =>
                                        handleFormPenilaianChangeBaru1(
                                          value,
                                          field.fieldKey + formDataAwal1.length,
                                        )
                                      }
                                    >
                                      {formPenilaian1.map((item, i) => (
                                        <Select.Option key={item.form_type} value={item.form_type}>
                                          {item.form_type}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={22}>
                                  <b>Evaluasi Penilaian</b>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, 'tahapOptions']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Evaluasi penilaian tidak boleh kosong',
                                      },
                                    ]}
                                    validateTrigger={['onChange', 'onBlur']}
                                    style={{ paddingRight: '35px' }}
                                  >
                                    <Select
                                      style={{ width: '100%' }}
                                      onChange={(value) =>
                                        handleTahapChange1(
                                          value,
                                          formDataAwal1.length + field.fieldKey,
                                        )
                                      }
                                    >
                                      {/* {console.log(
                                        'ini key + formDataAwal',
                                        field.fieldKey + formDataAwal.length,
                                      )} */}

                                      {tahapOptions1[formDataAwal1.length + index] &&
                                        tahapOptions1[formDataAwal1.length + index].map(
                                          (item, i) => (
                                            <Select.Option key={item.name} value={item.name}>
                                              <div
                                                style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}
                                              >
                                                {item.name}
                                              </div>
                                            </Select.Option>
                                          ),
                                        )}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={22}>
                                  <b>Aspek</b>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, 'aspekOptions']}
                                    fieldKey={[field.fieldKey, 'aspekOptions']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Aspek tidak boleh kosong',
                                      },
                                    ]}
                                    validateTrigger={['onChange', 'onBlur']}
                                    style={{ paddingRight: '35px' }}
                                  >
                                    <Select
                                      style={{ width: '100%' }}
                                      onChange={(value) =>
                                        handleAspekChange1(
                                          value,
                                          field.fieldKey + formDataAwal1.length,
                                        )
                                      }
                                    >
                                      {aspekOptions1[index + formDataAwal1.length] &&
                                        aspekOptions1[index + formDataAwal1.length].map(
                                          (item, i) => (
                                            <Select.Option key={item.name} value={item.name}>
                                              <div
                                                style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}
                                              >
                                                {item.name}
                                              </div>
                                            </Select.Option>
                                          ),
                                        )}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={22}>
                                  {number1 === 1 && (
                                    <>
                                      <b>Bobot </b>
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
                                        <Input
                                          // id={text.id}
                                          style={{ width: '90%' }}
                                          type="number"
                                          min={0}
                                          max={100}
                                          addonAfter="%"
                                          // disabled={text.is_selected === 0}
                                          // value={text.criteria_bobot}

                                          onChange={(e) =>
                                            handleBobotChange1(
                                              e.target.value,
                                              formDataAwal1.length + index,
                                            )
                                          }
                                        />
                                      </Form.Item>
                                    </>
                                  )}
                                </Col>
                              </Row>
                              <Col span={22} style={{ textAlign: 'right' }}>
                                {' '}
                                <MinusCircleOutlined
                                  style={{ color: 'red' }}
                                  // onClick={() => remove(field.name)}
                                  onClick={() =>
                                    handleRemoveField1(
                                      field.name,
                                      formDataAwal1.length + index,
                                      remove,
                                    )
                                  }
                                />
                              </Col>
                            </div>
                          ))}
                        </div>
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
                  <Form.Item
                    style={{
                      display: 'flex',
                      justifyContent: current > 0 ? 'space-between' : 'flex-end',
                    }}
                  >
                    {current > 0 && (
                      <Button
                        // type="primary"
                        style={{
                          background: '#808080',
                          color: 'white',
                          marginRight: '8px',
                        }}
                        onClick={() => {
                          setCurrent(current - 1)
                          // Logika untuk tombol "Kembali"
                        }}
                      >
                        Kembali
                      </Button>
                    )}
                    {/* {activeTab === 1 && ( */}
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loadings[0]}
                      onClick={() => handleViewData1()}
                    >
                      Simpan
                    </Button>
                    {/* )} */}
                  </Form.Item>
                </Form>
              </CCol>
            </CRow>
          </TabPane>
          <TabPane tab={'EAS Teori'} key={'2'} disabled={bobotKomponen.UasTeori === 0}>
            <CRow>
              <CCol>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <h6>Kustomisasi Bobot</h6>
                  </div>
                  <Switch defaultChecked={number2 === 1} onChange={onChange2} />
                  {/* <p>Angka: {number1}</p> */}
                </div>
              </CCol>
              <CCol sm={12}>
                <Form
                  form={form1}
                  name="dynamic_form_nest_item"
                  onFinish={onFinish2}
                  // style={{
                  //   width: '100%',
                  // }}
                  wrapperCol={{ span: 24 }}
                  autoComplete="off"
                  fields={[
                    {
                      name: ['selectData'],
                    },
                    {
                      name: ['evaluasi-penilaian'],
                    },
                    {
                      name: ['form_type'],
                    },
                    {
                      name: ['tahapOptions'],
                    },
                    {
                      name: ['aspekOptions'],
                    },
                    {
                      name: ['bobot'],
                    },
                  ]}
                >
                  {formDataAwal2.map((data, index) => (
                    <>
                      <Form.Item
                        key={index}
                        rules={[
                          {
                            required: true,
                            message: 'Evaluasi Form Penilaian tidak boleh kosong!',
                          },
                        ]}
                        validateTrigger={['onChange', 'onBlur']}
                        style={{ paddingRight: '35px' }}
                      >
                        <Row align="middle" gutter={8}>
                          <Col span={22}>
                            <b>Evaluasi Formulir Penilaian</b>
                            <Select
                              style={{ width: '100%' }}
                              value={
                                formData2[index]?.name_form ? formData2[index].name_form : undefined
                              }
                              onChange={(value) => handleFormPenilaianChange2(value, index)}
                            >
                              {formPenilaian2.map((item) => (
                                <Select.Option key={item.form_type} value={item.form_type}>
                                  {item.form_type}
                                </Select.Option>
                              ))}
                            </Select>
                          </Col>

                          <Col span={22}>
                            <br></br>
                            <b>Evaluasi Penilaian</b>

                            <Select
                              style={{ width: '100%' }}
                              value={
                                formData2[index]?.type_form ? formData2[index].type_form : undefined
                              }
                              onChange={(value) => handleTahapChange2(value, index)}
                            >
                              {tahapOptions2[index] &&
                                tahapOptions2[index].map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                      {item.name}
                                    </div>
                                  </Select.Option>
                                ))}
                            </Select>
                          </Col>

                          <Col span={22}>
                            <br></br>
                            <b>Aspek</b>
                            <Select
                              style={{ width: '100%' }}
                              value={
                                formData2[index]?.aspect_name
                                  ? formData2[index].aspect_name
                                  : undefined
                              }
                              onChange={(value) => handleAspekChange2(value, index)}
                            >
                              {aspekOptions2[index] &&
                                aspekOptions2[index].map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                      {' '}
                                      {item.name}
                                    </div>
                                  </Select.Option>
                                ))}
                            </Select>
                          </Col>
                          <Col span={22}>
                            {number2 === 1 && (
                              <>
                                <br></br>
                                <b>Bobot </b>
                                <Input
                                  // id={text.id}
                                  style={{ width: '100%' }}
                                  type="number"
                                  min={0}
                                  max={100}
                                  addonAfter="%"
                                  defaultValue={
                                    formData2[index]?.bobot_criteria !== undefined
                                      ? formData2[index].bobot_criteria.toString()
                                      : ''
                                  }
                                  onChange={(e) => handleBobotChange2(e.target.value, index)}
                                />
                              </>
                            )}
                          </Col>
                        </Row>
                      </Form.Item>
                      <Col span={22} style={{ textAlign: 'right' }}>
                        <MinusCircleOutlined
                          style={{ color: 'red' }}
                          onClick={() => handleRemoveFieldAwal2(index)}
                        />
                      </Col>
                    </>
                  ))}

                  <br></br>
                  <Form.List name="users">
                    {(fields, { add, remove }) => (
                      <>
                        <div>
                          {fields.map((field, index) => (
                            <div key={field.key}>
                              <Row>
                                <Col span={22}>
                                  <b>Evaluasi Formulir Penilaian</b>
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
                                    validateTrigger={['onChange', 'onBlur']}
                                    // style={{ width: '100%' }}
                                    style={{ paddingRight: '35px' }}
                                  >
                                    <Select
                                      // style={{ width: '100%', height: '40px' }}
                                      style={{ width: '100%' }}
                                      onChange={(value) =>
                                        handleFormPenilaianChangeBaru2(
                                          value,
                                          field.fieldKey + formDataAwal2.length,
                                        )
                                      }
                                    >
                                      {formPenilaian2.map((item, i) => (
                                        <Select.Option key={item.form_type} value={item.form_type}>
                                          {item.form_type}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={22}>
                                  <b>Evaluasi Penilaian</b>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, 'tahapOptions']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Evaluasi penilaian tidak boleh kosong',
                                      },
                                    ]}
                                    validateTrigger={['onChange', 'onBlur']}
                                    style={{ paddingRight: '35px' }}
                                  >
                                    <Select
                                      style={{ width: '100%' }}
                                      onChange={(value) =>
                                        handleTahapChange2(
                                          value,
                                          formDataAwal2.length + field.fieldKey,
                                        )
                                      }
                                    >
                                      {/* {console.log(
                                        'ini key + formDataAwal',
                                        field.fieldKey + formDataAwal.length,
                                      )} */}

                                      {tahapOptions2[formDataAwal2.length + index] &&
                                        tahapOptions2[formDataAwal2.length + index].map(
                                          (item, i) => (
                                            <Select.Option key={item.name} value={item.name}>
                                              <div
                                                style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}
                                              >
                                                {item.name}
                                              </div>
                                            </Select.Option>
                                          ),
                                        )}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={22}>
                                  <b>Aspek</b>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, 'aspekOptions']}
                                    fieldKey={[field.fieldKey, 'aspekOptions']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Aspek tidak boleh kosong',
                                      },
                                    ]}
                                    validateTrigger={['onChange', 'onBlur']}
                                    style={{ paddingRight: '35px' }}
                                  >
                                    <Select
                                      style={{ width: '100%' }}
                                      onChange={(value) =>
                                        handleAspekChange2(
                                          value,
                                          field.fieldKey + formDataAwal2.length,
                                        )
                                      }
                                    >
                                      {aspekOptions2[index + formDataAwal2.length] &&
                                        aspekOptions2[index + formDataAwal2.length].map(
                                          (item, i) => (
                                            <Select.Option key={item.name} value={item.name}>
                                              <div
                                                style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}
                                              >
                                                {item.name}
                                              </div>
                                            </Select.Option>
                                          ),
                                        )}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={22}>
                                  {number2 === 1 && (
                                    <>
                                      <b>Bobot </b>
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
                                        <Input
                                          // id={text.id}
                                          style={{ width: '90%' }}
                                          type="number"
                                          min={0}
                                          max={100}
                                          addonAfter="%"
                                          // disabled={text.is_selected === 0}
                                          // value={text.criteria_bobot}

                                          onChange={(e) =>
                                            handleBobotChange2(
                                              e.target.value,
                                              formDataAwal2.length + index,
                                            )
                                          }
                                        />
                                      </Form.Item>
                                    </>
                                  )}
                                </Col>
                              </Row>
                              <Col span={22} style={{ textAlign: 'right' }}>
                                {' '}
                                <MinusCircleOutlined
                                  style={{ color: 'red' }}
                                  // onClick={() => remove(field.name)}
                                  onClick={() =>
                                    handleRemoveField2(
                                      field.name,
                                      formDataAwal2.length + index,
                                      remove,
                                    )
                                  }
                                />
                              </Col>
                            </div>
                          ))}
                        </div>
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
                  <Form.Item
                    style={{
                      display: 'flex',
                      justifyContent: current > 0 ? 'space-between' : 'flex-end',
                    }}
                  >
                    {current > 0 && (
                      <Button
                        // type="primary"
                        style={{
                          background: '#808080',
                          color: 'white',
                          marginRight: '8px',
                        }}
                        onClick={() => {
                          setCurrent(current - 1)
                          // Logika untuk tombol "Kembali"
                        }}
                      >
                        Kembali
                      </Button>
                    )}
                    {/* {activeTab === 1 && ( */}
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loadings[0]}
                      onClick={() => handleViewData2()}
                    >
                      Simpan
                    </Button>
                    {/* )} */}
                  </Form.Item>
                </Form>
              </CCol>
            </CRow>
          </TabPane>
          <TabPane tab={'EAS Praktek'} key={'3'} disabled={bobotKomponen.UasPraktek === 0}>
            <CRow>
              <CCol>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <h6>Kustomisasi Bobot</h6>
                  </div>
                  <Switch defaultChecked={number3 === 1} onChange={onChange3} />
                  {/* <p>Angka: {number1}</p> */}
                </div>
              </CCol>
              <CCol sm={12}>
                <Form
                  form={form1}
                  name="dynamic_form_nest_item"
                  onFinish={onFinish1}
                  // style={{
                  //   width: '100%',
                  // }}
                  wrapperCol={{ span: 24 }}
                  autoComplete="off"
                  fields={[
                    {
                      name: ['selectData'],
                    },
                    {
                      name: ['evaluasi-penilaian'],
                    },
                    {
                      name: ['form_type'],
                    },
                    {
                      name: ['tahapOptions'],
                    },
                    {
                      name: ['aspekOptions'],
                    },
                    {
                      name: ['bobot'],
                    },
                  ]}
                >
                  {formDataAwal3.map((data, index) => (
                    <>
                      <Form.Item
                        key={index}
                        rules={[
                          {
                            required: true,
                            message: 'Evaluasi Form Penilaian tidak boleh kosong!',
                          },
                        ]}
                        validateTrigger={['onChange', 'onBlur']}
                        style={{ paddingRight: '35px' }}
                      >
                        <Row align="middle" gutter={8}>
                          <Col span={22}>
                            <b>Evaluasi Formulir Penilaian</b>
                            <Select
                              style={{ width: '100%' }}
                              value={
                                formData3[index]?.name_form ? formData3[index].name_form : undefined
                              }
                              onChange={(value) => handleFormPenilaianChange3(value, index)}
                            >
                              {formPenilaian3.map((item) => (
                                <Select.Option key={item.form_type} value={item.form_type}>
                                  {item.form_type}
                                </Select.Option>
                              ))}
                            </Select>
                          </Col>

                          <Col span={22}>
                            <br></br>
                            <b>Evaluasi Penilaian</b>

                            <Select
                              style={{ width: '100%' }}
                              value={
                                formData3[index]?.type_form ? formData3[index].type_form : undefined
                              }
                              onChange={(value) => handleTahapChange3(value, index)}
                            >
                              {tahapOptions3[index] &&
                                tahapOptions3[index].map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                      {item.name}
                                    </div>
                                  </Select.Option>
                                ))}
                            </Select>
                          </Col>

                          <Col span={22}>
                            <br></br>
                            <b>Aspek</b>
                            <Select
                              style={{ width: '100%' }}
                              value={
                                formData3[index]?.aspect_name
                                  ? formData3[index].aspect_name
                                  : undefined
                              }
                              onChange={(value) => handleAspekChange3(value, index)}
                            >
                              {aspekOptions3[index] &&
                                aspekOptions3[index].map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                      {' '}
                                      {item.name}
                                    </div>
                                  </Select.Option>
                                ))}
                            </Select>
                          </Col>
                          <Col span={22}>
                            {number3 === 1 && (
                              <>
                                <br></br>
                                <b>Bobot </b>
                                <Input
                                  // id={text.id}
                                  style={{ width: '100%' }}
                                  type="number"
                                  min={0}
                                  max={100}
                                  addonAfter="%"
                                  defaultValue={
                                    formData3[index]?.bobot_criteria !== undefined
                                      ? formData3[index].bobot_criteria.toString()
                                      : ''
                                  }
                                  onChange={(e) => handleBobotChange3(e.target.value, index)}
                                />
                              </>
                            )}
                          </Col>
                        </Row>
                      </Form.Item>
                      <Col span={22} style={{ textAlign: 'right' }}>
                        <MinusCircleOutlined
                          style={{ color: 'red' }}
                          onClick={() => handleRemoveFieldAwal3(index)}
                        />
                      </Col>
                    </>
                  ))}

                  <br></br>
                  <Form.List name="users">
                    {(fields, { add, remove }) => (
                      <>
                        <div>
                          {fields.map((field, index) => (
                            <div key={field.key}>
                              <Row>
                                <Col span={22}>
                                  <b>Evaluasi Formulir Penilaian</b>
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
                                    validateTrigger={['onChange', 'onBlur']}
                                    // style={{ width: '100%' }}
                                    style={{ paddingRight: '35px' }}
                                  >
                                    <Select
                                      // style={{ width: '100%', height: '40px' }}
                                      style={{ width: '100%' }}
                                      onChange={(value) =>
                                        handleFormPenilaianChangeBaru3(
                                          value,
                                          field.fieldKey + formDataAwal3.length,
                                        )
                                      }
                                    >
                                      {formPenilaian3.map((item, i) => (
                                        <Select.Option key={item.form_type} value={item.form_type}>
                                          {item.form_type}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={22}>
                                  <b>Evaluasi Penilaian</b>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, 'tahapOptions']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Evaluasi penilaian tidak boleh kosong',
                                      },
                                    ]}
                                    validateTrigger={['onChange', 'onBlur']}
                                    style={{ paddingRight: '35px' }}
                                  >
                                    <Select
                                      style={{ width: '100%' }}
                                      onChange={(value) =>
                                        handleTahapChange3(
                                          value,
                                          formDataAwal3.length + field.fieldKey,
                                        )
                                      }
                                    >
                                      {/* {console.log(
                                        'ini key + formDataAwal',
                                        field.fieldKey + formDataAwal.length,
                                      )} */}

                                      {tahapOptions3[formDataAwal3.length + index] &&
                                        tahapOptions3[formDataAwal3.length + index].map(
                                          (item, i) => (
                                            <Select.Option key={item.name} value={item.name}>
                                              <div
                                                style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}
                                              >
                                                {item.name}
                                              </div>
                                            </Select.Option>
                                          ),
                                        )}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={22}>
                                  <b>Aspek</b>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, 'aspekOptions']}
                                    fieldKey={[field.fieldKey, 'aspekOptions']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Aspek tidak boleh kosong',
                                      },
                                    ]}
                                    validateTrigger={['onChange', 'onBlur']}
                                    style={{ paddingRight: '35px' }}
                                  >
                                    <Select
                                      style={{ width: '100%' }}
                                      onChange={(value) =>
                                        handleAspekChange3(
                                          value,
                                          field.fieldKey + formDataAwal3.length,
                                        )
                                      }
                                    >
                                      {aspekOptions3[index + formDataAwal3.length] &&
                                        aspekOptions3[index + formDataAwal3.length].map(
                                          (item, i) => (
                                            <Select.Option key={item.name} value={item.name}>
                                              <div
                                                style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}
                                              >
                                                {item.name}
                                              </div>
                                            </Select.Option>
                                          ),
                                        )}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={22}>
                                  {number3 === 1 && (
                                    <>
                                      <b>Bobot </b>
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
                                        <Input
                                          // id={text.id}
                                          style={{ width: '90%' }}
                                          type="number"
                                          min={0}
                                          max={100}
                                          addonAfter="%"
                                          // disabled={text.is_selected === 0}
                                          // value={text.criteria_bobot}

                                          onChange={(e) =>
                                            handleBobotChange3(
                                              e.target.value,
                                              formDataAwal3.length + index,
                                            )
                                          }
                                        />
                                      </Form.Item>
                                    </>
                                  )}
                                </Col>
                              </Row>
                              <Col span={22} style={{ textAlign: 'right' }}>
                                {' '}
                                <MinusCircleOutlined
                                  style={{ color: 'red' }}
                                  // onClick={() => remove(field.name)}
                                  onClick={() =>
                                    handleRemoveField3(
                                      field.name,
                                      formDataAwal3.length + index,
                                      remove,
                                    )
                                  }
                                />
                              </Col>
                            </div>
                          ))}
                        </div>
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
                  <Form.Item
                    style={{
                      display: 'flex',
                      justifyContent: current > 0 ? 'space-between' : 'flex-end',
                    }}
                  >
                    {current > 0 && (
                      <Button
                        // type="primary"
                        style={{
                          background: '#808080',
                          color: 'white',
                          marginRight: '8px',
                        }}
                        onClick={() => {
                          setCurrent(current - 1)
                          // Logika untuk tombol "Kembali"
                        }}
                      >
                        Kembali
                      </Button>
                    )}
                    {/* {activeTab === 1 && ( */}
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loadings[0]}
                      onClick={() => handleViewData3()}
                    >
                      Simpan
                    </Button>
                    {/* )} */}
                  </Form.Item>
                </Form>
              </CCol>
            </CRow>
          </TabPane>
          <TabPane tab={'Lain-Lain Teori'} key={'4'} disabled={bobotKomponen.LainTeori === 0}>
            <CRow>
              <CCol>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <h6>Kustomisasi Bobot</h6>
                  </div>
                  <Switch defaultChecked={number4 === 1} onChange={onChange4} />
                  {/* <p>Angka: {number1}</p> */}
                </div>
              </CCol>
              <CCol sm={12}>
                <Form
                  form={form1}
                  name="dynamic_form_nest_item"
                  onFinish={onFinish1}
                  // style={{
                  //   width: '100%',
                  // }}
                  wrapperCol={{ span: 24 }}
                  autoComplete="off"
                  fields={[
                    {
                      name: ['selectData'],
                    },
                    {
                      name: ['evaluasi-penilaian'],
                    },
                    {
                      name: ['form_type'],
                    },
                    {
                      name: ['tahapOptions'],
                    },
                    {
                      name: ['aspekOptions'],
                    },
                    {
                      name: ['bobot'],
                    },
                  ]}
                >
                  {formDataAwal4.map((data, index) => (
                    <>
                      <Form.Item
                        key={index}
                        rules={[
                          {
                            required: true,
                            message: 'Evaluasi Form Penilaian tidak boleh kosong!',
                          },
                        ]}
                        validateTrigger={['onChange', 'onBlur']}
                        style={{ paddingRight: '35px' }}
                      >
                        <Row align="middle" gutter={8}>
                          <Col span={22}>
                            <b>Evaluasi Formulir Penilaian</b>
                            <Select
                              style={{ width: '100%' }}
                              value={
                                formData4[index]?.name_form ? formData4[index].name_form : undefined
                              }
                              onChange={(value) => handleFormPenilaianChange4(value, index)}
                            >
                              {formPenilaian4.map((item) => (
                                <Select.Option key={item.form_type} value={item.form_type}>
                                  {item.form_type}
                                </Select.Option>
                              ))}
                            </Select>
                          </Col>

                          <Col span={22}>
                            <br></br>
                            <b>Evaluasi Penilaian</b>

                            <Select
                              style={{ width: '100%' }}
                              value={
                                formData4[index]?.type_form ? formData4[index].type_form : undefined
                              }
                              onChange={(value) => handleTahapChange4(value, index)}
                            >
                              {tahapOptions4[index] &&
                                tahapOptions4[index].map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                      {item.name}
                                    </div>
                                  </Select.Option>
                                ))}
                            </Select>
                          </Col>

                          <Col span={22}>
                            <br></br>
                            <b>Aspek</b>
                            <Select
                              style={{ width: '100%' }}
                              value={
                                formData4[index]?.aspect_name
                                  ? formData4[index].aspect_name
                                  : undefined
                              }
                              onChange={(value) => handleAspekChange4(value, index)}
                            >
                              {aspekOptions4[index] &&
                                aspekOptions4[index].map((item, i) => (
                                  <Select.Option key={item.name} value={item.name}>
                                    <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                      {' '}
                                      {item.name}
                                    </div>
                                  </Select.Option>
                                ))}
                            </Select>
                          </Col>
                          <Col span={22}>
                            {number4 === 1 && (
                              <>
                                <br></br>
                                <b>Bobot </b>
                                <Input
                                  // id={text.id}
                                  style={{ width: '100%' }}
                                  type="number"
                                  min={0}
                                  max={100}
                                  addonAfter="%"
                                  defaultValue={
                                    formData4[index]?.bobot_criteria !== undefined
                                      ? formData4[index].bobot_criteria.toString()
                                      : ''
                                  }
                                  onChange={(e) => handleBobotChange4(e.target.value, index)}
                                />
                              </>
                            )}
                          </Col>
                        </Row>
                      </Form.Item>
                      <Col span={22} style={{ textAlign: 'right' }}>
                        <MinusCircleOutlined
                          style={{ color: 'red' }}
                          onClick={() => handleRemoveFieldAwal4(index)}
                        />
                      </Col>
                    </>
                  ))}

                  <br></br>
                  <Form.List name="users">
                    {(fields, { add, remove }) => (
                      <>
                        <div>
                          {fields.map((field, index) => (
                            <div key={field.key}>
                              <Row>
                                <Col span={22}>
                                  <b>Evaluasi Formulir Penilaian</b>
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
                                    validateTrigger={['onChange', 'onBlur']}
                                    // style={{ width: '100%' }}
                                    style={{ paddingRight: '35px' }}
                                  >
                                    <Select
                                      // style={{ width: '100%', height: '40px' }}
                                      style={{ width: '100%' }}
                                      onChange={(value) =>
                                        handleFormPenilaianChangeBaru4(
                                          value,
                                          field.fieldKey + formDataAwal4.length,
                                        )
                                      }
                                    >
                                      {formPenilaian4.map((item, i) => (
                                        <Select.Option key={item.form_type} value={item.form_type}>
                                          {item.form_type}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={22}>
                                  <b>Evaluasi Penilaian</b>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, 'tahapOptions']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Evaluasi penilaian tidak boleh kosong',
                                      },
                                    ]}
                                    validateTrigger={['onChange', 'onBlur']}
                                    style={{ paddingRight: '35px' }}
                                  >
                                    <Select
                                      style={{ width: '100%' }}
                                      onChange={(value) =>
                                        handleTahapChange4(
                                          value,
                                          formDataAwal4.length + field.fieldKey,
                                        )
                                      }
                                    >
                                      {/* {console.log(
                                        'ini key + formDataAwal',
                                        field.fieldKey + formDataAwal.length,
                                      )} */}

                                      {tahapOptions4[formDataAwal4.length + index] &&
                                        tahapOptions4[formDataAwal4.length + index].map(
                                          (item, i) => (
                                            <Select.Option key={item.name} value={item.name}>
                                              <div
                                                style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}
                                              >
                                                {item.name}
                                              </div>
                                            </Select.Option>
                                          ),
                                        )}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={22}>
                                  <b>Aspek</b>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, 'aspekOptions']}
                                    fieldKey={[field.fieldKey, 'aspekOptions']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Aspek tidak boleh kosong',
                                      },
                                    ]}
                                    validateTrigger={['onChange', 'onBlur']}
                                    style={{ paddingRight: '35px' }}
                                  >
                                    <Select
                                      style={{ width: '100%' }}
                                      onChange={(value) =>
                                        handleAspekChange4(
                                          value,
                                          field.fieldKey + formDataAwal4.length,
                                        )
                                      }
                                    >
                                      {aspekOptions4[index + formDataAwal4.length] &&
                                        aspekOptions4[index + formDataAwal4.length].map(
                                          (item, i) => (
                                            <Select.Option key={item.name} value={item.name}>
                                              <div
                                                style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}
                                              >
                                                {item.name}
                                              </div>
                                            </Select.Option>
                                          ),
                                        )}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={22}>
                                  {number4 === 1 && (
                                    <>
                                      <b>Bobot </b>
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
                                        <Input
                                          // id={text.id}
                                          style={{ width: '90%' }}
                                          type="number"
                                          min={0}
                                          max={100}
                                          addonAfter="%"
                                          // disabled={text.is_selected === 0}
                                          // value={text.criteria_bobot}

                                          onChange={(e) =>
                                            handleBobotChange4(
                                              e.target.value,
                                              formDataAwal4.length + index,
                                            )
                                          }
                                        />
                                      </Form.Item>
                                    </>
                                  )}
                                </Col>
                              </Row>
                              <Col span={22} style={{ textAlign: 'right' }}>
                                {' '}
                                <MinusCircleOutlined
                                  style={{ color: 'red' }}
                                  // onClick={() => remove(field.name)}
                                  onClick={() =>
                                    handleRemoveField4(
                                      field.name,
                                      formDataAwal4.length + index,
                                      remove,
                                    )
                                  }
                                />
                              </Col>
                            </div>
                          ))}
                        </div>
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
                  <Form.Item
                    style={{
                      display: 'flex',
                      justifyContent: current > 0 ? 'space-between' : 'flex-end',
                    }}
                  >
                    {current > 0 && (
                      <Button
                        // type="primary"
                        style={{
                          background: '#808080',
                          color: 'white',
                          marginRight: '8px',
                        }}
                        onClick={() => {
                          setCurrent(current - 1)
                          // Logika untuk tombol "Kembali"
                        }}
                      >
                        Kembali
                      </Button>
                    )}
                    {/* {activeTab === 1 && ( */}
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loadings[0]}
                      onClick={() => handleViewData4()}
                    >
                      Simpan
                    </Button>
                    {/* )} */}
                  </Form.Item>
                </Form>
              </CCol>
            </CRow>
          </TabPane>
          <TabPane tab={'Lain-Lain Praktek'} key={'5'} disabled={bobotKomponen.LainPraktek === 0}>
            <CCol>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ marginBottom: '10px' }}>
                  <h6>Kustomisasi Bobot</h6>
                </div>
                <Switch defaultChecked={number5 === 1} onChange={onChange5} />
                {/* <p>Angka: {number1}</p> */}
              </div>
            </CCol>
            <CCol sm={12}>
              <Form
                form={form1}
                name="dynamic_form_nest_item"
                onFinish={onFinish1}
                // style={{
                //   width: '100%',
                // }}
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                fields={[
                  {
                    name: ['selectData'],
                  },
                  {
                    name: ['evaluasi-penilaian'],
                  },
                  {
                    name: ['form_type'],
                  },
                  {
                    name: ['tahapOptions'],
                  },
                  {
                    name: ['aspekOptions'],
                  },
                  {
                    name: ['bobot'],
                  },
                ]}
              >
                {formDataAwal5.map((data, index) => (
                  <>
                    <Form.Item
                      key={index}
                      rules={[
                        {
                          required: true,
                          message: 'Evaluasi Form Penilaian tidak boleh kosong!',
                        },
                      ]}
                      validateTrigger={['onChange', 'onBlur']}
                      style={{ paddingRight: '35px' }}
                    >
                      <Row align="middle" gutter={8}>
                        <Col span={22}>
                          <b>Evaluasi Formulir Penilaian</b>
                          <Select
                            style={{ width: '100%' }}
                            value={
                              formData5[index]?.name_form ? formData5[index].name_form : undefined
                            }
                            onChange={(value) => handleFormPenilaianChange5(value, index)}
                          >
                            {formPenilaian5.map((item) => (
                              <Select.Option key={item.form_type} value={item.form_type}>
                                {item.form_type}
                              </Select.Option>
                            ))}
                          </Select>
                        </Col>

                        <Col span={22}>
                          <br></br>
                          <b>Evaluasi Penilaian</b>

                          <Select
                            style={{ width: '100%' }}
                            value={
                              formData5[index]?.type_form ? formData5[index].type_form : undefined
                            }
                            onChange={(value) => handleTahapChange5(value, index)}
                          >
                            {tahapOptions5[index] &&
                              tahapOptions5[index].map((item, i) => (
                                <Select.Option key={item.name} value={item.name}>
                                  <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                    {item.name}
                                  </div>
                                </Select.Option>
                              ))}
                          </Select>
                        </Col>

                        <Col span={22}>
                          <br></br>
                          <b>Aspek</b>
                          <Select
                            style={{ width: '100%' }}
                            value={
                              formData5[index]?.aspect_name
                                ? formData5[index].aspect_name
                                : undefined
                            }
                            onChange={(value) => handleAspekChange5(value, index)}
                          >
                            {aspekOptions5[index] &&
                              aspekOptions5[index].map((item, i) => (
                                <Select.Option key={item.name} value={item.name}>
                                  <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                    {' '}
                                    {item.name}
                                  </div>
                                </Select.Option>
                              ))}
                          </Select>
                        </Col>
                        <Col span={22}>
                          {number5 === 1 && (
                            <>
                              <br></br>
                              <b>Bobot </b>
                              <Input
                                // id={text.id}
                                style={{ width: '100%' }}
                                type="number"
                                min={0}
                                max={100}
                                addonAfter="%"
                                defaultValue={
                                  formData5[index]?.bobot_criteria !== undefined
                                    ? formData5[index].bobot_criteria.toString()
                                    : ''
                                }
                                onChange={(e) => handleBobotChange5(e.target.value, index)}
                              />
                            </>
                          )}
                        </Col>
                      </Row>
                    </Form.Item>
                    <Col span={22} style={{ textAlign: 'right' }}>
                      <MinusCircleOutlined
                        style={{ color: 'red' }}
                        onClick={() => handleRemoveFieldAwal5(index)}
                      />
                    </Col>
                  </>
                ))}

                <br></br>
                <Form.List name="users">
                  {(fields, { add, remove }) => (
                    <>
                      <div>
                        {fields.map((field, index) => (
                          <div key={field.key}>
                            <Row>
                              <Col span={22}>
                                <b>Evaluasi Formulir Penilaian</b>
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
                                  validateTrigger={['onChange', 'onBlur']}
                                  // style={{ width: '100%' }}
                                  style={{ paddingRight: '35px' }}
                                >
                                  <Select
                                    // style={{ width: '100%', height: '50px' }}
                                    style={{ width: '100%' }}
                                    onChange={(value) =>
                                      handleFormPenilaianChangeBaru5(
                                        value,
                                        field.fieldKey + formDataAwal5.length,
                                      )
                                    }
                                  >
                                    {formPenilaian5.map((item, i) => (
                                      <Select.Option key={item.form_type} value={item.form_type}>
                                        {item.form_type}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col span={22}>
                                <b>Evaluasi Penilaian</b>
                                <Form.Item
                                  {...field}
                                  name={[field.name, 'tahapOptions']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Evaluasi penilaian tidak boleh kosong',
                                    },
                                  ]}
                                  validateTrigger={['onChange', 'onBlur']}
                                  style={{ paddingRight: '35px' }}
                                >
                                  <Select
                                    style={{ width: '100%' }}
                                    onChange={(value) =>
                                      handleTahapChange5(
                                        value,
                                        formDataAwal5.length + field.fieldKey,
                                      )
                                    }
                                  >
                                    {/* {console.log(
                                        'ini key + formDataAwal',
                                        field.fieldKey + formDataAwal.length,
                                      )} */}

                                    {tahapOptions5[formDataAwal5.length + index] &&
                                      tahapOptions5[formDataAwal5.length + index].map((item, i) => (
                                        <Select.Option key={item.name} value={item.name}>
                                          <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                            {item.name}
                                          </div>
                                        </Select.Option>
                                      ))}
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col span={22}>
                                <b>Aspek</b>
                                <Form.Item
                                  {...field}
                                  name={[field.name, 'aspekOptions']}
                                  fieldKey={[field.fieldKey, 'aspekOptions']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Aspek tidak boleh kosong',
                                    },
                                  ]}
                                  validateTrigger={['onChange', 'onBlur']}
                                  style={{ paddingRight: '35px' }}
                                >
                                  <Select
                                    style={{ width: '100%' }}
                                    onChange={(value) =>
                                      handleAspekChange5(
                                        value,
                                        field.fieldKey + formDataAwal5.length,
                                      )
                                    }
                                  >
                                    {aspekOptions5[index + formDataAwal5.length] &&
                                      aspekOptions5[index + formDataAwal5.length].map((item, i) => (
                                        <Select.Option key={item.name} value={item.name}>
                                          <div style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                                            {item.name}
                                          </div>
                                        </Select.Option>
                                      ))}
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col span={22}>
                                {number5 === 1 && (
                                  <>
                                    <b>Bobot </b>
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
                                      <Input
                                        // id={text.id}
                                        style={{ width: '90%' }}
                                        type="number"
                                        min={0}
                                        max={100}
                                        addonAfter="%"
                                        // disabled={text.is_selected === 0}
                                        // value={text.criteria_bobot}

                                        onChange={(e) =>
                                          handleBobotChange5(
                                            e.target.value,
                                            formDataAwal5.length + index,
                                          )
                                        }
                                      />
                                    </Form.Item>
                                  </>
                                )}
                              </Col>
                            </Row>
                            <Col span={22} style={{ textAlign: 'right' }}>
                              {' '}
                              <MinusCircleOutlined
                                style={{ color: 'red' }}
                                // onClick={() => remove(field.name)}
                                onClick={() =>
                                  handleRemoveField5(
                                    field.name,
                                    formDataAwal5.length + index,
                                    remove,
                                  )
                                }
                              />
                            </Col>
                          </div>
                        ))}
                      </div>
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
                <Form.Item
                  style={{
                    display: 'flex',
                    justifyContent: current > 0 ? 'space-between' : 'flex-end',
                  }}
                >
                  {current > 0 && (
                    <Button
                      // type="primary"
                      style={{
                        background: '#808080',
                        color: 'white',
                        marginRight: '8px',
                      }}
                      onClick={() => {
                        setCurrent(current - 1)
                        // Logika untuk tombol "Kembali"
                      }}
                    >
                      Kembali
                    </Button>
                  )}
                  {/* {activeTab === 1 && ( */}
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loadings[0]}
                    onClick={() => handleViewData5()}
                  >
                    Simpan
                  </Button>
                  {/* )} */}
                </Form.Item>
              </Form>
            </CCol>
          </TabPane>
        </Tabs>
      </CCardBody>
    </>
  )

  PembobotanKriteriaMataKuliah.propTypes = {
    current: PropTypes.number.isRequired,
    setCurrent: PropTypes.func.isRequired,
  }
}
export default PembobotanKriteriaMataKuliah
