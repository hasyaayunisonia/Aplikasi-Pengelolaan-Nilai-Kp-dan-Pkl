import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { LoadingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import IdentitasMataKuliah from './identitasMataKuliah'
import PembobotanMataKuliah from './pembobotanNilaiMataKuliah'

const { TabPane } = Tabs
const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />
const DetailMataKuliah = () => {
  return (
    <>
      <Tabs type="card">
        <TabPane tab="Detail" key="1">
          <IdentitasMataKuliah />
        </TabPane>
        <TabPane tab="Pembobotan" key="2">
          <PembobotanMataKuliah />
        </TabPane>
      </Tabs>
    </>
  )
}
export default DetailMataKuliah
