package com.ytport.demo.web;


import java.util.List;
import java.util.ArrayList;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import com.ytport.base.action.BaseAction;
import com.ytport.demo.entity.DemoCorp;
import com.ytport.demo.service.DemoCorpService;

@Namespace("/")
public class DemoCorpAction extends BaseAction<DemoCorp> {

	/*==============================框架代码START==============================*/
	private List<DemoCorp> entityList=new ArrayList<DemoCorp>();
	private DemoCorpService baseService;
	@Autowired
	public void setBaseService(DemoCorpService value){
		super.setBaseService(value);
		this.baseService=value;
	}
	
	public void setEntity(DemoCorp entity) {
		this.entity=entity;
	}
	
	public DemoCorp getEntity() {
		return entity;
	}

    public void setEntityList(List<DemoCorp> entityList) {
        this.entityList=entityList;
	}

	@Override
	public List<DemoCorp> getEntityList() {
		return entityList;
	}
	/*==============================框架代码END==============================*/
}