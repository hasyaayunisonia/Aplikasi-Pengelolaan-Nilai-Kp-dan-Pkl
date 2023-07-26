import React, { useState } from 'react'
import 'antd/dist/antd.css'
import 'src/scss/_custom.scss'
import { Tabs } from 'antd'
import IdentitasMataKuliah from './identitasMataKuliah'
import PembobotanMataKuliah from './pembobotanNilaiMataKuliah'

const { TabPane } = Tabs

const DetailMataKuliah = () => {
  const [activeTab, setActiveTab] = useState('0') // Menyimpan state tab aktif

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey)
  }

  const refreshComponent = (componentKey) => {
    // Implementasi logika pembaruan komponen sesuai dengan kebutuhan Anda
    console.log(`Refreshing ${componentKey} component...`)
  }

  return (
    <>
      <Tabs type="card" activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Detail" key="0">
          <IdentitasMataKuliah refreshComponent={() => refreshComponent('Detail')} />
        </TabPane>
        <TabPane tab="Komponen Nilai" key="1">
          <PembobotanMataKuliah refreshComponent={() => refreshComponent('Komponen Nilai')} />
        </TabPane>
      </Tabs>
    </>
  )
}

export default DetailMataKuliah
