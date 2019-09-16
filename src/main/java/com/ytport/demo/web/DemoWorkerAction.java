package com.ytport.demo.web;


import java.util.List;
import java.util.ArrayList;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import com.ytport.base.action.BaseAction;
import com.ytport.demo.entity.DemoWorker;
import com.ytport.demo.service.DemoWorkerService;

@Namespace("/")
public class DemoWorkerAction extends BaseAction<DemoWorker> {

	/*==============================框架代码START==============================*/
	private List<DemoWorker> entityList=new ArrayList<DemoWorker>();
	private DemoWorkerService baseService;
	@Autowired
	public void setBaseService(DemoWorkerService value){
		super.setBaseService(value);
		this.baseService=value;
	}
	
	public void setEntity(DemoWorker entity) {
		this.entity=entity;
	}
	
	public DemoWorker getEntity() {
		return entity;
	}

    public void setEntityList(List<DemoWorker> entityList) {
        this.entityList=entityList;
	}

	@Override
	public List<DemoWorker> getEntityList() {
		return entityList;
	}
	/*==============================框架代码END==============================*/
}