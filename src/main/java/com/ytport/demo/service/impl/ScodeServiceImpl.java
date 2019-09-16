package com.ytport.demo.service.impl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ytport.demo.entity.Scode;
import com.ytport.demo.dao.ScodeDao;
import com.ytport.demo.service.ScodeService;
import com.ytport.base.service.impl.BaseServiceImpl;

@Component
@Transactional(readOnly = true)
public class ScodeServiceImpl extends BaseServiceImpl<Scode,String> implements ScodeService{
	
	private static Logger logger = LoggerFactory.getLogger(ScodeServiceImpl.class);
	
	private ScodeDao baseDao;
	
	@Autowired
	public void setBaseDao( ScodeDao value){
		super.setBaseDao(value);
		baseDao=value;
	}

	@Override
	public String hql(){
		return "from Scode entity where {where} order by {order}";
	}
}

