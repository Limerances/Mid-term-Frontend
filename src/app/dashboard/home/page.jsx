'use client';

import { useParams } from 'next/navigation';
import PageContent from '@/components/page/PageContent';
import {
    Box, Grid, Button, Select, MenuItem,
    Paper, Typography, LinearProgress
  } from '@mui/material';
export default function Page() {
//   const { part, sub } = useParams(); // 获取URL中的 part 和 sub，比如 part1, sub1
//   const pageName = `${part}_${sub}`; // 拼成一个 key：如 part1_sub1

  return (
    <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <img 
        src='/home.svg'
        style={{width:'100%',  maxWidth: '100%', objectFit: 'contail' }}
        // style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} 
        />
    </Box>
  )
//   return <PageContent pageName={pageName} />;
}
