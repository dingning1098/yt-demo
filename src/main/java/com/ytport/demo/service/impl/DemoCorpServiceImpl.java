package com.ytport.demo.service.impl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ytport.demo.entity.DemoCorp;
import com.ytport.demo.dao.DemoCorpDao;
import com.ytport.demo.service.DemoCorpService;
import com.ytport.base.service.impl.BaseServiceImpl;

@Component
@Transactional(readOnly = true)
public class DemoCorpServiceImpl extends BaseServiceImpl<DemoCorp,String> implements DemoCorpService{
	
	private static Logger logger = LoggerFactory.getLogger(DemoCorpServiceImpl.class);
	
	private DemoCorpDao baseDao;
	
	@Autowired
	public void setBaseDao( DemoCorpDao value){
		super.setBaseDao(value);
		baseDao=value;
	}

	@Override
	public String hql(){
		return "from DemoCorp entity where {where} order by {order}";
	}
}

