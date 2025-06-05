"use client";
import React, { useState, useMemo } from 'react';
import {
  Box, Grid, Button, Select, MenuItem,
  Paper, Typography, LinearProgress
} from '@mui/material';
import ReadOnlyCodeBox from './CodeContainer';
import request from '@/lib/request/request';
import { getImageResult ,getTextResult} from "@/lib/api/user.js";
import { encryptCmd} from '@/lib/crypto/crypto.js';

// 算法和数据集映射
export const initProgramList= {
    '测试程序一': {
    cmd: '/thfs3/home/yanghailong/midterm-demo/workdir/GZDW/misa-md/run_analysis.sh',
    resultList:[
        {name: 'calc', path: '/thfs3/home/yanghailong/workdir/GZDW-TEST/misa-md/logs/analysis/heatmap/calc.png',type: 'image',content:''},
        {name: 'comm', path: '/thfs3/home/yanghailong/workdir/GZDW-TEST/misa-md/logs/analysis/heatmap/comm.png',type: 'image',content:''},
    ]
    },
    '测试程序二': {
        cmd: '/thfs3/home/yanghailong/midterm-demo/workdir/GZDW/misa-md/run_analysis.sh',
        resultList:[
            {name: 'slurm', path: '/thfs3/home/yanghailong/workdir/NCFX-TEST/misa-md/mpich342_3_misa-md_mpi_accl_mem_6600_4.slurm',type: 'text',content:''},
            {name: 'comm2', path: '/thfs3/home/yanghailong/workdir/GZDW-TEST/misa-md/logs/analysis/heatmap/comm.png',type: 'image',content:''},
        ]
    },
    };


export default function Page() {
    const [testProgramList, setTestProgramList] = useState(initProgramList);
    const programs = Object.keys(testProgramList);
  const [selectedProgram, setSelectedProgram] = useState(programs[0]);
  // 示例类型映射
  const EXAMPLE_TYPES = useMemo(() => {
    return {
      result1: { label: '结果图片一的名字' },
      result2: { label: '结果图片二的名字' }
    };
  }, [selectedProgram]); // 当 selectedAlgo 变化时重新计算

  // 根据算法类型获取可见示例
  const getVisibleExamples = (algorithm) => {
    return ['result1', 'result2'];
  };

  // 当算法改变时
  const handleProgramChange = (event) => {
    console.log('handleprogramchange')
    const newProgram = event.target.value;
    console.log(newProgram)
    setSelectedProgram(newProgram);
    setProgress(0);
    
    // 重置按钮显示状态
    const initialButtons = {
      result1: false,
      result2: false,
    };
    setShowButtons(initialButtons);

  };

  const [showButtons, setShowButtons] = useState({
    result1: false,
    result2: false,
  });


  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [Text1, setText1] = useState('');
  const [Text2, setText2] = useState('');


  const [results, setResults] = useState({
  });
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const [simulatorResults, setSimulatorResults] = useState('');
  const [isSimulatorRunning, setIsSimulatorRunning] = useState(false);
  const [simulatorProgress, setSimulatorProgress] = useState(0);

  const resultsBoxRef = React.useRef(null);
  const simulatorBoxRef = React.useRef(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    if (resultsBoxRef.current) {
      resultsBoxRef.current.scrollTop = resultsBoxRef.current.scrollHeight;
    }
    if (simulatorBoxRef.current) {
      simulatorBoxRef.current.scrollTop = simulatorBoxRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [results, simulatorResults]);



  const getAllResult = () => {
    const results = testProgramList[selectedProgram].resultList;
    getImageResult({path:results[0].path}).then(res => {
        // if(res.errno == 0){
            // 创建图片 URL
        const imageBlob = new Blob([res.data], { type: res.data.type });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrl1(imageUrl);
        console.log('获取成功');
        console.log(res.data)
        // }else{
        //     console.log('获取失败')
        // }
    }).catch(err => {
        console.log('获取失败')
        console.log(err);
    })
  };

  const handleRun = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setProgress(0);
    setResults(prev => ({ ...prev, terminal: '正在与服务器建立连接...\n' }));
    
    try {
      const cmd = testProgramList[selectedProgram].cmd;
      const encodedCmd = encryptCmd(cmd);
    //   const results = testProgramList[selectedProgram].resultList;
    //   const eventSource = new EventSource(`${request.BASE_URL}/part3/execute/1/${urlAlgo}/${urlDataset}/`);
      const eventSource = new EventSource(`${request.BASE_URL}/research1/excute/test/${encodedCmd}/`);

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
      {/* 文字说明模块 */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, backgroundColor: '#f0f4f8', border: '1px solid #e0e0e0' }}>
        <Typography variant="body1" component="div" sx={{ lineHeight: 1.6, color: '#2d3436', fontSize: '0.95rem' }}>
          <strong>考核指标：</strong>
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
          <Box component="span" display="block">采用选自斯坦福网络分析平台（SNAP）的自然图数据集ego-Facebook，大型网络数据集KONECT的自然图数据集Euroroads、PDZBase、Physicians，和图卷积网络自然图数据集Cora</Box>
        </Typography>
      </Paper>

      {/* 运行控制模块和Terminal执行结果并排 */}
      <Grid container spacing={3} mb={2} alignItems="stretch">
        <Grid item xs={12} md={4}>
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
            <Button 
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
              onClick={getAllResult} 
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

      {/* 示例展示区域 */}
      <Grid container spacing={3}>
      {getVisibleExamples(selectedProgram).map((exampleKey) => {
          
          return (
            <Grid item xs={12} md={6} key={exampleKey}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 3, height: 500 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    {EXAMPLE_TYPES[exampleKey].label}
                  </Typography>
                </Box>

                <Box sx={{ height:'100%' ,display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
                </Box>

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

    </Box>
  );
}