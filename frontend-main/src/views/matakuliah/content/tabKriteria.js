import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { PlusOutlined, DeleteOutlined, LeftOutlined, RightOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Form, InputNumber, Row, Select, Switch, notification } from 'antd'
import axios from 'axios'
import 'src/scss/_custom.scss'

const TabKriteria = ({ current, setCurrent, dataKomponen, dataForm }) => {
  const [dataType, setDataType] = useState([])
  const [dataAspect, setDataAspect] = useState([])

  const [optionType, setOptionType] = useState([{
    id: 0,
    option: {
      nameForm: '',
      type: []
    }
  }])
  const [optionAspect, setOptionAspect] = useState([{
    id: 0,
    option: {
      nameForm: '',
      nameType: '',
      aspect: []
    }
  }])
  let history = useHistory()

  const [pilihanForm, setPilihanForm] = useState([])
  const [pilihanType, setPilihanType] = useState([])
  const [pilihanAspect, setPilihanAspect] = useState([])
  const [pilihanBobot, setPilihanBobot] = useState([100])

  const [jumlahPilihan, setJumlahPilihan] = useState([0])
  const [listIdExist, setListIdExist] = useState([])
  const [isBobot, setIsBobot] = useState(false)
  const [isInisiate, setInisiate] = useState(false)

  const spanCol = isBobot ? 0 : 3;

  const rulesBobot = isBobot ? [{ required: true, message: 'Tidak boleh kosong!' }] : [];

  async function getDataType(form, index) {
    await axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type?formType=${form}`)
      .then((res) => {
        const dataRes = {
          nameForm: form,
          type: res.data.data
        }
        setDataType((prevData) => [...prevData, dataRes])
        const optionUpdate = {
          id: index,
          option: dataRes
        }
        const optionIndex = optionType[index]
        if (optionIndex !== undefined) {
          const optionTemp = [...optionType]
          optionTemp[index] = optionUpdate

          setOptionType(optionTemp)
        } else {
          setOptionType([...optionType, optionUpdate])
        }
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

  async function getDataAspect(index, form, type) {
    await axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect?formName=${form}&formType=${type}`)
      .then((res) => {
        console.log("getDataAspect ", res.data.data)
        const dataRes = {
          nameForm: form,
          nameType: type,
          aspect: res.data.data
        }
        setDataAspect([...dataAspect, dataRes])
        const optionUpdate = {
          id: index,
          option: dataRes
        }
        const optionIndex = optionAspect[index]
        if (optionIndex !== undefined) {
          const optionTemp = [...optionAspect]
          optionTemp[index] = optionUpdate

          setOptionAspect(optionTemp)
        } else {
          setOptionAspect([...optionAspect, optionUpdate])
        }
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

  async function getAllOption() {
    const tempOptionType = [...optionType]
    const tempOptionAspect = [...optionAspect]
    const tempDataType = [...dataType]
    const tempDataAspect = [...dataAspect]

    for (let index = 0; index < pilihanType.length; index++) {
      const itemForm = pilihanForm[index];
      const itemType = pilihanType[index];
      const tempDT = tempDataType.find((j) => j.nameForm === itemForm)
      if (tempDT === undefined) {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect/type?formType=${itemForm}`)
          .then((res) => {
            const dataRes = {
              nameForm: itemForm,
              type: res.data.data
            }
            const optionUpdate = {
              id: index,
              option: dataRes
            }
            tempDataType[tempDataType.length] = dataRes
            tempOptionType[index] = optionUpdate
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
      } else {
        const optionUpdate = {
          id: index,
          option: tempDT
        }

        tempOptionType[index] = optionUpdate
      }

    }

    for (let index = 0; index < pilihanAspect.length; index++) {
      const itemForm = pilihanForm[index];
      const itemType = pilihanType[index];

      const itemDA = tempDataAspect.find((j) => j.nameForm === itemForm && j.nameType === itemType)

      if (itemDA === undefined) {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/criteria/evaluation-form/aspect?formName=${itemForm}&formType=${itemType}`)
          .then((res) => {
            const dataRes = {
              nameForm: itemForm,
              nameType: itemType,
              aspect: res.data.data
            }

            const optionUpdate = {
              id: index,
              option: dataRes
            }
            tempDataAspect[index] = dataRes
            tempOptionAspect[index] = optionUpdate
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
      } else {
        // const optionUpdate = {
        //   id: index,
        //   option: itemDA
        // }

        // =========================================================
        // const itemAspect = tempDataAspect.find((item) => item.nameForm === pilihanForm[index] && item.nameType === pilihanType[index])
        const filterItem = { ...itemDA }
        const indexTerpilih = []
        for (let j = 0; j < pilihanType.length; j++) {
          if (pilihanType[index] === pilihanType[j]) {
            indexTerpilih[indexTerpilih.length] = j
            if ('Semua aspek' === pilihanAspect[j]) {
              filterItem.aspect = []
            } else {
              filterItem.aspect = filterItem.aspect.filter((obj) => pilihanAspect[j] !== obj.name)
            }
          }
        }

        const optionUpdate = {
          id: index,
          option: filterItem
        }

        const optionTemp = [...tempOptionAspect]
        for (let j = 0; j < indexTerpilih.length; j++) {
          const indeks = indexTerpilih[j];
          optionUpdate.id = indeks
          tempOptionAspect[indeks] = optionUpdate
        }
        tempOptionAspect[index] = optionUpdate
      }
    }
    console.log("tempOptionAspect", tempOptionAspect)
    setOptionType(tempOptionType)
    setOptionAspect(tempOptionAspect)
    setDataType(tempDataType)
    setDataAspect(tempDataAspect)
  }

  async function savePilihan(data) {
    await axios.put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/criteria/update`, data)
      .then((res) => {
        notification.success({
          message: 'Berhasil!',
          description: 'Data berhasil disimpan.',
        });
      })
      .catch((err) => {
        notification.error({
          message: 'Gagal!',
          description: 'Data gagal tersimpan.'
        })
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

  const onChangeForm = (index, value) => {
    if (dataType.length === 0) {
      getDataType(value, index)
    } else {
      const itemType = dataType.find((item) => item.nameForm === value)
      if (itemType === undefined) {
        getDataType(value, index)
      } else {
        const optionUpdate = {
          id: index,
          option: itemType
        }
        const optionIndex = optionType[index]
        console.log("optionIndex", optionIndex.option.type.length)
        console.log("optionupdate", optionUpdate)
        if (optionIndex !== undefined || optionIndex.option.type.length === 0) {
          const optionTemp = optionType.map((item, i) => i === index ? optionUpdate : item)
          setOptionType(optionTemp)
        } else {
          setOptionType([...optionType, optionUpdate])
        }
      }
    }
    // pilihan Form belum dipilih
    if (pilihanForm.length === 0) {
      setPilihanForm((prevData) => [...prevData, value])
    } else {
      const prevData = [...pilihanForm]
      prevData[index] = value
      setPilihanForm(prevData)

      const prevData2 = [...pilihanType]
      prevData2[index] = undefined
      setPilihanType(prevData2)

      const prevData3 = [...pilihanAspect]
      prevData3[index] = undefined
      setPilihanAspect(prevData3)

      const prevData4 = [...optionAspect]
      prevData4[index] = {
        id: index,
        option: {
          nameForm: '',
          nameType: '',
          aspect: []
        }
      }
      setOptionAspect(prevData4)
    }
  }

  const onChangeType = (index, value) => {

    if (dataAspect.length === 0) {
      getDataAspect(index, pilihanForm[index], value)
    } else {
      const itemAspect = dataAspect.find((item) => item.nameForm === pilihanForm[index] && item.nameType === value)
      if (itemAspect === undefined) {
        getDataAspect(index, pilihanForm[index], value)
      } else {
        const filterItem = { ...itemAspect }
        const indexTerpilih = []
        for (let j = 0; j < pilihanType.length; j++) {
          if (value === pilihanType[j]) {
            indexTerpilih[indexTerpilih.length] = j
            if ('Semua aspek' === pilihanAspect[j]) {
              filterItem.aspect = []
            } else {
              filterItem.aspect = filterItem.aspect.filter((obj) => pilihanAspect[j] !== obj.name)
            }
          }
        }

        const optionUpdate = {
          id: index,
          option: filterItem
        }

        const optionTemp = [...optionAspect]
        for (let j = 0; j < indexTerpilih.length; j++) {
          const indeks = indexTerpilih[j];
          optionUpdate.id = indeks
          optionTemp[indeks] = optionUpdate
        }
        optionTemp[index] = optionUpdate
        setOptionAspect(optionTemp)
      }
    }

    // pilihan Type belum dipilih
    if (pilihanType.length === 0) {
      setPilihanType((prevData) => [...prevData, value])
    } else {
      const prevData = [...pilihanType]
      prevData[index] = value
      setPilihanType(prevData)

      const prevData2 = [...pilihanAspect]
      prevData2[index] = undefined
      setPilihanAspect(prevData2)
    }
  }

  const onChangeAspect = (index, value) => {
    const prevData = [...pilihanAspect]
    prevData[index] = value
    setPilihanAspect(prevData)

    const itemAspect = dataAspect.find((item) => item.nameForm === pilihanForm[index] && item.nameType === pilihanType[index])
    const filterItem = { ...itemAspect }
    const indexTerpilih = []
    for (let j = 0; j < pilihanType.length; j++) {
      if (pilihanType[index] === pilihanType[j]) {
        indexTerpilih[indexTerpilih.length] = j
        if ('Semua aspek' === prevData[j]) {
          filterItem.aspect = []
        } else {
          filterItem.aspect = filterItem.aspect.filter((obj) => prevData[j] !== obj.name)
        }
      }
    }

    const optionUpdate = {
      id: index,
      option: filterItem
    }

    const optionTemp = [...optionAspect]
    for (let j = 0; j < indexTerpilih.length; j++) {
      const indeks = indexTerpilih[j];
      optionUpdate.id = indeks
      optionTemp[indeks] = optionUpdate
    }
    optionTemp[index] = optionUpdate
    setOptionAspect(optionTemp)
  }

  const buttonTambahOnClick = () => {
    const prevData = [...jumlahPilihan]
    const newIndex = prevData.length

    prevData[newIndex] = newIndex
    setJumlahPilihan(prevData)
    console.log("setjumlahpilihan", prevData)

    const prevData2 = [...optionAspect]
    prevData2[newIndex] = {
      id: newIndex,
      option: {
        nameForm: '',
        nameType: '',
        aspect: []
      }
    }
    setOptionAspect(prevData2)

    const prevData3 = [...optionType]
    prevData3[newIndex] = {
      id: newIndex,
      option: {
        nameForm: '',
        type: []
      }
    }
    setOptionType(prevData3)

    const prevData4 = [...pilihanBobot]
    if (isBobot) {
      prevData4[newIndex] = undefined
    } else {
      prevData4[newIndex] = 100
    }
    setPilihanBobot(prevData4)

    const prevData5 = [...listIdExist]
    prevData5[newIndex] = null
    setListIdExist(prevData5)
  }

  const onChangeInputBobot = (index, value) => {
    const prevData = [...pilihanBobot]
    prevData[index] = value
    setPilihanBobot(prevData)
  }

  const onClickDelete = (index) => {
    const tempJumlah = jumlahPilihan.filter((item, i) => i != index)
    setJumlahPilihan(tempJumlah)

    const prevData1 = pilihanAspect.filter((item, i) => i != index)
    setPilihanAspect(prevData1)

    const prevData2 = pilihanBobot.filter((item, i) => i != index)
    setPilihanBobot(prevData2)

    const prevData3 = pilihanForm.filter((item, i) => i != index)
    setPilihanForm(prevData3)

    const prevData4 = pilihanType.filter((item, i) => i != index)
    setPilihanType(prevData4)

    const prevData5 = optionType.filter((item, i) => i != index)
    setOptionType(prevData5)

    const prevData6 = optionAspect.filter((item, i) => i != index)
    setOptionAspect(prevData6)

    const prevData7 = listIdExist.filter((item, i) => i != index)
    setListIdExist(prevData7)

    const itemAspect = dataAspect.find((item) => item.nameForm === pilihanForm[index] && item.nameType === pilihanType[index])
    const filterItem = { ...itemAspect }
    const indexTerpilih = []
    for (let j = 0; j < pilihanType.length; j++) {
      if (prevData4[j] === pilihanType[index]) {
        indexTerpilih[indexTerpilih.length] = j
        if ('Semua aspek' === prevData1[j]) {
          filterItem.aspect = []
        } else {
          filterItem.aspect = filterItem.aspect.filter((obj) => prevData1[j] !== obj.name)
        }
      }
    }

    const optionUpdate = {
      id: index,
      option: filterItem
    }

    const optionTemp = [...optionAspect]
    for (let j = 0; j < indexTerpilih.length; j++) {
      const indeks = indexTerpilih[j];
      optionUpdate.id = indeks
      optionTemp[indeks] = optionUpdate
    }
    optionTemp[index] = optionUpdate
    setOptionAspect(optionTemp)

  }

  const onClickSimpan = () => {
    const itemPilihanForm = pilihanForm.includes(undefined)
    const itemPilihanType = pilihanType.includes(undefined)
    const itemPilihanAspect = pilihanAspect.includes(undefined)
    const itemPilihanBobot = pilihanBobot.includes(undefined)

    if(itemPilihanAspect || itemPilihanBobot || itemPilihanForm || itemPilihanType){
      notification.error({
        message:"Kolom tidak boleh kosong!"
      })
    }else{
      const dataTransfer = {
        id: dataKomponen.id,
        is_average: dataKomponen.is_average,
        name: dataKomponen.name,
        criteria_data: []
      }
  
      const criteriaData = []
  
      for (let i = 0; i < jumlahPilihan.length; i++) {
        const aspect = (dataAspect.find((val) => val.nameForm === pilihanForm[i] && val.nameType === pilihanType[i])).aspect
        const aspectId = aspect.find((val) => val.name === pilihanAspect[i])
        const itemCD = {
          aspect_form_id: aspectId.id,
          aspect_name: aspectId.name,
          bobot_criteria: pilihanBobot[i]===undefined? 0:pilihanBobot[i],
          component_id: dataTransfer.id,
          id: listIdExist[i],
          name_form: pilihanForm[i],
          type_form: pilihanType[i]
        }
  
        criteriaData[i] = itemCD
      }
      dataTransfer.criteria_data = criteriaData
      savePilihan(dataTransfer)
    }
  }

  const inisiateData = () => {
    if (dataKomponen !== undefined) {
      const tempJumlah = [...jumlahPilihan]
      const tempPilihanForm = [...pilihanForm]
      const tempPilihanType = [...pilihanType]
      const tempPilihanAspect = [...pilihanAspect]
      const tempPilihanBobot = [...pilihanBobot]
      const tempListId = [...listIdExist]
      const tempIsBobot = dataKomponen.is_average != 1 ? true : false

      const prevData2 = [...optionAspect]
      const prevData3 = [...optionType]

      dataKomponen.criteria_data.map((item, i) => {
        console.log("i", item)
        tempJumlah[i] = i
        tempPilihanForm[i] = item.name_form
        tempPilihanType[i] = item.type_form
        tempPilihanAspect[i] = item.aspect_name
        tempPilihanBobot[i] = item.bobot_criteria
        tempListId[i] = item.id

        prevData2[i] = {
          id: i,
          option: {
            nameForm: '',
            nameType: '',
            aspect: [{
              name: tempPilihanAspect[i]
            }]
          }
        }

        prevData3[i] = {
          id: i,
          option: {
            nameForm: '',
            type: []
          }
        }
      })
      setJumlahPilihan(tempJumlah)
      setPilihanForm(tempPilihanForm)
      setPilihanType(tempPilihanType)
      setPilihanAspect(tempPilihanAspect)
      setPilihanBobot(tempPilihanBobot)
      setIsBobot(tempIsBobot)
      setInisiate(true)
      setListIdExist(tempListId)
      setOptionAspect(prevData2)
      setOptionType(prevData3)
    }
  }

  const handleSelesaiClick = () => {
    window.location.reload();
  };

  useEffect(() => {
    inisiateData()
  }, [dataKomponen])

  useEffect(() => {
    const prevData = [...pilihanBobot]
    for (let i = 0; i < prevData.length; i++) {
      if (!isBobot) {
        prevData[i] = 100
      } else {
        prevData[i] = undefined
      }
    }
    setPilihanBobot(prevData)
  }, [isBobot])

  useEffect(() => {
    if (isInisiate) {
      getAllOption()
      setInisiate(false)
    }
  }, [isInisiate])

  return (
    <>
      <Form layout='horizontal' style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item label="Kustomisasi Bobot" labelAlign='left' style={{ marginLeft: 'auto' }}>
          <Switch checkedChildren="Bobot" unCheckedChildren="Rata-rata" defaultChecked={isBobot} onChange={(value) => setIsBobot(value)} />
        </Form.Item>
      </Form>
      <Form layout='vertical'>
        {
          jumlahPilihan.map((value, i) => (
            <>
              <Card key={i}>
                <Row>
                  <Col span={5} style={{ marginRight: '1%' }}>
                    <Form.Item key={"form"+i} label="Evaluasi Formulir Penilaian" rules={[{ required: true, message: 'Tidak boleh kosong!' }]}>
                      <Select

                        showSearch
                        placeholder="Pilih Formulir Evaluasi"
                        optionFilterProp="children"
                        onChange={(value) => onChangeForm(i, value)}
                        value={pilihanForm[i]}
                        dropdownMatchSelectWidth={false}
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={dataForm.map((op) => ({ label: op.form_name, value: op.form_name }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4} style={{ marginRight: '1%' }}>
                    <Form.Item key={"type"+i} label="Evaluasi Penilaian" rules={[{ required: true, message: 'Tidak boleh kosong!' }]}>
                      <Select
                        showSearch
                        placeholder="Pilih Evaluasi Penilaian"
                        optionFilterProp="children"
                        onChange={(value) => onChangeType(i, value)}
                        value={pilihanType[i]}
                        dropdownMatchSelectWidth={false}
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionType.length !== 0 && optionType[i] && optionType[i].option && optionType[i].option.type ? optionType[i].option.type.map((op) => ({ label: op.name, value: op.name })) : []}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10 + spanCol} style={{ marginRight: '1%' }}>
                    <Form.Item key={"aspect"+i} label="Aspek Penilaian" rules={[{ required: true, message: 'Tidak boleh kosong!' }]}>
                      <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={(value) => onChangeAspect(i, value)}
                        value={pilihanAspect[i]}
                        dropdownMatchSelectWidth={false}
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={optionAspect.length !== 0 && optionAspect[i] && optionAspect[i].option && optionAspect[i].option.aspect ? optionAspect[i].option.aspect.map((op) => ({ label: op.name, value: op.name })) : []}
                      />
                    </Form.Item>
                  </Col>
                  {isBobot && (
                    <Col span={2} style={{ marginRight: '3%' }}>
                      <Form.Item key={"bobot"+i} label="Bobot" rules={[{ required: true, message: 'Tidak boleh kosong!' }]}>
                        <InputNumber value={pilihanBobot[i]} min={0} max={100} rules={rulesBobot} onChange={(value) => onChangeInputBobot(i, value)} />
                      </Form.Item>
                    </Col>
                  )}
                  <Col span={1} style={{ paddingTop: '3.1%' }}>
                    <Form.Item >
                      <Button danger type="text" icon={<DeleteOutlined style={{ fontSize: '18px' }} />} onClick={(value) => onClickDelete(i)} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Divider plain />
            </>
          ))
        }

        <Button type="dashed" size='large' icon={<PlusOutlined />} shape='default' className="ant-btn-dashed" onClick={buttonTambahOnClick} block>
          Tambah
        </Button>
        <Divider plain />

        <Row>
          <Col style={{ marginRight: '1%' }}>
            <Button danger type='primary' icon={<LeftOutlined />} onClick={() => setCurrent(0)}>
              Kembali
            </Button>
          </Col>
          <Col style={{ marginRight: '1%' }}>
            <Form.Item>
              <Button htmlType='submit' className="green-button" icon={<SaveOutlined />} onClick={() => onClickSimpan()}>
                Simpan
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Button type='primary' icon={<RightOutlined />} onClick={handleSelesaiClick}>
              Selesai
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

TabKriteria.propTypes = {
  current: PropTypes.number.isRequired,
  setCurrent: PropTypes.func.isRequired,
  dataKomponen: PropTypes.object,
  dataForm: PropTypes.array
};
export default TabKriteria