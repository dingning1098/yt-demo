package com.ytport.demo.dao;

import com.ytport.demo.entity.WorkerRecord;
import com.ytport.base.dao.BaseDao;
import org.springframework.stereotype.Repository;

@Repository("workerRecordDao")
public class WorkerRecordDao extends BaseDao<WorkerRecord, String> {

}