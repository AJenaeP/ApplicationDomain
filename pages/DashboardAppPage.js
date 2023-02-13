import { Helmet } from 'react-helmet-async';


import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components

// sections
import {
  AppTasks,
  
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Compass Credit Union </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
         Hello Admin
        </Typography>

      

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Check Email' },
                { id: '2', label: 'Pay Lawn Service Invoice' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Journal Entries' },
                { id: '5', label: 'Sprint 1 Presentation' },
              ]}
            />
         
        </Grid>
      </Container>
    </>
  );
}