package com.ytport.demo.web;


import java.util.List;
import java.util.ArrayList;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import com.ytport.base.action.BaseAction;
import com.ytport.demo.entity.WorkerCar;
import com.ytport.demo.service.WorkerCarService;

@Namespace("/")
public class WorkerCarAction extends BaseAction<WorkerCar> {

	/*==============================框架代码START==============================*/
	private List<WorkerCar> entityList=new ArrayList<WorkerCar>();
	private WorkerCarService baseService;
	@Autowired
	public void setBaseService(WorkerCarService value){
		super.setBaseService(value);
		this.baseService=value;
	}
	
	public void setEntity(WorkerCar entity) {
		this.entity=entity;
	}
	
	public WorkerCar getEntity() {
		return entity;
	}

    public void setEntityList(List<WorkerCar> entityList) {
        this.entityList=entityList;
	}

	@Override
	public List<WorkerCar> getEntityList() {
		return entityList;
	}
	/*==============================框架代码END==============================*/
}