package com.ytport.demo.service.impl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ytport.demo.entity.WorkerRecord;
import com.ytport.demo.dao.WorkerRecordDao;
import com.ytport.demo.service.WorkerRecordService;
import com.ytport.base.service.impl.BaseServiceImpl;

@Component
@Transactional(readOnly = true)
public class WorkerRecordServiceImpl extends BaseServiceImpl<WorkerRecord,String> implements WorkerRecordService{
	
	private static Logger logger = LoggerFactory.getLogger(WorkerRecordServiceImpl.class);
	
	private WorkerRecordDao baseDao;
	
	@Autowired
	public void setBaseDao( WorkerRecordDao value){
		super.setBaseDao(value);
		baseDao=value;
	}

	@Override
	public String hql(){
		return "from WorkerRecord entity where {where} order by {order}";
	}
}

