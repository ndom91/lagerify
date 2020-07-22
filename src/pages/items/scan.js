import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Wrapper from '../../components/Layout'
import { useSession } from 'next-auth/client'
import LoginRequired from '../../components/LoginRequired'
import loadable from '@loadable/component'
import { Row, Col, Card, PageHeader, Tabs, Button, Typography } from 'antd'

const { TabPane } = Tabs
const { Title } = Typography
const Scanner = loadable(() => import('../../components/Scanner'))

const ItemsLoader = () => {
  const [session, loading] = useSession()
  const [cameraAvailable, setCameraAvailable] = useState(false)

  useEffect(() => {
    console.log('facingMode', navigator.mediaDevices.getSupportedConstraints().facingMode)
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setCameraAvailable(true)
    }
  }, [])

  return (
    <>
      {!session ? (
        <LoginRequired />
      ) : (
        <Wrapper>
          <PageHeader
            className='site-page-header-responsive'
            onBack={() => Router.back()}
            title='Item'
            subTitle='Scan'
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title='Scan QR Code' headStyle={{ fontSize: '1.5rem' }}>
                  <Scanner />
                </Card>
              </Col>
            </Row>
          </PageHeader>
        </Wrapper>
      )}
    </>
  )
}

export default ItemsLoader
