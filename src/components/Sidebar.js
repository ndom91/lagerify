import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Layout, Menu } from 'antd'
import styled from 'styled-components'
import { useWindowSize } from 'react-use'
import KatalogLogo from '../assets/svg/katalog_full.svg'
import KatalogLogoSmall from '../assets/svg/katalog_icon.svg'
import {
  ShopOutlined,
  TagsOutlined,
  InboxOutlined,
  GlobalOutlined,
  ControlOutlined,
} from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu } = Menu

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  margin: 16px;
`

const Sidebar = () => {
  const { width } = useWindowSize()
  const [collapsed, setCollapsed] = useState(width < 600)

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      defaultCollapsed={width < 600}
      onCollapse={() => setCollapsed(!collapsed)}
      theme='dark'
    >
      <Logo>
        {collapsed ? (
          <KatalogLogoSmall style={{ height: '35px', fill: '#002140' }} />
        ) : (
          <KatalogLogo style={{ height: '35px', stroke: '#fff' }} />
        )}
      </Logo>
      <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
        <Menu.Item icon={<ShopOutlined />} key='1'>
          <Link href='/'>Dashboard</Link>
        </Menu.Item>
        <SubMenu key='sub1' icon={<TagsOutlined />} title='Items'>
          <Menu.Item key='3'>
            <Link href='/items/add'>Add</Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link href='/items/list'>List</Link>
          </Menu.Item>
          <Menu.Item key='5'>
            <Link href='/items/loader'>Import</Link>
          </Menu.Item>
          <Menu.Item key='6'>
            <Link href='/items/scan'>Scan</Link>
          </Menu.Item>
          <Menu.Item key='7'>
            <Link href='/items/print'>Print</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' icon={<InboxOutlined />} title='Locations'>
          <Menu.Item key='8'>
            <Link href='/locations/add'>Add</Link>
          </Menu.Item>
          <Menu.Item key='9'>
            <Link href='/locations/list'>List</Link>
          </Menu.Item>
          <Menu.Item key='10'>
            <Link href='/locations/loader'>Import</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key='sub3' icon={<GlobalOutlined />} title='Shipping'>
          <Menu.Item key='11'>
            <Link href='/shipping/inbound'>Inbound</Link>
          </Menu.Item>
          <Menu.Item key='12'>
            <Link href='/shipping/outbound'>Outbound</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item icon={<ControlOutlined />} key='13'>
          <Link href='/settings'>Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
