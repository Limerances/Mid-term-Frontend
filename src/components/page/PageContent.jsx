"use client";
import React, { useState, useMemo } from 'react';
import {
  Box, Grid, Button, Select, MenuItem,
  Paper, Typography, LinearProgress
} from '@mui/material';
// import ReadOnlyCodeBox from './CodeContainer';
import ReadOnlyCodeBox from '@/components/common/CodeContainer';
import request from '@/lib/request/request';
import { getImageResult ,getTextResult, getPageInfo, testApi} from "@/lib/api/user.js";
import { encryptCmd} from '@/lib/crypto/crypto.js';

// 算法和数据集映射

// const poolName = 'pool_th'

// export const initProgramList= {
//     '测试程序一': {
//     cmd: '/thfs3/home/yanghailong/midterm-demo/workdir/GZDW/misa-md/run_analysis.sh',
//     resultList:[
//         {name: 'calc', path: '/thfs3/home/yanghailong/workdir/GZDW-TEST/misa-md/logs/analysis/heatmap/calc.png',type: 'image',content:''},
//         // {name: 'comm', path: '/thfs3/home/yanghailong/workdir/GZDW-TEST/misa-md/logs/analysis/heatmap/comm.png',type: 'image',content:''},
//     ]
//     },
//     '测试程序二': {
//         cmd: '/thfs3/home/yanghailong/midterm-demo/workdir/GZDW/misa-md/run_analysis.sh',
//         resultList:[
//             {name: 'slurm', path: '/thfs3/home/yanghailong/workdir/NCFX-TEST/misa-md/mpich342_3_misa-md_mpi_accl_mem_6600_4.slurm',type: 'text',content:''},
//             {name: 'comm2', path: '/thfs3/home/yanghailong/workdir/GZDW-TEST/misa-md/logs/analysis/heatmap/comm.png',type: 'image',content:''},
//         ]
//     },
//     };

// export const initProgramList= {
//     '-': {
//         cmd: '',
//         resultList:[]
//         },
//     };
// const pageName = 'part1_sub10'; 



