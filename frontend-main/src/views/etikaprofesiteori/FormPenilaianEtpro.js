import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Button, Card, Checkbox, Form, Input, InputNumber, Space, Table, notification } from 'antd'

const FormPenilaianEtpro = () => {
    let history = useHistory()
    const id = useParams()
    const [dataForm, setDataForm] = useState({})
    const [namaEtpro, setNamaEtpro] = useState('')
    const [dataSource, setDataSource] = useState([])
    const [nameExaminer, setNameExaminer] = useState('')

    axios.defaults.withCredentials = true

    async function getAllForm() {
        await axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/etpro/forms`)
            .then((res) => {
                const prodi = res.data.data[0].form.prodiId
                let index = id.id
                if (prodi === 0) {
                    setNamaEtpro('Etika Profesi')
                } else if (prodi === 1) {
                    setNamaEtpro('Etika dan Aspek Legal Teknologi Informasi')
                }
                setDataForm(res.data.data[index])
                setNameExaminer(res.data.data[index].form.examinerName)
                let tempDataSource = []
                for (let i = 0; i < res.data.data[index].values.length; i++) {
                    const element = res.data.data[index].values[i];
                    const object = {
                        no: i+1,
                        aspekName: element.aspect.aspek_name,
                        nilai: element.value,
                        id: element.id
                    }
                    tempDataSource = [...tempDataSource, object]
                }
                setDataSource(tempDataSource)
            })
            .catch((err) => {
                console.log("err", err)
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

    async function updateForm (){
        const tempData = {
            examinerName: dataForm.form.examinerName,
            idForm: dataForm.form.id,
            valueDtos: dataForm.values
        }
        await axios.put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/etpro/forms/update`, tempData)
        .then((res) =>{
            notification.success({
                message: 'Berhasil menyimpan data!'
            })
        })
        .catch((err) => {
            console.log("err", err)
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

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            width: '1%',
            align: 'center',
            key: 'no',
            render: (value, item, index) => {
                return index + 1
            },
        },
        {
            title: 'Aspek',
            key: 'aspek',
            align: 'center',
            dataIndex: 'aspekName',
        },
        {
            title: 'Nilai',
            key: 'nilai',
            align: 'center',
            dataIndex: 'nilai',
            render: (text, record, index) => {
                return (
                    <>
                        <InputNumber
                            defaultValue={text}
                            min={0}
                            max={100}
                            onChange={(value) => onChangeNilai(record, value, index)}
                        />
                    </>
                )
            }
        },
    ]

    const onChangeNilai = (record, value, index) =>{
        const prevDataForm = {...dataForm}
        const prevDataSource = [...dataSource]

        prevDataForm.values[index].value = value
        prevDataSource[index].nilai = value
        setDataForm(prevDataForm)
        setDataSource(prevDataSource)
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        updateForm()
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeExaminer = (value) =>{
        const prevData = {...dataForm}
        prevData.form.examinerName = value.target.value
        setDataForm(prevData)
    }

    useEffect(() => {
        console.log("dataParticipant", dataForm)
        getAllForm()
    }, [history])

    useEffect(() => {
        console.log("dataForm", dataForm)
    }, [dataForm])
    return (
        <Card title={"Form Penilaian " + namaEtpro}>
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                >
                    {dataForm && dataForm.form && dataForm.form.participant && dataForm.form.participant.name && (
                        <>{dataForm.form.participant.name}</>
                    )}
                </Form.Item>

                <Form.Item
                    label="NIM"
                    name="nim"
                >
                    {dataForm && dataForm.form && dataForm.form.participant && dataForm.form.participant.nim && (
                        <>{dataForm.form.participant.nim}</>
                    )}
                </Form.Item>

                <Form.Item
                    label="Dosen"
                    name="examiner"
                    rules={[
                        {
                            required: true,
                            message: 'Please input examiner name!',
                        },
                    ]}
                >
                    <Input style={{ width: '30%' }} onChange={(value)=>onChangeExaminer(value)} value={nameExaminer}/>
                </Form.Item>

                <Table 
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{ x: 'max-content' }}
                    bordered
                    pagination={false}
                />

                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2%' }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default FormPenilaianEtpro