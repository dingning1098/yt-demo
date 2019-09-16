package com.ytport.demo.service.impl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ytport.demo.entity.DemoArea;
import com.ytport.demo.dao.DemoAreaDao;
import com.ytport.demo.service.DemoAreaService;
import com.ytport.base.service.impl.BaseServiceImpl;

@Component
@Transactional(readOnly = true)
public class DemoAreaServiceImpl extends BaseServiceImpl<DemoArea,String> implements DemoAreaService{
	
	private static Logger logger = LoggerFactory.getLogger(DemoAreaServiceImpl.class);
	
	private DemoAreaDao baseDao;
	
	@Autowired
	public void setBaseDao( DemoAreaDao value){
		super.setBaseDao(value);
		baseDao=value;
	}

	@Override
	public String hql(){
		return "from DemoArea entity where {where} order by {order}";
	}
}

