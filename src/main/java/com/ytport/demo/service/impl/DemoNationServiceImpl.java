package com.ytport.demo.service.impl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ytport.demo.entity.DemoNation;
import com.ytport.demo.dao.DemoNationDao;
import com.ytport.demo.service.DemoNationService;
import com.ytport.base.service.impl.BaseServiceImpl;

@Component
@Transactional(readOnly = true)
public class DemoNationServiceImpl extends BaseServiceImpl<DemoNation,String> implements DemoNationService{
	
	private static Logger logger = LoggerFactory.getLogger(DemoNationServiceImpl.class);
	
	private DemoNationDao baseDao;
	
	@Autowired
	public void setBaseDao( DemoNationDao value){
		super.setBaseDao(value);
		baseDao=value;
	}

	@Override
	public String hql(){
		return "from DemoNation entity where {where} order by {order}";
	}
}

