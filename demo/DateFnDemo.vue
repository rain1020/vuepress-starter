<template>
    <el-descriptions class="margin-top" title="初始化时间" :column="2" border>
        <el-descriptions-item label='创建当前时间'>
            {{ moment().format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label='string创建时间'>
            {{ moment("1995-12-25").format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label='根据对象创建时间'>
            {{ moment({
                year: 2010, month: 3, day: 5, hour: 15, minute: 10, second: 3, millisecond: 123
            }).
                format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label='根据数组创建时间'>
            {{ moment([2023, 7, 14, 13, 20, 20]).format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label='根据Date创建时间'>
            {{ moment(new Date()).format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label='根据时间戳创建时间'>
            {{ moment.unix(1323581876).format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="margin-top" title="时间设置" :column="3" border>
        <el-descriptions-item label="获取年份">
            {{ moment().years() }}/{{ moment().get('year') }}
        </el-descriptions-item>
        <el-descriptions-item label="获取月份">
            {{ moment().months() + 1 }}/{{ moment().get('month') + 1 }}
        </el-descriptions-item>
        <el-descriptions-item label="获取日期">
            {{ moment().dates() }}/{{ moment().get('date') }}
        </el-descriptions-item>
        <el-descriptions-item label="获取小时">
            {{ moment().hours() }}/{{ moment().get('hour') }}
        </el-descriptions-item>
        <el-descriptions-item label="获取分钟">
            {{ moment().minutes() }}/{{ moment().get('minute') }}
        </el-descriptions-item>
        <el-descriptions-item label="获取秒">
            {{ moment().second() }}/{{ moment().get('second') }}
        </el-descriptions-item>
        <el-descriptions-item label="获取毫秒">
            {{ moment().millisecond() }}/{{ moment().get('millisecond') }}
        </el-descriptions-item>
        <el-descriptions-item label="获取季度">
            {{ moment().quarters() }}
        </el-descriptions-item>
        <el-descriptions-item label="获取星期几">
            {{ moment().days() }}
        </el-descriptions-item>
        <el-descriptions-item label="设置年">
            {{ moment().set('year', 2013).format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label="设置月">
            {{ moment().set('month', 3).format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label="设置日">
            {{ moment().set('date', 1).format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label="设置小时">
            {{ moment().set('hour', 13).format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label="设置分钟">
            {{ moment().set('minute', 20).format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label="设置秒">
            {{ moment().set('second', 30).format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label="设置毫秒">
            {{ moment().set('millisecond', 123).format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label="设置时间">
            {{ moment().set({ 'year': 2013, 'month': 3 }).format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="margin-top" title="时间操作" :column="2" border>
        <el-descriptions-item label="添加7天">
            {{ moment().add(7, 'days').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="添加1个月">
            {{ moment().add(1, 'months').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="减去7天">
            {{ moment().subtract(7, 'days').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="减去1秒">
            {{ moment().subtract(1, 'seconds').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="减去1年">
            {{ moment().subtract(1, 'years').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="今年的第一天">
            {{ moment().startOf('year').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="这个月第一天">
            {{ moment().startOf('month').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="这个季度的第一天">
            {{ moment().startOf('quarter').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="这个礼拜的第一天">
            {{ moment().startOf('week').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="今天的零点时间">
            {{ moment().startOf('date').format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label="相同时间的小时之后时间设置为零点时间">
            {{ moment().startOf('hour').format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label="相同时间的分钟之后时间设置为零点时间">
            {{ moment().startOf('minute').format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label="相同时间的秒之后时间设置为零点时间">
            {{ moment().startOf('second').format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label="今年的最后一天">
            {{ moment().endOf('year').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="这个月的最后一天">
            {{ moment().endOf('month').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="今天的最后一个时间">
            {{ moment().endOf('date').format('YYYY-MM-DD HH:mm:ss') }}
        </el-descriptions-item>
        <el-descriptions-item label="这个季度的最后一天">
            {{ moment().endOf('quarter').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="这个礼拜的最后一天">
            {{ moment().endOf('week').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="相同时间的小时之后时间设置为最后一个时间">
            {{ moment().endOf('hour').format('YYYY-MM-DD HH:mm:ss') }}</el-descriptions-item>
        <el-descriptions-item label="相同时间的分钟之后时间设置为最后一个时间">
            {{ moment().endOf('minute').format('YYYY-MM-DD HH:mm:ss') }}</el-descriptions-item>
        <el-descriptions-item label="相同时间的秒之后时间设置为最后一个时间">
            {{ moment().endOf('second').format('YYYY-MM-DD HH:mm:ss') }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="margin-top" title="时间显示" :column="1" border>
        <el-descriptions-item label="时间格式化">
            {{ moment().format() }}/{{ moment().format("YYYY-MM-DD HH:mm:ss") }}
        </el-descriptions-item>
        <el-descriptions-item label="相对时间">
            {{ moment([2022, 0, 29]).fromNow(true) }}/{{ moment([2022, 0, 29]).to(moment([2020, 0, 10])) }}
        </el-descriptions-item>
        <el-descriptions-item label="时间差异">
            {{ moment([2022, 0, 29]).diff(moment([2020, 0, 10]), 'years', true) }}/
            {{ moment([2022, 0, 29]).diff(moment([2020, 0, 10]), 'days') }}/
            {{ getTimeDiff(new Date(2022, 1, 29), new Date(2020, 1, 10)).day }}天{{ getTimeDiff(new Date(2022, 1, 29), new
                Date(2020, 1, 10)).hours }}小时{{ getTimeDiff(new Date(2022, 1, 29), new Date(2020, 1, 10)).minutes }}分钟
        </el-descriptions-item>
        <el-descriptions-item label="这个月的总天数">
            {{ moment().daysInMonth() }}
        </el-descriptions-item>
        <el-descriptions-item label="这个月的最后一天">
            {{ moment().endOf('month').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="这个月的第一天">
            {{ moment().startOf('month').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="获取星期几">
            {{ getDay(moment()) }}
        </el-descriptions-item>
        <el-descriptions-item label="7天之后">
            {{ moment().add(7, 'days').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="7天之前">
            {{ moment().subtract(7, 'days').format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="作为对象">
            {{ moment().toObject() }}
        </el-descriptions-item>
        <el-descriptions-item label="作为数组">
            {{ moment().toArray() }}
        </el-descriptions-item>
        <el-descriptions-item label="作为json">
            {{ moment().toJSON() }}
        </el-descriptions-item>
    </el-descriptions>
</template>
<script setup lang="ts">
import { getDay, getTimeDiff } from '../components/DateFn'
import moment from 'moment'
</script>