package com.dtstack.batch.service.schedule;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dtstack.batch.mapstruct.task.ScheduleTaskMapstructTransfer;
import com.dtstack.batch.vo.schedule.ScheduleTaskVO;
import com.dtstack.engine.common.enums.EScheduleStatus;
import com.dtstack.engine.common.enums.IsDeletedEnum;
import com.dtstack.engine.domain.ScheduleTaskShade;
import com.dtstack.engine.mapper.ScheduleTaskShadeMapper;
import com.dtstack.engine.master.dto.schedule.QueryTaskListDTO;
import com.dtstack.engine.pager.PageResult;
import com.google.common.collect.Lists;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @Auther: dazhi
 * @Date: 2021/12/6 3:48 PM
 * @Email:dazhi@dtstack.com
 * @Description:
 */
@Service
public class TaskService extends ServiceImpl<ScheduleTaskShadeMapper, ScheduleTaskShade> {

    private static final Logger LOGGER = LoggerFactory.getLogger(TaskService.class);

    /**
     * 查询任务列表
     *
     * @param dto 查询条件
     * @return
     */
    public PageResult<List<ScheduleTaskVO>> queryTasks(QueryTaskListDTO dto) {
        Page<ScheduleTaskShade> page = new Page<>(dto.getCurrentPage(), dto.getPageSize());
        // 分页查询
        Page<ScheduleTaskShade> resultPage = this.lambdaQuery()
                .like(StringUtils.isNotBlank(dto.getName()), ScheduleTaskShade::getName, dto.getName())
                .eq(dto.getOwnerId() != null, ScheduleTaskShade::getOwnerUserId, dto.getOwnerId())
                .eq(dto.getTenantId() != null, ScheduleTaskShade::getTenantId, dto.getTenantId())
                .eq(dto.getScheduleStatus() != null, ScheduleTaskShade::getScheduleStatus, dto.getScheduleStatus())
                .in(StringUtils.isNotBlank(dto.getTaskTypeList()), ScheduleTaskShade::getTaskType, Arrays.asList(dto.getTaskTypeList().split(",")))
                .in(StringUtils.isNotBlank(dto.getPeriodTypeList()), ScheduleTaskShade::getPeriodType, Arrays.asList(dto.getPeriodTypeList().split(",")))
                .page(page);
        List<ScheduleTaskVO> scheduleTaskVOS = ScheduleTaskMapstructTransfer.INSTANCE.beanToTaskVO(resultPage.getRecords());
        return new PageResult<>(dto.getCurrentPage(), dto.getPageSize(), resultPage.getTotal(), (int) resultPage.getPages(), scheduleTaskVOS);
    }

    /**
     * 修改任务运行状态
     *
     * @param taskIdList 任务id
     * @param scheduleStatus 调度状态
     * @return 是否更新成功
     */
    public Boolean frozenTask(List<Long> taskIdList, Integer scheduleStatus) {
        if (CollectionUtils.isEmpty(taskIdList)) {
            LOGGER.error("taskIdList is null");
            return Boolean.FALSE;
        }

        if (EScheduleStatus.getStatus(scheduleStatus) != null) {
            LOGGER.error("scheduleStatus is null");
            return Boolean.FALSE;
        }

        ScheduleTaskShade scheduleTask = new ScheduleTaskShade();
        scheduleTask.setScheduleStatus(scheduleStatus);
        return this.lambdaUpdate()
                .in(ScheduleTaskShade::getTaskId)
                .eq(ScheduleTaskShade::getIsDeleted, IsDeletedEnum.NOT_DELETE.getType())
                .update(scheduleTask);
    }

    /**
     * @param taskName
     * @param userId
     * @return
     */
    public List<Long> findTaskIdByTaskName(String taskName, Long userId) {
        if (StringUtils.isBlank(taskName) && userId == null) {
            return Lists.newArrayList();
        }
        return this.lambdaQuery()
                .eq(userId != null, ScheduleTaskShade::getOwnerUserId, userId)
                .like(StringUtils.isNotBlank(taskName), ScheduleTaskShade::getName, taskName)
                .list().stream().map(ScheduleTaskShade::getTaskId).collect(Collectors.toList());
    }
}