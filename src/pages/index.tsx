import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { useSession } from 'next-auth/client'
import Wrapper from '../components/Layout'
import RecentsTable from '../components/Dashboard/Table'
import LoginRequired from '../components/LoginRequired'
import {
  Row,
  Col,
  Statistic,
  Card,
  Skeleton,
  Typography,
  Button,
  Tooltip,
} from 'antd'
import {
  BellOutlined,
  ShoppingOutlined,
  TableOutlined,
  TagOutlined,
  ReloadOutlined,
  AlertOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'

import { withApollo } from '../../apollo/client'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

type ItemType = {
  id: number
  title: string
  qty?: number
  description?: string
  type?: string
  date_added?: string
  updated_by?: string
}[]

const { Title } = Typography

const ItemQuery = gql`
  query ItemQuery {
    items(orderBy: { date_added: desc }, first: 5) {
      id
      title
      qty
      description
      type
      date_added
      updated_by
      location {
        description
      }
      status {
        name
      }
      total
    }
    locations(first: 1) {
      total
    }
  }
`

const iconStyle: React.CSSProperties = {
  fill: '#bcbcbc',
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '8rem',
  opacity: '0.1',
}

const Homepage: React.FC = () => {
  const [session, loading] = useSession()
  const { loading: loadingQuery, data, refetch } = useQuery(ItemQuery)
  const [items, setItems] = useState<ItemType>([])
  const [locationCount, setLocationCount] = useState(0)
  const [itemsCount, setItemsCount] = useState(0)

  useEffect(() => {
    data && setItems(data.items)
    data && setLocationCount(data.locations[0].total)
    data && setItemsCount(data.items[0].total)
  }, [data])

  !session && typeof window !== 'undefined' && Router.push('/auth/signin')

  return (
    <>
      {!session ? (
        <LoginRequired />
      ) : (
        <Wrapper>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card style={{ overflow: 'hidden' }}>
                <Statistic
                  title='Items'
                  value={itemsCount}
                  precision={0}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<TagOutlined />}
                  suffix=''
                />
                <TagOutlined style={iconStyle} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card style={{ overflow: 'hidden' }}>
                <Statistic
                  title='Locations'
                  value={locationCount}
                  precision={0}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<TableOutlined />}
                  suffix=''
                />
                <EnvironmentOutlined style={iconStyle} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card style={{ overflow: 'hidden' }}>
                <Statistic
                  title='Active Shipments'
                  value={6}
                  precision={0}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ShoppingOutlined />}
                  suffix=''
                />
                <ShoppingOutlined style={iconStyle} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card style={{ overflow: 'hidden' }}>
                <Statistic
                  title='Notifications'
                  value={3}
                  precision={0}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<BellOutlined />}
                  suffix=''
                />
                <AlertOutlined style={iconStyle} />
              </Card>
            </Col>
          </Row>
          <Row>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Title level={3}>Recent Items</Title>
              <Tooltip title='Reload List'>
                <Button onClick={() => refetch()} loading={loadingQuery}>
                  <ReloadOutlined />
                </Button>
              </Tooltip>
            </div>
            {loading ? (
              <Card style={{ width: '100%' }}>
                <Skeleton loading={loadingQuery} active />
              </Card>
            ) : (
              // @ts-ignore
              <RecentsTable items={items} setItems={setItems} />
            )}
          </Row>
        </Wrapper>
      )}
    </>
  )
}

export default withApollo(Homepage)
