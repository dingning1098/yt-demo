package com.ytport.demo.service.impl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ytport.demo.entity.DemoProvince;
import com.ytport.demo.dao.DemoProvinceDao;
import com.ytport.demo.service.DemoProvinceService;
import com.ytport.base.service.impl.BaseServiceImpl;

@Component
@Transactional(readOnly = true)
public class DemoProvinceServiceImpl extends BaseServiceImpl<DemoProvince,String> implements DemoProvinceService{
	
	private static Logger logger = LoggerFactory.getLogger(DemoProvinceServiceImpl.class);
	
	private DemoProvinceDao baseDao;
	
	@Autowired
	public void setBaseDao( DemoProvinceDao value){
		super.setBaseDao(value);
		baseDao=value;
	}

	@Override
	public String hql(){
		return "from DemoProvince entity where {where} order by {order}";
	}
}

