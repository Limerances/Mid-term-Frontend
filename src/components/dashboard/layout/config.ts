import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
    {
        key: 'home', title: '首页', href: paths.home, icon: 'home',
    },
    { key: '第一部分', title: '性能分析基础软件支撑系统', href: paths.dashboard.part1, icon: 'chart-pie',
        subItems: 
        [
            {key: '内容一', title: '海光统一采集接口', href: paths.dashboard.part1_sub1},
            {key: '内容二', title: '迈创统一采集接口', href: paths.dashboard.part1_sub2},
            {key: '内容三', title: '性能事件采样', href: paths.dashboard.part1_sub3},//part1_sub2变part1_sub3
            {key: '内容四', title: '进程采样', href: paths.dashboard.part1_sub4},//part1_sub3变part1_sub4
            {key: '内容五', title: '数据裁剪', href: paths.dashboard.part1_sub5},//part1_sub5变part1_sub5
            {key: '内容六', title: '高效数据表示', href: paths.dashboard.part1_sub6},//part1_sub6变part1_sub6
            {key: '内容七', title: '统一接口技术功能', href: paths.dashboard.part1_sub7},//part1_sub1变part1_sub7
            {key: '内容八', title: 'IOP 采集功能', href: paths.dashboard.part1_sub8},//part5_sub1变part1_sub8
            {key: '内容九', title: '数据提取', href: paths.dashboard.part1_sub9},//之前一版就还没给我,对应文件的内容 数据提取
            // {key: '内容七', title: '', href: paths.dashboard.part1_sub7},//之前一版就还没给我，对应文件的内容7
        ]
    },
    {
        key: '第二部分', title: '轻量级调试与性能自动调优', href: paths.dashboard.part2, icon: 'chart-pie',
        subItems:
        [
            {key: '内容一', title: '程序调试信息获取', href: paths.dashboard.part2_sub1},//part3_sub3变part2_sub1
            {key: '内容二', title: '技术开销轻量级测试', href: paths.dashboard.part2_sub2},//part3_sub4变part2_sub2
            {key: '内容三', title: '程序挂起检测', href: paths.dashboard.part2_sub3},//part3_sub5变part2_sub3
            {key: '内容四', title: 'I/O预测功能', href: paths.dashboard.part2_sub4},//part5_sub3变part2_sub4
            {key: '内容五', title: '编译器自动调优', href: paths.dashboard.part2_sub5},//part4_sub1变part2_sub5
            {key: '内容六', title: '计算性能自动调优', href: paths.dashboard.part2_sub6},//part4_sub3变part2_sub6
            {key: '内容七', title: '核函数计算性能自动建模', href: paths.dashboard.part2_sub7},//part4_sub2变part2_sub7
            {key: '内容八', title: '通信建模', href: paths.dashboard.part2_sub8},//part4_sub4变part2_sub8
            {key: '内容九', title: '通信调优', href: paths.dashboard.part2_sub9},//part4_sub5变part2_sub9
            {key: '内容十', title: 'IO建模', href: paths.dashboard.part2_sub10},//part4_sub6变part2_sub10
            {key: '内容十一', title: 'IO模型调优', href: paths.dashboard.part2_sub11},//part4_sub7变part2_sub11
            {key: '内容十二', title: 'IO模型调优', href: paths.dashboard.part2_sub12},  //part4_sub8变part2_sub12
            {key: '内容十三', title: '性能监测统一接口', href: paths.dashboard.part2_sub13},//part2_sub1变part2_sub13
            {key: '内容十四', title: '轻量级性能监测技术', href: paths.dashboard.part2_sub14},//part2_sub2变part2_sub14
            {key: '内容十五', title: '轻量级并行调试工具与失效定位', href: paths.dashboard.part2_sub15},//part2_sub3变part2_sub15
            {key: '内容十六', title: '通用域性能监测接口测试', href: paths.dashboard.part2_sub16},//part3_sub1变part2_sub16
            {key: '内容十七', title: '加速域性能监测接口测试', href: paths.dashboard.part2_sub17},//part3_sub2变part2_sub17
        ]
    },
    {
        key: '第三部分', title: '性能数据智能分析诊断与优化', href: paths.dashboard.part3, icon: 'chart-pie',
        subItems:
        [
            {key: '内容一', title: '内存分析功能测试', href: paths.dashboard.part3_sub1},//part1_sub11变part3_sub1
            {key: '内容二', title: '性能轨迹分析功能测试', href: paths.dashboard.part3_sub2},//part1_sub14变part3_sub2
            {key: '内容三', title: '通信分析', href: paths.dashboard.part3_sub3},//part1_sub12变part3_sub3
            {key: '内容四', title: '噪音检测', href: paths.dashboard.part3_sub4},//part1_sub9变part3_sub4
            {key: '内容五', title: '可拓展性瓶颈检测功能测试', href: paths.dashboard.part3_sub5},//part1_sub15变part3_sub5
            {key: '内容六', title: '低效行为报告', href: paths.dashboard.part3_sub6},//part1_sub13变part3_sub6
            {key: '内容七', title: '故障定位', href: paths.dashboard.part3_sub7},//part1_sub8变part3_sub7
            {key: '内容八', title: '热点分析', href: paths.dashboard.part3_sub8},//part1_sub10变part3_sub8
            {key: '内容九', title: 'I/O诊断功能', href: paths.dashboard.part3_sub9},//part5_sub2变part3_sub9
        ]
    }



    // { key: '第一部分', title: '性能分析基础软件支撑系统', href: paths.dashboard.part1, icon: 'chart-pie',
    //     subItems: 
    //     [
    //         // {key: '内容二', title: '迈创统一采集接口', href: paths.dashboard.part1_sub2},//还没有
    //         // {key: '内容二', title: '海光统一采集接口', href: paths.dashboard.part1_sub2},//还没有
    //         {key: '内容三', title: '性能事件采样', href: paths.dashboard.part1_sub2},//part1_sub2变part1_sub3
    //         {key: '内容四', title: '进程采样', href: paths.dashboard.part1_sub3},//part1_sub3变part1_sub4
    //         {key: '内容五', title: '数据裁剪', href: paths.dashboard.part1_sub5},//part1_sub5变part1_sub5
    //         {key: '内容六', title: '高效数据表示', href: paths.dashboard.part1_sub6},//part1_sub6变part1_sub6
    //         //第一部分end
    //         {key: '内容七', title: '统一接口技术功能', href: paths.dashboard.part1_sub1},//part1_sub1变part1_sub7
    //         {key: '内容八', title: 'IOP 采集功能', href: paths.dashboard.part5_sub1},//part5_sub1变part1_sub8
    //         //第一部分第二轮

    //         // {key: '内容四', title: '', href: paths.dashboard.part1_sub4},//之前一版就还没给我,对应文件的内容4
    //         // {key: '内容七', title: '', href: paths.dashboard.part1_sub7},//之前一版就还没给我，对应文件的内容7
    //     ]
    // },
    // {
    //     key: '第二部分', title: '轻量级调试与性能自动调优', href: paths.dashboard.part2, icon: 'chart-pie',
    //     subItems:
    //     [
    //         {key: '内容一', title: '程序调试信息获取', href: paths.dashboard.part3_sub3},//part3_sub3变part2_sub1
    //         {key: '内容二', title: '技术开销轻量级测试', href: paths.dashboard.part3_sub4},//part3_sub4变part2_sub2
    //         {key: '内容三', title: '程序挂起检测', href: paths.dashboard.part3_sub5},//part3_sub5变part2_sub3
    //         {key: '内容四', title: 'I/O预测功能', href: paths.dashboard.part5_sub3},//part5_sub3变part2_sub4
    //         {key: '内容五', title: '编译器自动调优', href: paths.dashboard.part4_sub1},//part4_sub1变part2_sub5
    //         {key: '内容六', title: '计算性能自动调优', href: paths.dashboard.part4_sub3},//part4_sub3变part2_sub6
    //         {key: '内容七', title: '核函数计算性能自动建模', href: paths.dashboard.part4_sub2},//part4_sub2变part2_sub7
    //         {key: '内容八', title: '通信建模', href: paths.dashboard.part4_sub4},//part4_sub4变part2_sub8
    //         {key: '内容九', title: '通信调优', href: paths.dashboard.part4_sub5},//part4_sub5变part2_sub9
    //         {key: '内容十', title: 'IO建模', href: paths.dashboard.part4_sub6},//part4_sub6变part2_sub10
    //         {key: '内容十一', title: 'IO模型调优', href: paths.dashboard.part4_sub7},//part4_sub7变part2_sub11
    //         {key: '内容十二', title: 'IO模型调优', href: paths.dashboard.part4_sub8},  //part4_sub8变part2_sub12
    //         //第二部分end
    //         {key: '内容十三', title: '性能监测统一接口', href: paths.dashboard.part2_sub1},//part2_sub1变part2_sub13
    //         {key: '内容十四', title: '轻量级性能监测技术', href: paths.dashboard.part2_sub2},//part2_sub2变part2_sub14
    //         {key: '内容十五', title: '轻量级并行调试工具与失效定位', href: paths.dashboard.part2_sub3},//part2_sub3变part2_sub15
    //         {key: '内容十六', title: '通用域性能监测接口测试', href: paths.dashboard.part3_sub1},//part3_sub1变part2_sub16
    //         {key: '内容十七', title: '加速域性能监测接口测试', href: paths.dashboard.part3_sub2},//part3_sub2变part2_sub17
    //         //第二部分第二轮
    //     ]
    // },
    // {
    //     key: '第三部分', title: '性能数据智能分析诊断与优化', href: paths.dashboard.part3, icon: 'chart-pie',
    //     subItems:
    //     [
    //         {key: '内容一', title: '内存分析功能测试', href: paths.dashboard.part1_sub11},//part1_sub11变part3_sub1
    //         {key: '内容二', title: '性能轨迹分析功能测试', href: paths.dashboard.part1_sub14},//part1_sub14变part3_sub2
    //         {key: '内容三', title: '通信分析', href: paths.dashboard.part1_sub12},//part1_sub12变part3_sub3
    //         {key: '内容四', title: '噪音检测', href: paths.dashboard.part1_sub9},//part1_sub9变part3_sub4
    //         {key: '内容五', title: '可拓展性瓶颈检测功能测试', href: paths.dashboard.part1_sub15},//part1_sub15变part3_sub5
    //         {key: '内容六', title: '低效行为报告', href: paths.dashboard.part1_sub13},//part1_sub13变part3_sub6
    //         {key: '内容七', title: '故障定位', href: paths.dashboard.part1_sub8},//part1_sub8变part3_sub7
    //         {key: '内容八', title: '热点分析', href: paths.dashboard.part1_sub10},//part1_sub10变part3_sub8
    //         {key: '内容九', title: 'I/O诊断功能', href: paths.dashboard.part5_sub2},//part5_sub2变part3_sub9
    //         //第三部分end
    //     ]
    // }


    //0609前
    // { key: '课题一', title: '课题一', href: paths.dashboard.part1, icon: 'chart-pie',
    //     subItems: 
    //     [
    //         {key: '内容一', title: '统一接口技术功能', href: paths.dashboard.part1_sub1},
    //         {key: '内容二', title: '性能事件采样', href: paths.dashboard.part1_sub2},
    //         {key: '内容三', title: '进程采样', href: paths.dashboard.part1_sub3},
    //         // {key: '内容四', title: '代码分析', href: paths.dashboard.part1_sub4},
    //         {key: '内容五', title: '数据裁剪', href: paths.dashboard.part1_sub5},
    //         {key: '内容六', title: '高效数据表示', href: paths.dashboard.part1_sub6},
    //         // {key: '内容七', title: '代码分析', href: paths.dashboard.part1_sub7},   
    //         {key: '内容八', title: '故障定位', href: paths.dashboard.part1_sub8},
    //         {key: '内容九', title: '噪音检测', href: paths.dashboard.part1_sub9},
    //         {key: '内容十', title: '热点分析', href: paths.dashboard.part1_sub10},
    //         {key: '内容十一', title: '内存分析功能测试', href: paths.dashboard.part1_sub11},
    //         {key: '内容十二', title: '通信分析', href: paths.dashboard.part1_sub12},
    //         {key: '内容十三', title: '低效行为报告', href: paths.dashboard.part1_sub13},
    //         {key: '内容十四', title: '性能轨迹分析功能测试', href: paths.dashboard.part1_sub14},
    //         {key: '内容十五', title: '可拓展性瓶颈检测功能测试', href: paths.dashboard.part1_sub15},
    //     ]
    // },
    // {
    //     key: '课题二', title: '课题二', href: paths.dashboard.part2, icon: 'chart-pie',
    //     subItems:
    //     [
    //         {key: '内容一', title: '性能监测统一接口', href: paths.dashboard.part2_sub1},
    //         {key: '内容二', title: '轻量级性能监测技术', href: paths.dashboard.part2_sub2},
    //         {key: '内容三', title: '轻量级并行调试工具与失效定位', href: paths.dashboard.part2_sub3},
    //     ]
    // },
    // {
    //     key: '课题三', title: '课题三', href: paths.dashboard.part3, icon: 'chart-pie',
    //     subItems:
    //     [
    //         {key: '内容一', title: '通用域性能监测接口测试', href: paths.dashboard.part3_sub1},
    //         {key: '内容二', title: '加速域性能监测接口测试', href: paths.dashboard.part3_sub2},
    //         {key: '内容三', title: '程序调试信息获取', href: paths.dashboard.part3_sub3},
    //         {key: '内容四', title: '技术开销轻量级测试', href: paths.dashboard.part3_sub4},
    //         {key: '内容五', title: '程序挂起检测', href: paths.dashboard.part3_sub5},
    //     ]
    // },
    // {
    //     key: '课题四', title: '课题四', href: paths.dashboard.part4, icon: 'chart-pie',
    //     subItems:
    //     [
    //         {key: '内容一', title: '编译器自动调优', href: paths.dashboard.part4_sub1},
    //         {key: '内容二', title: '核函数计算性能自动建模', href: paths.dashboard.part4_sub2},
    //         {key: '内容三', title: '计算性能自动调优', href: paths.dashboard.part4_sub3},
    //         {key: '内容四', title: '通信建模', href: paths.dashboard.part4_sub4},
    //         {key: '内容五', title: '通信调优', href: paths.dashboard.part4_sub5},
    //         {key: '内容六', title: 'IO建模', href: paths.dashboard.part4_sub6},
    //         {key: '内容七', title: 'IO模型调优', href: paths.dashboard.part4_sub7},
    //         {key: '内容八', title: 'IO模型调优', href: paths.dashboard.part4_sub8},            
    //     ]
    // },
    // {
    //     key: '课题五', title: '课题五', href: paths.dashboard.part5, icon: 'chart-pie',
    //     subItems:
    //     [
    //         {key: '内容一', title: 'IOP 采集功能', href: paths.dashboard.part5_sub1},
    //         {key: '内容二', title: 'I/O诊断功能', href: paths.dashboard.part5_sub2},
    //         {key: '内容三', title: 'I/O预测功能', href: paths.dashboard.part5_sub3},
    //     ]
    // }
] satisfies NavItemConfig[];    
