import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
    { key: '课题一', title: '北航课题一', href: paths.dashboard.part1, icon: 'chart-pie',
        subItems: 
        [
            {key: '内容一', title: '统一接口技术功能', href: paths.dashboard.part1_sub1},
            // {key: '内容二', title: '性能分析', href: paths.dashboard.part1_sub2},
            // {key: '内容三', title: '数据分析', href: paths.dashboard.part1_sub3},
            // {key: '内容四', title: '代码分析', href: paths.dashboard.part1_sub4},
            // {key: '内容五', title: '代码分析', href: paths.dashboard.part1_sub5},
            // {key: '内容六', title: '代码分析', href: paths.dashboard.part1_sub6},
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
] satisfies NavItemConfig[];    
