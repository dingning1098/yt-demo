package com.ytport.demo.web;


import java.util.List;
import java.util.ArrayList;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import com.ytport.base.action.BaseAction;
import com.ytport.demo.entity.Scode;
import com.ytport.demo.service.ScodeService;

@Namespace("/")
public class ScodeAction extends BaseAction<Scode> {

	/*==============================框架代码START==============================*/
	private List<Scode> entityList=new ArrayList<Scode>();
	private ScodeService baseService;
	@Autowired
	public void setBaseService(ScodeService value){
		super.setBaseService(value);
		this.baseService=value;
	}
	
	public void setEntity(Scode entity) {
		this.entity=entity;
	}
	
	public Scode getEntity() {
		return entity;
	}

    public void setEntityList(List<Scode> entityList) {
        this.entityList=entityList;
	}

	@Override
	public List<Scode> getEntityList() {
		return entityList;
	}
	/*==============================框架代码END==============================*/
}