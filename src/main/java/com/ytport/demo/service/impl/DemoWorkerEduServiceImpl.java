package com.ytport.demo.service.impl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ytport.demo.entity.DemoWorkerEdu;
import com.ytport.demo.dao.DemoWorkerEduDao;
import com.ytport.demo.service.DemoWorkerEduService;
import com.ytport.base.service.impl.BaseServiceImpl;

@Component
@Transactional(readOnly = true)
public class DemoWorkerEduServiceImpl extends BaseServiceImpl<DemoWorkerEdu,String> implements DemoWorkerEduService{
	
	private static Logger logger = LoggerFactory.getLogger(DemoWorkerEduServiceImpl.class);
	
	private DemoWorkerEduDao baseDao;
	
	@Autowired
	public void setBaseDao( DemoWorkerEduDao value){
		super.setBaseDao(value);
		baseDao=value;
	}

	@Override
	public String hql(){
		return "from DemoWorkerEdu entity where {where} order by {order}";
	}
}

