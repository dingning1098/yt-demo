package com.ytport.demo.web;


import java.util.List;
import java.util.ArrayList;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import com.ytport.base.action.BaseAction;
import com.ytport.demo.entity.DemoArea;
import com.ytport.demo.service.DemoAreaService;

@Namespace("/")
public class DemoAreaAction extends BaseAction<DemoArea> {

	/*==============================框架代码START==============================*/
	private List<DemoArea> entityList=new ArrayList<DemoArea>();
	private DemoAreaService baseService;
	@Autowired
	public void setBaseService(DemoAreaService value){
		super.setBaseService(value);
		this.baseService=value;
	}
	
	public void setEntity(DemoArea entity) {
		this.entity=entity;
	}
	
	public DemoArea getEntity() {
		return entity;
	}

    public void setEntityList(List<DemoArea> entityList) {
        this.entityList=entityList;
	}

	@Override
	public List<DemoArea> getEntityList() {
		return entityList;
	}
	/*==============================框架代码END==============================*/
}