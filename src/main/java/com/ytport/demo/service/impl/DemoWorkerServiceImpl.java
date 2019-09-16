package com.ytport.demo.service.impl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ytport.demo.entity.DemoWorker;
import com.ytport.demo.dao.DemoWorkerDao;
import com.ytport.demo.service.DemoWorkerService;
import com.ytport.base.service.impl.BaseServiceImpl;

@Component
@Transactional(readOnly = true)
public class DemoWorkerServiceImpl extends BaseServiceImpl<DemoWorker,String> implements DemoWorkerService{
	
	private static Logger logger = LoggerFactory.getLogger(DemoWorkerServiceImpl.class);
	
	private DemoWorkerDao baseDao;
	
	@Autowired
	public void setBaseDao( DemoWorkerDao value){
		super.setBaseDao(value);
		baseDao=value;
	}

	@Override
	public String hql(){
		return "from DemoWorker entity where {where} order by {order}";
	}
}

