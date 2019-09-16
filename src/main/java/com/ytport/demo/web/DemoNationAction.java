package com.ytport.demo.web;


import java.util.List;
import java.util.ArrayList;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import com.ytport.base.action.BaseAction;
import com.ytport.demo.entity.DemoNation;
import com.ytport.demo.service.DemoNationService;

@Namespace("/")
public class DemoNationAction extends BaseAction<DemoNation> {

	/*==============================框架代码START==============================*/
	private List<DemoNation> entityList=new ArrayList<DemoNation>();
	private DemoNationService baseService;
	@Autowired
	public void setBaseService(DemoNationService value){
		super.setBaseService(value);
		this.baseService=value;
	}
	
	public void setEntity(DemoNation entity) {
		this.entity=entity;
	}
	
	public DemoNation getEntity() {
		return entity;
	}

    public void setEntityList(List<DemoNation> entityList) {
        this.entityList=entityList;
	}

	@Override
	public List<DemoNation> getEntityList() {
		return entityList;
	}
	/*==============================框架代码END==============================*/
}