import { styled, Tab, Tabs } from '@mui/material'

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
  '&:hover': {
    color: 'rgb(34, 197, 94)',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: 'rgb(34, 197, 94)',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgb(188, 255, 212)',
  },
})
