package com.ytport.demo.web;


import java.util.List;
import java.util.ArrayList;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import com.ytport.base.action.BaseAction;
import com.ytport.demo.entity.DemoProvince;
import com.ytport.demo.service.DemoProvinceService;

@Namespace("/")
public class DemoProvinceAction extends BaseAction<DemoProvince> {

	/*==============================框架代码START==============================*/
	private List<DemoProvince> entityList=new ArrayList<DemoProvince>();
	private DemoProvinceService baseService;
	@Autowired
	public void setBaseService(DemoProvinceService value){
		super.setBaseService(value);
		this.baseService=value;
	}
	
	public void setEntity(DemoProvince entity) {
		this.entity=entity;
	}
	
	public DemoProvince getEntity() {
		return entity;
	}

    public void setEntityList(List<DemoProvince> entityList) {
        this.entityList=entityList;
	}

	@Override
	public List<DemoProvince> getEntityList() {
		return entityList;
	}
	/*==============================框架代码END==============================*/
}