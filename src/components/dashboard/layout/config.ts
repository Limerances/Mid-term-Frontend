import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
    { key: '课题一', title: '课题一', href: paths.dashboard.part1, icon: 'chart-pie',
        subItems: 
        [
            {key: '内容一', title: '统一接口技术功能', href: paths.dashboard.part1_sub1},
            {key: '内容二', title: '性能事件采样', href: paths.dashboard.part1_sub2},
            {key: '内容三', title: '进程采样', href: paths.dashboard.part1_sub3},
            // {key: '内容四', title: '代码分析', href: paths.dashboard.part1_sub4},
            {key: '内容五', title: '数据裁剪', href: paths.dashboard.part1_sub5},
            {key: '内容六', title: '高效数据表示', href: paths.dashboard.part1_sub6},
            // {key: '内容七', title: '代码分析', href: paths.dashboard.part1_sub7},   
            // {key: '内容八', title: '代码分析', href: paths.dashboard.part1_sub8},
            // {key: '内容九', title: '代码分析', href: paths.dashboard.part1_sub9},
            {key: '内容十', title: '热点分析', href: paths.dashboard.part1_sub10},
            {key: '内容十一', title: '内存分析功能测试', href: paths.dashboard.part1_sub11},
            {key: '内容十二', title: '通信分析', href: paths.dashboard.part1_sub12},
            {key: '内容十三', title: '低效行为报告', href: paths.dashboard.part1_sub13},
            {key: '内容十四', title: '性能轨迹分析功能测试', href: paths.dashboard.part1_sub14},
            {key: '内容十五', title: '可拓展性瓶颈检测功能测试', href: paths.dashboard.part1_sub15},
        ]
    },
    {
        key: '课题二', title: '课题二', href: paths.dashboard.part2, icon: 'chart-pie',
        subItems:
        [
            {key: '内容一', title: '性能监测统一接口', href: paths.dashboard.part2_sub1},
            {key: '内容二', title: '轻量级性能监测技术', href: paths.dashboard.part2_sub2},
            {key: '内容三', title: '轻量级并行调试工具与失效定位', href: paths.dashboard.part2_sub3},
        ]
    },
    {
        key: '课题三', title: '课题三', href: paths.dashboard.part3, icon: 'chart-pie',
        subItems:
        [
            {key: '内容一', title: '通用域性能监测接口测试', href: paths.dashboard.part3_sub1},
            {key: '内容二', title: '加速域性能监测接口测试', href: paths.dashboard.part3_sub2},
            {key: '内容三', title: '程序调试信息获取', href: paths.dashboard.part3_sub3},
            {key: '内容四', title: '技术开销轻量级测试', href: paths.dashboard.part3_sub4},
            {key: '内容五', title: '程序挂起检测', href: paths.dashboard.part3_sub5},
        ]
    },
    {
        key: '课题四', title: '课题四', href: paths.dashboard.part4, icon: 'chart-pie',
        subItems:
        [
            {key: '内容一', title: '编译器自动调优', href: paths.dashboard.part4_sub1},
            {key: '内容二', title: '核函数计算性能自动建模', href: paths.dashboard.part4_sub2},
            {key: '内容三', title: '计算性能自动调优', href: paths.dashboard.part4_sub3},
            {key: '内容四', title: '通信建模', href: paths.dashboard.part4_sub4},
            {key: '内容五', title: '通信调优', href: paths.dashboard.part4_sub5},
            {key: '内容六', title: 'IO建模', href: paths.dashboard.part4_sub6},
            {key: '内容七', title: 'IO模型调优', href: paths.dashboard.part4_sub7},
            {key: '内容八', title: 'IO模型调优', href: paths.dashboard.part4_sub8},            
        ]
    },
    {
        key: '课题五', title: '课题五', href: paths.dashboard.part5, icon: 'chart-pie',
        subItems:
        [
            {key: '内容一', title: 'IOP 采集功能', href: paths.dashboard.part5_sub1},
            {key: '内容二', title: 'I/O诊断功能', href: paths.dashboard.part5_sub2},
            {key: '内容三', title: 'I/O预测功能', href: paths.dashboard.part5_sub3},
        ]
    }
] satisfies NavItemConfig[];    
