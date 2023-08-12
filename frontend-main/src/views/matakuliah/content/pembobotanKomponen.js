import { Button, Card, Col, Form, InputNumber, Row, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CButton, CCol, CContainer, CFormInput, CRow } from '@coreui/react'
import axios from 'axios'

const PembobotanKomponen = ({ current, setCurrent, dataComponent }) => {
  const [currComponent, setCurrComponent] = useState(dataComponent)
  const [totalBobot, setTotalBobot] = useState(0)
  const [valid, setValid] = useState(true)
  const [update, setupdate] = useState(false)

  useEffect(() => {
    let tempTotal = 0
    currComponent.forEach((item) => {
      tempTotal = tempTotal + item.bobot_component
    })
    setTotalBobot(tempTotal)
    if (tempTotal < 100 || tempTotal > 100) {
      setValid(false)
    } else {
      setValid(true)
    }
  }, [currComponent])

  useEffect(() => {
    console.log('update', update)
  }, [update])

  const handleInputNumberChange = (id, newValue) => {
    const updateComponent = [...currComponent]
    if (newValue != null) {
      updateComponent[id].bobot_component = newValue
    } else {
      updateComponent[id].bobot_component = 0
    }
    setupdate(true)
    setCurrComponent(updateComponent)
  }

  const handleSimpanButton = async () => {
    console.log('simpan')
    await axios
      .put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/courses/component/update`, currComponent)
      .then((res) => {
        notification.success({
          message: 'Data bobot kriteria berhasil diubah',
        })
        setupdate(false)
      })
      .catch((err) => {
        notification.error({
          message: 'Data bobot kriteria gagal diubah',
        })
      })
  }

  return (
    <Card>
      <Form layout="vertical">
        <CRow>
          <CCol>
            <Form.Item label="EAS Teori">
              <InputNumber
                id="1"
                min={0}
                max={100}
                addonAfter="%"
                value={currComponent[1].bobot_component}
                style={{ width: '100%' }}
                placeholder="EAS Teori"
                onChange={(newValue) => handleInputNumberChange(1, newValue)}
              />
            </Form.Item>
          </CCol>
          <CCol>
            <Form.Item label="ETS Teori">
              <InputNumber
                id="3"
                min={0}
                max={100}
                addonAfter="%"
                value={currComponent[3].bobot_component}
                style={{ width: '100%' }}
                placeholder="ETS Teori"
                onChange={(newValue) => handleInputNumberChange(3, newValue)}
              />
            </Form.Item>
          </CCol>
          <CCol>
            <Form.Item label="Lain-lain Teori">
              <InputNumber
                id="5"
                min={0}
                max={100}
                addonAfter="%"
                value={currComponent[5].bobot_component}
                style={{ width: '100%' }}
                placeholder="Lain-lain Teori"
                onChange={(newValue) => handleInputNumberChange(5, newValue)}
              />
            </Form.Item>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <Form.Item label="EAS Praktek">
              <InputNumber
                id="0"
                min={0}
                max={100}
                addonAfter="%"
                value={currComponent[0].bobot_component}
                style={{ width: '100%' }}
                placeholder="EAS Praktek"
                onChange={(newValue) => handleInputNumberChange(0, newValue)}
              />
            </Form.Item>
          </CCol>
          <CCol>
            <Form.Item label="ETS Praktek">
              <InputNumber
                id="2"
                min={0}
                max={100}
                addonAfter="%"
                value={currComponent[2].bobot_component}
                style={{ width: '100%' }}
                placeholder="ETS Praktek"
                onChange={(newValue) => handleInputNumberChange(2, newValue)}
              />
            </Form.Item>
          </CCol>
          <CCol>
            <Form.Item label="Lain-lain Praktek">
              <InputNumber
                id="4"
                min={0}
                max={100}
                addonAfter="%"
                value={currComponent[4].bobot_component}
                style={{ width: '100%' }}
                placeholder="Lain-lain Praktek"
                onChange={(newValue) => handleInputNumberChange(4, newValue)}
              />
            </Form.Item>
          </CCol>
        </CRow>

        <CRow style={{ paddingLeft: '30px', paddingRight: '30px' }}>
          {/* span nya 6 */}
          <CCol span={18} style={{ textAlign: 'left' }}>
            Jumlah bobot komponen saat ini: {totalBobot + '%'}
            {/* Pesan error jika totalBobot kurang dari 100 */}
            {!valid && totalBobot < 100 && (
              <span style={{ color: 'red' }}>
                <sup>* Jumlah bobot kurang dari 100%</sup>
              </span>
            )}
            {/* Pesan error jika totalBobot lebih dari 100 */}
            {!valid && totalBobot > 100 && (
              <span style={{ color: 'red' }}>
                <sup>* Jumlah bobot melebihi batas maksimum 100%</sup>
              </span>
            )}
          </CCol>
        </CRow>

        <br></br>

        <Button
          disabled={!valid}
          htmlType="submit"
          style={{ marginRight: '2%' }}
          type="primary"
          onClick={() => handleSimpanButton()}
        >
          Simpan
        </Button>
        <Button
          disabled={update || (!valid && totalBobot != 100)}
          style={{ backgroundColor: '#808080', color: '#ffffff', border: '1px solid #ffffff' }}
          onClick={() => setCurrent(1)}
        >
          Lanjutkan
        </Button>
      </Form>
    </Card>
  )
}

PembobotanKomponen.propTypes = {
  current: PropTypes.number.isRequired,
  setCurrent: PropTypes.func.isRequired,
  dataComponent: PropTypes.array.isRequired,
}

export default PembobotanKomponen
