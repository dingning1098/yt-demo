package com.ytport.demo.web;


import java.util.List;
import java.util.ArrayList;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import com.ytport.base.action.BaseAction;
import com.ytport.demo.entity.WorkerRecord;
import com.ytport.demo.service.WorkerRecordService;

@Namespace("/")
public class WorkerRecordAction extends BaseAction<WorkerRecord> {

	/*==============================框架代码START==============================*/
	private List<WorkerRecord> entityList=new ArrayList<WorkerRecord>();
	private WorkerRecordService baseService;
	@Autowired
	public void setBaseService(WorkerRecordService value){
		super.setBaseService(value);
		this.baseService=value;
	}
	
	public void setEntity(WorkerRecord entity) {
		this.entity=entity;
	}
	
	public WorkerRecord getEntity() {
		return entity;
	}

    public void setEntityList(List<WorkerRecord> entityList) {
        this.entityList=entityList;
	}

	@Override
	public List<WorkerRecord> getEntityList() {
		return entityList;
	}
	/*==============================框架代码END==============================*/
}