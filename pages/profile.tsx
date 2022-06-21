import { LockClosedIcon, PencilIcon } from '@heroicons/react/outline'
import { useMediaQuery } from '@mui/material'
import { Role } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import Container from '../components/Container'
import { CustomTab, CustomTabs } from '../components/mui/Tabs'
import AdminDashboard from '../components/profile/AdminDashboard'
import Wrapper from '../components/Wrapper'

interface Props {
  user: {
    id?: string
    role?: Role
  } & {
    name?: string
    email?: string
    image?: string
  }
}

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  )
}

const Profile = ({ user }: Props) => {
  const [tabIndex, setTabIndex] = useState(0)
  const changeTab = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex)
  }
  const onLargeScreen = useMediaQuery('(min-width: 768px)')

  return (
    <Container title={`${user.name}'s profile`}>
      <Wrapper>
        <header className="flex flex-col md:flex-row items-center justify-center md:justify-start">
          {/* USER IMAGE */}
          <img
            className="rounded-full w-28 h-28 md:w-32 md:h-32 object-cover"
            src={user.image}
            alt={user.name}
          />

          {/* USER ROLE BADGE (MOBILE) */}
          {user.role == 'ADMIN' && (
            <span className="md:hidden text-xs mt-4 font-bold tracking-wide bg-green-500 text-white px-2 py-1 rounded-md">
              ADMIN
            </span>
          )}

          <div className="mt-3 md:mt-0 md:ml-10 text-center md:text-left">
            {/* USER NAME */}
            <h2 className="text-4xl font-bold flex items-center justify-center md:justify-start">
              {user.name}
              {/* USER ROLE BADGE (DESKTOP) */}
              {user.role == 'ADMIN' && (
                <span className="hidden md:block ml-3 text-xs tracking-wide bg-green-500 text-white px-2 py-1 rounded-md">
                  ADMIN
                </span>
              )}
            </h2>
            {/* USER EMAIL */}
            <div className="text-gray-500 mt-1">{user.email}</div>

            {/* EDIT PROFILE BTN */}
            <button className="flex items-center justify-center md:justify-start mt-3 w-full text-gray-500 hover:text-green-500">
              <PencilIcon className="w-5 h-5 mr-2" /> Edit Profile
            </button>
          </div>
        </header>

        <div className="mt-8">
          <CustomTabs
            value={tabIndex}
            onChange={changeTab}
            variant={onLargeScreen ? 'fullWidth' : 'scrollable'}
            scrollButtons={!onLargeScreen}
            allowScrollButtonsMobile
          >
            <CustomTab label="Order History" />
            <CustomTab label="Topup Information" />
            <CustomTab
              icon={
                user.role != 'ADMIN' ? (
                  <LockClosedIcon className="w-4 h-4" />
                ) : null
              }
              iconPosition="start"
              label="Admin Dashboard"
              disabled={user.role != 'ADMIN'}
            />
          </CustomTabs>
          <div className="mt-5">
            <TabPanel value={tabIndex} index={0}>
              order history
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              topup information
            </TabPanel>
            {/* ADMIN DASHBOARD */}
            <TabPanel value={tabIndex} index={2}>
              <AdminDashboard />
            </TabPanel>
          </div>
        </div>
      </Wrapper>
    </Container>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
  return {
    props: {
      user: session.user,
    },
  }
}
