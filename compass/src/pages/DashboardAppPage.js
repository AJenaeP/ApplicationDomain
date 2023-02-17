import React from 'react'
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import compassLogo from '../images/compassLogo.png';
// sections
import { AppTasks } from '../utilities/AppTasks';


export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
        Compass Credit Union
        </Typography>

        <img src={compassLogo} alt="Avatar" className="picture" />

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