export default function Page({pageName}) {
    // const [programList, setProgramList] = useState(initProgramList);
    const [programList, setProgramList] = useState(null);
    const [poolName, setPoolName] = useState('');
    const [description, setDescription] = useState(null);

    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);

    React.useEffect(() => {
        getPageInfo({ name: pageName }).then(res => {
            if (res.data.errno == 0) {
                console.log(res.data);
                setProgramList(res.data.info.programList);
                setPoolName(res.data.info.pool.poolName);
                setDescription(res.data.info.description);
                console.log(programList);
                console.log(description);
                setPrograms(Object.keys(res.data.info.programList));
                if (Object.keys(res.data.info.programList).length > 0) {
                    setSelectedProgram(Object.keys(res.data.info.programList)[0]); // 默认选择第一个程序
                }
            } else {
                console.error('获取页面信息失败:', res.data.message);
            }
        }
        ).catch(err => {
            console.error('请求失败:', err);
        });
    }, []); // 只在组件挂载时获取数据

    // const programs = Object.keys(programList);
    // const [selectedProgram, setSelectedProgram] = useState(programs[0]);//这里

    const [results, setResults] = useState({
    });
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(0);
  
    const resultsBoxRef = React.useRef(null);

    const testapi = () => {
        testApi({}).then(res => {
            if (res.data.errno == 0) {
                console.log(res.data);
            } else {
                console.error('测试接口失败:', res.data.message);
            }
        }
        ).catch(err => {
            console.error('请求失败:', err);
        });
    };

  // 当算法改变时
  const handleProgramChange = (event) => {
    console.log('handleprogramchange')
    const newProgram = event.target.value;
    console.log(newProgram)
    setSelectedProgram(newProgram);
    setProgress(0);
  };

  // 自动滚动到底部
  const scrollToBottom = () => {
    if (resultsBoxRef.current) {
      resultsBoxRef.current.scrollTop = resultsBoxRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [results]);

  const getAllResult = async () => {
    const currentProgram = programList[selectedProgram];
  
    // 遍历所有 resultList，生成一个 promise 列表
    const updatedResultsPromises = currentProgram.resultList.map(async (item) => {
      if (item.type === 'image') {
        try {
          const res = await getImageResult({ path: item.path, "poolName": poolName });
          console.log(res);
          const imageBlob = new Blob([res.data], { type: res.data.type });
          const imageUrl = URL.createObjectURL(imageBlob);
          return { ...item, content: imageUrl }; // 返回更新后的项
        } catch (err) {
          console.error('图片获取失败', item.path, err);
          return item; // 保持原样
        }
      }
  
      if (item.type === 'text') {
        try {
          const res = await getTextResult({ path: item.path , "poolName": poolName });
          return { ...item, content: res.data.text };
        } catch (err) {
          console.error('文本获取失败', item.path, err);
          return item;
        }
      }
  
      // 其他类型：不处理，原样返回
      return item;
    });
  
    try {
      const updatedResultList = await Promise.all(updatedResultsPromises);
  
      // 构造新的 programList 状态结构
      const newProgramList = {
        ...programList,
        [selectedProgram]: {
          ...programList[selectedProgram],
          resultList: updatedResultList
        }
      };
  
      setProgramList(newProgramList);
      console.log('所有结果已更新');
    } catch (err) {
      console.error('整体更新出错', err);
    }
  };

  const getAllBackupResult = async () => {
    const currentProgram = programList[selectedProgram];
  
    // 遍历所有 resultList，生成一个 promise 列表
    const updatedResultsPromises = currentProgram.resultList.map(async (item) => {
      if (item.type === 'image') {
        try {
          const res = await getImageResult({ path: item.backPath , "poolName": poolName });
          console.log(res);
          const imageBlob = new Blob([res.data], { type: res.data.type });
          const imageUrl = URL.createObjectURL(imageBlob);
          return { ...item, content: imageUrl }; // 返回更新后的项
        } catch (err) {
          console.error('图片获取失败', item.backPath, err);
          return item; // 保持原样
        }
      }
  
      if (item.type === 'text') {
        try {
          const res = await getTextResult({ path: item.backPath ,"poolName": poolName });
          return { ...item, content: res.data.text };
        } catch (err) {
          console.error('文本获取失败', item.backPath, err);
          return item;
        }
      }
  
      // 其他类型：不处理，原样返回
      return item;
    });
  
    try {
      const updatedResultList = await Promise.all(updatedResultsPromises);
  
      // 构造新的 programList 状态结构
      const newProgramList = {
        ...programList,
        [selectedProgram]: {
          ...programList[selectedProgram],
          resultList: updatedResultList
        }
      };
  
      setProgramList(newProgramList);
      console.log('所有结果已更新');
    } catch (err) {
      console.error('整体更新出错', err);
    }
  };
  


  const handleRun = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setProgress(0);
    setResults(prev => ({ ...prev, terminal: '正在与服务器建立连接...\n' }));
    
    try {
      const cmd = programList[selectedProgram].cmd;
      const encodedCmd = encryptCmd(cmd);
    //   const results = programList[selectedProgram].resultList;
    //   const eventSource = new EventSource(`${request.BASE_URL}/part3/execute/1/${urlAlgo}/${urlDataset}/`);
      const eventSource = new EventSource(`${request.BASE_URL}/excute/${poolName}/${encodedCmd}/`);

      eventSource.onmessage = async (event) => {
        if (event.data === '[done]') {
          eventSource.close();
          setResults(prev => ({
            ...prev,
            terminal: prev.terminal + '正在拷贝result\n'
          }));
          
          try {
            getAllResult();

            setResults(prev => ({
              ...prev,
              terminal: prev.terminal + '完成\n'
            }));
            // setProgress(100);

          } catch (error) {
            setResults(prev => ({
              ...prev,
              terminal: prev.terminal + `获取结果失败: ${error.message}\n`
            }));
          } finally {
            setIsRunning(false);
          }
          
        } else if (event.data === '[error]') {
          eventSource.close();
          setResults(prev => ({
            ...prev,
            terminal: prev.terminal + '\n执行出错\n'
          }));
          setIsRunning(false);
        } else {
          setResults(prev => ({
            ...prev,
            terminal: prev.terminal + event.data + '\n'
          }));
        }
      };
      
      eventSource.onerror = () => {
        eventSource.close();
        setResults(prev => ({
          terminal: prev.terminal + '\n连接错误\n'
        }));
        setIsRunning(false);
      };

    } catch (error) {
      console.error('执行失败:', error);
      setResults(prev => ({
        ...prev,
        terminal: `执行失败: ${error.message}`
      }));
    }
  };


  return (
    
    <Box sx={{ p: 3, backgroundColor: '#f5f6fa' }}>
        {/* 第一部分 */}
    { programList && (

      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, backgroundColor: '#f0f4f8', border: '1px solid #e0e0e0' }}>
        <Typography variant="body1" component="div" sx={{ lineHeight: 1.6, color: '#2d3436', fontSize: '0.95rem' }}>
            {Object.entries(description).map(([title, items],index) => (
                <Box key={title} mb={1}> 
                    <strong>{title}:</strong>
                    { items.map((item, itemIndex) => (
                        <Box key={itemIndex} component="span" display="block">
                            {item}
                        </Box>
                    ))}
                </Box>
            ))}
          {/* <strong>考核指标：</strong>
          <Box component="span" display="block">建立统一图计算编程模型和编译工具</Box>
          <Box component="span" display="block">动态图更新性能达到每秒百万条边</Box>
          <strong>中期指标：</strong>
          <Box component="span" display="block">指标3.1：抽象出图遍历、图挖掘、图学习所具有的共性计算特征</Box>
          <Box component="span" display="block">指标3.2：使用SNAP标准动态图数据集进行评测，动态图更新速率达到每秒五十万条边</Box>
          <strong>完成时指标：</strong>
          <Box component="span" display="block">指标3.1：提出对图遍历、图挖掘、图学习算法统一化表达的编程模型和编译工具</Box>
          <Box component="span" display="block">指标3.2：使用SNAP标准动态图数据集进行评测，动态图更新速率达到每秒百万条边</Box>
          <strong>考核方式：</strong>
          <Box component="span" display="block">首先，将图遍历、图学习、图挖掘应用采用CGA编程模型统一化表达</Box>
          <Box component="span" display="block">然后，将CGA编程模型经过多层编译，转换成图计算加速卡（模拟器）上运行的代码</Box>
          <Box component="span" display="block">最后，支持GraphScope和DGL框架向CGA编程模型的转换</Box>
          <Box component="span" display="block">使用SNAP标准动态图数据集进行评测，性能指标计算方法是：动态图更新速率=总更新边数/总更新时间</Box>
          <strong>数据集来源：</strong>
          <Box component="span" display="block">采用选自斯坦福网络分析平台（SNAP）的自然图数据集ego-Facebook，大型网络数据集KONECT的自然图数据集Euroroads、PDZBase、Physicians，和图卷积网络自然图数据集Cora</Box> */}
        </Typography>
      </Paper>

    )} 
        
    {/* 第二部分 */}
    { programList && (
      <Grid container spacing={3} mb={2} alignItems="stretch">
        <Grid item xs={12} md={4} >
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, height: 250, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'secondary.main', borderBottom: '2px solid', borderColor: 'secondary.main', pb: 1 }}>
              运行测试程序
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 550, fontSize: '16px', mb: 1 }}>
                选择测试程序
              </Typography>
              <Select
                fullWidth
                value={selectedProgram}
                onChange={handleProgramChange}
                disabled={isRunning}
              >
                {programs.map((program) => (
                  <MenuItem key={program} value={program}>
                    {program}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        onClick={handleRun} 
                        disabled={isRunning}
                    >
                        {isRunning ? '运行中...' : '运行'}
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        onClick={getAllBackupResult}
                    >
                        结果展示
                    </Button>
                    </Grid>
                </Grid>
            </Box>
            {/* <Button 
              variant="contained" 
              color="primary" 
              onClick={handleRun} 
              disabled={isRunning} 
              sx={{ marginBottom: 2 }}
            >
              {isRunning ? '运行中...' : '运行'}
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={getAllBackupResult} 
              sx={{ marginBottom: 2 }}
            >
              直接获取结果
            </Button> */}
            <Button 
              variant="contained" 
              color="primary" 
              onClick={testapi} 
              sx={{ marginBottom: 2 }}
            >
              测试接口
            </Button>
            {isRunning && <LinearProgress value={progress} />}
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, height: 500, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'secondary.main' }}>
              Terminal执行结果
            </Typography>
            <Box sx={{
              backgroundColor: '#1e1e1e',
              color: '#4caf50',
              fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
              fontSize: '0.875rem',
              lineHeight: 1.5,
              overflow: 'auto',
              padding: '16px',
              borderRadius: '4px',
              flex: 1,
              whiteSpace: 'pre',
              p: 1.5,
            }} ref={resultsBoxRef}>
              <div>{results.terminal || ''}</div>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      )} 

      {/* 第三部分 */}
    { programList && (
      <Grid container spacing={3}>
      {programList[selectedProgram].resultList.map((item,index) => {
          
          return (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 3, height: 500 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    {item.name}
                  </Typography>
                </Box>

                {item.type === 'image' && item.content && (
                  <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                        <img 
                        src={item.content} 
                        alt={item.name} 
                        style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} 
                        />
                  </Box>
                )}

                {item.type === 'text' && item.content && (
                    <ReadOnlyCodeBox 
                      content={item.content || ''} 
                      height="400" 
                      showLineNumbers={true} 
                    />
                )}

                {/* {item.type === 'html' && item.content && (
                    // <iframe src="/myPage.html" width="100%" height="100%" title={item.name}></iframe>
                    <div
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                )} */}

                {/* 这里可以添加其他类型的结果展示 */}


                {/* <Box sx={{ height:'100%' ,display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    {
                        imageUrl1 &&
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <img 
                            src={imageUrl1} 
                            alt="Result" 
                            style={{ maxWidth: '100%' }} 
                            />
                        </div>
                    }
                </Box> */}

                {/* <Box sx={{ height:'100%' ,display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    {
                        imageUrl1 &&
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <img 
                            src={imageUrl1} 
                            alt="Result" 
                            style={{ maxWidth: '100%' }} 
                            />
                        </div>
                    }
                </Box> */}

                 {/* <ReadOnlyCodeBox content={results[exampleKey] || ''} height={400} /> */}

                {/* {
                    imageUrl1 &&
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <img 
                        src={imageUrl1} 
                        alt="Result" 
                        style={{ maxWidth: '100%' }} 
                        />
                   </div>
                } */}

                {/* {imageUrl1 && (
                        <img 
                        src={imageUrl1}
                        alt="Result" 
                        style={{ maxWidth: '100%',display: 'block', margin: '0 auto' }} 
                        />
                    )} */}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    )} 

    </Box>
      
  );
}