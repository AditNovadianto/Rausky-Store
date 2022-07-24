import { styled } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

export const CustomTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: 'rgb(34 197 94)',
  },
  '.MuiTabs-scrollButtons.Mui-disabled': {
    opacity: 0.3,
  },
})

export const CustomTab = styled(Tab)({
  fontWeight: 500,
  fontFamily: 'inherit',
  '&.Mui-focusVisible': {
    backgroundColor: 'rgb(188, 255, 212)',
  },
})
