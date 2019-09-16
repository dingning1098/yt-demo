package com.ytport.demo.web;


import java.util.List;
import java.util.ArrayList;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import com.ytport.base.action.BaseAction;
import com.ytport.demo.entity.DemoWorkerEdu;
import com.ytport.demo.service.DemoWorkerEduService;

@Namespace("/")
public class DemoWorkerEduAction extends BaseAction<DemoWorkerEdu> {

	/*==============================框架代码START==============================*/
	private List<DemoWorkerEdu> entityList=new ArrayList<DemoWorkerEdu>();
	private DemoWorkerEduService baseService;
	@Autowired
	public void setBaseService(DemoWorkerEduService value){
		super.setBaseService(value);
		this.baseService=value;
	}
	
	public void setEntity(DemoWorkerEdu entity) {
		this.entity=entity;
	}
	
	public DemoWorkerEdu getEntity() {
		return entity;
	}

    public void setEntityList(List<DemoWorkerEdu> entityList) {
        this.entityList=entityList;
	}

	@Override
	public List<DemoWorkerEdu> getEntityList() {
		return entityList;
	}
	/*==============================框架代码END==============================*/
}